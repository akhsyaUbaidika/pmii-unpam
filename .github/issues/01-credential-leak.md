## Latar Belakang

File `.env` yang berisi credential production **sudah pernah di-commit ke Git**. Meskipun `.gitignore` sudah mengabaikan `.env`, Git menyimpan history — artinya siapapun yang punya akses repo bisa menjalankan `git log` dan mengekstrak semua secret berikut:

- `DATABASE_URL` — password database PostgreSQL plaintext
- `JWT_SECRET=supersecretpmii` — secret yang sangat lemah, bisa di-brute-force dalam hitungan detik
- `SUPABASE_SERVICE_ROLE_KEY` — **god-mode key** yang bypass seluruh Row Level Security Supabase. Siapapun yang punya key ini bisa baca/tulis/hapus seluruh database dan storage.

Selain itu, file `hash.js` di root project mengandung default password `admin123` yang kemungkinan besar masih digunakan di production.

**Ini adalah ancaman keamanan level tertinggi.** Attacker bisa:
- Mengakses dan menghapus seluruh database
- Upload file berbahaya ke storage
- Memalsukan token admin (karena JWT_SECRET terlalu lemah)

## Tujuan

1. Rotate (ganti) semua credential production
2. Bersihkan `.env` dari Git history
3. Ganti password admin production
4. Hapus file `hash.js` dari repo
5. Gunakan JWT_SECRET yang kuat (minimal 256-bit random)

## Batasan (PENTING)

- ❌ Tidak boleh mengubah data lama di database
- ❌ Tidak boleh mengubah slug existing
- ✅ Harus backward compatible — hanya credential yang berubah, bukan struktur
- ⚠️ **Setelah rotate credential, environment variable di hosting (Vercel/Railway/dll) HARUS di-update juga, kalau tidak website akan down**

## Scope Pekerjaan

### Step 1: Generate JWT Secret baru
Jalankan command ini di terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Simpan hasilnya — ini akan jadi `JWT_SECRET` baru.

### Step 2: Rotate credential di Supabase Dashboard
1. Buka https://supabase.com/dashboard → pilih project `mpwjmwrybukmjvbpqufm`
2. **Database password**: Settings → Database → Reset database password
3. **Service Role Key**: Settings → API → Regenerate service role key
4. Catat semua credential baru

### Step 3: Update environment variable di hosting
1. Buka dashboard hosting (Vercel/Railway/dll)
2. Update semua env vars:
   - `DATABASE_URL` → gunakan password baru dari Step 2
   - `JWT_SECRET` → gunakan hasil dari Step 1
   - `SUPABASE_SERVICE_ROLE_KEY` → gunakan key baru dari Step 2
3. Redeploy aplikasi

### Step 4: Ganti password admin di database
```bash
# Generate hash password baru (ganti "PasswordBaruYangKuat123!" dengan password pilihan kamu)
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('PasswordBaruYangKuat123!', 12).then(h => console.log(h))"
```
Lalu update di database:
```sql
UPDATE "Admin" SET password = 'HASH_HASIL_DIATAS' WHERE username = 'admin';
```

### Step 5: Hapus `hash.js` dari repo
```bash
git rm hash.js
```

### Step 6: Bersihkan `.env` dari Git history
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

### Step 7: Pastikan `.env` ada di `.gitignore`
Buka `.gitignore` dan pastikan baris ini ada:
```
.env
.env.*
hash.js
```

## Acceptance Criteria

- [ ] Semua credential lama sudah di-rotate (database password, JWT secret, Supabase service role key)
- [ ] JWT_SECRET baru minimal 64 karakter random (hex)
- [ ] Password admin bukan lagi `admin123`
- [ ] File `hash.js` sudah dihapus dari repo
- [ ] File `.env` sudah dibersihkan dari Git history
- [ ] Website masih berjalan normal setelah credential baru di-apply
- [ ] Tidak ada data yang hilang atau berubah di database
