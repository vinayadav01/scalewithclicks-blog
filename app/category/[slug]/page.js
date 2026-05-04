import Link from "next/link";
import { getPosts } from "@/lib/getPosts";
import Navbar from "@/components/Navbar";

export default function CategoryPage({ params }) {
  const category = params.category;

  const posts = getPosts().filter(
    (p) => p.category === category
  );

  return (
    <div style={{ padding: "40px" }}>
      <Navbar />

      <h1>Category: {category}</h1>

      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/blog/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
