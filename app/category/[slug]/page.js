import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

// 🔥 Generate static paths (important for SEO)
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir);

  const categories = files.map((file) => {
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return data.category || "general";
  });

  const unique = [...new Set(categories)];

  return unique.map((cat) => ({
    slug: cat.toLowerCase().replace(/\s+/g, "-"),
  }));
}

// 🔥 SEO metadata
export async function generateMetadata({ params }) {
  const category = params.slug.replace("-", " ");

  return {
    title: `${category} Blogs | Growth Insights`,
    description: `Explore the best ${category} strategies and guides.`,
  };
}

// 🔥 PAGE
export default function CategoryPage({ params }) {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir);

  const categorySlug = params.slug;

  const posts = files
    .map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: file.replace(".md", ""),
        title: data.title,
        image: data.image,
        date: data.date,
        category: data.category || "General",
      };
    })
    .filter(
      (post) =>
        post.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
    );

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "40px 20px" }}>
      
      <h1 style={{ fontSize: "36px", marginBottom: "30px" }}>
        {categorySlug.replace("-", " ")} Articles
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div style={{ border: "1px solid #eee", borderRadius: "12px" }}>
              {post.image && (
                <img
                  src={post.image}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
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

    </div>
  );
}
