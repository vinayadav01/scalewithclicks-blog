import Link from "next/link";
import { getPosts } from "../lib/getPosts";

export const dynamic = "force-dynamic";

export default function Home() {
  const posts = getPosts();

  if (!posts.length) {
    return <div style={{ padding: "40px" }}>No blog posts found</div>;
  }

  const featuredPost = posts[0];
  const restPosts = posts.slice(1);

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "40px 20px" }}>

      <h1 style={{ textAlign: "center" }}>
        Digital Marketing Tips to Grow Your Business
      </h1>

      {/* FEATURED */}
      <Link href={`/blog/${featuredPost.slug}`}>
        <h2>{featuredPost.title}</h2>
      </Link>

      {/* LIST */}
      {restPosts.map((post) => (
        <div key={post.slug}>
          <Link href={`/blog/${post.slug}`}>
            <h3>{post.title}</h3>
          </Link>
        </div>
      ))}

    </div>
  );
}
