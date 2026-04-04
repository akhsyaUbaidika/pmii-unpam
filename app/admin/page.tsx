"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then(setArticles);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>

      <a
        href="/admin/artikel/new"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Buat Artikel
      </a>

      <div className="mt-6 space-y-2">
        {articles.map((a: any) => (
          <div key={a.id} className="border p-3 rounded">
            <p className="font-bold">{a.title}</p>
            <p className="text-sm text-gray-500">{a.slug}</p>
          </div>
        ))}
      </div>
    </div>
  );
}