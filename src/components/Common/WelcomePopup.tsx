"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

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
    const speed = 55;
    const type = () => {
      if (i <= fullText.length) {
        setDisplayedText(fullText.slice(0, i));
        i++;
        setTimeout(type, speed);
      }
    };
    type();
    // Auto-dismiss after 3.5s
    const timer = setTimeout(() => setShow(false), 3500);
    return () => clearTimeout(timer);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none font-sans">
      <div
        className="backdrop-blur-xl bg-white/80 border-2 border-transparent rounded-2xl px-12 py-10 min-w-[400px] max-w-md flex flex-col items-center animate-welPop pointer-events-auto shadow-2xl"
        style={{
          borderImage: 'linear-gradient(135deg, #e11d48 10%, #fff 60%, #111 100%) 1',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        }}
      >
        <div className="mb-3 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-red-500 via-white to-black shadow-lg overflow-hidden">
          <Image
            src="/images/about/about%20us%20section%20image.jpg"
            alt="About Us"
            width={64}
            height={64}
            className="object-cover w-16 h-16 rounded-full"
            priority
          />
        </div>
        <div className="text-xl font-extrabold text-gray-900 mb-1 tracking-tight drop-shadow-sm" style={{fontFamily: 'Inter, Segoe UI, Arial, sans-serif'}}>Welcome</div>
        <div className="text-base font-semibold text-red-600 text-center min-h-[2.2em] tracking-wide drop-shadow-sm" style={{fontFamily: 'Inter, Segoe UI, Arial, sans-serif'}}>
          {displayedText}
        </div>
      </div>
      <style jsx>{`
        .animate-welPop {
          animation: welPop 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes welPop {
          0% { transform: scale(0.7) translateY(30px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default WelcomePopup;
