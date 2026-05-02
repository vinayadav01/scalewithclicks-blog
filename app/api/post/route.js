import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

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

    // ✅ CORRECT PIPELINE
    const processed = await remark()
      .use(remarkToc, { heading: "table of contents" })
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStringify)
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
