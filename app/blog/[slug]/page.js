import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";

// ✅ generate static paths
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: file.replace(/\.(md|mdx)$/, ""),
  }));
}

// ✅ MAIN BLOG PAGE
export default async function BlogPost({ params }) {
  // 🔥 FIX: unwrap params (NEXT 16)
  const { slug } = await params;

  if (!slug) return notFound();

  const mdPath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  const mdxPath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  let filePath = "";

  if (fs.existsSync(mdPath)) filePath = mdPath;
  else if (fs.existsSync(mdxPath)) filePath = mdxPath;
  else return notFound();

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "40px" }}>
      <h1>{data.title}</h1>

      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          style={{ width: "100%", margin: "20px 0" }}
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
