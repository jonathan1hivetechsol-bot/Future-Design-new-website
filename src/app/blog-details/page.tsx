import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import Image from "next/image";
import blogData from "@/components/Blog/blogData";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Details | Future Designz",
  description: "Article details for Future Designz blog posts",
};

const BlogDetailsPage = ({ searchParams }: { searchParams?: { id?: string } }) => {
  const id = searchParams?.id ? Number(searchParams.id) : 1;
  const blog = blogData.find((b) => b.id === id) || blogData[0];

  return (
    <>
      <section className="pt-[150px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl leading-tight font-bold text-black sm:text-4xl sm:leading-tight dark:text-white">
                  {blog.title}
                </h2>

                <div className="border-body-color/10 mb-10 flex flex-wrap items-center justify-between border-b pb-4 dark:border-white/10">
                  <div className="flex flex-wrap items-center">
                    <div className="mr-10 mb-5 flex items-center">
                      <div className="mr-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image src={blog.author.image} alt={blog.author.name} fill sizes="40px" />
                        </div>
                      </div>
                      <div className="w-full">
                        <span className="text-body-color mb-1 text-base font-medium">
                          By <span>{blog.author.name}</span>
                        </span>
                      </div>
                    </div>

                    <div className="mb-5 flex items-center">
                      <p className="text-body-color mr-5 flex items-center text-base font-medium">
                        <span className="mr-3">{/* calendar icon */}
                          <svg width="15" height="15" viewBox="0 0 15 15" className="fill-current"><path d="M3.89531 8.67529H3.10666C2.96327 8.67529 2.86768 8.77089 2.86768 8.91428V9.67904C2.86768 9.82243 2.96327 9.91802 3.10666 9.91802H3.89531C4.03871 9.91802 4.1343 9.82243 4.1343 9.67904V8.91428C4.1343 8.77089 4.03871 8.67529 3.89531 8.67529Z"/></svg>
                        </span>
                        {blog.publishDate}
                      </p>

                      <p className="text-body-color mr-5 flex items-center text-base font-medium">
                        <span className="mr-3">{/* comments icon */}
                          <svg width="18" height="13" viewBox="0 0 18 13" className="fill-current"><path d="M15.6375 0H1.6875C0.759375 0 0 0.759375 0 1.6875V10.6875C0 11.3062 0.309375 11.8406 0.84375 12.15C1.09687 12.2906 1.40625 12.375 1.6875 12.375C1.96875 12.375 2.25 12.2906 2.53125 12.15L5.00625 10.7156C5.11875 10.6594 5.23125 10.6312 5.34375 10.6312H15.6094C16.5375 10.6312 17.2969 9.87187 17.2969 8.94375V1.6875C17.325 0.759375 16.5656 0 15.6375 0Z"/></svg>
                        </span>
                        {blog.tags.length}
                      </p>

                      <p className="text-body-color flex items-center text-base font-medium">
                        <span className="mr-3">{/* tags icon */}
                          <svg width="20" height="12" viewBox="0 0 20 12" className="fill-current"><path d="M10.2559 3.8125C9.03711 3.8125 8.06836 4.8125 8.06836 6C8.06836 7.1875 9.06836 8.1875 10.2559 8.1875C11.4434 8.1875 12.4434 7.1875 12.4434 6C12.4434 4.8125 11.4746 3.8125 10.2559 3.8125Z"/></svg>
                        </span>
                        {blog.tags.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <a href="#0" className="bg-primary inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white">
                      {blog.tags[0]}
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-body-color mb-10 text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    {blog.paragraph}
                  </p>

                  <div className="mb-10 w-full overflow-hidden rounded-sm">
                    <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                      <Image src={blog.image} alt="image" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 1200px" />
                    </div>
                  </div>

                  <p className="text-body-color mb-8 text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Quality craftsmanship combined with thoughtful design transforms ordinary bathrooms into luxurious retreats. Our expert team provides personalized guidance to help you select products that reflect your style and meet your practical needs.
                  </p>

                  <p className="text-body-color mb-10 text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Semper auctor neque vitae tempus quam pellentesque nec. Amet dictum sit amet justo donec enim diam. Varius sit amet mattis vulputate enim nulla aliquet porttitor. Odio pellentesque diam volutpat commodo sed.
                  </p>

                  <h3 className="font-xl mb-10 leading-tight font-bold text-black sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight dark:text-white">Helpful Resources</h3>

                  <p className="text-body-color mb-10 text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    For product recommendations, installation guides, and aftercare tips, visit our showroom or contact our specialists for a personalized consultation.
                  </p>

                  <ul className="text-body-color mb-10 list-inside list-disc">
                    <li className="text-body-color mb-2 text-base font-medium sm:text-lg lg:text-base xl:text-lg">Consectetur adipiscing elit in voluptate velit.</li>
                    <li className="text-body-color mb-2 text-base font-medium sm:text-lg lg:text-base xl:text-lg">Mattis vulputate cupidatat.</li>
                    <li className="text-body-color mb-2 text-base font-medium sm:text-lg lg:text-base xl:text-lg">Vulputate enim nulla aliquet porttitor odio pellentesque.</li>
                    <li className="text-body-color mb-2 text-base font-medium sm:text-lg lg:text-base xl:text-lg">Ligula ullamcorper malesuada proin.</li>
                  </ul>

                  <div className="bg-primary/10 relative z-10 mb-10 overflow-hidden rounded-md p-8 md:p-9 lg:p-8 xl:p-9">
                    <p className="text-body-color text-center text-base font-medium italic">"Future Designz transformed my bathroom with stunning Italian tiles and premium fixtures. The attention to detail and customer service was exceptional. Highly recommended for anyone looking to elevate their space!"</p>
                  </div>

                  <p className="text-body-color mb-10 text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">consectetur adipiscing elit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat mattis vulputate cupidatat.</p>

                  <div className="items-center justify-between sm:flex">
                    <div className="mb-5">
                      <h4 className="text-body-color mb-3 text-sm font-medium">Popular Tags :</h4>
                      <div className="flex items-center">
                        {blog.tags.map((t, i) => (
                          <TagButton key={i} text={t} />
                        ))}
                      </div>
                    </div>

                    <div className="mb-5">
                      <h5 className="text-body-color mb-3 text-sm font-medium sm:text-right">Share this post :</h5>
                      <div className="flex items-center sm:justify-end">
                        <SharePost />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsPage;
