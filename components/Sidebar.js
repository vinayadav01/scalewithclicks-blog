import Link from "next/link";

export default function Sidebar({ posts }) {
  const categories = [...new Set(posts.map(p => p.category))];

  return (
    <aside className="space-y-8">

      {/* Popular Posts */}
      <div className="bg-white rounded-2xl p-5 shadow">
        <h3 className="font-bold text-lg mb-4">Popular Posts</h3>

        <div className="space-y-3">
          {posts.slice(0, 5).map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <p className="text-sm hover:text-purple-600 cursor-pointer">
                {post.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl p-5 shadow">
        <h3 className="font-bold text-lg mb-4">Categories</h3>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-purple-100 cursor-pointer">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
}
