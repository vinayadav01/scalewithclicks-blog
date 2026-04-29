import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

// ✅ Prevents random 404 issues
export const dynamicParams = false;

// ✅ TEMP FIX (ensures blog works even if static fails)
export const dynamic = "force-dynamic";

// ✅ Generates all blog routes at build time
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  console.log("CHECK DIR:", dir);

  if (!fs.existsSync(dir)) {
    console.log("❌ DIR NOT FOUND");
    return [];
  }

  const files = fs.readdirSync(dir);
  console.log("FILES FOUND:", files);

  return files.map((file) => ({
    slug: file.replace(".md", "").replace(".mdx", ""),
  }));
}

export default async function BlogPost({ params }) {
  const slug = params.slug;

  const mdPath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  const mdxPath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  let filePath = "";

  // ✅ Support both .md and .mdx
  if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else {
    return notFound();
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processedContent = await remark()
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "40px 20px" }}>
      <h1>{data.title || "No title"}</h1>
      <p style={{ color: "#666" }}>{data.date || ""}</p>

      {data.image && (
        <img
          src={data.image}
          alt={data.title || ""}
          style={{ width: "100%", margin: "20px 0" }}
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
