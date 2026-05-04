import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import Image from "next/image";
import ProgressBar from "../../components/ProgressBar";
import FloatingShare from "../../../components/FloatingShare";
import { normalize } from "../../../lib/getPosts";

function extractHeadings(content) {
  const lines = content.split("\n");

  return lines
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace("## ", "").trim();

      const id = text.toLowerCase().replace(/[^\w]+/g, "-");

      return { text, id };
    });
}

// ✅ Prevents random 404 issues
export const dynamicParams = true;

// ✅ TEMP FIX
export const dynamic = "force-dynamic";

// ✅ Generates all blog routes
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: normalize(file.replace(/\.(md|mdx)$/, "")),
  }));
}

export default async function BlogPost({ params }) {
  const slug = Array.isArray(params.slug)
  ? params.slug[0]
  : params.slug;
  console.log("PARAM SLUG:", slug);

  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) {
    return <div>No blog directory found</div>;
  }

  const files = fs.readdirSync(dir);

  // ✅ CORRECT MATCHING (FIXED)
 const files = fs.readdirSync(dir);

const matchedFile = files.find((file) => {
  const fileSlug = normalize(file.replace(/\.(md|mdx)$/, ""));
  return fileSlug === slug;
});

if (!matchedFile) {
  return (
    <div style={{ padding: "40px" }}>
      <h2>FILE NOT FOUND: {slug}</h2>
      <p>Available files:</p>
      <ul>
        {files.map((file) => {
          const fileSlug = normalize(file.replace(/\.(md|mdx)$/, ""));
          return (
            <li key={file}>
              {file} → {fileSlug}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

  const filePath = path.join(dir, matchedFile);

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const headings = extractHeadings(content);

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

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

      <div className="hidden md:block">
        <FloatingShare />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="blog-layout">
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

        <div>
          <div className="blog-header">
            <h1 className="blog-title">{data.title}</h1>
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
