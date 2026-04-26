import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";

export default async function Post({ params }) {
  const slug = params.slug;

  const filePath = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.md`
  );

  // 🔥 DEBUG LOGS (CHECK TERMINAL)
  console.log("👉 SLUG:", slug);
  console.log("👉 FILE PATH:", filePath);
  console.log("👉 FILE EXISTS:", fs.existsSync(filePath));

  // ❌ If file not found
  if (!fs.existsSync(filePath)) {
    // 🔥 EXTRA DEBUG: show available files
    const dir = path.join(process.cwd(), "content/blog");
    let files = [];

    try {
      files = fs.readdirSync(dir);
    } catch (e) {
      console.error("Error reading blog directory:", e);
    }

    console.log("👉 AVAILABLE FILES:", files);

    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Post not found</h2>
        <p>Slug: {slug}</p>
        <p style={{ marginTop: "20px", color: "#888" }}>
          Check terminal logs for debugging info.
        </p>
      </div>
    );
  }

  // ✅ Read file
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  // ✅ Convert markdown → HTML
  const processed = await remark()
    .use(remarkSlug)
    .use(remarkToc)
    .use(html)
    .process(content);

  const contentHtml = processed.toString();

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "40px 20px" }}>
      
      {/* TITLE */}
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        {data.title}
      </h1>

      {/* META */}
      <p style={{ color: "#777", marginBottom: "20px" }}>
        {data.date} • {data.author || "Vinay Yadav"}
      </p>

      {/* FEATURED IMAGE */}
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
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
