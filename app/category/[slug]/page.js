import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function CategoryPage({ params }) {
  const slug = params.slug || "";

  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) {
    return <div style={{ padding: "40px" }}>No posts found</div>;
  }

  const files = fs.readdirSync(dir);

 const normalize = (str) =>
  str
    ?.toString()
    .normalize("NFKD") // 🔥 removes hidden unicode issues
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const posts = files
    .map((filename) => {
      try {
        const filePath = path.join(dir, filename);
        const file = fs.readFileSync(filePath, "utf8");
        const { data } = matter(file);

        return {
          slug: filename.replace(/\.(md|mdx)$/, ""),
          title: data.title || "No title",
          date: data.date || "",
          image: data.image || "/images/default.jpg",
          category: data.category || "general",
          normalizedCategory: normalize(data.category || "general"),
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean);

const currentSlug = normalize(slug);

  const filteredPosts = posts.filter(
    (post) => normalize(post.category) === currentSlug
  );

  // 👇 FEATURED POST (first one)
  const featured = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);

  return (
    <div className="category-layout">

      {/* LEFT SIDEBAR */}
      <aside className="category-sidebar">
        <div className="category-sidebar-inner">
          <p className="category-label">CATEGORY</p>
          <h2>{slug.replace(/-/g, " ")}</h2>

          <p className="category-desc">
            Explore all articles related to {slug.replace(/-/g, " ")}.
          </p>

          <hr />

          <p className="category-count">
            {filteredPosts.length} Articles
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="category-content">

        {/* FEATURED POST */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="featured-card">
            <Image
              src={featured.image}
              alt={featured.title}
              width={900}
              height={400}
            />
            <div className="featured-overlay">
              <h2>{featured.title}</h2>
              <p>{featured.date}</p>
            </div>
          </Link>
        )}

        {/* GRID POSTS */}
        <div className="category-grid">
          {restPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="category-card"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={200}
              />

              <div className="card-body">
                <p className="card-category">{post.category}</p>
                <h3>{post.title}</h3>
                <span>{post.date}</span>
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}
