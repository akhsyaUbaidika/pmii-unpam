## Latar Belakang

Server Component (`app/page.tsx`, `app/dokumentasi/page.tsx`, `app/dokumentasi/[slug]/page.tsx`) mengambil data dengan cara memanggil API sendiri via HTTP (`fetch("https://${host}/api/...")`). Ini menyebabkan deadlock di serverless, double latency, dan double cost.

## Tujuan

Ubah semua Server Component agar langsung query database via Prisma, tanpa HTTP request ke API sendiri.

## Batasan (PENTING)

- ❌ Tidak boleh mengubah data lama di database
- ❌ Tidak boleh mengubah slug existing
- ✅ API endpoint tetap ada (dipakai admin panel)
- ✅ Tampilan halaman tidak boleh berubah

## Scope Pekerjaan

### Step 1: Ubah `app/page.tsx`

Ganti `getArticles()` dan `getDocs()` — hapus `fetch()`, pakai `prisma` langsung:

```ts
import prisma from "@/lib/prisma";
// Hapus: import { headers } from "next/headers";
// Hapus: export const dynamic = "force-dynamic";
// Hapus: import Swiper (tidak dipakai di file ini)

export const revalidate = 60;

async function getArticles() {
  try {
    return await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, title: true, category: true, excerpt: true, image: true, slug: true },
    });
  } catch { return []; }
}

async function getDocs() {
  try {
    return await prisma.documentation.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, coverImage: true, slug: true },
    });
  } catch { return []; }
}
```

### Step 2: Ubah `app/dokumentasi/page.tsx` — sama, ganti fetch dengan prisma langsung

### Step 3: Ubah `app/dokumentasi/[slug]/page.tsx` — ganti `getDoc()` dan `generateMetadata()` agar pakai `prisma.documentation.findUnique()` langsung. Hapus hardcode `"https://pmiiunpam.com"` di metadata, cukup pakai relative path.

### Step 4: Cek `app/artikel/[slug]/page.tsx` — jika ada pola yang sama, ubah juga.

## Acceptance Criteria

- [ ] Tidak ada lagi `fetch()` ke API sendiri di Server Component
- [ ] `export const dynamic = "force-dynamic"` diganti `export const revalidate = 60`
- [ ] Import `headers` dari `next/headers` dihapus
- [ ] Import Swiper yang tidak dipakai di `app/page.tsx` dihapus
- [ ] Semua halaman menampilkan data sama seperti sebelumnya
- [ ] API endpoint tidak dihapus
