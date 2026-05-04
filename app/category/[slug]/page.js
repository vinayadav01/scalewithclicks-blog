import { getPosts } from "../../../lib/getPosts";
import Link from "next/link";

export default function CategoryPage({ params }) {
  const { slug } = params;

  const posts = getPosts().filter(
    (post) =>
      post.category.toLowerCase().replace(/\s+/g, "-") === slug
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "40px" }}>
      <h1 style={{ marginBottom: "30px" }}>
        Category: {slug.replace(/-/g, " ")}
      </h1>

      {posts.map((post) => (
        <div key={post.slug} style={{ marginBottom: "20px" }}>
          <Link href={`/blog/${post.slug}`}>
            <h3>{post.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
