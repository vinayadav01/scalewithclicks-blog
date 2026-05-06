import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="group bg-[#0b1220] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition">

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="p-5">
          <p className="text-xs text-gray-400 mb-2">{post.category}</p>

          <h3 className="text-white font-semibold text-lg group-hover:text-indigo-400 transition">
            {post.title}
          </h3>

          <p className="text-gray-400 text-sm mt-2 line-clamp-2">
            {post.description}
          </p>
        </div>

      </div>
    </Link>
  );
}
