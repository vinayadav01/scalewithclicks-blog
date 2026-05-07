import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function sitemap() {
  const baseUrl = "https://blog.scalewithclicks.com";

  const blogDir = path.join(process.cwd(), "content/blog");

  let posts: any[] = [];
  let categories = new Set<string>();

  // ✅ Read blog posts
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);

    posts = files.map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      const slug = file.replace(".md", "");
      const category = data.category || "general";

      // collect categories
      categories.add(category);

      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(data.date || Date.now()),
      };
    });
  }

  // ✅ Category URLs
  const categoryUrls = Array.from(categories).map((cat) => ({
    url: `${baseUrl}/category/${cat
      .toLowerCase()
      .replace(/\s+/g, "-")}`,
    lastModified: new Date(),
  }));

  return [
    // ✅ Homepage
    {
      url: baseUrl,
      lastModified: new Date(),
    },

    // ✅ Blog posts
    ...posts,

    // ✅ Categories
    ...categoryUrls,
  ];
}
