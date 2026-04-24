## Latar Belakang

1. **Tidak ada Error Boundary** — jika DB down atau query gagal, user melihat stack trace atau blank page
2. **Tidak ada caching layer** — setiap request langsung hit database. Pada 100 concurrent users, itu 100 DB connections untuk data yang sama
3. **CSS conflict** — `globals.css` mendefinisikan `body` style dua kali dan memiliki dark mode vars yang tidak dipakai (website selalu light mode)

## Tujuan

Tambah error boundary, optimalkan caching, dan bersihkan CSS.

## Batasan (PENTING)

- ❌ Tidak boleh mengubah data lama di database
- ✅ Tampilan tidak boleh berubah saat normal operation
- ✅ Error state harus menampilkan pesan user-friendly, bukan stack trace

## Scope Pekerjaan

### Step 1: Buat Error Boundary pages

Buat file `app/error.tsx`:
```tsx
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold text-red-600">Terjadi Kesalahan</h1>
        <p className="mt-4 text-gray-600">Maaf, halaman tidak bisa dimuat saat ini.</p>
        <button onClick={reset} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
          Coba Lagi
        </button>
      </div>
    </main>
  );
}
```

Buat juga `app/not-found.tsx` untuk 404 page yang user-friendly.

### Step 2: Bersihkan `app/globals.css`

Hapus duplikat `body` style dan dark mode vars yang tidak dipakai. Cukup:
```css
@import "tailwindcss";

html { color-scheme: light; }
body { background-color: #f9fafb; color: #111827; font-family: Arial, Helvetica, sans-serif; }

#nprogress .bar { background: #2563eb; height: 3px; }
#nprogress .peg { box-shadow: 0 0 10px #2563eb, 0 0 5px #2563eb; }
```

### Step 3: (Opsional) Gunakan Next.js ISR caching

Setelah Issue #4 selesai (self-fetch dihapus), pastikan `export const revalidate = 60` sudah diset di semua page yang menampilkan list data. Ini membuat Next.js cache halaman selama 60 detik dan tidak hit DB setiap request.

## Acceptance Criteria

- [ ] File `app/error.tsx` ada dan menampilkan error page yang user-friendly
- [ ] File `app/not-found.tsx` ada dengan 404 page yang sesuai branding
- [ ] `globals.css` tidak ada duplikat style
- [ ] Dark mode CSS yang tidak dipakai sudah dihapus
- [ ] Website masih tampil sama saat normal operation
