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

    const files = fs.readdirSync(dir);

    const posts = files.map((filename) => {
      try {
        const filePath = path.join(dir, filename);
        const file = fs.readFileSync(filePath, "utf8");

        const { data } = matter(file || "");

        return {
          slug: normalize(filename.replace(/\.(md|mdx)$/, "")),
          title: data?.title || "No title",
          date: data?.date || "2024-01-01",
          image: data?.image || "/images/default.jpg",
          category: normalize(data?.category || "general"),
        };
      } catch (err) {
        console.log("Skipping broken file:", filename);
        return null;
      }
    });

    return posts
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

  } catch (err) {
    console.error("getPosts failed:", err);
    return [];
  }
}
