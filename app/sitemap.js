import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function sitemap() {
  const baseUrl = "https://blog.scalewithclicks.com";

  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  const posts = files.map((file) => {
    const slug = file.replace(".md", "");
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
    };
  });

  // categories
  const categories = files.map((file) => {
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return data.category || "general";
  });

  const uniqueCategories = [...new Set(categories)];

  const categoryPages = uniqueCategories.map((cat) => ({
    url: `${baseUrl}/category/${cat.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...posts,
    ...categoryPages,
  ];
}
