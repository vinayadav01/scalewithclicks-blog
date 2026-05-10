import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

// 📁 BLOG DIRECTORY
const postsDirectory = path.join(process.cwd(), "content/blog");

// ✅ READING TIME
function getReadingTime(text = "") {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);

  return `${minutes} min read`;
}

// ✅ EXTRACT TABLE OF CONTENTS
function extractHeadings(markdown = "") {

  const lines = markdown.split("\n");

  const headings = [];

  lines.forEach((line) => {

    // H2
    if (line.startsWith("## ")) {

      const text = line.replace("## ", "").trim();

      const id = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      headings.push({
        text,
        id,
        level: 2,
      });
    }

    // H3
    if (line.startsWith("### ")) {

      const text = line.replace("### ", "").trim();

      const id = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      headings.push({
        text,
        id,
        level: 3,
      });
    }
  });

  return headings;
}

// 🚀 MAIN FUNCTION
export function getPosts() {

  // ✅ SAFETY CHECK
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs
    .readdirSync(postsDirectory)
    .filter(
      (file) =>
        file.endsWith(".md") || file.endsWith(".mdx")
    );

  const posts = files.map((filename) => {

    const filePath = path.join(postsDirectory, filename);

    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContents);

    // ✅ SAFE CATEGORY
    const category = (data.category || "General")
      .trim();

    // ✅ TOC
    const toc = extractHeadings(content);

    // ✅ MARKDOWN → HTML
    const processedContent = remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .processSync(content)
      .toString();

    return {
      slug: filename.replace(/\.(md|mdx)$/, ""),

      title: data.title || "Untitled Post",

      description: data.description || "",

      image: data.image || "",

      date: data.date || "",

      author: data.author || "Vinay Yadav",

      category,

      content: processedContent,

      toc,

      readingTime: getReadingTime(content),
    };
  });

  // ✅ SORT LATEST FIRST
  return posts.sort((a, b) => {

    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);

    return dateB - dateA;

  });
}
