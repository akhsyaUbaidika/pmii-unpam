## Latar Belakang

File `app/api/login/route.ts` memiliki 3 masalah keamanan serius:

### Masalah 1: Debug log membocorkan data sensitif
```ts
console.log("DATABASE_URL RAW:", process.env.DATABASE_URL); // ❌ URL database di log
console.log("REQ:", { username, password });                 // ❌ password plaintext di log!
console.log("USER:", user);                                  // ❌ hash password di log
```
Di production (Vercel/Railway), log ini bisa diakses siapapun yang punya akses dashboard hosting.

### Masalah 2: User enumeration attack
```ts
if (!user) return Response.json({ error: "User not found" });   // ❌ beda pesan
if (!valid) return Response.json({ error: "Wrong password" });  // ❌ beda pesan
```
Dengan response yang berbeda, attacker bisa tahu username mana yang valid di database.

### Masalah 3: Tidak ada rate limiting
Attacker bisa mencoba ribuan password per detik tanpa hambatan (brute-force attack).

## Tujuan

1. Hapus semua `console.log` debug di login route
2. Samakan pesan error untuk login gagal (apapun alasannya)
3. Tambah rate limiting agar brute-force tidak bisa dilakukan

## Batasan (PENTING)

- ❌ Tidak boleh mengubah data lama di database
- ❌ Tidak boleh mengubah slug existing
- ✅ Harus backward compatible — response format tetap `{ error: string }` dan `{ token, user }`
- ✅ Login endpoint tetap di `POST /api/login`

## Scope Pekerjaan

### Step 1: Hapus semua console.log debug

Buka file `app/api/login/route.ts` dan **hapus** baris-baris ini:
```ts
// HAPUS semua baris ini:
console.log("DATABASE_URL RAW:", process.env.DATABASE_URL);
console.log("REQ:", { username, password });
console.log("USER:", user);
console.log("COMPARE START");
console.log("COMPARE RESULT:", valid);
console.log("JWT SIGN START");
console.log("SUCCESS LOGIN");
```

### Step 2: Samakan pesan error login

Ganti logic pengecekan user dan password menjadi:

```ts
const user = await prisma.admin.findUnique({
  where: { username },
});

// Jika user tidak ditemukan, tetap jalankan bcrypt.compare
// agar response time sama (mencegah timing attack)
const valid = user
  ? await bcrypt.compare(password, user.password)
  : await bcrypt.compare(password, "$2a$12$dummyhashuntuktimingattack");

if (!user || !valid) {
  return Response.json(
    { error: "Username atau password salah" },
    { status: 401 }
  );
}
```

### Step 3: Tambah rate limiting (opsional tapi sangat disarankan)

Install dependency:
```bash
npm install @upstash/ratelimit @upstash/redis
```

Tambahkan di awal handler `POST`:
```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"), // maksimal 5 percobaan per menit
});

export async function POST(req: Request) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await ratelimit.limit(`login:${ip}`);

  if (!success) {
    return Response.json(
      { error: "Terlalu banyak percobaan. Coba lagi nanti." },
      { status: 429 }
    );
  }

  // ... sisa logic login
}
```

> ⚠️ **Catatan**: Rate limiting butuh Upstash Redis. Buat akun gratis di https://upstash.com dan tambahkan `UPSTASH_REDIS_REST_URL` dan `UPSTASH_REDIS_REST_TOKEN` ke environment variables.

## Contoh Implementasi

File `app/api/login/route.ts` setelah diperbaiki (tanpa rate limiting):

```ts
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json({ error: "Missing credentials" }, { status: 400 });
    }

    const user = await prisma.admin.findUnique({
      where: { username },
    });

    const valid = user
      ? await bcrypt.compare(password, user.password)
      : await bcrypt.compare(password, "$2a$12$dummyhashuntuktimingattack");

    if (!user || !valid) {
      return Response.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return Response.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

## Acceptance Criteria

- [ ] Tidak ada `console.log` yang mencetak password, DATABASE_URL, atau data user di `app/api/login/route.ts`
- [ ] Response error login selalu sama: `"Username atau password salah"` — tidak bisa dibedakan antara user tidak ditemukan vs password salah
- [ ] Login masih berfungsi normal dengan credential yang benar
- [ ] Format response tidak berubah: `{ token, user: { id, username } }`
- [ ] (Opsional) Rate limiting aktif — login gagal lebih dari 5x per menit dari IP yang sama akan return status 429
