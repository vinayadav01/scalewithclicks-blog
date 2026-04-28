import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getPosts() {
  const dir = path.join(process.cwd(), "content/blog");

  // ✅ VERY IMPORTANT
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  const posts = files.map((filename) => {
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
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
