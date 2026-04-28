import fs from "fs";
import path from "path";
import matter from "gray-matter";

const normalize = (str) =>
  str
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

export function getPosts() {
  try {
    const dir = path.join(process.cwd(), "content/blog");

    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);

    const posts = [];

    for (const filename of files) {
      try {
        const filePath = path.join(dir, filename);
        const file = fs.readFileSync(filePath, "utf8");

        const { data } = matter(file || "");

        const cleanSlug = normalize(
          filename.replace(/\.(md|mdx)$/, "")
        );

        posts.push({
          slug: cleanSlug, // ✅ FIXED
          title: data?.title || "No title",
          date: data?.date || "2024-01-01",
          image: data?.image || "/images/default.jpg",
          category: data?.category || "General",
        });

      } catch (err) {
        console.log("Skipping broken file:", filename);
      }
    }

    return posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;

      return dateB - dateA;
    });

  } catch (err) {
    console.error("getPosts failed:", err);
    return [];
  }
}
