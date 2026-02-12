"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/upload";

type Props = {
  token: string;
  onUploaded: (url: string) => void;
};

export default function ImageUploader({ token, onUploaded }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const url = await uploadImage(file, token);
      onUploaded(url);
    } catch (err) {
      alert("Upload gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}
    </div>
  );
}
