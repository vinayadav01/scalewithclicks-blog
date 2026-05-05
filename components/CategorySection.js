import BlogCard from "./BlogCard";
import Link from "next/link";

export default function CategorySection({ title, posts }) {
  return (
    <div className="mt-16">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>

        <Link href={`/category/${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <span className="text-purple-600 text-sm">
            View More →
          </span>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

    </div>
  );
}
