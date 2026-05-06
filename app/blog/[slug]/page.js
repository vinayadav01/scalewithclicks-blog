"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/lib/getPosts";
import { notFound } from "next/navigation";

export default function BlogPost({ params }) {
  const posts = getPosts();
  const post = posts.find((p) => p.slug === params.slug);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = window.scrollY;
      setProgress((scroll / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) return notFound();

  const related = posts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0,3);

  return (
    <div className="bg-[#020617] text-white">

      {/* 🔥 Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-indigo-500 z-50"
        style={{ width: `${progress}%` }}
      />

      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-12">

        {/* MAIN CONTENT */}
        <article className="lg:col-span-3">

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            {post.title}
          </h1>

          <p className="text-gray-400 mt-4">{post.description}</p>

          {/* Image */}
          <img
            src={post.image}
            className="w-full rounded-xl mt-8"
          />

          {/* CONTENT */}
          <div
            className="prose prose-invert max-w-none mt-10
              prose-headings:scroll-mt-24
              prose-h2:text-2xl
              prose-h3:text-xl
              prose-p:text-gray-300
              prose-a:text-indigo-400
              prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* SIDEBAR */}
        <aside className="hidden lg:block">

          <div className="sticky top-24">

            {/* TOC */}
            <div className="bg-[#0b1220] border border-white/10 rounded-xl p-5 mb-6">
              <h3 className="text-sm text-gray-400 uppercase mb-3">On this page</h3>

              <div
                className="text-sm space-y-2 text-gray-400"
                dangerouslySetInnerHTML={{ __html: post.toc || "" }}
              />
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 text-center">
              <p className="text-sm">Need help with Google Ads?</p>
              <a
                href="https://wa.me/919589188668"
                className="block mt-3 bg-white text-black px-4 py-2 rounded-md text-sm font-medium"
              >
                Book Free Call
              </a>
            </div>

          </div>
        </aside>

      </div>

      {/* RELATED POSTS */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-semibold mb-6">Related Articles</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {related.map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="bg-[#0b1220] border border-white/10 rounded-xl p-4 hover:border-white/20 transition">
              <h3 className="text-white font-medium">{post.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{post.description}</p>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
