"use client";
import Image from "next/image";
import React from "react";

const SupportCard = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="rounded-2xl bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-transparent dark:border-gray-700">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <div className="rounded-xl overflow-hidden shadow-inner bg-gray-50 dark:bg-gray-800 ring-1 ring-transparent dark:ring-white/5 border border-transparent dark:border-gray-700">
              <Image src="/images/illustrations/support 1.webp" alt="Support" width={560} height={420} className="w-full h-auto object-cover" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">24/7 Support & Quick Response</h3>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Schnelle Hilfe bei Rohrverstopfungen und Notfällen</h2>
            <p className="mt-4 text-body-color dark:text-body-color-dark max-w-2xl">
              Our experienced team provides round-the-clock emergency services. From high-pressure jetting to camera inspections,
              we diagnose and resolve plumbing and drainage issues with care and speed.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <a href="/contact" className="inline-flex items-center rounded-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-medium shadow-sm">Contact Support</a>
              <div className="text-sm text-body-color dark:text-body-color-dark">Or call us: <strong className="text-red-600 dark:text-red-400">049 1579 2367188</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportCard;
