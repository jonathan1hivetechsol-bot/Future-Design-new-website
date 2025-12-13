import React from "react";
import Image from "next/image";
import Calculator from "@/components/Calculator";
import ScrollToCalculatorButton from "@/components/Common/ScrollToCalculatorButton";

export const metadata = {
  title: "Tile Calculator | Future Designz",
  description: "Premium Tile Calculator Pro - estimate tiles, wastage and cost",
};

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      {/* Welcome section */}
      <section className="mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Premium Tile Calculator
          </h1>
          <p className="text-lg text-body-color dark:text-body-color-dark mb-2">
            Plan your tile project with precision and confidence
          </p>
          <p className="text-base text-body-color dark:text-body-color-dark">
            Get accurate estimates for material quantity, wastage, and total project cost in seconds.
          </p>
        </div>
      </section>

      {/* Tile Cost summary section */}
      <section className="mt-6 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-6">
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Tile Cost Calculator</h2>
              <p className="text-body-color mb-4">Estimate your tile cost quickly — input area, tile size, price per box and wastage percentage to get a reliable material and cost estimate for your project.</p>
              <ul className="list-inside list-disc text-body-color mb-4">
                <li>Calculate required tile quantity</li>
                <li>Include recommended wastage percentage</li>
                <li>Estimate total cost using price per box/unit</li>
              </ul>
              <ScrollToCalculatorButton>Calculate</ScrollToCalculatorButton>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="rounded-lg overflow-hidden shadow-sm">
                <Image src="/calculator/tile cost calcu.webp" alt="Tile cost calculator" width={500} height={300} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator component */}
      <div className="max-w-5xl mx-auto shadow-lg rounded-lg overflow-hidden" id="site-calculator">
        <div style={{ minHeight: "60vh" }} className="p-6">
          <Calculator />
        </div>
      </div>
    </div>
  );
}
