export async function uploadImage(file: File, token: string) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload gagal");
  }

  const data = await res.json();
  return data.url as string;
}
