import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import Navbar from "@/components/Navbar";

export default async function BlogPost({ params }) {
  const { slug } = await params; // ✅ IMPORTANT FIX

  const filePath = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) return notFound();

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return (
    <div style={{ padding: "40px" }}>
      <Navbar />

      <h1>{data.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
