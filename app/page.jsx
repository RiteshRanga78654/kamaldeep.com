import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroBanner from "@/components/IntroBanner";
import AboutTeaser from "@/components/AboutTeaser";
import JourneySplit from "@/components/JourneySplit";
import ServicesGrid from "@/components/ServicesGrid";
import Testimonials from "@/components/Testimonials";
import CoursesGrid from "@/components/CoursesGrid";
import JourneyFeatures from "@/components/JourneyFeatures";
import Freebies from "@/components/Freebies";
import BlogGrid from "@/components/BlogGrid";
import CTASection from "@/components/CTASection";
import ImageStrip from "@/components/ImageStrip";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-cream">
      <Header />
      <Hero />
      <IntroBanner />
      <AboutTeaser />
      <JourneySplit />
      <ServicesGrid />
      <Testimonials />
      <CoursesGrid />
      <JourneyFeatures />
      <Freebies />
      <BlogGrid />
      <CTASection />
      <ImageStrip />
      <Footer />
    </main>
  );
}
