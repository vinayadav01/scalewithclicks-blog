import Link from "next/link";
import { getPosts } from "../lib/getPosts";

export const dynamic = "force-dynamic";

export default function Home() {
  const posts = getPosts();

  if (!posts.length) {
    return <div style={{ padding: "40px" }}>No blog posts found</div>;
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "40px 20px" }}>
      
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Digital Marketing Tips to Grow Your Business
      </h1>

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
              borderRadius: "12px",
              overflow: "hidden",
              transition: "0.2s",
            }}
          >
            <Link href={`/blog/${post.slug}`}>
              <img
                src={post.image}
                alt={post.title}
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
            </Link>

            <div style={{ padding: "15px" }}>
              <p style={{ fontSize: "12px", color: "#4f46e5" }}>
                {post.category}
              </p>

              <Link href={`/blog/${post.slug}`}>
                <h3>{post.title}</h3>
              </Link>

              <p style={{ color: "#666", fontSize: "14px" }}>
                {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
