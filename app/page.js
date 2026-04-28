import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  const dir = path.join(process.cwd(), "app/content/blog");

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
      image: data.image || "/images/default.jpg",
      category: data.category || "General",
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const featured = posts[0];
  const restPosts = posts.slice(1); // ✅ FIX: remove duplicate

  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px 20px" }}>

      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "800" }}>
          Digital Marketing Insights & Growth Strategies
        </h1>
        <p style={{ color: "#64748b" }}>
          Learn Google Ads, SEO, Lead Generation & Scaling Strategies
        </p>
      </div>

      {/* FEATURED */}
      {featured && (
        <div style={{ marginBottom: "40px" }}>
          <Link href={`/blog/${featured.slug}`}>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <img
                src={featured.image}
                alt={featured.title}
                onError={(e) => (e.currentTarget.src = "/images/default.jpg")}
                style={{
                  width: "100%",
                  height: "320px",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.45)",
                  borderRadius: "16px",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  color: "#fff",
                }}
              >
                <span
                  style={{
                    background: "#2563eb",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                  }}
                >
                  Featured
                </span>

                <h2 style={{ fontSize: "28px", marginTop: "10px" }}>
                  {featured.title}
                </h2>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
        }}
      >

        {/* POSTS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {restPosts.map((post) => {
            const categorySlug = post.category.toLowerCase().replace(/\s+/g, "-");

            return (
              <div
                key={post.slug}
                style={{
                  border: "1px solid #eee",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <Link href={`/blog/${post.slug}`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    onError={(e) => (e.currentTarget.src = "/images/default.jpg")}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                </Link>

                <div style={{ padding: "15px" }}>
                  <Link href={`/category/${categorySlug}`}>
                    <p style={{ color: "#2563eb", fontSize: "12px" }}>
                      {post.category}
                    </p>
                  </Link>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 style={{ fontSize: "18px", margin: "5px 0" }}>
                      {post.title}
                    </h3>
                  </Link>

                  <p style={{ fontSize: "13px", color: "#999" }}>
                    {post.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* SIDEBAR */}
        <div
          style={{
            position: "sticky",
            top: "100px",
            height: "fit-content",
          }}
        >

          {/* CTA */}
          <div
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              padding: "25px",
              borderRadius: "16px",
              color: "#fff",
              marginBottom: "20px",
            }}
          >
            <h3>🚀 Want More Leads?</h3>
            <p style={{ fontSize: "14px" }}>
              Get a free strategy to grow your business with ads & SEO
            </p>

            <a
              href="https://calendly.com/vinayyadav01992"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "12px 18px",
                background: "#fff",
                color: "#2563eb",
                borderRadius: "8px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Book Free Call
            </a>
          </div>

          {/* CATEGORIES */}
          <div
            style={{
              border: "1px solid #eee",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h3>Categories</h3>

            {categories.map((cat) => {
              const slug = cat.toLowerCase().replace(/\s+/g, "-");

              return (
                <div key={cat} style={{ marginTop: "10px" }}>
                  <Link href={`/category/${slug}`}>
                    <span style={{ color: "#2563eb", cursor: "pointer" }}>
                      {cat}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FLOATING CTA */}
      <a
        href="https://calendly.com/vinayyadav01992"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#2563eb",
          color: "#fff",
          padding: "14px 18px",
          borderRadius: "30px",
          fontWeight: "600",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        }}
      >
        🚀 Free Strategy
      </a>
    </div>
  );
}
