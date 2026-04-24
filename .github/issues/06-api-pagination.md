## Latar Belakang

API `GET /api/articles` dan `GET /api/documentations` mengembalikan **seluruh data** tanpa limit atau pagination. `GET /api/documentations` juga eager-load semua relasi `images`.

Saat data bertambah:
- 10.000 artikel = response JSON yang sangat besar
- 100 dokumentasi × 20 gambar = 2000 records dalam satu response
- Timeout di serverless, OOM di Node, DB overload

## Tujuan

Tambahkan pagination pada API list dan optimalkan query agar hanya mengambil data yang dibutuhkan.

## Batasan (PENTING)

- ❌ Tidak boleh mengubah data lama di database
- ✅ **Backward compatible** — request tanpa parameter `page`/`limit` harus tetap bekerja (default pagination)
- ✅ Response structure boleh berubah TAPI field lama tetap ada

## Scope Pekerjaan

### Step 1: Update `GET /api/articles`

```ts
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "10"));
    const skip = (page - 1) * limit;

    const [articles, total] = await prisma.$transaction([
      prisma.article.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: { id: true, title: true, slug: true, excerpt: true, image: true, category: true, authorName: true, publishedAt: true, createdAt: true },
      }),
      prisma.article.count(),
    ]);

    return NextResponse.json({ data: articles, total, page, limit });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
```

> ⚠️ **WARNING**: Response format berubah dari array `[...]` ke object `{ data: [...], total, page, limit }`. Update semua consumer (admin dashboard, halaman list) untuk membaca `response.data` alih-alih langsung array.

### Step 2: Update `GET /api/documentations`

Sama — tambah pagination dan **hapus `include: { images: true }`** dari list endpoint. Images hanya diload di detail endpoint `GET /api/documentations/[slug]`.

### Step 3: Update consumer yang membaca API ini

- `app/admin/page.tsx` — ubah `setArticles(data)` menjadi `setArticles(data.data)`
- Halaman lain yang fetch dari API ini

## Acceptance Criteria

- [ ] `GET /api/articles` support parameter `page` dan `limit`
- [ ] `GET /api/articles` tanpa parameter tetap bekerja (default page=1, limit=10)
- [ ] `GET /api/documentations` support pagination
- [ ] `GET /api/documentations` list endpoint tidak lagi include `images`
- [ ] Response format: `{ data: [...], total, page, limit }`
- [ ] Admin dashboard dan halaman list sudah diupdate untuk format baru
- [ ] Tidak ada data yang berubah di database
