import { getGallery } from "@/lib/store";
import { GalleryExplorer } from "@/components/Gallery/GalleryExplorer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery — Kamaldeep Prajapati",
  description:
    "A curated visual archive of summits, keynotes, studio portraits and field engagements from Kamaldeep Prajapati's leadership practice.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const items = getGallery();
  const categories = ["All", ...new Set(items.map((g) => g.category).filter(Boolean))];

  return (
    <main
      style={{
        backgroundColor: "#fbf9f5",
        minHeight: "100vh",
        color: "#1c1917",
      }}
    >
      <GalleryExplorer items={items} categories={categories} />
    </main>
  );
}