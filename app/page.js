import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { getPosts, normalize } from "../lib/getPosts";

const posts = getPosts();
export const dynamic = "force-dynamic";

export default function Home() {
  import { getPosts, normalize } from "../lib/getPosts";

export default function Home() {
  const posts = getPosts();

  if (!posts.length) {
    return <div style={{ padding: "40px" }}>No blog posts found</div>;
  }

        return {
          slug: filename.replace(".mdx", "").replace(".md", ""),
          title: data.title || "No title",
          date: data.date || "1970-01-01",
          image: data.image || "",
          category: data.category || "General",
          description: data.description || "",
        };
      } catch (err) {
        console.error("Error reading file:", filename);
        return null;
      }
    })
    .filter(Boolean);

  posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    return dateB - dateA;
  });

  const featuredPost = posts[0];
  const restPosts = posts.slice(1);

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "40px 20px" }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "42px" }}>
          Digital Marketing Tips to Grow Your Business
        </h1>
        <p style={{ color: "#666" }}>
          Google Ads, SEO, Lead Generation & Conversion Strategies
        </p>

        <div style={{ marginTop: "20px" }}>
          <a
            href="https://calendly.com/vinayyadav01992"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "12px 22px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              display: "inline-block",
            }}
          >
            🚀 Get Free Growth Strategy
          </a>
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Link href="/category/google-ads">Google Ads</Link>{" | "}
        <Link href="/category/meta-ads">Meta Ads</Link>{" | "}
        <Link href="/category/seo">SEO</Link>{" | "}
        <Link href="/category/lead-generation">Lead Generation</Link>
      </div>

      {/* FEATURED POST */}
      {featuredPost && (
        <div
          style={{
            marginBottom: "40px",
            border: "1px solid #eee",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <Link href={`/blog/${featuredPost.slug}`}>
            <img
              src={featuredPost.image || "/default.jpg"}
              alt={featuredPost.title}
              style={{ width: "100%", height: "320px", objectFit: "cover" }}
            />
          </Link>

          <div style={{ padding: "20px" }}>
            <p style={{ color: "#4f46e5", fontSize: "13px" }}>
              {featuredPost.category}
            </p>

            <Link href={`/blog/${featuredPost.slug}`}>
              <h2>{featuredPost.title}</h2>
            </Link>

            <p style={{ color: "#555", marginTop: "10px" }}>
              {featuredPost.description}
            </p>

            <p style={{ fontSize: "13px", color: "#999" }}>
              {new Date(featuredPost.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* BLOG GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          marginBottom: "70px", // ✅ FIXED SPACING
        }}
      >
        {restPosts.map((post) => {
          const categorySlug = normalize(post.category);

          return (
            <div
              key={post.slug}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <Link href={`/blog/${post.slug}`}>
                <img
                  src={post.image || "/default.jpg"}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
              </Link>

              <div style={{ padding: "15px" }}>
                <Link href={`/category/${categorySlug}`}>
                  <p style={{ color: "#4f46e5", fontSize: "12px" }}>
                    {post.category}
                  </p>
                </Link>

                <Link href={`/blog/${post.slug}`}>
                  <h3 style={{ margin: "5px 0" }}>{post.title}</h3>
                </Link>

                <p style={{ fontSize: "14px", color: "#555" }}>
                  {post.description}
                </p>

                <p style={{ fontSize: "13px", color: "#999" }}>
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM CTA */}
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          paddingTop: "20px",
          borderTop: "1px solid #eee", // ✅ extra separation
        }}
      >
        <h2>Want More Leads & Sales?</h2>
        <p style={{ color: "#666" }}>
          Get a custom growth strategy for your business.
        </p>

        <a
          href="https://calendly.com/vinayyadav01992"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "12px 22px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            display: "inline-block",
            marginTop: "10px",
          }}
        >
          🚀 Book Free Strategy Call
        </a>
      </div>
    </div>
  );
}
