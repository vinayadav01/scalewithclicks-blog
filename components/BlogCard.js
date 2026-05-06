export default function BlogCard({ post }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group relative block rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >

      {/* 🔥 Glow Hover Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-tr from-indigo-100/40 via-transparent to-purple-100/40 pointer-events-none" />

      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-52 object-cover transition duration-700 group-hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* Category Badge */}
        <span className="inline-block text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
          {post.category || "Marketing"}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-lg mt-3 leading-snug group-hover:text-indigo-600 transition">
          {post.title}
        </h3>

        {/* Description */}
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

      {/* 🔥 Bottom subtle gradient line */}
      <div className="h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500" />

    </a>
  );
}
