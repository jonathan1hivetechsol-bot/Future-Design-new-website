import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Choosing the Right Tiles: A Buyer's Guide for Lasting Style",
    paragraph:
      "Choosing the right tiles is essential for both form and function. Premium ceramic and porcelain tiles elevate aesthetics while offering durability and easy maintenance. At Future Designz we curate collections that balance lasting performance with refined design.",
    image: "/images/blog/blog 1.jpg",
    author: {
      name: "Future Designz",
      image: "/images/logo/logo.svg",
      designation: "Tiles Showroom",
    },
    tags: ["design", "conversion"],
    publishDate: "12 Jan 2024",
  },
  {
    id: 2,
    title: "Selecting Bathroom Fixtures: Balance Style & Performance",
    paragraph:
      "From faucets to shower systems, choosing the right bathroom fixtures blends aesthetics with performance. Consider water efficiency, finish durability, and coordination with tile and cabinetry to achieve a cohesive, long-lasting design.",
    image: "/images/blog/blog 2.webp",
    author: {
      name: "Future Designz",
      image: "/images/logo/logo.svg",
      designation: "Tiles & Fixtures",
    },
    tags: ["fixtures", "design"],
    publishDate: "01 Mar 2024",
  },
  {
    id: 3,
    title: "Tile Maintenance: Keep Your Surfaces Looking Like New",
    paragraph:
      "Proper care extends the life of your tiles. We cover cleaning methods, grout sealing, stain prevention, and routine checks to maintain beauty and performance in kitchens, bathrooms, and floors.",
    image: "/images/blog/blog 3.jpg",
    author: {
      name: "Future Designz",
      image: "/images/logo/logo.svg",
      designation: "Aftercare & Service",
    },
    tags: ["maintenance", "tiles"],
    publishDate: "18 Apr 2024",
  },
];

export default blogData;
