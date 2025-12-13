import React from "react";
import Calculator from "@/components/Calculator";

export const metadata = {
  title: "Tile Calculator | Future Designz",
  description: "Premium Tile Calculator Pro - estimate tiles, wastage and cost",
};

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 pt-28 pb-12">
      <div className="max-w-5xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <div style={{ minHeight: '60vh' }} className="p-6">
          <Calculator />
        </div>
        <div className="p-4 bg-white dark:bg-gray-900 text-center">
          <a href="/calculator/index.html" target="_blank" rel="noreferrer" className="text-primary underline">Open calculator in new tab (standalone)</a>
        </div>
      </div>
    </div>
  );
}
