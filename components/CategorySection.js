import BlogCard from "./BlogCard";
import Link from "next/link";

export default function CategorySection({ title, posts = [] }) {

  // ✅ SAFE CATEGORY SLUG
  const categorySlug = (title || "general")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  // ✅ SAFETY CHECK
  if (!posts.length) return null;

  return (
    <div className="mt-16">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {posts.length} article{posts.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* ✅ FIXED CATEGORY LINK */}
        <Link
          href={`/category/${categorySlug}`}
          className="group inline-flex items-center gap-2 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition"
        >
          View More

          <span className="group-hover:translate-x-1 transition">
            →
          </span>
        </Link>

      </div>

      {/* POSTS GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {posts.slice(0, 3).map((post) => (

          <BlogCard
            key={post.slug}
            post={post}
          />

        ))}

      </div>

    </div>
  );
}
