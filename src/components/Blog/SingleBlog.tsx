import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, author, tags, publishDate } = blog;
  const excerpt = paragraph && paragraph.length > 220 ? paragraph.slice(0, 220).trimEnd() + "..." : paragraph;
  return (
    <>
      <div className="group shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 duration-300 h-full flex flex-col">
        <Link
          href={`/blog-details?id=${blog.id}`}
          className="relative block aspect-37/22 w-full"
        >
          <span className="bg-red-600 absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-semibold text-white capitalize shadow-sm">
            {tags[0]}
          </span>
          <Image src={image} alt="image" fill sizes="(max-width: 768px) 100vw, 33vw" />
        </Link>
        <div className="p-4 sm:p-6 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8 flex flex-col flex-1">
          <h3>
            <Link
              href={`/blog-details?id=${blog.id}`}
              className="hover:text-primary dark:hover:text-primary mb-4 block text-lg sm:text-xl font-bold text-black md:text-2xl dark:text-white"
            >
              {title}
            </Link>
          </h3>
          <div className="border-body-color/10 text-body-color mb-6 border-b pb-6 text-base font-medium dark:border-white/10 relative">
            <p className="max-h-[88px] overflow-hidden leading-6">
              {excerpt}
            </p>
            <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-8 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
          </div>
          <div className="flex items-center mt-auto">
            <div className="border-body-color/10 mr-5 flex items-center border-r pr-5 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5 dark:border-white/10">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={author.image} alt="author" fill sizes="40px" />
                </div>
              </div>
              <div className="w-full">
                <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                  {author.name}
                </h4>
                <p className="text-body-color text-xs">{author.designation}</p>
              </div>
            </div>
            <div className="inline-block text-right">
              <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">{publishDate}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
