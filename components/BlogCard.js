import Link from "next/link";

<Link href={`/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}>
  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
    {post.category}
  </span>
</Link>

export default function BlogCard({ post }) {
  return (
    <div className="group bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1">

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">

        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
          {post.category}
        </span>

        <h2 className="text-lg font-semibold mt-3 leading-snug group-hover:text-purple-600 transition">
          {post.title}
        </h2>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {post.description}
        </p>

        <Link href={`/blog/${post.slug}`}>
          <span className="inline-block mt-4 text-sm text-purple-600 font-medium">
            Read Article →
          </span>
        </Link>
      </div>
    </div>
  );
}
