"use client";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const AboutSectionTwo = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section 
      ref={ref}
      className={`py-16 md:py-20 lg:py-28 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 aspect-25/24 max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about-image-2.webp.webp"
                alt="about image"
                fill
                className="drop-shadow-three dark:drop-shadow-none object-cover rounded-md"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Premium Quality Assured
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  All our tiles and fixtures are directly imported and undergo rigorous quality inspections. We offer exclusive collections from trusted European brands, and our specialists provide personalized guidance to help you choose products that balance beauty and performance.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Expert Consultation
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Our dedicated team provides personalized guidance to help you select the perfect tiles and fixtures for your space. With over a decade of experience, we understand your needs.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Wide Range of Brands
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We offer exclusive collections from Dune, Infinity, E-Tiles, Solove, Jorger, Pamesa, and many more premium brands from across Europe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
