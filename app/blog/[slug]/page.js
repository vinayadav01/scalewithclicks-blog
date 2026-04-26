import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";

export const dynamic = "force-dynamic";

export default async function Post({ params }) {
  // ✅ FIX for Next.js 16
  const { slug } = await params;

  const filePath = path.join(
    process.cwd(),
    "app/content/blog",
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return <h1 style={{ padding: "40px" }}>Post not found ❌</h1>;
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processed = await remark()
    .use(remarkSlug)
    .use(remarkToc)
    .use(html)
    .process(content);

  const contentHtml = processed.toString();

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px 20px" }}>
      
      {/* TITLE */}
      <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
        {data.title}
      </h1>

      {/* META */}
      <p style={{ color: "#777", marginBottom: "30px" }}>
        {data.date} • {data.author || "Vinay Yadav"}
      </p>

      {/* GRID LAYOUT */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: "40px",
        }}
      >
        
        {/* MAIN CONTENT */}
        <div className="blog-container">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {/* SIDEBAR */}
        <div>

          {/* TOC (auto from markdown headings) */}
          <div
            className="toc-sidebar"
            dangerouslySetInnerHTML={{
              __html: contentHtml.match(/<nav[\s\S]*?<\/nav>/)?.[0] || "",
            }}
          />

          {/* AUTHOR */}
          <div className="author-card">
            <h4>About the Author</h4>
            <p style={{ fontWeight: "600" }}>
              {data.author || "Vinay Yadav"}
            </p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Helping businesses grow with smart marketing strategies.
            </p>
          </div>

          {/* CTA */}
          <div className="cta-box">
            <h4>Want more leads?</h4>
            <p>Get proven strategies to scale your business.</p>
            <a href="#">Get Started</a>
          </div>

        </div>
      </div>
    </div>
  );
}
