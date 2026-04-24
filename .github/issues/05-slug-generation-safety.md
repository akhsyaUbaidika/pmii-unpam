## Latar Belakang

Slug saat ini digenerate dengan cara yang tidak aman:

```ts
const slug = body.title.toLowerCase().trim().replace(/\s+/g, "-");
```

Contoh masalah:
- `"Artikel? #1 & 2!"` → `"artikel?-#1-&-2!"` (karakter ilegal di URL)
- `"<script>xss</script>"` → `"<script>xss</script>"` (XSS di URL)

Selain itu, ada **race condition**: antara `findUnique` (cek slug) dan `create` (insert), dua request bersamaan bisa lolos pengecekan.

## Tujuan

1. Gunakan library `slugify` untuk generate slug yang URL-safe
2. Tangkap error unique constraint dari Prisma (P2002) untuk handle race condition

## Batasan (PENTING)

- ❌ **DILARANG mengubah slug yang sudah ada di database**
- ❌ Tidak boleh menjalankan migration yang mengubah data existing
- ✅ Perubahan hanya berlaku untuk data **BARU** yang dibuat setelah fix
- ✅ API response format tidak berubah

## Scope Pekerjaan

### Step 1: Install `slugify`
```bash
npm install slugify
```

### Step 2: Update `app/api/articles/route.ts` (POST handler)

```ts
import slugify from "slugify";
import { Prisma } from "@prisma/client";

// Di dalam POST handler, ganti slug generation:
const slug = slugify(body.title, { lower: true, strict: true, locale: "id" });

if (!slug) {
  return NextResponse.json({ error: "Judul tidak valid" }, { status: 400 });
}

// Hapus findUnique check, langsung create dan tangkap error:
try {
  const article = await prisma.article.create({
    data: { title: body.title, slug, excerpt: body.excerpt ?? "", content: body.content, image: body.image ?? "", category: body.category ?? "Opini", authorName: body.author ?? "Admin", publishedAt: new Date() },
  });
  return NextResponse.json(article);
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    return NextResponse.json({ error: "Judul sudah digunakan, coba judul lain" }, { status: 409 });
  }
  throw error;
}
```

### Step 3: Update `app/api/documentations/route.ts` (POST handler) — sama persis

### Step 4: Verifikasi slug lama tidak terpengaruh
- Buka beberapa artikel/dokumentasi yang sudah ada via URL lama
- Pastikan semuanya masih bisa diakses

## Acceptance Criteria

- [ ] Library `slugify` terinstall
- [ ] Slug baru digenerate menggunakan `slugify` dengan `strict: true`
- [ ] Judul dengan karakter special menghasilkan slug yang URL-safe
- [ ] Race condition ditangani — error P2002 return status 409
- [ ] `findUnique` sebelum `create` dihapus (tidak perlu lagi)
- [ ] Slug lama di database **TIDAK BERUBAH**
- [ ] Artikel/dokumentasi lama masih bisa diakses via URL existing
