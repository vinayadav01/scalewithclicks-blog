"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/lib/getPosts";
import { notFound } from "next/navigation";
import TableOfContents from "@/components/TableOfContents";
import FloatingShare from "@/components/FloatingShare";
import Reveal from "@/components/Reveal";

export default function BlogPost({ params }) {
  const posts = getPosts();
  const post = posts.find((p) => p.slug === params.slug);

  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scroll = window.scrollY;
      const percent = (scroll / totalHeight) * 100;

      setProgress(percent);

      // 🔥 IMAGE ZOOM EFFECT
      const newScale = 1 + percent / 500; // subtle zoom
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) return notFound();

  const related = posts
    .filter(
      (p) => p.category === post.category && p.slug !== post.slug
    )
    .slice(0, 3);

  return (
    <div className="bg-white text-gray-900">
    <FloatingShare />

      {/* 🔥 PREMIUM PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-[4px] bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ===== HERO IMAGE ===== */}
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          className="w-full h-[420px] object-cover transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}

<p className="text-sm opacity-80 mt-2">
  {post.category} • {post.readingTime}
</p>

        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-10 text-white">
          <p className="text-sm opacity-80">
            {post.category}
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mt-2">
            {post.title}
          </h1>

          <p className="mt-3 text-gray-200 max-w-2xl">
            {post.description}
          </p>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-12">

        {/* ARTICLE */}
        <article className="lg:col-span-3">

          <div
            className="
              prose max-w-none
              prose-lg
              prose-headings:font-semibold
              prose-h2:mt-10
              prose-h3:mt-6
              prose-p:text-gray-700
              prose-a:text-indigo-600
              prose-img:rounded-xl
              prose-img:shadow-md
              prose-blockquote:border-l-indigo-500
              prose-strong:text-gray-900
              prose-headings:border-b
prose-headings:pb-2
prose-blockquote:bg-gray-50
prose-blockquote:p-4
prose-blockquote:rounded-lg
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

        </article>

        {/* SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">

            <TableOfContents toc={post.toc} />

            {/* CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 text-white text-center">
              <p className="text-sm">Need help with Ads?</p>

              <a
                href="https://wa.me/919589188668"
                className="block mt-3 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:scale-105 transition"
              >
                Book Free Call
              </a>
            </div>

          </div>
        </aside>

      </div>

      {/* ===== RELATED POSTS ===== */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold mb-6">
          Related Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {related.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="border rounded-xl p-5 hover:shadow-lg transition"
            >
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-gray-600 text-sm mt-2">
                {post.description}
              </p>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
