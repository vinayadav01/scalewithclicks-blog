import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ✅ SINGLE SOURCE OF TRUTH
export const normalize = (str) =>
  str
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function getPosts() {
  try {
    const dir = path.join(process.cwd(), "content/blog");

    if (!fs.existsSync(dir)) return [];

    const files = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

    const posts = files.map((filename) => {
      try {
        const filePath = path.join(dir, filename);
        const file = fs.readFileSync(filePath, "utf8");

        const { data } = matter(file || "");

        return {
          slug: normalize(filename.replace(/\.(md|mdx)$/, "")),
          title: data?.title || "No title",
          description: data?.description || "",
          date: data?.date || "2024-01-01",
          image: data?.image || "/images/default.jpg",
          category: data?.category || "general",
        };
      } catch (err) {
        console.log("Skipping broken file:", filename);
        return null;
      }
    });

    return posts
      .filter(Boolean)
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime() || 0;
        const dateB = new Date(b.date).getTime() || 0;
        return dateB - dateA;
      });

  } catch (err) {
    console.error("getPosts failed:", err);
    return [];
  }
}
