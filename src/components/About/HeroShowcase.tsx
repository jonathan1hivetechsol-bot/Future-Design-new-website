"use client";
import Image from "next/image";
import React from "react";

const HeroShowcase = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 p-6 relative pb-10">
              <Image
                src="/images/about/bathroom-image.webp"
                alt="Future Designz Tiles Showcase"
                width={720}
                height={560}
                className="w-full h-auto rounded-xl object-cover bg-white dark:bg-gray-800"
                priority
              />
              <div className="absolute bottom-4 left-6 flex items-center space-x-3">
                <div className="h-14 w-24 rounded-md overflow-hidden border border-white shadow-md">
                  <Image src="/images/projects/project-1.webp" alt="thumb" width={96} height={56} className="object-cover" />
                </div>
                <div className="h-14 w-24 rounded-md overflow-hidden border border-white shadow-md hidden sm:block">
                  <Image src="/images/projects/project-2.webp" alt="thumb2" width={96} height={56} className="object-cover" />
                </div>
              </div>
            </div>
            <div className="flex items-center mt-6 space-x-2">
              <div className="-space-x-2 flex items-center">
                <div className="h-8 w-8 rounded-full ring-2 ring-white overflow-hidden">
                  <Image src="/images/testimonials/author-01.png" alt="author1" width={32} height={32} className="object-cover" />
                </div>
                <div className="h-8 w-8 rounded-full ring-2 ring-white overflow-hidden">
                  <Image src="/images/testimonials/author-02.png" alt="author2" width={32} height={32} className="object-cover" />
                </div>
                <div className="h-8 w-8 rounded-full ring-2 ring-white overflow-hidden">
                  <Image src="/images/testimonials/author-03.png" alt="author3" width={32} height={32} className="object-cover" />
                </div>
              </div>
              <div className="text-sm text-body-color">100+ Projects Completed</div>
            </div>
          </div>

          <div>
            <span className="uppercase tracking-widest text-sm text-red-600 mb-2 font-semibold inline-block">Get About Us</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              We Are Strived Only For The Best In The World
            </h2>
            <p className="mt-4 text-body-color max-w-xl">
              We design and supply premium tiles and bathroom fixtures with a focus on durability, style and
              exceptional service. Let us help you create a space you'll love.
            </p>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-700 text-red-600 dark:text-white">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Easy Booking System</h4>
                  <p className="text-body-color">Request samples, schedule consultations and get quotes quickly.</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-700 text-red-600 dark:text-white">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Expert Design Advice</h4>
                  <p className="text-body-color">Our team helps you pick finishes and create a cohesive look for your space.</p>
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <a href="/contact" className="inline-block rounded-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-medium">Discover More →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroShowcase;
