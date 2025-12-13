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
      {/* Hero: calculator intro */}
      <section className="mb-8 rounded-lg bg-gradient-to-r from-red-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-full lg:w-7/12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Tile Calculator — Plan & Estimate with Confidence</h1>
              <p className="mt-4 text-body-color max-w-2xl">Quickly estimate the quantity of tiles you need, factor in wastage, and calculate expected costs. Perfect for homeowners and contractors planning tiling projects.</p>
              <div className="mt-6 flex items-center gap-3">
                <ScrollToCalculatorButton>Start Calculating</ScrollToCalculatorButton>
                <a href="/contact" className="text-sm text-body-color hover:underline">Need help? Contact us</a>
              </div>
            </div>
            <div className="w-full lg:w-5/12">
              <div className="rounded-md overflow-hidden shadow-sm">
                <Image src="/calculator/tile cost calcu.webp" alt="Tile calculator illustration" width={900} height={520} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tile Cost summary section */}
      <section className="mt-6 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-6">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Tile Cost Calculator</h2>
              <p className="text-body-color mb-4">Estimate your tile cost quickly — input area, tile size, price per box and wastage percentage to get a reliable material and cost estimate for your project.</p>
              <ul className="list-inside list-disc text-body-color mb-4">
                <li>Calculate required tile quantity</li>
                <li>Include recommended wastage percentage</li>
                <li>Estimate total cost using price per box/unit</li>
              </ul>
              <ScrollToCalculatorButton>Calculate</ScrollToCalculatorButton>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-sm">
                <Image src="/calculator/tile cost calcu.webp" alt="Tile cost calculator" width={900} height={520} className="w-full h-auto object-cover" />
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
