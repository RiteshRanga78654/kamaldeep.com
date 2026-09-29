import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageFonts from "@/components/PageFonts";

/**
 * Themed 404. Rendered whenever a blog or project slug does not resolve, so it
 * uses the same Cormorant + Work Sans setup and cream palette as those routes.
 */
export default function NotFound() {
  return (
    <div className="bg-cream font-work-sans text-muted">
      <PageFonts />
      <Header />

      <main className="container-x flex min-h-[70vh] flex-col items-center justify-center py-32 text-center sm:py-40">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-olive-dark">
          Error 404
        </p>
        <h1 className="mt-4 font-cormorant text-[32px] leading-[1.12] text-ink sm:text-[40px] lg:text-[48px]">
          This page has moved on
        </h1>
        <p className="mt-5 max-w-[46ch] text-[15.5px] leading-[1.75]">
          The link you followed is broken, or the article has been renamed. The
          blog and project archives are both a click away.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/blogs" className="btn">
            Browse the Blog
          </Link>
          <Link href="/projects" className="btn-outline">
            View Projects
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
