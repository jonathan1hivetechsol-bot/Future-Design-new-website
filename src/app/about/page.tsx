import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import AboutUsSection from "@/components/About/AboutUsSection";
import HeroShowcase from "@/components/About/HeroShowcase";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page",
  description: "Learn about Future Designz — our mission, partners, and design expertise.",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Future Designz"
        description="Discover our passion for transforming spaces with premium bathroom tiles and fixtures. We partner with leading international brands to deliver quality and innovation."
      />
      <HeroShowcase />
      <AboutUsSection />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
