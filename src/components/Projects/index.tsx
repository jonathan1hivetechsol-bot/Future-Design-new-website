"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";

const Projects = () => {
  const [openImage, setOpenImage] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const projects = [
    {
      id: 1,
      image: "/images/projects/project-1.webp",
      title: "Modern Bathroom Design",
      description: "Premium European tiles with sleek fixtures",
    },
    {
      id: 2,
      image: "/images/projects/project-2.webp",
      title: "Luxury Tile Installation",
      description: "Professional bathroom renovation project",
    },
    {
      id: 3,
      image: "/images/projects/project-3.webp",
      title: "Contemporary Design",
      description: "Elegant fixtures and premium collections",
    },
    {
      id: 4,
      image: "/images/projects/project-4.webp",
      title: "Bathroom Renovation",
      description: "Complete interior design solution",
    },
    {
      id: 5,
      image: "/images/projects/project-5.webp",
      title: "Premium Installation",
      description: "Expert craftsmanship and quality assurance",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Our Projects"
          paragraph="Explore our collection of successful bathroom design and tile installation projects. Each project showcases our commitment to quality, design excellence, and customer satisfaction."
          center
          mb="50px"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="wow fadeInUp overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
              data-wow-delay={`${project.id * 0.1}s`}
            >
              <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                <button
                  onClick={() => setOpenImage(project.image)}
                  className="block h-full w-full p-0 m-0 text-left"
                  aria-label={`Open ${project.title} image`}
                >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                </button>
              </div>
              <div className="bg-white p-6 dark:bg-gray-dark">
                <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
                  {project.title}
                </h3>
                <p className="text-base font-medium text-body-color dark:text-body-color-dark">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Image Lightbox Modal */}
        {openImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4"
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
                className="mx-auto max-h-[90vh] w-auto rounded-md object-contain shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
