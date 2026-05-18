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

  if (!text || typeof text !== "string") {
    return "1 min read";
  }

  const words = text.trim().split(/\s+/).length;

  const minutes = Math.ceil(words / 200);

  return `${minutes} min read`;
}

// ✅ EXTRACT TABLE OF CONTENTS
function extractHeadings(markdown = "") {

  if (!markdown || typeof markdown !== "string") {
    return [];
  }

  const lines = markdown.split("\n");

  const headings = [];

  lines.forEach((line) => {

    // ✅ H2
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

    // ✅ H3
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

  // ✅ GET FILES
  const files = fs
    .readdirSync(postsDirectory)
    .filter(
      (file) =>
        file.endsWith(".md") ||
        file.endsWith(".mdx")
    );

  // ✅ PROCESS POSTS
  const posts = files.map((filename) => {

    try {

      const filePath = path.join(
        postsDirectory,
        filename
      );

      const fileContents = fs.readFileSync(
        filePath,
        "utf8"
      );

      // ✅ PARSE FRONTMATTER
      const { data, content } = matter(fileContents);

      // ✅ SAFE CATEGORY
      const category = String(
        data.category || "General"
      ).trim();

      // ✅ SAFE TOC
      const toc = extractHeadings(content);

      // ✅ SAFE MARKDOWN → HTML
      let processedContent = "";

      try {

        processedContent = remark()
          .use(remarkGfm)
          .use(remarkRehype)
          .use(rehypeSlug)
          .use(rehypeStringify)
          .processSync(content)
          .toString();

      } catch (markdownError) {

        console.error(
          `❌ Markdown processing failed in file: ${filename}`
        );

        console.error(markdownError);

        processedContent =
          "<p>Content could not be loaded.</p>";
      }

      return {

        // ✅ SLUG
        slug: filename.replace(
          /\.(md|mdx)$/,
          ""
        ),

        // ✅ BASIC DATA
        title:
          String(data.title || "Untitled Post"),

        description:
          String(data.description || ""),

        image:
          String(data.image || ""),

        date:
          String(data.date || ""),

        author:
          String(data.author || "Vinay Yadav"),

        category,

        // ✅ CONTENT
        content: processedContent,

        // ✅ TOC
        toc,

        // ✅ READING TIME
        readingTime: getReadingTime(content),
      };

    } catch (error) {

      console.error(
        `❌ FAILED TO PROCESS FILE: ${filename}`
      );

      console.error(error);

      return null;
    }

  }).filter(Boolean);

  // ✅ SORT POSTS (LATEST FIRST)
  return posts.sort((a, b) => {

    const dateA = new Date(
      a?.date || "1970-01-01"
    ).getTime();

    const dateB = new Date(
      b?.date || "1970-01-01"
    ).getTime();

    return dateB - dateA;
  });
}
