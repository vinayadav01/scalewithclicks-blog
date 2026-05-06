export default function BlogCard({ post }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-transparent"
    >
      {/* IMAGE */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">
          {post.category || "Marketing"}
        </p>

        <h3 className="font-semibold text-lg mt-1 group-hover:text-indigo-600 transition">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {post.description}
        </p>

        {/* CTA */}
        <span className="inline-block mt-3 text-sm font-medium text-indigo-600 transition group-hover:translate-x-1">
          Read article →
        </span>
      </div>
    </a>
  );
}
