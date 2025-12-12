"use client";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Features = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <>
      <section 
        ref={ref}
        id="features" 
        className={`py-16 md:py-20 lg:py-28 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container">
          <SectionTitle
            title="Main Features"
            paragraph="Future Designz offers premium bathroom tiles and fixtures with superior quality, competitive pricing, and expert design guidance to transform your space beautifully."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature, index) => (
              <div
                key={feature.id}
                className={`scroll-reveal-delay-${index * 100} ${
                  isVisible ? 'visible' : ''
                }`}
              >
                <SingleFeature feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
