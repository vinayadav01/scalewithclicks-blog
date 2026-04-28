import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function CategoryPage({ params }) {
  const slug = params?.slug;

  const dir = path.join(process.cwd(), "app/content/blog");

  // ✅ Prevent crash if folder missing
  if (!fs.existsSync(dir)) {
    return <div style={{ padding: "40px" }}>No posts found</div>;
  }

  const files = fs.readdirSync(dir);

  const posts = files.map((filename) => {
    try {
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
    } catch (err) {
      // ✅ Skip broken files safely
      return null;
    }
  }).filter(Boolean);

  // ✅ Strong normalization
  const normalize = (str) =>
    str?.toLowerCase().trim().replace(/\s+/g, "-");

  const filteredPosts = posts.filter(
    (post) => normalize(post.category) === normalize(slug)
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "40px 20px" }}>

      {/* TITLE */}
      <h1
        style={{
          marginBottom: "30px",
          textTransform: "capitalize",
          fontSize: "32px",
          fontWeight: "700",
        }}
      >
        {slug.replace(/-/g, " ")} Posts
      </h1>

      {/* EMPTY STATE */}
      {filteredPosts.length === 0 ? (
        <div style={{ padding: "20px", color: "#64748b" }}>
          <p>No posts found in this category.</p>
          <Link href="/" style={{ color: "#2563eb" }}>
            ← Back to Home
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "0.3s",
              }}
            >
              <Link href={`/blog/${post.slug}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
              </Link>

              <div style={{ padding: "15px" }}>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#2563eb",
                    marginBottom: "5px",
                  }}
                >
                  {post.category}
                </p>

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
          ))}
        </div>
      )}
    </div>
  );
}
