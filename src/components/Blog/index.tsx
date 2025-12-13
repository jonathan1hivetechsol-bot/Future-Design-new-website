"use client";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Blog = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section
      ref={ref}
      id="blog"
      className={`bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {blogData.map((blog) => (
            <div key={blog.id} className="w-full h-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
