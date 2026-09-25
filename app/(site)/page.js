import { Hero } from "@/components/Hero/Hero";
import { AboutSection } from "@/components/About/AboutSection";
import FocusAreasSection  from "@/components/Focus/FocusAreasSection";
import { ExperienceSection } from "@/components/Experience/ExperienceSection";
import { SelectedWork } from "@/components/Projects/SelectedWork";
import { BlogSection } from "@/components/Blog/BlogSection";
import { ContactSection } from "@/components/Contact/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FocusAreasSection />
      <ExperienceSection />
      <SelectedWork />
      <BlogSection />
      <ContactSection />
    </>
  );
}