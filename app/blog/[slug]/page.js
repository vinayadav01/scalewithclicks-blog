import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

export default async function BlogPost({ params }) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
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
      <h1>{data.title}</h1>
      <p style={{ color: "#666" }}>{data.date}</p>

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
