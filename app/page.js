import Link from "next/link";
import { getPosts } from "@/lib/getPosts";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function Home() {
  let posts = [];

try {
  posts = getPosts();
} catch (err) {
  console.error("Homepage error:", err);
}

  if (!posts || posts.length === 0) {
    return <div style={{ padding: "40px" }}>No blog posts found</div>;
  }

  const featured = posts?.[0];
  const restPosts = posts.slice(1);

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

      {/* FEATURED POST */}
      {featured && (
        <Link href={`/blog/${featured.slug}`}>
          <div style={{ position: "relative", cursor: "pointer" }}>
            
            <img
              src={featured.image || "/images/default.jpg"}
              alt={featured.title || "Featured post"}
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                borderRadius: "16px",
                marginBottom: "30px",
              }}
            />

            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                borderRadius: "16px",
              }}
            />

            {/* Text */}
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
          {restPosts.map((post) => (
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
                  src={post.image || "/images/default.jpg"}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
              </Link>

              <div style={{ padding: "15px" }}>
                {/* ✅ USE SAME categorySlug FROM DATA */}
                <Link href={`/category/${post.categorySlug}`}>
                  <p style={{ color: "#2563eb", fontSize: "12px" }}>
                    {post.category}
                  </p>
                </Link>

                <Link href={`/blog/${post.slug}`}>
                  <h3 style={{ margin: "5px 0" }}>{post.title}</h3>
                </Link>

                <p style={{ fontSize: "13px", color: "#999" }}>
                  {post.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SIDEBAR */}
        <div style={{ position: "sticky", top: "100px" }}>
          
          {/* CTA */}
          <div
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            <h3>🚀 Want More Leads?</h3>
            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
              Get a free growth strategy for your business
            </p>

            <a
              href="https://calendly.com/vinayyadav01992"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "#fff",
                color: "#2563eb",
                padding: "10px 14px",
                borderRadius: "8px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Book Free Call
            </a>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3>Categories</h3>

            {categories.map((cat) => {
              const slug = cat.toLowerCase().replace(/\s+/g, "-");

              return (
                <div key={cat} style={{ marginTop: "8px" }}>
                  <Link href={`/category/${slug}`}>
                    <span style={{ color: "#2563eb" }}>{cat}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
