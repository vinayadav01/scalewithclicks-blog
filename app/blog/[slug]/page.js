import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// normalize slug
const normalize = (str) =>
  str
    ?.toLowerCase()
    .trim()
    .replace(/\.mdx?$/, "")
    .replace(/\s+/g, "-");

export default async function BlogPost({ params }) {
  try {
    // ✅ IMPORTANT FIX
    const { slug: rawSlug } = await params;

    if (!rawSlug) {
      console.error("❌ slug missing");
      return notFound();
    }

    const slug = normalize(rawSlug);

    const dir = path.join(process.cwd(), "content/blog");

    if (!fs.existsSync(dir)) {
      console.error("❌ Blog folder missing:", dir);
      return notFound();
    }

    const files = fs.readdirSync(dir);

    console.log("👉 URL SLUG:", slug);
    console.log("👉 FILES:", files);

    const matchedFile = files.find((file) => {
      const fileSlug = normalize(file);
      return fileSlug === slug;
    });

    console.log("✅ MATCHED FILE:", matchedFile);

    if (!matchedFile) {
      console.error("❌ No matching blog found");
      return notFound();
    }

    const filePath = path.join(dir, matchedFile);
    const file = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(file);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return (
      <div style={{ maxWidth: "900px", margin: "auto", padding: "40px 20px" }}>
        <h1>{data.title}</h1>

        <p style={{ color: "#666" }}>
          {data.date} • {data.author || "Admin"}
        </p>

        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            style={{
              width: "100%",
              margin: "20px 0",
              borderRadius: "10px",
            }}
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    );
  } catch (err) {
    console.error("🔥 BLOG ERROR:", err);
    return notFound();
  }
}
