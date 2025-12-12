import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import AboutUsSection from "@/components/About/AboutUsSection";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Instagram from "@/components/Instagram";
import Projects from "@/components/Projects";
// Render sections directly to disable folding/scroll animations
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import WelcomePopup from "@/components/Common/WelcomePopup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Future Designz - Premium Tiles & Bathroom Fixtures | Lahore",
  description: "Discover luxurious bathroom and floor tiles paired with premium fixtures imported from Spain, Italy, Germany, Turkey, and China. Since 2011, Future Designz has delivered exceptional quality and expert design guidance.",
  // other metadata
};

export default function Home() {
  return (
    <>
      <WelcomePopup />
      <ScrollUp />
      <Hero />
      <AboutUsSection />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Projects />
      <Testimonials />
      <Blog />
      <Contact />
      <Instagram />
    </>
  );
}
