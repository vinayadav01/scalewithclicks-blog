export default function BlogCard({ post }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group relative block rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >

      {/* 🔥 Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-tr from-indigo-100/40 via-transparent to-purple-100/40 pointer-events-none" />

      {/* IMAGE (FIXED) */}
      <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">

        {post.image ? (
          <img
            src={post.image}
            alt={post.title || "Blog image"}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}

      </div>

      {/* CONTENT */}
      <div className="p-5 relative z-10">

        {/* CATEGORY */}
        <span className="inline-block text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
          {post.category || "Marketing"}
        </span>

        {/* TITLE */}
        <h3 className="font-semibold text-lg mt-3 leading-snug group-hover:text-indigo-600 transition">
          {post.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {post.description}
        </p>

        {/* CTA */}
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600">
          <span className="transition group-hover:translate-x-1">
            Read article
          </span>
          <span className="transition group-hover:translate-x-1">→</span>
        </div>

      </div>

    </a>
  );
}
