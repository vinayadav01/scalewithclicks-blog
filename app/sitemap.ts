import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://blog.scalewithclicks.com";

  const blogDir = path.join(process.cwd(), "content/blog");

  let posts: MetadataRoute.Sitemap = [];
  const categories = new Set<string>();

  // ✅ Helper function to create safe URLs
  const createSafeSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // ✅ Read blog posts safely
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);

    posts = files.map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");

      const { data } = matter(fileContent);

      // ✅ Safe blog slug
      const slug = createSafeSlug(
        file.replace(".md", "")
      );

      // ✅ Safe category handling
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
      const safeCategory = createSafeSlug(cat || "general");

      return {
        url: `${baseUrl}/category/${safeCategory}`,
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
