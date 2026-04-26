import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Post({ params }) {
  const slug = params.slug;

  const filePath = path.join(
    process.cwd(),
    "app/content/blog",
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return (
      <pre>
        {JSON.stringify(
          {
            slug,
            filePath,
            exists: false,
          },
          null,
          2
        )}
      </pre>
    );
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processed = await remark()
    .use(remarkSlug)
    .use(remarkToc)
    .use(html)
    .process(content);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "40px 20px" }}>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: processed.toString() }} />
    </div>
  );
}
