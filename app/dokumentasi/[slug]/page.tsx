import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: { slug: string };
};

async function getDoc(slug: string) {
  try {
    const res = await fetch(`/api/documentations/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export default async function DetailDokumentasi({ params }: Props) {
  const doc = await getDoc(params.slug);

  if (!doc) return notFound();

  return (
    <div className="p-10">
      <h1>{doc.title}</h1>
      <p>{doc.content}</p>
    </div>
  );
}