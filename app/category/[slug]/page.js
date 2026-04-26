import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

// 🔥 SAFE slug generator
function toSlug(value) {
  if (typeof value !== "string") return "general";
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

// 🔥 Generate static paths
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  const categories = files.map((file) => {
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return toSlug(data.category);
  });

  const unique = [...new Set(categories)];

  return unique.map((slug) => ({ slug }));
}

// 🔥 SEO metadata (SAFE)
export async function generateMetadata({ params }) {
  const safeSlug = typeof params.slug === "string" ? params.slug : "general";
  const category = safeSlug.replace(/-/g, " ");

  return {
    title: `${category} Blogs | Growth Insights`,
    description: `Explore the best ${category} strategies and guides.`,
  };
}

// 🔥 PAGE
export default function CategoryPage({ params }) {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) {
    return <div style={{ padding: "40px" }}>No posts found</div>;
  }

  const files = fs.readdirSync(dir);

  const categorySlug =
    typeof params.slug === "string" ? params.slug : "general";

  const posts = files
    .map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      const categorySlug = toSlug(data.category);

      return {
        slug: file.replace(".md", ""),
        title: data.title || "No title",
        image: data.image || "",
        date: data.date || "",
        categorySlug,
      };
    })
    .filter((post) => post.categorySlug === categorySlug);

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "40px 20px" }}>
      
      {/* TITLE */}
      <h1 style={{ fontSize: "36px", marginBottom: "30px" }}>
        {categorySlug.replace(/-/g, " ")} Articles
      </h1>

      {/* POSTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#fff",
              }}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div style={{ padding: "15px" }}>
                <h3>{post.title}</h3>
                <p style={{ color: "#888" }}>{post.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* EMPTY */}
      {posts.length === 0 && (
        <p style={{ marginTop: "30px", color: "#777" }}>
          No articles found in this category.
        </p>
      )}
    </div>
  );
}
