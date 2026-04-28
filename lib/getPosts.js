const blogDir = path.join(process.cwd(), "content/blog");

export function getPosts() {
  try {
    if (!fs.existsSync(blogDir)) {
      console.error("Blog folder missing:", blogDir);
      return [];
    }

    const files = fs.readdirSync(blogDir);

    return files
      .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
      .map((file) => {
        try {
          const filePath = path.join(blogDir, file);
          const content = fs.readFileSync(filePath, "utf8");
          const { data } = matter(content);

          return {
            slug: file.replace(/\.(md|mdx)$/, ""),
            title: data.title || "No title",
            date: data.date || "",
            image: data.image || "/images/default.jpg",
            category: data.category || "General",
            categorySlug: data.category
              ?.toLowerCase()
              .replace(/\s+/g, "-"),
          };
        } catch (err) {
          console.error("Error reading file:", file);
          return null;
        }
      })
      .filter(Boolean);
  } catch (err) {
    console.error("getPosts crash:", err);
    return [];
  }
}
