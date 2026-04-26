import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";

export const dynamic = "force-dynamic";

export default async function Post({ params }) {
  const { slug } = await params;

  const filePath = path.join(
    process.cwd(),
    "app/content/blog",
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return <h1>File not found: {slug}</h1>;
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processed = await remark()
    .use(remarkSlug)
    .use(remarkToc)
    .use(html)
    .process(content);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "40px" }}>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: processed.toString() }} />
    </div>
  );
}
