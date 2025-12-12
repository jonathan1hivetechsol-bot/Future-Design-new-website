"use client";

import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import { useState, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Brands = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollReveal();

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <section 
      ref={ref}
      className={`py-16 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            {/* Section Heading */}
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                Our <span className="text-red-500">Brands</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                We partner with leading tile and bathroom fixture manufacturers worldwide to bring you premium quality products and designs.
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative rounded-lg bg-gradient-to-r from-gray-light to-white px-4 py-12 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:from-gray-dark dark:to-gray-700 sm:px-6 md:px-8 lg:px-[50px]">
              {/* Left Arrow */}
              <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all duration-300 hover:bg-red-50 hover:shadow-lg dark:bg-gray-800 dark:hover:bg-red-950 md:left-4 lg:left-6"
                aria-label="Scroll left"
              >
                <svg
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto scroll-smooth px-12 py-4 scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
              >
                {brandsData.map((brand, index) => (
                  <SingleBrand key={brand.id} brand={brand} index={index} />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all duration-300 hover:bg-red-50 hover:shadow-lg dark:bg-gray-800 dark:hover:bg-red-950 md:right-4 lg:right-6"
                aria-label="Scroll right"
              >
                <svg
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand, index }: { brand: Brand; index: number }) => {
  const { href, image, imageLight, name } = brand;

  return (
    <div 
      className="group relative flex min-w-max items-center justify-center"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative flex h-24 w-40 flex-shrink-0 items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 transition-all duration-300 hover:border-red-500 hover:shadow-lg hover:shadow-red-200 dark:border-gray-600 dark:bg-gray-800 dark:hover:shadow-red-900/30 md:h-28 md:w-48 lg:h-32 lg:w-56"
      >
        {/* Background glow effect on hover */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-red-950 dark:to-transparent" />
        
        {/* Brand logo container */}
        <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden">
          <Image 
            src={imageLight} 
            alt={name} 
            width={150}
            height={80}
            className="hidden h-auto w-3/4 object-contain transition-all duration-300 group-hover:scale-110 dark:block" 
            priority
          />
          <Image 
            src={image} 
            alt={name} 
            width={150}
            height={80}
            className="h-auto w-3/4 object-contain transition-all duration-300 group-hover:scale-110 block dark:hidden" 
            priority
          />
        </div>

        {/* Tooltip on hover */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white dark:text-gray-900">
          {name}
        </div>
      </a>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
