import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const mdPath = path.join(process.cwd(), "content/blog", `${slug}.md`);
    const mdxPath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

    let filePath = "";

    if (fs.existsSync(mdPath)) filePath = mdPath;
    else if (fs.existsSync(mdxPath)) filePath = mdxPath;
    else {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const file = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(file);

    // ✅ Correct markdown pipeline
    const processed = await remark()
      .use(remarkToc, { heading: "table of contents" })
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .process(content);

    return NextResponse.json({
      data,
      contentHtml: processed.toString(),
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
