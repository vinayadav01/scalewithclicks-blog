import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getReadingTime(text) {
  return Math.ceil(text.split(/\s+/).length / 200) + " min read";
}

export async function GET() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) {
    return Response.json([]);
  }

  const files = fs.readdirSync(dir);

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const file = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(file);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      category: data.category || "General",
      image: data.image,
      readingTime: getReadingTime(content),
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return Response.json(posts);
}
