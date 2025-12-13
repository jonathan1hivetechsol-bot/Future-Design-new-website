import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Transform Your Home with Premium Imported Tiles",
    paragraph:
      "Tiles play a major role in shaping the personality of any space, and at Future Designz, we believe in offering only the best.",
    image: "/images/blog/post-01.jpg",
    author: {
      name: "Future Designz",
      image: "/images/logo/logo.svg",
      designation: "Tiles Showroom",
    },
    tags: ["design", "conversion"],
    publishDate: "12 Feb 2025",
  },
  {
    id: 2,
    title: "Branding Essentials for Early-Stage Startups",
    paragraph:
      "How to build a memorable brand on a budget: naming, visual identity, voice, and where to invest first.",
    image: "/images/blog/post-02.jpg",
    author: {
      name: "Future Designz",
      image: "/images/logo/logo.svg",
      designation: "Tiles Showroom",
    },
    tags: ["branding", "startup"],
    publishDate: "01 Mar 2025",
  },
  {
    id: 3,
    title: "Next.js Performance Tips: Faster Sites with Less Work",
    paragraph:
      "A practical checklist to speed up Next.js apps: image optimization, code-splitting, ISR, and smart caching strategies.",
    image: "/images/blog/post-03.jpg",
    author: {
      name: "Future Designz",
      image: "/images/logo/logo.svg",
      designation: "Tiles Showroom",
    },
    tags: ["development", "performance"],
    publishDate: "18 Apr 2025",
  },
];

export default blogData;
