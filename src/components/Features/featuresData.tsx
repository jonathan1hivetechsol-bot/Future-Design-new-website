import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        {/* Tile/Grid pattern */}
        <rect x="4" y="4" width="8" height="8" />
        <rect x="14" y="4" width="8" height="8" />
        <rect x="24" y="4" width="8" height="8" />
        <rect x="4" y="14" width="8" height="8" />
        <rect x="14" y="14" width="8" height="8" />
        <rect x="24" y="14" width="8" height="8" />
        <rect x="4" y="24" width="8" height="8" />
        <rect x="14" y="24" width="8" height="8" />
        <rect x="24" y="24" width="8" height="8" />
      </svg>
    ),
    title: "Premium Collections",
    paragraph:
      "Explore our curated selection of luxury bathroom tiles and fixtures — unique designs that elevate your space with elegance and lasting quality.",
  },
  {
    id: 2,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        {/* World/Globe representing imports */}
        <circle cx="20" cy="20" r="18" opacity="0.3"/>
        <path d="M20 2C10.6 2 3 9.6 3 19C3 28.4 10.6 36 20 36C29.4 36 37 28.4 37 19C37 9.6 29.4 2 20 2ZM20 34C11.7 34 5 27.3 5 19C5 10.7 11.7 4 20 4C28.3 4 35 10.7 35 19C35 27.3 28.3 34 20 34ZM23 19C23 21.2 21.2 23 19 23C16.8 23 15 21.2 15 19C15 16.8 16.8 15 19 15C21.2 15 23 16.8 23 19Z" />
      </svg>
    ),
    title: "European Imports",
    paragraph:
      "Direct imports from Spain, Italy, Germany, Turkey, and China. We partner with top manufacturers to bring you authentic, high-quality tiles and bathroom fixtures.",
  },
  {
    id: 3,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        {/* Person with light bulb - expert */}
        <circle cx="12" cy="8" r="3" />
        <path d="M12 12C9.2 12 7 14.2 7 17C7 18 7.4 19 8 19.8V24C8 24.6 8.4 25 9 25H15C15.6 25 16 24.6 16 24V19.8C16.6 19 17 18 17 17C17 14.2 14.8 12 12 12Z" />
        <path d="M28 6C27.4 6 27 6.4 27 7V13C27 13.6 27.4 14 28 14C28.6 14 29 13.6 29 13V7C29 6.4 28.6 6 28 6Z" opacity="0.3"/>
        <path d="M28 16C24.7 16 22 18.7 22 22C22 25.3 24.7 28 28 28C31.3 28 34 25.3 34 22C34 18.7 31.3 16 28 16ZM28 26C25.8 26 24 24.2 24 22C24 19.8 25.8 18 28 18C30.2 18 32 19.8 32 22C32 24.2 30.2 26 28 26Z" />
      </svg>
    ),
    title: "Expert Guidance",
    paragraph:
      "Our team of specialists helps you find the perfect tiles for your bathroom, kitchen, or any space. With 13+ years of experience, we guide you through every step of the selection process.",
  },
  {
    id: 4,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        {/* Delivery/Truck */}
        <path d="M32 8H10C8.9 8 8 8.9 8 10V20C8 21.1 8.9 22 10 22H30V28C30 30.2 31.8 32 34 32C36.2 32 38 30.2 38 28C38 25.8 36.2 24 34 24C33 24 32 24.4 31.2 25H10V10H32V8Z" opacity="0.5"/>
        <circle cx="10" cy="28" r="3" />
        <circle cx="34" cy="28" r="3" />
        <rect x="28" y="12" width="8" height="8" />
      </svg>
    ),
    title: "Fast Delivery",
    paragraph:
      "Quick and reliable delivery across Lahore and surrounding areas. We ensure your premium tiles and fixtures arrive safely and on time for your project.",
  },
  {
    id: 5,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        {/* Bathroom/Sink */}
        <path d="M36 6H4C2.9 6 2 6.9 2 8V32C2 33.1 2.9 34 4 34H36C37.1 34 38 33.1 38 32V8C38 6.9 37.1 6 36 6ZM36 32H4V8H36V32Z" />
        <path d="M8 12H32C33.1 12 34 12.9 34 14V28C34 29.1 33.1 30 32 30H8C6.9 30 6 29.1 6 28V14C6 12.9 6.9 12 8 12Z" opacity="0.3"/>
        <circle cx="20" cy="15" r="2" />
      </svg>
    ),
    title: "Bathroom Design",
    paragraph:
      "Complete bathroom solutions with matching tiles, fixtures, and accessories. Transform your bathroom into a luxurious retreat with our curated collections.",
  },
  {
    id: 6,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        {/* Heart/Support */}
        <path d="M20 38L3 21C1 19 0 17 0 14C0 9 4 6 8 6C10 6 12 7 13 8C14.5 6.5 17 5 20 5C23 5 25.5 6.5 27 8C28 7 30 6 32 6C36 6 40 9 40 14C40 17 39 19 37 21L20 38Z" opacity="0.5"/>
        <path d="M20 35L5 22C3.5 20.5 3 19 3 17C3 12.5 6.5 10 9.5 10C11 10 12.5 10.7 13.5 11.7C15.5 9.7 17.5 8 20 8C22.5 8 24.5 9.7 26.5 11.7C27.5 10.7 29 10 30.5 10C33.5 10 37 12.5 37 17C37 19 36.5 20.5 35 22L20 35Z" />
      </svg>
    ),
    title: "Lifetime Support",
    paragraph:
      "Ongoing support for your tile projects. From installation advice to maintenance tips, we're here to help you get the most from your purchase.",
  },
];
export default featuresData;
