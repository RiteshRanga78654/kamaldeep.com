import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageFonts from "@/components/PageFonts";
import NotFoundHero from "@/components/notFoundHero";

export default function NotFound() {
  return (
    <div className="bg-cream font-work-sans text-muted">
      <PageFonts />
      <Header />
      <NotFoundHero />
      <Footer />
    </div>
  );
}