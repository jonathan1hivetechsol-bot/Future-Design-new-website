"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SingleBlog from "@/components/Blog/SingleBlog";
import blogData from "@/components/Blog/blogData";
import Breadcrumb from "@/components/Common/Breadcrumb";

// Note: metadata must not be exported from a client component.

const PAGE_SIZE = 6;

const Blog = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState("");

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    blogData.forEach((b) => {
      b.tags.forEach((t) => map.set(t, (map.get(t) || 0) + 1));
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const tags = useMemo(() => {
    const set = new Set<string>();
    blogData.forEach((b) => b.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const featured = blogData.slice(0, 1);

  const searchParams = useSearchParams();
  useEffect(() => {
    const val = (searchParams && searchParams.get("search")) || "";
    setQuery(val);
    setPage(1);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let items = blogData.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter((b) => b.title.toLowerCase().includes(q) || b.paragraph.toLowerCase().includes(q));
    }
    if (selectedCategory) {
      items = items.filter((b) => b.tags.includes(selectedCategory));
    }
    if (selectedTag) {
      items = items.filter((b) => b.tags.includes(selectedTag));
    }
    return items;
  }, [query, selectedCategory, selectedTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    // Mock success — in real app post to API or service
    setNewsletterSuccess("Thanks! We'll send updates to " + newsletterEmail);
    setNewsletterEmail("");
  };

  return (
    <>
      <Breadcrumb
        pageName="Blog & Insights"
        description="Explore our latest articles on bathroom design trends, tile selection tips, and interior inspiration to help you create your perfect space."
      />

      <section className="pt-[60px] pb-[80px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              {/* Featured carousel */}
              <div className="mb-8">
                <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md">
                  <div className="flex gap-6 items-center">
                    {featured.map((f) => (
                      <div key={f.id} className="flex-1 md:flex md:items-center gap-6">
                        <div className="md:w-1/3">
                          <img src={f.image} alt={f.title} className="w-full h-48 object-cover rounded-md" />
                        </div>
                        <div className="md:flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{f.title}</h3>
                          <p className="mt-3 text-body-color">{f.paragraph}</p>
                          <div className="mt-4">
                            <a href="#" className="text-red-600 hover:underline">Read more →</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search and list */}
              <div className="mb-6 flex items-center gap-4">
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  placeholder="Search articles..."
                  className="w-full rounded-md border px-4 py-3 shadow-sm focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div className="-mx-4 flex flex-wrap">
                {pageItems.map((blog) => (
                  <div key={blog.id} className="w-full px-4 md:w-1/2 lg:w-1/2 xl:w-1/3 mb-6">
                    <SingleBlog blog={blog} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6">
                <div className="flex items-center justify-center gap-2">
                  <button disabled={page===1} onClick={() => setPage(p=>Math.max(1,p-1))} className="px-3 py-2 rounded-md bg-body-color/10 hover:bg-primary">Prev</button>
                  {Array.from({length: totalPages}).map((_, i) => (
                    <button key={i} onClick={() => setPage(i+1)} className={`px-3 py-2 rounded-md ${page===(i+1)?'bg-red-600 text-white':'bg-body-color/15'}`}>{i+1}</button>
                  ))}
                  <button disabled={page===totalPages} onClick={() => setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-2 rounded-md bg-body-color/10 hover:bg-primary">Next</button>
                </div>
              </div>
            </div>

            <aside className="w-full px-4 lg:w-4/12">
              <div className="mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
                <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Categories</h4>
                <ul className="space-y-2">
                  {categories.map(([cat, count]) => (
                    <li key={cat}>
                      <button onClick={() => { setSelectedCategory(cat===selectedCategory?null:cat); setPage(1); }} className={`text-body-color ${cat===selectedCategory? 'font-bold text-red-600':''}`}>{cat} <span className="text-sm text-body-color">({count})</span></button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
                <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <button key={t} onClick={() => { setSelectedTag(t===selectedTag?null:t); setPage(1); }} className={`px-3 py-1 rounded-full text-sm ${t===selectedTag? 'bg-red-600 text-white':'bg-body-color/10'}`}>#{t}</button>
                  ))}
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
                <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Newsletter</h4>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input placeholder="Your email" value={newsletterEmail} onChange={(e)=>setNewsletterEmail(e.target.value)} className="px-4 py-2 rounded-md border" />
                  <button className="rounded-md bg-red-600 text-white px-4 py-2">Subscribe</button>
                  {newsletterSuccess && <p className="text-sm text-green-600">{newsletterSuccess}</p>}
                </form>
              </div>

              <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
                <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Featured</h4>
                {featured.map((f) => (
                  <div key={f.id} className="flex gap-3 items-center">
                    <img src={f.image} alt={f.title} className="w-16 h-12 object-cover rounded" />
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 dark:text-white">{f.title}</h5>
                      <p className="text-xs text-body-color">{f.publishDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
