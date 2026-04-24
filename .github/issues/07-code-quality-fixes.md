## Latar Belakang

Beberapa masalah kecil tapi berdampak di production:

1. **`typeof window !== "undefined"` di render body** (`app/admin/artikel/new/page.tsx`) — menyebabkan hydration mismatch di React 19
2. **`any` type di mana-mana** (`DocumentationCarousel.tsx`, `app/admin/page.tsx`) — TypeScript tidak berguna
3. **`swiper/css` di-import dua kali** (`DocumentationCarousel.tsx`)
4. **`BackButton` pakai `router.back()`** — broken jika user buka link langsung (dari Google/WhatsApp)

## Tujuan

Perbaiki code quality issue yang bisa menyebabkan bug di production.

## Batasan (PENTING)

- ❌ Tidak boleh mengubah data lama di database
- ❌ Tidak boleh mengubah slug existing
- ✅ Tampilan dan fungsionalitas tidak boleh berubah

## Scope Pekerjaan

### Fix 1: Hydration mismatch di `app/admin/artikel/new/page.tsx`

**SEBELUM:**
```ts
const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
```

**SESUDAH:**
```ts
const [token, setToken] = useState("");

useEffect(() => {
  setToken(localStorage.getItem("token") ?? "");
}, []);
```

### Fix 2: Tambah type ke `DocumentationCarousel.tsx`

```ts
type Doc = {
  id: number;
  coverImage: string;
  slug: string;
};

export default function DocumentationCarousel({ docs }: { docs: Doc[] }) {
  // ...
  {docs.map((doc) => ( // tidak perlu `doc: any` lagi
```

### Fix 3: Tambah type ke `app/admin/page.tsx`

```ts
type Article = {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
};

const [articles, setArticles] = useState<Article[]>([]);
```

### Fix 4: Hapus duplikat import di `DocumentationCarousel.tsx`

Hapus baris `import "swiper/css";` yang kedua (baris 6).

### Fix 5: Perbaiki `BackButton.tsx`

```ts
"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/dokumentasi");
        }
      }}
      className="mb-6 text-sm text-blue-600 hover:underline"
    >
      ← Kembali
    </button>
  );
}
```

## Acceptance Criteria

- [ ] Tidak ada `typeof window !== "undefined"` di dalam render function body
- [ ] Tidak ada `any` type di `DocumentationCarousel.tsx` dan `app/admin/page.tsx`
- [ ] Import `swiper/css` hanya sekali di `DocumentationCarousel.tsx`
- [ ] `BackButton` redirect ke `/dokumentasi` jika tidak ada history
- [ ] Semua halaman masih berfungsi normal
- [ ] Build TypeScript berhasil tanpa error (`npm run build`)
