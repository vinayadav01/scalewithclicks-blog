import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const filePath = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processed = await remark()
    .use(remarkSlug)
    .use(remarkToc, { heading: "table of contents" })
    .use(html)
    .process(content);

  return Response.json({
    data,
    contentHtml: processed.toString(),
  });
}
