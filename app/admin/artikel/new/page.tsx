"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function CreateArtikelPage() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || ""
      : "";

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit() {
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          title,
          image: imageUrl,
          excerpt: "dummy",
          content: "dummy",
          category: "Opini",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Gagal membuat artikel");
        return;
      }

      alert("Artikel berhasil dibuat!");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
  }

  return (
    <div className="p-10 max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Buat Artikel</h1>

      <input
        className="border p-2 w-full"
        placeholder="Judul"
        onChange={(e) => setTitle(e.target.value)}
      />

      <ImageUploader
        token={token}
        onUploaded={(url) => setImageUrl(url)}
      />

      {imageUrl && (
        <img src={imageUrl} className="w-64 rounded" />
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Simpan Artikel
      </button>
    </div>
  );
}