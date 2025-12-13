"use client";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import blogData from "@/components/Blog/blogData";
import SingleBlog from "@/components/Blog/SingleBlog";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";

const pagesIndex = [
  { title: "About", path: "/about", excerpt: "Learn about Future Designz and our approach to bathroom and tile design." },
  { title: "Contact", path: "/contact", excerpt: "Get in touch with our team for quotes, samples, and support." },
  { title: "Projects", path: "/projects", excerpt: "View our completed projects and case studies for inspiration." },
  { title: "Calculator", path: "/calculator", excerpt: "Use our tile calculator to estimate material needs and costs." },
  { title: "Home", path: "/", excerpt: "Welcome to Future Designz — premium tiles and bathroom design." },
];

const SearchPage = () => {
  const params = useSearchParams();
  const q = (params?.get("q") || "").trim();

  const query = q.toLowerCase();

  const blogResults = useMemo(() => {
    if (!query) return [];
    return blogData.filter((b) => {
      return (
        b.title.toLowerCase().includes(query) ||
        b.paragraph.toLowerCase().includes(query) ||
        (b.tags || []).some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [query]);

  const pageResults = useMemo(() => {
    if (!query) return [];
    return pagesIndex.filter((p) => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query));
  }, [query]);

  return (
    <div>
      <Breadcrumb pageName={`Search results`} description={q ? `Results for "${q}"` : "Search the site"} />
      <section className="pt-[40px] pb-[80px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <main className="w-full px-4 lg:w-8/12">
              {!q && (
                <div className="rounded-lg bg-white p-8 shadow-sm">Type a search term to find pages or articles.</div>
              )}

              {q && (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold">Pages</h3>
                    {pageResults.length === 0 && <p className="text-sm text-body-color">No matching pages.</p>}
                    <div className="mt-3 grid gap-4">
                      {pageResults.map((p) => (
                        <Link key={p.path} href={p.path} className="block rounded-lg border p-4 hover:shadow-md">
                          <h4 className="font-semibold">{p.title}</h4>
                          <p className="text-sm text-body-color">{p.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Articles</h3>
                    {blogResults.length === 0 && <p className="text-sm text-body-color">No matching articles.</p>}
                    <div className="mt-4 -mx-4 flex flex-wrap">
                      {blogResults.map((b) => (
                        <div key={b.id} className="w-full px-4 md:w-1/2 xl:w-1/3 mb-6">
                          <SingleBlog blog={b} />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </main>

            <aside className="w-full px-4 lg:w-4/12">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h4 className="mb-4 font-semibold">Search Summary</h4>
                <p className="text-sm text-body-color">Showing {pageResults.length} page result(s) and {blogResults.length} article result(s)</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
