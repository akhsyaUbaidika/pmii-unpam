"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Artikel</h1>

        <a
          href="/admin/artikel/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Buat Artikel
        </a>
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* EMPTY STATE */}
      {!loading && articles.length === 0 && (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-500">Belum ada artikel</p>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-3">
        {articles.map((a) => (
          <div
            key={a.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{a.title}</p>
              <p className="text-sm text-gray-500">{a.slug}</p>
            </div>

            <span className="text-xs text-gray-400">
              {new Date(a.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}