"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "../Common/SectionTitle";

interface InstagramPost {
  id: string;
  image: string;
  title: string;
  likes: number;
  comments: number;
}

// Add a small helper to handle broken images and swap to a fallback
const ImageWithFallback = ({ src, fallback = "/images/instagram/bathroom-4.webp", ...props }: any) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  useEffect(() => setCurrentSrc(src), [src]);
  return (
    <Image
      {...props}
      src={currentSrc}
      onError={() => {
        if (currentSrc !== fallback) setCurrentSrc(fallback);
      }}
    />
  );
};

const InstagramGallery = () => {
  const fallbackPosts: InstagramPost[] = [
    { id: "1", image: "/images/instagram/instagram%201.webp", title: "Project Image 1", likes: 1250, comments: 89 },
    { id: "2", image: "/images/instagram/instagram%202.webp", title: "Project Image 2", likes: 987, comments: 76 },
    { id: "3", image: "/images/instagram/instagram%203.webp", title: "Project Image 3", likes: 1120, comments: 94 },
    { id: "4", image: "/images/instagram/instagram%204.webp", title: "Project Image 4", likes: 856, comments: 64 },
    { id: "5", image: "/images/instagram/instagram%205.webp", title: "Project Image 5", likes: 743, comments: 58 },
    { id: "6", image: "/images/instagram/instagram%206.webp", title: "Project Image 6", likes: 654, comments: 42 },
    { id: "7", image: "/images/instagram/instagram%207.webp", title: "Project Image 7", likes: 512, comments: 28 },
    { id: "8", image: "/images/instagram/instagram%208.webp", title: "Project Image 8", likes: 431, comments: 19 },
  ];

  const [posts, setPosts] = useState<InstagramPost[]>(fallbackPosts);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<number | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(3);


  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 640) setSlidesPerView(1);
      else if (w < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // autoplay: scroll by one card every 4s
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const step = () => {
      if (!container) return;
      const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).getBoundingClientRect().width + 16 : container.clientWidth;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPos = Math.min(container.scrollLeft + cardWidth, maxScroll);
      if (newPos >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    };

    autoplayRef.current = window.setInterval(step, 4000);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [posts, slidesPerView]);

  

  const scrollBy = (direction: "prev" | "next") => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).getBoundingClientRect().width + 16 : container.clientWidth;
    if (direction === "prev") container.scrollBy({ left: -cardWidth, behavior: "smooth" });
    else container.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <SectionTitle
          title="Follow Us on Instagram"
          paragraph="See our latest projects — swipe or use the arrows to browse." 
          center
          width="560px"
        />

        

        <div className="relative mt-8">
          {/* Arrows */}
          <button
            aria-label="Previous"
            onClick={() => scrollBy("prev")}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 ml-2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:scale-105"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            aria-label="Next"
            onClick={() => scrollBy("next")}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 mr-2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:scale-105"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Scroll container */}
          <div
            ref={containerRef}
            className="no-scrollbar mt-2 flex gap-4 overflow-x-auto scroll-smooth px-4 py-4 touch-pan-y snap-x snap-mandatory"
            onMouseEnter={() => { if (autoplayRef.current) window.clearInterval(autoplayRef.current); }}
            onMouseLeave={() => {
              if (autoplayRef.current) window.clearInterval(autoplayRef.current);
              autoplayRef.current = window.setInterval(() => {
                const container = containerRef.current;
                if (!container) return;
                const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).getBoundingClientRect().width + 16 : container.clientWidth;
                const maxScroll = container.scrollWidth - container.clientWidth;
                const newPos = Math.min(container.scrollLeft + cardWidth, maxScroll);
                if (newPos >= maxScroll) container.scrollTo({ left: 0, behavior: "smooth" });
                else container.scrollBy({ left: cardWidth, behavior: "smooth" });
              }, 4000);
            }}
          >
            {posts.map((post) => (
              <a
                key={post.id}
                href="https://www.instagram.com/fd.futuredesignz"
                target="_blank"
                rel="noreferrer"
                className="snap-start flex-shrink-0 w-[80%] sm:w-[48%] md:w-[32%] rounded-xl bg-gray-50 shadow-lg overflow-hidden group"
              >
                <div className="relative h-64 md:h-72 w-full bg-gray-200">
                  {/*
                    Replace direct Image with ImageWithFallback so a local fallback is used
                    when the provided src fails to load.
                  */}
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    fallback="/images/instagram/bathroom-4.webp"
                  />
                </div>
                <div className="p-4">
                  <h4 className="mb-1 text-sm font-bold text-gray-800 dark:text-white">{post.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4 fill-current text-red-600" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4 stroke-current" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://www.instagram.com/fd.futuredesignz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:scale-105"
            >
              Follow @fd.futuredesignz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
