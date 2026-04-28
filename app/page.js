import Link from "next/link";
import { getPosts } from "@/lib/getPosts";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function Home() {
  const posts = getPosts();

  if (!posts.length) {
    return <div style={{ padding: "40px" }}>No blog posts found</div>;
  }

  const featured = posts[0];
  const restPosts = posts.slice(1);
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px 20px" }}>
      
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "800" }}>
          Digital Marketing Insights & Growth Strategies
        </h1>
        <p style={{ color: "#64748b" }}>
          Learn Google Ads, SEO, Lead Generation & Scaling Strategies
        </p>
      </div>

      {/* FEATURED */}
      <Link href={`/blog/${featured.slug}`}>
        <img
          src={featured.image}
          alt={featured.title}
          style={{
            width: "100%",
            height: "320px",
            objectFit: "cover",
            borderRadius: "16px",
            marginBottom: "30px",
          }}
        />
      </Link>

      {/* POSTS */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}>
          {restPosts.map((post) => {
            const slug = post.category.toLowerCase().replace(/\s+/g, "-");

            return (
              <div key={post.slug} style={{ border: "1px solid #eee", borderRadius: "12px" }}>
                <Link href={`/blog/${post.slug}`}>
                  <img
                    src={post.image}
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  />
                </Link>

                <div style={{ padding: "15px" }}>
                  <Link href={`/category/${slug}`}>
                    <p style={{ color: "#2563eb", fontSize: "12px" }}>
                      {post.category}
                    </p>
                  </Link>

                  <Link href={`/blog/${post.slug}`}>
                    <h3>{post.title}</h3>
                  </Link>

                  <p style={{ fontSize: "13px", color: "#999" }}>{post.date}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* SIDEBAR */}
        <div>
          <div style={{ background: "#2563eb", color: "#fff", padding: "20px", borderRadius: "12px" }}>
            <h3>🚀 Want More Leads?</h3>
            <a href="https://calendly.com/vinayyadav01992" target="_blank" rel="noopener noreferrer">
              Book Free Call
            </a>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3>Categories</h3>
            {categories.map((cat) => {
              const slug = cat.toLowerCase().replace(/\s+/g, "-");

              return (
                <div key={cat}>
                  <Link href={`/category/${slug}`}>{cat}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
