import Link from "next/link";

export default function BlogCard({ post }) {
  if (!post) return null;

  const categorySlug = post.category
    ? post.category.toLowerCase().replace(/\s+/g, "-")
    : "other";

  return (
    <div className="group bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      {/* IMAGE */}
      <div className="relative w-full h-[200px] overflow-hidden">

        {post.image ? (
          <img
            src={post.image}
            alt={post.title || "blog image"}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm">
            No Image
          </div>
        )}

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* CATEGORY */}
        <Link href={`/category/${categorySlug}`}>
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded cursor-pointer hover:bg-purple-200">
            {post.category || "General"}
          </span>
        </Link>

        {/* TITLE */}
        <h2 className="text-lg font-semibold mt-3 leading-snug group-hover:text-purple-600 transition">
          {post.title || "Untitled"}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {post.description || ""}
        </p>

        {/* READ MORE */}
        <Link href={`/blog/${post.slug}`}>
          <span className="inline-block mt-4 text-sm text-purple-600 font-medium hover:underline">
            Read Article →
          </span>
        </Link>

      </div>
    </div>
  );
}
