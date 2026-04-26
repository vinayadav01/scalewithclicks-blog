import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getReadingTime(text) {
  return Math.ceil(text.split(/\s+/).length / 200) + " min read";
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 6;

  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) {
    return Response.json({ posts: [], total: 0 });
  }

  const files = fs.readdirSync(dir);

  const allPosts = files.map((filename) => {
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

  // sort latest
  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const start = (page - 1) * limit;
  const paginated = allPosts.slice(start, start + limit);

  return Response.json({
    posts: paginated,
    total: allPosts.length,
  });
}
