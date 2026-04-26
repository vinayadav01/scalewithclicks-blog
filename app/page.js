import Popup from "../components/Popup";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home() {
  const dir = path.join(process.cwd(), "content/blog");

  let posts = [];

  try {
    const files = fs.readdirSync(dir);

    posts = files.map((file) => {
      const slug = file.replace(".md", "");
      const content = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(content);

      return { slug, ...data };
    });
  } catch (err) {
    console.error("Error loading posts:", err);
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>

      {/* HERO */}
      <div style={{
        textAlign: "center",
        padding: "60px 20px",
        maxWidth: "900px",
        margin: "auto"
      }}>
        <h1 style={{ fontSize: "42px", fontWeight: "bold" }}>
          Growth Insights
        </h1>
        <p style={{ color: "#666" }}>
          Proven strategies to generate leads and scale your business.
        </p>
      </div>

      {/* BLOG GRID */}
      <div style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "25px"
      }}>
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              textDecoration: "none",
              color: "black",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)"
            }}
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover"
                }}
              />
            )}

            <div style={{ padding: "15px" }}>
              <h2>{post.title}</h2>
              <p style={{ color: "#666" }}>{post.description}</p>
            </div>
          </a>
        ))}
      </div>

      {/* POPUP */}
      <Popup />

    </div>
  );
}
