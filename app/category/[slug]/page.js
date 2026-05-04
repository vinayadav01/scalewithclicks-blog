import { getPosts, normalize } from "../../../lib/getPosts";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CategoryPage({ params }) {
  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug || "";

  const posts = getPosts();

  const currentSlug = normalize(slug);

console.log("slug:", slug);
console.log("posts:", posts);
console.log("categories:", posts.map(p => p.category));
  
  const filteredPosts = posts.filter(
    (post) => normalize(post.category) === currentSlug
  );

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
        {slug.replace(/-/g, " ")} Posts
      </h1>

      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div
                style={{
                  border: "1px solid #eee",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "15px" }}>
                  <p style={{ fontSize: "12px", color: "#2563eb" }}>
                    {post.category}
                  </p>

                  <h3>{post.title}</h3>

                  <p style={{ fontSize: "13px", color: "#999" }}>
                    {post.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
