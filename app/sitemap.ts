import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://blog.scalewithclicks.com";

  const blogDir = path.join(process.cwd(), "content/blog");

  let posts: MetadataRoute.Sitemap = [];
  const categories = new Set<string>();

  // ✅ Read blog posts safely
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);

    posts = files.map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");

      const { data } = matter(fileContent);

      const slug = file.replace(".md", "");

      // ✅ SAFE category handling
      const category = (data?.category || "general").toString();

      categories.add(category);

      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: data?.date
          ? new Date(data.date)
          : new Date(),
      };
    });
  }

  // ✅ Category URLs (SAFE)
  const categoryUrls: MetadataRoute.Sitemap = Array.from(categories).map(
    (cat) => {
      const safeCategory = (cat || "general").toString();

      return {
        url: `${baseUrl}/category/${safeCategory
          .toLowerCase()
          .replace(/\s+/g, "-")}`,
        lastModified: new Date(),
      };
    }
  );

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
