import { getPosts } from "@/lib/getPosts";
import BlogCard from "@/components/BlogCard";
import CategorySection from "@/components/CategorySection";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Home() {
  let posts = [];

  try {
    const data = getPosts();
    posts = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error loading posts:", err);
    posts = [];
  }

  const grouped = {};
  posts.forEach((post) => {
    const cat = post?.category || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(post);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-4 gap-10">

      {/* ================= MAIN CONTENT ================= */}
      <div className="lg:col-span-3">

        {/* 🔥 HERO SECTION */}
        {posts.length > 0 && (
          <div className="mb-16">
            <div className="relative rounded-3xl overflow-hidden group">

              <img
                src={posts[0]?.image}
                alt={posts[0]?.title}
                className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute bottom-0 p-8 text-white max-w-2xl">
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                  {posts[0]?.category}
                </span>

                <h1 className="text-3xl md:text-4xl font-bold mt-3 leading-tight">
                  {posts[0]?.title}
                </h1>

                <p className="text-gray-200 mt-3 line-clamp-2">
                  {posts[0]?.description}
                </p>

                <Link href={`/blog/${posts[0]?.slug}`}>
                  <span className="inline-block mt-5 bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition">
                    Read Full Article →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 🔥 TRENDING POSTS */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">🔥 Trending Articles</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {posts.slice(1, 4).map((post, i) => (
              <BlogCard key={post?.slug || i} post={post} />
            ))}
          </div>
        </div>

        {/* 🔥 CATEGORY AUTHORITY SECTIONS */}
        {Object.keys(grouped).map((cat) => (
          <CategorySection
            key={cat}
            title={cat}
            posts={grouped[cat]}
          />
        ))}

        {/* 🔥 ALL POSTS */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">📚 All Articles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <BlogCard key={post?.slug || i} post={post} />
            ))}
          </div>
        </div>

        {/* 🔥 CTA (CONVERSION BOOST) */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-12 text-center shadow-lg">

          <h2 className="text-3xl font-bold">
            Want More Leads From Google Ads?
          </h2>

          <p className="mt-3 text-white/80">
            Get proven strategies that actually convert — no wasted budget.
          </p>

          <a
            href="https://scalewithclicks.com"
            className="inline-block mt-6 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Get Free Strategy Call →
          </a>
        </div>

      </div>

      {/* ================= SIDEBAR ================= */}
      <Sidebar posts={posts} />

    </div>
  );
}
