import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";

export default async function Post({ params }) {
  const filePath = path.join(
    process.cwd(),
    'content/blog',
    `${params.slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return <div>Post not found</div>;
  }

  const file = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(file);

  const processed = await remark()
    .use(remarkSlug)
    .use(remarkToc, { heading: "table of contents" })
    .use(html)
    .process(content);

  const contentHtml = processed.toString();

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "40px 20px" }}>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
