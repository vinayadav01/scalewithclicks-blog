import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";

// ✅ REQUIRED for dynamic routes in production
export const dynamicParams = true;

// ✅ Generate all blog slugs at build time
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: file.replace(".md", ""),
  }));
}

// ✅ SEO metadata
export async function generateMetadata({ params }) {
  const slug = params?.slug || "";

  return {
    title: slug.replace(/-/g, " ") + " | Growth Insights",
  };
}

// ✅ MAIN PAGE
export default async function Post({ params }) {
  const slug = params?.slug;

  if (!slug) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        ❌ Slug missing — route not working
      </div>
    );
  }

  const filePath = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        ❌ Post not found <br />
        Slug: {slug}
      </div>
    );
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
      <p
        style={{
          color: "#4f46e5",
          fontWeight: "500",
          marginBottom: "10px",
        }}
      >
        {data.category}
      </p>

      {/* TITLE */}
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        {data.title}
      </h1>

      {/* META */}
      <p style={{ color: "#777", marginBottom: "20px" }}>
        {data.date} • {data.author || "Vinay Yadav"}
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
