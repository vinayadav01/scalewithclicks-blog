import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

        // ✅ Prevent crash if frontmatter is broken
        const { data } = matter(file || "");

        posts.push({
          slug: filename.replace(/\.(md|mdx)$/, ""),
          title: data?.title || "No title",
          date: data?.date || "2024-01-01",
          image: data?.image || "/images/default.jpg",
          category: data?.category || "General",
        });

      } catch (err) {
        console.log("❌ Skipping broken file:", filename);
      }
    }

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  } catch (err) {
    console.error("🔥 getPosts failed:", err);
    return [];
  }
}
