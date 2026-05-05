import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const normalize = (str) =>
  str
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function getPosts() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);

    return {
      slug: normalize(file.replace(/\.(md|mdx)$/, "")),
      title: data.title,
      category: normalize(data.category),
      date: data.date,
      description: data.description,
      image: data.image,
    };
  });
}
