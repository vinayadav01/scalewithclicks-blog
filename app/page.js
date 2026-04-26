import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home() {
  const dir = path.join(process.cwd(), "content/blog");

  // ❌ Safety check (prevents build crash)
  if (!fs.existsSync(dir)) {
    return <div style={{ padding: "40px" }}>No blog posts found</div>;
  }

  const files = fs.readdirSync(dir);

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const file = fs.readFileSync(filePath, "utf8");
    const { data } = matter(file);

    return {
      slug: filename.replace(".md", ""),
      title: data.title || "No title",
      date: data.date || "",
      description: data.description || "",
      image: data.image || "",
    };
  });

  // 🔥 Sort latest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "40px 20px" }}>
      
      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
          Growth Insights
        </h1>
        <p style={{ color: "#666", fontSize: "18px" }}>
          Proven strategies to generate leads and scale your business.
        </p>
      </div>

      {/* BLOG GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "0.2s",
                background: "#fff",
              }}
            >
              {/* IMAGE */}
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

              {/* CONTENT */}
              <div style={{ padding: "20px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
                  {post.title}
                </h2>

                <p style={{ fontSize: "14px", color: "#666" }}>
                  {post.date}
                </p>

                <p
                  style={{
                    marginTop: "10px",
                    color: "#444",
                    fontSize: "15px",
                  }}
                >
                  {post.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
