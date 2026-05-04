"use client";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import FloatingShare from "@/components/FloatingShare";

// ✅ Prevent random 404
export const dynamicParams = true;

// ✅ TEMP FIX (force dynamic rendering)
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const slug = params.slug;

  return {
    title: slug.replace(/-/g, " "),
    description: "Learn digital marketing strategies to grow your business.",
  };
}

// ✅ Generate all slugs
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: file.replace(/\.(md|mdx)$/, ""),
  }));
}

export default async function BlogPost({ params }) {
  const slug = params?.slug;

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

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  // ✅ Convert markdown → HTML
  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  // ✅ Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    image: data.image
      ? `https://blog.scalewithclicks.com${data.image}`
      : "https://blog.scalewithclicks.com/images/default.jpg",
    author: {
      "@type": "Person",
      name: data.author || "Vinay Yadav",
    },
    publisher: {
      "@type": "Organization",
      name: "ScaleWithClicks",
      logo: {
        "@type": "ImageObject",
        url: "https://blog.scalewithclicks.com/images/logo.png",
      },
    },
    datePublished: data.date,
    dateModified: data.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://blog.scalewithclicks.com/blog/${slug}`,
    },
  };

  return (
  <>
    <Navbar />
    <ProgressBar image={data.image} />

    {/* SCHEMA */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />

    <div className="blog-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-inner">
          <div className="toc">
            <p>TABLE OF CONTENTS</p>
            {headings.map((item, index) => (
              <a key={index} href={`#${item.id}`}>
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE */}
      <div>

        <div className="blog-header">
          <div className="breadcrumb">
            <a href="/">Home</a> /
            <a href={`/category/${data.category?.toLowerCase()}`}>
              {data.category}
            </a> /
            <span>{data.title}</span>
          </div>

          <h1 className="blog-title">{data.title}</h1>

          <div className="author-row">
            <div className="author-left">
              <img src="/images/author.jpg" width="40" />
              <span>{data.author}</span>
            </div>

            <div className="share-icons">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=https://blog.scalewithclicks.com/blog/${slug}`} target="_blank">F</a>
              <a href={`https://twitter.com/intent/tweet?url=https://blog.scalewithclicks.com/blog/${slug}&text=${data.title}`} target="_blank">T</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://blog.scalewithclicks.com/blog/${slug}`} target="_blank">IN</a>
            </div>
          </div>
        </div>

        <main className="content">
          {data.image && (
            <div className="hero-image">
              <img src={data.image} alt={data.title} />
            </div>
          )}

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </main>

      </div>
    </div>
  </>
);
}
