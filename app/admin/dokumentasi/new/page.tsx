"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function CreateDocumentationPage() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || ""
      : "";

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  function handleAddImage(url: string) {
    setImages((prev) => [...prev, url]);
  }

  function handleRemoveImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      if (!title || !content) {
        alert("Judul dan konten wajib diisi");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/documentations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          coverImage,
          images,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Gagal membuat dokumentasi");
        setLoading(false);
        return;
      }

      alert("Dokumentasi berhasil dibuat!");

      // reset
      setTitle("");
      setExcerpt("");
      setContent("");
      setCoverImage("");
      setImages([]);

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Buat Dokumentasi</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">

        {/* TITLE */}
        <input
          className="border p-2 w-full rounded"
          placeholder="Judul Dokumentasi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* EXCERPT */}
        <textarea
          className="border p-2 w-full rounded"
          placeholder="Ringkasan"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        {/* CONTENT */}
        <textarea
          className="border p-2 w-full rounded h-40"
          placeholder="Isi dokumentasi..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* COVER IMAGE */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Cover Image</p>
          <ImageUploader
            token={token}
            onUploaded={(url) => setCoverImage(url)}
          />

          {coverImage && (
            <img src={coverImage} className="mt-2 w-40 rounded" />
          )}
        </div>

        {/* MULTI IMAGES */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Gallery Images</p>

          <ImageUploader
            token={token}
            onUploaded={(url) => handleAddImage(url)}
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} className="w-24 h-24 object-cover rounded" />

                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Menyimpan..." : "Simpan Dokumentasi"}
        </button>

      </div>
    </div>
  );
}