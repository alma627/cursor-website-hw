import { HomeShell } from "@/components/HomeShell";
import { listGalleryImages } from "@/lib/gallery";

export default function Home() {
  const gallery = listGalleryImages();
  return <HomeShell gallery={gallery} />;
}