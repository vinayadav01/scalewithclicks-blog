import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import Navbar from "../../components/Navbar";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import ProgressBar from "../../components/ProgressBar";
import FloatingShare from "../../../components/FloatingShare";
import { normalize } from "../../../lib/getPosts";

function extractHeadings(content) {
  const lines = content.split("\n");

  return lines
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace("## ", "").trim();

      const id = text
        .toLowerCase()
        .replace(/[^\w]+/g, "-");

      return { text, id };
    });
}

export const dynamicParams = true;
export const dynamic = "force-dynamic";

// ✅ Generate static routes (normalized)
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: normalize(file.replace(/\.(md|mdx)$/, "")),
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = params;

  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) {
    return <div>No blog directory found</div>;
  }

  const files = fs.readdirSync(dir);

  // ✅ FIXED MATCHING LOGIC
  const matchedFile = files.find((file) => {
    const fileSlug = normalize(file.replace(/\.(md|mdx)$/, ""));
    return fileSlug === slug;
  });

  if (!matchedFile) {
    return <div>FILE NOT FOUND: {slug}</div>;
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

  return (
    <>
      <Navbar />
      <ProgressBar image={data.image} />

      <div className="hidden md:block">
        <FloatingShare />
      </div>

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

        {/* CONTENT */}
        <div>
          <div className="blog-header">
            <div className="breadcrumb">
              <a href="/">Home</a> /
              <a href={`/category/${normalize(data.category)}`}>
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

              {/* ✅ SVG SHARE ICONS */}
              <div style={{ display: "flex", gap: "15px" }}>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${slug}`}
                  target="_blank"
                >
                  <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-4 3.8-4 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.3 0-1.7.8-1.7 1.6V12H17l-.5 3h-2v7A10 10 0 0 0 22 12z"/>
                  </svg>
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${slug}`}
                  target="_blank"
                >
                  <svg width="18" height="18" fill="#1DA1F2" viewBox="0 0 24 24">
                    <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1-1.5-1.6-4.2-1.5-5.7.1-1 .9-1.3 2.3-.9 3.5-3.4-.2-6.5-1.8-8.5-4.4-1.1 1.8-.5 4.2 1.3 5.5-.6 0-1.2-.2-1.7-.5 0 2.1 1.5 3.9 3.5 4.3-.6.2-1.3.2-1.9.1.5 1.7 2.1 2.9 4 2.9-1.5 1.2-3.4 1.9-5.3 1.9H2c2 1.3 4.3 2 6.7 2 8 0 12.4-6.6 12.4-12.4v-.6c.8-.6 1.5-1.3 2-2.1z"/>
                  </svg>
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${slug}`}
                  target="_blank"
                >
                  <svg width="18" height="18" fill="#0A66C2" viewBox="0 0 24 24">
                    <path d="M20.4 20.4h-3.6v-5.6c0-1.3-.5-2.2-1.7-2.2-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9v5.5H9.5s.1-8.9 0-9.8h3.6v1.4c.5-.8 1.4-1.9 3.4-1.9 2.5 0 4.4 1.6 4.4 5v5.3zM5.3 7.9c-1.2 0-2-.8-2-1.8 0-1 .8-1.8 2-1.8s2 .8 2 1.8c0 1-.8 1.8-2 1.8zm1.8 12.5H3.5v-9.8h3.6v9.8z"/>
                  </svg>
                </a>
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
