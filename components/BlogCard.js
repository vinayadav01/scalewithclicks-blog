import Link from "next/link";

export default function BlogCard({ post }) {
  if (!post) return null;

  const categorySlug = post.category
    ? post.category.toLowerCase().replace(/\s+/g, "-")
    : "other";

  return (
    <article className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">

      {/* IMAGE */}
      <Link href={`/blog/${post.slug}`}>
        <div className="relative w-full h-[180px] overflow-hidden">

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

          {/* CATEGORY BADGE */}
          <div className="absolute top-3 left-3">
            <span className="text-[11px] bg-white text-purple-600 px-3 py-1 rounded-full font-medium shadow">
              {post.category || "General"}
            </span>
          </div>

          {/* GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4">

        {/* TITLE */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-semibold leading-snug group-hover:text-purple-600 transition line-clamp-2">
            {post.title || "Untitled"}
          </h2>
        </Link>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {post.description || ""}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-4">

          {/* CATEGORY LINK */}
          <Link href={`/category/${categorySlug}`}>
            <span className="text-xs text-purple-600 font-medium hover:underline">
              {post.category || "General"}
            </span>
          </Link>

          {/* CTA */}
          <Link href={`/blog/${post.slug}`}>
            <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition">
              Read →
            </span>
          </Link>

        </div>
      </div>
    </article>
  );
}
