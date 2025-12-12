"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion"; // <-- Added Variants

// The 'fadeUp' variant definition with type assertion
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0, 0, 0.2, 1], 
    }
  },
} as Variants; // <-- The type assertion fix

const AboutUsSection = () => {
  return (
    <motion.section
      className="py-16 md:py-24 lg:py-32 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp} // The line that was failing
    >
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-start"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          <span className="uppercase tracking-widest text-sm text-red-600 mb-2 font-semibold">About Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Helping businesses <span className="text-red-600">succeed</span> through the power of <span className="text-black">design</span>.
          </h2>
          <p className="text-gray-700 mb-8 max-w-xl">
            Future Designz is dedicated to transforming spaces with innovative, premium tiles and fixtures. Our passion for design and quality drives us to deliver exceptional solutions for homes and businesses, helping you create environments that inspire.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded transition mb-4 md:mb-0 shadow-lg">
            Discover More
          </button>
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 flex justify-center relative"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <div className="relative z-10 flex justify-center items-center">
            <Image
              src="/images/about/about us section image.jpg"
              alt="Future Designz Logo"
              width={320}
              height={320}
              className="rounded-xl shadow-2xl bg-white p-6 object-contain"
              priority
            />
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -z-0">
            <svg width="320" height="240" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="160" cy="120" rx="160" ry="120" fill="#f87171" fillOpacity="0.12" />
            </svg>
          </div>
          <div className="absolute right-0 bottom-0 z-0">
            <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="30" r="30" fill="#111" fillOpacity="0.08" />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUsSection;