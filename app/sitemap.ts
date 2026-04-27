import fs from "fs";
import path from "path";

export default function sitemap() {
  const baseUrl = "https://blog.scalewithclicks.com";

  const blogDir = path.join(process.cwd(), "app/content/blog");

  let posts: any[] = [];

  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);

    posts = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => ({
        url: `${baseUrl}/blog/${file.replace(".md", "")}`,
        lastModified: new Date(),
      }));
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...posts,
  ];
}
