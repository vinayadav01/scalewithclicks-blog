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

  // ✅ Generate content + TOC separately
  const processedContent = await remark()
    .use(remarkSlug)
    .use(html)
    .process(content);

  const processedToc = await remark()
    .use(remarkToc)
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();
  const tocHtml = processedToc.toString().match(/<nav[\s\S]*?<\/nav>/)?.[0] || "";

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

      {/* GRID */}
   <div
  className="blog-grid"
  style={{
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 220px",
    gap: "30px",
    alignItems: "start",
  }}
> 
        {/* MAIN CONTENT */}
       <div className="blog-container" style={{ maxWidth: "680px" }}>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {/* SIDEBAR */}
        <div>
          
          {/* TOC */}
          {tocHtml && (
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
