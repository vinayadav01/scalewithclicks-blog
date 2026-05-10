import { getPosts } from "@/lib/getPosts";
import BlogCard from "@/components/BlogCard";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function BlogPage() {

  const posts = getPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="p-10 text-center">
        No blog posts found
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-4 py-16">

        <h1 className="text-4xl font-semibold mb-4">
          All Blog Posts
        </h1>

        <p className="text-gray-600 mb-10">
          Explore all articles on performance marketing, SEO, and growth strategies.
        </p>

        {/* GRID */}
        <FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}

          </div>
        </FadeIn>

      </section>

    </div>
  );
}
