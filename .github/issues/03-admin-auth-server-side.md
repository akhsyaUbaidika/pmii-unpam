## Latar Belakang

Saat ini proteksi halaman admin (`/admin/*`) hanya dilakukan di **client-side** menggunakan `useEffect` di `app/admin/layout.tsx`:

```ts
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/admin/login");
  }
}, [pathname, router]);
```

**Ini bukan proteksi. Ini hanya dekorasi.**

Masalahnya:
1. Server **tetap render** seluruh halaman admin sebelum JavaScript jalan di browser
2. Jika JavaScript dimatikan, halaman admin langsung terbuka tanpa login
3. Ada window (jeda) antara page load dan `useEffect` jalan — konten admin bisa terlihat sekilas
4. `localStorage` bisa dimanipulasi — user bisa set token palsu sembarangan
5. Token disimpan di `localStorage` yang bisa dicuri via XSS attack

## Tujuan

1. Pindahkan autentikasi admin ke **server-side** menggunakan Next.js Middleware
2. Pindahkan token dari `localStorage` ke **HttpOnly cookie** (tidak bisa diakses JavaScript)
3. Pastikan halaman admin **tidak pernah** ter-render tanpa autentikasi valid

## Batasan (PENTING)

- ❌ Tidak boleh mengubah data lama di database
- ❌ Tidak boleh mengubah slug existing
- ✅ Harus backward compatible
- ✅ Endpoint API (`/api/*`) tidak boleh terganggu
- ⚠️ **Login flow akan berubah** — pastikan admin yang sedang login tahu bahwa mereka perlu login ulang setelah perubahan ini

## Scope Pekerjaan

### Step 1: Ubah Login API untuk set HttpOnly cookie

Buka file `app/api/login/route.ts`. Setelah login berhasil, selain return token di body, **juga set cookie**:

```ts
import { NextResponse } from "next/server";

// ... setelah login berhasil:

const token = jwt.sign(
  { id: user.id },
  process.env.JWT_SECRET!,
  { expiresIn: "7d" }
);

const response = NextResponse.json({
  token,
  user: { id: user.id, username: user.username },
});

// Set HttpOnly cookie
response.cookies.set("admin_token", token, {
  httpOnly: true,      // tidak bisa diakses JavaScript
  secure: true,        // hanya via HTTPS
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 hari (sama seperti JWT expiry)
});

return response;
```

### Step 2: Buat Middleware untuk proteksi route admin

Buat file baru di **root project** (sejajar `package.json`): `middleware.ts`

```ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Hanya proteksi route /admin/* kecuali /admin/login
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (!isAdminRoute || isLoginPage) {
    return NextResponse.next();
  }

  // Cek cookie
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    // Verifikasi JWT di edge runtime (gunakan jose, bukan jsonwebtoken)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    // Token invalid/expired → redirect ke login
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

> ⚠️ **PENTING**: Di Edge Runtime (middleware), `jsonwebtoken` tidak bisa dipakai. Gunakan library `jose` sebagai gantinya.

### Step 3: Install dependency `jose`

```bash
npm install jose
```

### Step 4: Buat API endpoint logout

Buat file `app/api/logout/route.ts`:

```ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0, // hapus cookie
  });

  return response;
}
```

### Step 5: Update admin layout

Buka `app/admin/layout.tsx`. Ubah fungsi logout:

```ts
"use client";

import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="font-bold">Admin PMII</h1>
        <button onClick={handleLogout} className="text-red-500 text-sm">
          Logout
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
```

> Hapus `useEffect` yang mengecek localStorage dan hapus pengecekan `pathname === "/admin/login"`. Middleware sudah handle proteksi.

### Step 6: Update login page client

Di halaman login admin, setelah login berhasil, **hapus** `localStorage.setItem("token", ...)` karena cookie sudah di-set otomatis oleh server.

Jika masih ada komponen yang baca token dari `localStorage` (seperti `ImageUploader`), ubah agar mengambil token dari cookie via API, atau kirim tanpa token karena cookie otomatis dikirim.

### Step 7: Update komponen yang menggunakan token dari localStorage

Cari semua file yang menggunakan `localStorage.getItem("token")`:
- `app/admin/artikel/new/page.tsx`
- `app/admin/layout.tsx`
- Komponen lain yang pakai `ImageUploader`

Untuk API calls yang butuh auth, cookie `admin_token` **otomatis dikirim oleh browser** jika request ke domain yang sama. Jadi untuk API route, tambahkan pembacaan cookie sebagai alternatif:

```ts
// Di API route yang butuh auth, tambahkan fallback ke cookie:
import { cookies } from "next/headers";

const token = getTokenFromHeader(req)
  || (await cookies()).get("admin_token")?.value
  || null;
```

## Acceptance Criteria

- [ ] File `middleware.ts` ada di root project dan memproteksi semua route `/admin/*` kecuali `/admin/login`
- [ ] Akses `/admin` tanpa login → redirect ke `/admin/login` (bahkan jika JavaScript dimatikan)
- [ ] Setelah login berhasil, cookie `admin_token` di-set sebagai HttpOnly
- [ ] Logout menghapus cookie `admin_token`
- [ ] Tidak ada lagi pengecekan `localStorage` untuk auth di admin layout
- [ ] Library `jose` sudah terinstall
- [ ] Endpoint `/api/logout` sudah dibuat
- [ ] Semua fitur admin (buat artikel, upload gambar, dll) masih berfungsi
- [ ] Tidak ada data yang berubah di database
