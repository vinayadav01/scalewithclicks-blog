import { getPosts } from "@/lib/getPosts";
import BlogCard from "@/components/BlogCard";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}

        </div>

      </section>

    </div>
  );
}
