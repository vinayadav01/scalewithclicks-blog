import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

// 📁 blog folder
const postsDirectory = path.join(process.cwd(), "content/blog");

function getReadingTime(text) {
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

// 🔥 SLUGIFY FUNCTION (VERY IMPORTANT)
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-"); // replace spaces with dash
}

// 🔥 EXTRACT HEADINGS (H2 + H3)
function extractHeadings(markdown) {
  const lines = markdown.split("\n");

  const headings = [];

  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      const text = line.replace("## ", "").trim();

      headings.push({
        text,
        id: slugify(text), // ✅ FIXED
        level: 2,
      });
    }

    if (line.startsWith("### ")) {
      const text = line.replace("### ", "").trim();

      headings.push({
        text,
        id: slugify(text), // ✅ FIXED
        level: 3,
      });
    }
  });

  return headings;
}

// 🚀 MAIN FUNCTION
export function getPosts() {
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContents);

    // 🔥 Generate TOC
    const toc = extractHeadings(content);

    // 🔥 Convert markdown → HTML
    const processedContent = remark()
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .processSync(content)
      .toString();

    return {
      ...data,

      // ✅ FIXED SLUG (CRITICAL FOR 404)
      slug: slugify(filename.replace(".md", "")),

      content: processedContent,
      toc,

      readingTime: getReadingTime(content),
    };
  });

  // sort latest first
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
