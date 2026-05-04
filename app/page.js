import Link from "next/link";
import { getPosts } from "../lib/getPosts";
import Navbar from "@/components/Navbar";

export default function Home() {
  const posts = getPosts();

  return (
    <div style={{ padding: "40px" }}>
      <Navbar />

      <h1>Blog</h1>

      {posts.map((post) => (
        <div key={post.slug} style={{ marginBottom: "20px" }}>
          <Link href={`/blog/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}
