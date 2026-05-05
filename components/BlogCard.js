import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">

      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
          {post.category}
        </span>

        <h2 className="text-lg font-semibold mt-2 leading-snug">
          {post.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {post.description}
        </p>

        <Link href={`/blog/${post.slug}`}>
          <span className="text-purple-600 text-sm mt-2 inline-block">
            Read More →
          </span>
        </Link>
      </div>
    </div>
  );
}
