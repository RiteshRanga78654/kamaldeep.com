import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { SiteScripts } from "@/components/Scripts/SiteScripts";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <SiteScripts />
    </>
  );
}