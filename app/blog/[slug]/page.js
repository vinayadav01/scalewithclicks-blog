import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FloatingShare from "@/components/FloatingShare";

// ✅ SOCIAL ICONS
import {
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

// ✅ Generate Static Params
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: file.replace(/\.(md|mdx)$/, ""),
  }));
}

// ✅ MAIN BLOG PAGE
export default async function BlogPost({ params }) {

  const { slug } = await params;

  if (!slug) return notFound();

  const mdPath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  const mdxPath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  let filePath = "";

  if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else {
    return notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  // ✅ FIX DATE (IMPORTANT)
  const formattedDate = data.date
    ? typeof data.date === "string"
      ? data.date
      : new Date(data.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
    : null;

  // ✅ Extract headings for TOC
  const headings =
    content.match(/^##\s+(.*)$/gm)?.map((heading) => {
      const text = heading.replace(/^##\s+/, "");

      return {
        text,
        id: text
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, "-"),
      };
    }) || [];

  // ✅ Convert Markdown to HTML
const processedContent = await remark()
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeStringify)
  .process(content);

  const contentHtml = processedContent.toString();

  // ✅ BLOG URL
  const blogUrl = `https://blog.scalewithclicks.com/${slug}`;

  return (
    <div className="bg-white">

      {/* ========================= */}
      {/* STICKY TOP PROGRESS BAR */}
      {/* ========================= */}
      <div className="sticky top-[76px] z-40 bg-white border-b border-gray-100">

        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="flex items-center gap-4 py-3">

            {/* FEATURED IMAGE */}
            {data.image && (
              <img
                src={data.image}
                alt={data.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}

            {/* TITLE + PROGRESS */}
            <div className="flex-1 overflow-hidden">

              <p className="text-sm font-semibold text-gray-800 truncate">
                {data.title}
              </p>

              {/* PROGRESS BAR */}
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">

                <div
                  id="reading-progress"
                  className="h-full bg-orange-500 w-0 transition-all duration-150"
                />

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* MAIN LAYOUT */}
      {/* ========================= */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_320px] gap-10">

          {/* ========================= */}
          {/* TABLE OF CONTENTS */}
          {/* ========================= */}
          <aside className="hidden lg:block sticky top-[150px] h-[calc(100vh-180px)]">

  <div className="border-l-2 border-orange-500 pl-5 h-full overflow-y-auto pr-2">

    <h3 className="font-bold text-lg mb-5 text-gray-900">
      Table of Contents
    </h3>

    <ul className="space-y-4">

      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className="text-gray-600 hover:text-orange-500 transition text-sm leading-6 block"
          >
            {heading.text}
          </a>
        </li>
      ))}

    </ul>
  </div>
</aside>

          {/* ========================= */}
          {/* BLOG CONTENT */}
          {/* ========================= */}
          <article className="max-w-4xl">

            {/* CATEGORY */}
            {data.category && (
              <p className="text-orange-500 font-semibold uppercase tracking-wide mb-4">
                {data.category}
              </p>
            )}

            {/* TITLE */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-8">
              {data.title}
            </h1>

            {/* AUTHOR + SOCIAL */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-200 pb-8 mb-10">

              {/* AUTHOR */}
              <div className="flex items-center gap-4">

                <img
                  src="/images/author.jpg"
                  alt="Author"
                  className="w-14 h-14 rounded-full object-cover border border-gray-200"
                />

                <div>

                  {data.author && (
                    <p className="font-semibold text-gray-900 text-lg">
                      {data.author}
                    </p>
                  )}

                  {/* ✅ FIXED DATE */}
                  {formattedDate && (
                    <p className="text-sm text-gray-500 mt-1">
                      {formattedDate}
                    </p>
                  )}

                </div>
              </div>

              {/* SOCIAL SHARE */}
              <div className="flex items-center gap-5 text-2xl text-gray-700">

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 hover:scale-110 transition duration-300"
                >
                  <FaFacebookF />
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black hover:scale-110 transition duration-300"
                >
                  <FaXTwitter />
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700 hover:scale-110 transition duration-300"
                >
                  <FaLinkedinIn />
                </a>

              </div>
            </div>

            {/* FEATURED IMAGE */}
            {data.image && (
              <div className="mb-10 overflow-hidden rounded-3xl">

                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full object-cover rounded-3xl"
                />

              </div>
            )}

            {/* BLOG CONTENT */}
           <div className="blog-content">
  <div
    className="
      prose
      prose-lg
      max-w-none

      prose-headings:font-bold
      prose-headings:text-gray-900
      prose-headings:scroll-mt-40

      prose-p:text-gray-700
      prose-p:leading-8

      prose-a:text-orange-500
      prose-a:no-underline
      hover:prose-a:text-orange-600

      prose-img:rounded-2xl
      prose-li:text-gray-700
      prose-strong:text-gray-900
    "
    dangerouslySetInnerHTML={{ __html: contentHtml }}
  />

  <style jsx global>{`
    .blog-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 2rem 0;
      display: block;
      overflow-x: auto;
      white-space: nowrap;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
    }

    .blog-content thead {
      background: #f3f4f6;
    }

    .blog-content th,
    .blog-content td {
      border: 1px solid #e5e7eb;
      padding: 16px 20px;
      text-align: left;
      min-width: 180px;
    }

    .blog-content tr:nth-child(even) {
      background: #f9fafb;
    }
  `}</style>
</div>
          </article>

          {/* ========================= */}
          {/* RIGHT SIDEBAR CTA */}
          {/* ========================= */}
          <aside className="lg:sticky lg:top-[150px] h-fit">

            <div className="bg-[#f5f7ff] rounded-3xl p-8 shadow-sm border border-gray-100">

              <h3 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                Need More Leads?
              </h3>

              <p className="text-gray-600 leading-7 mb-8">
                Scale your business with high-converting Google Ads campaigns
                managed by experts.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-full transition-all duration-300"
              >
                Contact Us
              </Link>

              <div className="mt-8 space-y-3 text-sm text-gray-600">
                <div>✔ Conversion Focused Campaigns</div>
                <div>✔ Better ROAS</div>
                <div>✔ Keyword Research</div>
                <div>✔ Landing Page Optimization</div>
                <div>✔ Performance Tracking</div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* PROGRESS SCRIPT */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener("scroll", () => {

              const scrollTop = window.scrollY;
              const docHeight = document.body.scrollHeight - window.innerHeight;

              const progress = (scrollTop / docHeight) * 100;

              const progressBar = document.getElementById("reading-progress");

              if (progressBar) {
                progressBar.style.width = progress + "%";
              }
            });
          `,
        }}
      />
    </div>
  );
}
