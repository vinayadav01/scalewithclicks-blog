import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getPosts() {
  try {
    const dir = path.join(process.cwd(), "app/content/blog");

    // ✅ Prevent crash if folder missing
    if (!fs.existsSync(dir)) {
      console.error("Blog directory missing:", dir);
      return [];
    }

    const files = fs.readdirSync(dir);

    const posts = files
      .map((filename) => {
        try {
          const filePath = path.join(dir, filename);
          const file = fs.readFileSync(filePath, "utf8");

          const { data } = matter(file);

          return {
            slug: filename.replace(/\.(md|mdx)$/, ""),
            title: data.title || "No title",
            date: data.date || "",
            image: data.image || "/images/default.jpg",
            category: data.category || "General",
          };
        } catch (err) {
          console.error("Error parsing file:", filename);
          return null;
        }
      })
      .filter(Boolean);

    return posts;

  } catch (err) {
    console.error("getPosts ERROR:", err);
    return []; // ✅ NEVER crash build
  }
}
