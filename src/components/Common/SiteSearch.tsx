"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SiteSearch = ({ className = "", showInput, autoFocus, onClose }: { className?: string; showInput?: boolean; autoFocus?: boolean; onClose?: ()=>void }) => {
  const [q, setQ] = useState("");
  const router = useRouter();

  const submit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return router.push("/");
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={submit} className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto ${className}`}>
      <input
        aria-label="Search site"
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search articles..."
        className={`flex-1 sm:flex-none rounded-md border px-3 py-2 text-sm placeholder:text-body-color focus:outline-none focus:ring-2 focus:ring-red-600/50 ${showInput ? 'w-full' : 'hidden md:block md:w-64'}`}
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={submit}
          className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
          aria-label="Search"
        >
          Search
        </button>
        {showInput && onClose && (
          <button type="button" onClick={onClose} aria-label="Close search" className="inline-flex items-center justify-center rounded-md p-2 text-body-color hover:bg-body-color/5 transition">
            ✕
          </button>
        )}
      </div>
    </form>
  );
};

export default SiteSearch;
