import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BlogPost({ params }) {
  try {
    // ✅ FIX: ensure slug exists
    if (!params || !params.slug) {
      console.log("❌ No slug received:", params);
      return notFound();
    }

    const slug = params.slug.toLowerCase();

    const dir = path.join(process.cwd(), "content/blog");

    if (!fs.existsSync(dir)) {
      console.log("❌ Blog folder missing");
      return notFound();
    }

    const files = fs.readdirSync(dir);

    const matchedFile = files.find((file) => {
      return file
        .replace(".md", "")
        .replace(".mdx", "")
        .toLowerCase() === slug;
    });

    if (!matchedFile) {
      console.log("❌ No matching file for:", slug);
      return notFound();
    }

    const filePath = path.join(dir, matchedFile);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);

    return (
      <div style={{ maxWidth: "900px", margin: "auto", padding: "40px" }}>
        <h1>{data.title}</h1>

        <p>
          {data.date} • {data.author || "Admin"}
        </p>

        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            style={{ width: "100%", margin: "20px 0" }}
          />
        )}

        <div
          dangerouslySetInnerHTML={{
            __html: processedContent.toString(),
          }}
        />
      </div>
    );
  } catch (err) {
    console.error("🔥 ERROR:", err);
    return notFound();
  }
}
