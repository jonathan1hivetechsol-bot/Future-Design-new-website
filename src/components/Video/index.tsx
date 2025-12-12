"use client";

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Video() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`relative z-10 py-16 md:py-20 lg:py-28 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container">
        <SectionTitle
          title="We're Here To Help"
          paragraph="Need assistance with product selection, measurements, or installation guidance? Our friendly support team is ready to help — reach out for expert advice and personalized recommendations."
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="mx-auto max-w-[600px]">
              <Image
                src="/images/illustrations/support.svg"
                alt="Customer support"
                width={700}
                height={560}
                className="rounded-md object-cover"
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[520px] lg:pl-12">
              <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Live Support & Expert Advice
              </h3>
              <p className="mb-6 text-base font-medium leading-relaxed text-body-color">
                Contact our specialists for help choosing the perfect tile, matching fixtures, and planning your project. We provide consultation, sample recommendations, and installation tips.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-3 text-white shadow-md hover:bg-red-700"
                >
                  Contact Us
                </a>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center justify-center rounded-md border border-gray-200 px-6 py-3 text-body-color hover:bg-gray-50"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
