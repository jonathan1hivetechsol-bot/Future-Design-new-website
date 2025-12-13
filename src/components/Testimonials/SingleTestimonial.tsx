import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
const StarFilled = ({ className = "" }: { className?: string }) => (
  <svg width="18" height="16" viewBox="0 0 18 16" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const StarOutline = ({ className = "" }: { className?: string }) => (
  <svg width="18" height="16" viewBox="0 0 18 16" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" stroke="currentColor" strokeWidth="0.8" fill="none"/>
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;

  const totalStars = 5;
  const ratingIcons = Array.from({ length: totalStars }).map((_, i) => (
    <span key={i} className={`mr-1 ${i < star ? "text-yellow-400" : "text-gray-300"}`}>
      {i < star ? <StarFilled /> : <StarOutline />}
    </span>
  ));

  return (
    <div className="w-full max-w-[420px] mx-auto h-full">
      <div className="h-full flex flex-col justify-between rounded-md border bg-white p-6 shadow-sm dark:bg-dark dark:border-neutral-700">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={image} alt={name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-md font-semibold text-dark dark:text-white">{name}</h4>
                <p className="text-xs text-body-color dark:text-body-color-dark">{designation}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">{ratingIcons}</div>
              <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800">
                <svg width="14" height="14" viewBox="0 0 46 46" className="mr-1">
                  <path fill="#4285F4" d="M23 11.5c3.6 0 6.1 1.6 7.5 2.9l5.6-5.5C33.6 5 29.7 3 23 3 14.8 3 7.9 7.9 4.6 15.1l6.5 5.1C12.6 14 17.4 11.5 23 11.5z"/>
                  <path fill="#34A853" d="M42.3 23.5c0-1.6-.1-2.8-.4-4H23v7.6h11.6c-.5 2.6-2.1 4.8-4.5 6.2l6.9 5.3C40.8 34.7 42.3 29.6 42.3 23.5z"/>
                  <path fill="#FBBC05" d="M10.5 28.6c-.6-1.7-1-3.5-1-5.6s.4-3.9 1-5.6L4.6 15.1C2.1 19.9 1 24.6 1 29.5s1.1 9.6 3.6 14.4l5.9-6.3z"/>
                  <path fill="#EA4335" d="M23 43c6.7 0 12.6-2.1 16.8-5.7l-6.9-5.3C29.1 32.9 26 34 23 34c-6 0-10.8-2.5-13.9-6.5l-6.5 5.1C7.9 38.1 14.8 43 23 43z"/>
                </svg>
                Google
              </span>
            </div>
          </div>

          <p className="mt-4 text-body-color dark:text-white text-sm leading-relaxed">“{content}”</p>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-body-color">
          <span className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-red-600 border-red-500">
            Verified Google review
          </span>
          <span>Jan 12, 2024</span>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;
