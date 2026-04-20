"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function CreateArtikelPage() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || ""
      : "";

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // ✅ NEW
  const [category, setCategory] = useState("Opini");
  const [author, setAuthor] = useState("Admin");

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      if (!title || !content) {
        alert("Judul dan konten wajib diisi");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          image: imageUrl,
          category,
          author,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Gagal membuat artikel");
        setLoading(false);
        return;
      }

      alert("Artikel berhasil dibuat!");

      setTitle("");
      setExcerpt("");
      setContent("");
      setImageUrl("");

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Buat Artikel</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">

        <input
          className="border p-2 w-full rounded"
          placeholder="Judul Artikel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded"
          placeholder="Ringkasan (excerpt)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        {/* ✅ CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option>Opini</option>
          <option>Berita</option>
          <option>Karya Tulis Ilmiah</option>
          <option>Sastra</option>
          <option>Refleksi</option>
          <option>Kajian</option>
          <option>Tokoh & Inspirasi</option>
        </select>

        {/* ✅ AUTHOR */}
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option>Admin</option>
          <option>Mas Asa</option>
          <option>Tim Redaksi</option>
          <option>Guest Writer</option>
        </select>

        <textarea
          className="border p-2 w-full rounded h-40"
          placeholder="Isi artikel..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div>
          <p className="text-sm text-gray-500 mb-2">Upload Gambar</p>

          <ImageUploader
            token={token}
            onUploaded={(url) => setImageUrl(url)}
          />

          {imageUrl && (
            <img
              src={imageUrl}
              className="mt-3 w-40 rounded"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Menyimpan..." : "Simpan Artikel"}
        </button>

      </div>
    </div>
  );
}