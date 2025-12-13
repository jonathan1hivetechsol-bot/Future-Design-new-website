"use client";
import React from "react";

const ScrollToCalculatorButton = ({ children }: { children?: React.ReactNode }) => {
  const handleClick = () => {
    const el = document.getElementById("site-calculator");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button onClick={handleClick} className="rounded-md bg-red-600 px-6 py-2 text-white shadow hover:bg-red-700">
      {children || "Calculate"}
    </button>
  );
};

export default ScrollToCalculatorButton;
