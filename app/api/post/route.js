import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return Response.json({ error: "Missing slug" }, { status: 400 });
    }

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
  .use(html)
  .use(rehypeSlug)
      .use(remarkToc, { heading: "table of contents" })
      .use(html)
      .process(content);

    return Response.json({
      data,
      contentHtml: processed.toString(),
    });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
