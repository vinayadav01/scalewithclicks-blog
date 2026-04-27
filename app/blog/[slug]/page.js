import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";

export const dynamic = "force-dynamic";

export default async function Post({ params }) {
  // ✅ Next.js 16 fix
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

  // ✅ Content
  const processedContent = await remark()
    .use(remarkSlug)
    .use(html)
    .process(content);

  // ✅ TOC
  const processedToc = await remark()
    .use(remarkToc)
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();
  const tocHtml =
    processedToc.toString().match(/<nav[\s\S]*?<\/nav>/)?.[0] || "";

  const hasToc = !!tocHtml;

  return (
    <div style={{ padding: "40px 20px" }}>
      
      {/* MAIN WRAPPER (KEY FIX) */}
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        
        {/* TITLE */}
        <h1 style={{ fontSize: "38px", marginBottom: "10px" }}>
          {data.title}
        </h1>

        {/* META */}
        <p style={{ color: "#777", marginBottom: "30px" }}>
          {data.date} • {data.author || "Vinay Yadav"}
        </p>

        {/* LAYOUT */}
        <div
          className="blog-grid"
          style={{
            display: hasToc ? "grid" : "block",
            gridTemplateColumns: hasToc
              ? "minmax(0, 1fr) 200px"   // 🔥 smaller sidebar
              : "1fr",
            gap: "30px",
            alignItems: "start",
          }}
        >
          
          {/* CONTENT (FULL WIDTH FIX) */}
          <div className="blog-container">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          {/* SIDEBAR (ONLY IF EXISTS) */}
          {hasToc && (
            <div
              className="toc-sidebar"
              dangerouslySetInnerHTML={{ __html: tocHtml }}
            />
          )}

        </div>
      </div>
    </div>
  );
}
