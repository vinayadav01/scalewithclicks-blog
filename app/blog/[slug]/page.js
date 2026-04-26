import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";
import { notFound } from "next/navigation";

// ✅ FORCE dynamic (fixes 404 issue)
export const dynamic = "force-dynamic";

// ✅ SEO metadata
export async function generateMetadata({ params }) {
  if (!params?.slug) {
    return {
      title: "Blog | Growth Insights",
    };
  }

  return {
    title: params.slug.replace(/-/g, " ") + " | Growth Insights",
  };
}

// ✅ MAIN PAGE
export default async function Post({ params }) {
  // 🚨 Validate slug
  if (!params?.slug) {
    notFound();
  }

  const slug = params.slug;

 const filePath = path.join(
  process.cwd(),
  "app/content/blog",
  `${slug}.md`
);

  // 🚨 If file not found → show 404
  if (!fs.existsSync(filePath)) {
    notFound();
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
    <div style={{ maxWidth: "800px", margin: "auto", padding: "40px 20px" }}>
      
      {/* CATEGORY */}
      {data.category && (
        <p
          style={{
            color: "#4f46e5",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          {data.category}
        </p>
      )}

      {/* TITLE */}
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        {data.title || slug.replace(/-/g, " ")}
      </h1>

      {/* META */}
      <p style={{ color: "#777", marginBottom: "20px" }}>
        {data.date || "No date"} • {data.author || "Vinay Yadav"}
      </p>

      {/* IMAGE */}
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "30px",
          }}
        />
      )}

      {/* CONTENT */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
