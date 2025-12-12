import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Designing High-Converting Landing Pages in 2025",
    paragraph:
      "Practical tips to design landing pages that increase conversions — from messaging and hierarchy to microcopy and CTAs.",
    image: "/images/blog/post-01.jpg",
    author: {
      name: "Future Designz",
      image: "/images/logo/logo.svg",
      designation: "Design Agency",
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
      designation: "Design Agency",
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
      designation: "Design Agency",
    },
    tags: ["development", "performance"],
    publishDate: "18 Apr 2025",
  },
];

export default blogData;
