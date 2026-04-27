import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function CategoryPage({ params }) {
  const { slug } = params;

  const dir = path.join(process.cwd(), "app/content/blog");

  if (!fs.existsSync(dir)) {
    return <div style={{ padding: "40px" }}>No posts found</div>;
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
      image: data.image || "",
      category: data.category || "General",
    };
  });

  // ✅ FIX: normalize category
  const filteredPosts = posts.filter((post) => {
    const categorySlug = post.category
      ?.toLowerCase()
      .replace(/\s+/g, "-");

    return categorySlug === slug;
  });

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "40px 20px" }}>
      
      <h1 style={{ marginBottom: "20px", textTransform: "capitalize" }}>
        {slug.replace(/-/g, " ")} Posts
      </h1>

      {filteredPosts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredPosts.map((post) => (
            <div key={post.slug} style={{ border: "1px solid #eee", borderRadius: "12px" }}>
              
              <Link href={`/blog/${post.slug}`}>
                {post.image && (
                  <img
                    src={post.image}
                    style={{ width: "100%", height: "160px", objectFit: "cover" }}
                  />
                )}
              </Link>

              <div style={{ padding: "15px" }}>
                <p style={{ fontSize: "12px", color: "#2563eb" }}>
                  {post.category}
                </p>

                <Link href={`/blog/${post.slug}`}>
                  <h3>{post.title}</h3>
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
