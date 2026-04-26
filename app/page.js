import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

// 📖 Estimate reading time
function getReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default function Home() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) {
    return <div style={{ padding: "40px" }}>No blog posts found</div>;
  }

  const files = fs.readdirSync(dir);

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const file = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(file);

    return {
      slug: filename.replace(".md", ""),
      title: data.title || "No title",
      date: data.date || "",
      description: data.description || "",
      image: data.image || "",
      readingTime: getReadingTime(content),
    };
  });

  // 🔥 Sort latest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const featured = posts[0];
  const restPosts = posts.slice(1);

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "40px 20px" }}>
      
      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "44px", marginBottom: "10px" }}>
          Growth Insights
        </h1>
        <p style={{ color: "#666", fontSize: "18px" }}>
          Proven strategies to generate leads and scale your business.
        </p>
      </div>

      {/* 🔥 FEATURED POST */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginBottom: "60px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #eee",
              background: "#fff",
            }}
          >
            {featured.image && (
              <img
                src={featured.image}
                alt={featured.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}

            <div style={{ padding: "30px" }}>
              <p style={{ color: "#4f46e5", fontWeight: "bold" }}>
                Featured
              </p>

              <h2 style={{ fontSize: "28px", margin: "10px 0" }}>
                {featured.title}
              </h2>

              <p style={{ color: "#666" }}>
                {featured.description}
              </p>

              <p style={{ marginTop: "15px", color: "#999", fontSize: "14px" }}>
                {featured.date} • {featured.readingTime}
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* 🔥 LATEST POSTS */}
      <h2 style={{ marginBottom: "20px" }}>Latest Articles</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {restPosts.map((post) => (
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
                background: "#fff",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
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
                <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
                  {post.title}
                </h3>

                <p style={{ fontSize: "13px", color: "#888" }}>
                  {post.date} • {post.readingTime}
                </p>

                <p
                  style={{
                    marginTop: "10px",
                    color: "#444",
                    fontSize: "14px",
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
