"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const WelcomePopup = () => {
  const [show, setShow] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Elevate Your Space with Premium Tiles";

  useEffect(() => {
    if (!sessionStorage.getItem("welcome_shown")) {
      setShow(true);
      sessionStorage.setItem("welcome_shown", "true");
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    let i = 0;
    const speed = 45;
    const type = () => {
      if (i <= fullText.length) {
        setDisplayedText(fullText.slice(0, i));
        i++;
        setTimeout(type, speed);
      }
    };
    type();
    // Auto-dismiss after 5s
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 font-sans bg-black/40 dark:bg-black/50">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-white/95 to-gray-50/80 dark:from-gray-900/95 dark:to-gray-800/80 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 backdrop-blur-sm p-6 md:p-8 animate-welPop"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => setShow(false)}
          aria-label="Close welcome"
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow"
        >
          ×
        </button>

        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
            <Image
              src="/images/about/about%20us%20section%20image.jpg"
              alt="About Us"
              width={80}
              height={80}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Welcome to Future Designz</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{displayedText}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/95 dark:hover:bg-primary/90">Explore Collections</Link>
              <a href="#contact" className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Contact Us</a>
            </div>
          </div>
        </div>
      
      <style jsx>{`
        .animate-welPop {
          animation: welPop 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes welPop {
          0% { transform: translateY(12px) scale(.98); opacity: 0 }
          100% { transform: translateY(0) scale(1); opacity: 1 }
        }
      `}</style>
      </div>
    </div>
  );
};

export default WelcomePopup;
