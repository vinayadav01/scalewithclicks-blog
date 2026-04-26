import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home() {
  const dir = path.join(process.cwd(), "content/blog");

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
      category: data.category || "General",
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "40px 20px" }}>

      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "42px" }}>Growth Insights</h1>
        <p style={{ color: "#666" }}>
          Proven strategies to grow your business
        </p>
      </div>

      {/* POSTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {posts.map((post) => {
          const categorySlug = post.category
            ?.toLowerCase()
            .replace(/\s+/g, "-");

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
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
                  
                  {/* CATEGORY */}
                  <Link
                    href={`/category/${categorySlug}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#4f46e5",
                        marginBottom: "5px",
                        fontWeight: "500",
                      }}
                    >
                      {post.category}
                    </p>
                  </Link>

                  <h3>{post.title}</h3>

                  <p style={{ fontSize: "13px", color: "#999" }}>
                    {post.date}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
