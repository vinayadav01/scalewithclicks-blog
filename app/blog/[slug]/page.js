import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BlogPost(props) {
  try {
    // ✅ FIX: get params safely
    const slug = props?.params?.slug;

    console.log("👉 PARAMS:", props?.params);

    if (!slug) {
      console.log("❌ Slug missing");
      return notFound();
    }

    const cleanSlug = slug.toLowerCase();

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
        .toLowerCase() === cleanSlug;
    });

    console.log("👉 MATCHED:", matchedFile);

    if (!matchedFile) {
      console.log("❌ No matching file");
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
