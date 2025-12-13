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
    <form onSubmit={submit} className={`flex items-center gap-3 ${className}`}>
      <input
        aria-label="Search site"
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search articles..."
        className={`${showInput ? 'w-full rounded-md border px-3 py-2 text-sm placeholder:text-body-color focus:outline-none' : 'hidden md:block w-64 rounded-md border px-3 py-2 text-sm placeholder:text-body-color focus:outline-none'}`}
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={submit}
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white"
          aria-label="Search"
        >
          Search
        </button>
        {showInput && onClose && (
          <button type="button" onClick={onClose} aria-label="Close search" className="inline-flex items-center justify-center rounded-md p-2 text-body-color hover:bg-body-color/5">
            ✕
          </button>
        )}
      </div>
    </form>
  );
};

export default SiteSearch;
