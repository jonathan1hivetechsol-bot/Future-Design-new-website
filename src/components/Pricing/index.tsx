"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref}
      id="pricing" 
      className={`relative z-10 py-16 md:py-20 lg:py-28 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container">
        <SectionTitle
          title="Premium Tile Packages"
          paragraph="Choose the right package for your bathroom or interior project. Each package includes imported premium tiles, expert consultation, and installation guidance."
          center
          width="665px"
        />

        <div className="w-full">
          <div className="mb-8 flex justify-center md:mb-12 lg:mb-16">
            <span
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly
                  ? "pointer-events-none text-primary"
                  : "text-dark dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold`}
            >
              Monthly
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <div
                  className={`${
                    isMonthly ? "" : "translate-x-full"
                  } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${
                isMonthly
                  ? "text-dark dark:text-white"
                  : "pointer-events-none text-primary"
              } ml-4 cursor-pointer text-base font-semibold`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName="Basic Collection"
            price={isMonthly ? "2,000" : "20,000"}
            duration={isMonthly ? "PKR" : "PKR"}
            subtitle="Essential tiles for standard bathroom design projects."
          >
            <OfferList text="Standard Tile Collections" status="active" />
            <OfferList text="100+ Design Options" status="active" />
            <OfferList text="Basic Color Consultation" status="active" />
            <OfferList text="Local Delivery Available" status="active" />
            <OfferList text="Premium Collections" status="inactive" />
            <OfferList text="3D Design Planning" status="inactive" />
          </PricingBox>
          <PricingBox
            packageName="Premium Collection"
            price={isMonthly ? "5,000" : "50,000"}
            duration={isMonthly ? "PKR" : "PKR"}
            subtitle="Luxury imported tiles from top European brands."
          >
            <OfferList text="All Premium Brands" status="active" />
            <OfferList text="500+ Design Options" status="active" />
            <OfferList text="Expert Design Consultation" status="active" />
            <OfferList text="Priority Delivery" status="active" />
            <OfferList text="Exclusive Collections" status="active" />
            <OfferList text="3D Design Planning" status="inactive" />
          </PricingBox>
          <PricingBox
            packageName="Luxury Collection"
            price={isMonthly ? "10,000" : "100,000"}
            duration={isMonthly ? "PKR" : "PKR"}
            subtitle="Complete luxury bathroom and interior solutions."
          >
            <OfferList text="All Collections & Brands" status="active" />
            <OfferList text="Unlimited Design Options" status="active" />
            <OfferList text="Dedicated Design Expert" status="active" />
            <OfferList text="Expedited Delivery" status="active" />
            <OfferList text="Bespoke Custom Designs" status="active" />
            <OfferList text="3D Design & Visualization" status="active" />
          </PricingBox>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color-primary)" />
              <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color-primary)" />
              <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
