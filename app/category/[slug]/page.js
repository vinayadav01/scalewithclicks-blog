import Link from "next/link";
import { getPosts } from "@/lib/getPosts";
import Navbar from "@/components/Navbar";

export default function CategoryPage({ params }) {

  // ✅ GET CATEGORY SLUG
  const categorySlug = params?.slug;

  // ✅ GET ALL POSTS
  const allPosts = getPosts();

  // ✅ FILTER POSTS SAFELY
  const posts = allPosts.filter((post) => {

    const normalizedCategory = (post.category || "general")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    return normalizedCategory === categorySlug;

  });

  // ✅ FORMAT TITLE
  const formattedCategory = categorySlug
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div style={{ padding: "40px" }}>

      <Navbar />

      {/* PAGE TITLE */}
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "30px",
          fontWeight: "700",
        }}
      >
        Category: {formattedCategory}
      </h1>

      {/* NO POSTS */}
      {posts.length === 0 && (
        <p style={{ color: "#666" }}>
          No articles found in this category.
        </p>
      )}

      {/* POSTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {posts.map((post) => (

          <div
            key={post.slug}
            style={{
              border: "1px solid #eee",
              borderRadius: "14px",
              overflow: "hidden",
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

            <div style={{ padding: "18px" }}>

              {/* CATEGORY */}
              <p
                style={{
                  color: "#f97316",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                }}
              >
                {post.category}
              </p>

              {/* TITLE */}
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <h2
                  style={{
                    fontSize: "22px",
                    lineHeight: "1.4",
                    marginBottom: "12px",
                    cursor: "pointer",
                  }}
                >
                  {post.title}
                </h2>
              </Link>

              {/* DESCRIPTION */}
              {post.description && (
                <p
                  style={{
                    color: "#666",
                    lineHeight: "1.7",
                    marginBottom: "15px",
                  }}
                >
                  {post.description}
                </p>
              )}

              {/* DATE */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                {post.date}
              </p>

            </div>
          </div>

        ))}
      </div>
    </div>
  );
}
