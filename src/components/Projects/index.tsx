"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "../Common/SectionTitle";

const Projects = ({ mode = "slider" }: { mode?: "slider" | "full" }) => {
  const [openImage, setOpenImage] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const projects = [
    { id: 1, image: "/images/projects/brwon%201.webp", title: "Brown Tile — Project 1", description: "Warm brown tiles installation." },
    { id: 2, image: "/images/projects/brwon%202.webp", title: "Brown Tile — Project 2", description: "Elegant brown tile and fixture pairing." },
    { id: 3, image: "/images/projects/brwon%203.webp", title: "Brown Tile — Project 3", description: "Premium brown tile design." },
    { id: 4, image: "/images/projects/brwon%204.webp", title: "Brown Tile — Project 4", description: "Luxury brown tile installation." },
    { id: 5, image: "/images/projects/white%201.webp", title: "White Tile — Project 1", description: "Clean white tile layout." },
    { id: 6, image: "/images/projects/white%202.webp", title: "White Tile — Project 2", description: "Modern white tile design." },
    { id: 7, image: "/images/projects/white%203.webp", title: "White Tile — Project 3", description: "Bright and airy white tiles." },
    { id: 8, image: "/images/projects/white%204.webp", title: "White Tile — Project 4", description: "Classic white tile installation." },
    { id: 9, image: "/images/projects/DHA%20Project%201.webp", title: "DHA Project 1", description: "DHA residential tile installation." },
    { id: 10, image: "/images/projects/DHA%20Project%202.webp", title: "DHA Project 2", description: "DHA bathroom renovation." },
    { id: 11, image: "/images/projects/DHA%20Project%203.webp", title: "DHA Project 3", description: "DHA premium fixture pairing." },
    { id: 12, image: "/images/projects/DHA%20Project%204.webp", title: "DHA Project 4", description: "DHA modern tile layout." },
    { id: 13, image: "/images/projects/DHA%20Project%205.webp", title: "DHA Project 5", description: "DHA luxury installation." },
    { id: 14, image: "/images/projects/DHA%20Project%206.webp", title: "DHA Project 6", description: "DHA complete renovation." },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 overflow-visible">
      <div className="container overflow-visible">
        <SectionTitle
          title="Our Projects"
          paragraph="Explore our collection of successful bathroom design and tile installation projects. Each project showcases our commitment to quality, design excellence, and customer satisfaction."
          center
          mb="50px"
        />

        {/* Render slider on homepage (mode="slider"). Render full grid on projects page (mode="full"). */}
        {mode === "slider" ? (
          <ProjectsSlider
            projects={projects}
            onOpenImage={(src: string) => setOpenImage(src)}
          />
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.id} className="h-full">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-lg shadow-lg border border-transparent hover:border-red-500 transition">
                    <div className="relative h-64 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <button onClick={() => setOpenImage(project.image)} className="block relative h-full w-full p-0 m-0 text-left" aria-label={`Open ${project.title} image`}>
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-1 bg-white dark:bg-gray-800">
                      {!/—\s*Project\s*\d+/i.test(project.title) && (
                        <h3 className="mb-1 text-lg font-semibold text-black dark:text-white">{project.title}</h3>
                      )}
                      <span className="text-xs text-primary font-medium mb-2">Project #{project.id}</span>
                      <p className="text-sm text-body-color dark:text-body-color-dark mb-4">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Image Lightbox Modal */}
        {openImage && (
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-90 px-4"
            onClick={(e) => {
              // close when clicking on overlay (but not when clicking the image)
              if (e.target === e.currentTarget) setOpenImage(null);
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative max-w-[90vw] max-h-[90vh] w-full">
              <button
                onClick={() => setOpenImage(null)}
                className="absolute top-2 right-2 z-50 inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-black hover:bg-white"
                aria-label="Close image"
              >
                ✕
              </button>
              <img
                src={openImage}
                alt="Project full"
                className="mx-auto max-h-[98vh] w-auto rounded-md object-contain shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

// Small client-side slider component
function ProjectsSlider({ projects, onOpenImage }: { projects: any[]; onOpenImage: (src: string) => void }) {
  const [width, setWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = width < 768;

  const scrollBy = (dir: number) => {
    const el = containerRef.current;
    if (!el) return;
    const move = Math.round(el.clientWidth * 0.8) * dir;
    el.scrollBy({ left: move, behavior: "smooth" });
  };

    if (isMobile) {
    const firstThree = projects.slice(0, 3);
    return (
      <div>
        <div className="grid grid-cols-3 gap-4">
          {firstThree.map((project) => (
            <div key={project.id} className="group relative overflow-visible rounded-lg shadow-lg transform transition duration-300 hover:-translate-y-4 hover:scale-105 hover:shadow-feature-2 hover:z-40 border-2 border-transparent hover:border-red-500 transition-all opacity-100 dark:opacity-100">
              <div className="relative h-28 w-full overflow-visible bg-gray-200 dark:bg-gray-700">
                <button onClick={() => onOpenImage(project.image)} className="block relative h-full w-full p-0 m-0 text-left z-0" aria-label={`Open ${project.title} image`}>
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-300 transform group-hover:-translate-y-4 group-hover:scale-105 z-50" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <a href="/projects" className="inline-block px-6 py-2 rounded bg-primary text-white">View More Projects</a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-visible">
        <div ref={containerRef} className="flex gap-6 overflow-x-auto overflow-y-visible no-scrollbar py-4 px-1">
          {projects.map((project) => (
            <div key={project.id} className="min-w-[280px] max-w-[320px] flex-shrink-0">
              <div className="group relative overflow-visible rounded-lg shadow-lg transform transition duration-300 hover:-translate-y-6 hover:scale-110 hover:shadow-feature-2 hover:z-50 border-2 border-transparent hover:border-red-500 transition-all opacity-100 dark:opacity-100">
                <div className="relative h-64 w-full overflow-visible bg-gray-200 dark:bg-gray-700">
                  <button onClick={() => onOpenImage(project.image)} className="block relative h-full w-full p-0 m-0 text-left z-0" aria-label={`Open ${project.title} image`}>
                    <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-300 transform group-hover:-translate-y-8 group-hover:scale-110 z-50" />
                  </button>
                </div>
                <div className="bg-white p-4 dark:bg-gray-800 opacity-100 dark:opacity-100">
                  <h3 className="mb-1 text-md font-semibold text-black dark:text-white">{project.title}</h3>
                  <p className="text-sm text-body-color dark:text-body-color-dark">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button aria-label="Previous" onClick={() => scrollBy(-1)} className="hidden md:inline-flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-0 md:-left-6 h-10 w-10 rounded-full bg-white shadow z-40">‹</button>
      <button aria-label="Next" onClick={() => scrollBy(1)} className="hidden md:inline-flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-0 md:-right-6 h-10 w-10 rounded-full bg-white shadow z-40">›</button>
    </div>
  );
}
