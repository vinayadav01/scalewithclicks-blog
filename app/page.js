import { getPosts } from "@/lib/getPosts";
import BlogCard from "@/components/BlogCard";
import CategorySection from "@/components/CategorySection";
import Image from "next/image";

export default function Home() {
  const posts = getPosts();

  const grouped = posts.reduce((acc, post) => {
    const cat = post.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(post);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

     <div className="mb-16">
  <div className="grid md:grid-cols-3 gap-6">

    {/* BIG FEATURED */}
    <div className="md:col-span-2 relative rounded-2xl overflow-hidden group">

      <img
        src={posts[0].image}
        className="w-full h-[380px] object-cover group-hover:scale-105 transition duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 p-6 text-white">
        <span className="text-xs bg-white/20 px-2 py-1 rounded">
          {posts[0].category}
        </span>

        <h2 className="text-2xl font-bold mt-2">
          {posts[0].title}
        </h2>

        <p className="text-sm mt-2 text-gray-200">
          {posts[0].description}
        </p>
      </div>
    </div>

    {/* SIDE CARDS */}
    <div className="flex flex-col gap-4">
      {posts.slice(1,3).map(post => (
        <div key={post.slug} className="relative rounded-xl overflow-hidden group">

          <img
            src={post.image}
            className="w-full h-[180px] object-cover group-hover:scale-105 transition duration-500"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-0 p-4 text-white">
            <h3 className="font-semibold text-sm">
              {post.title}
            </h3>
          </div>

        </div>
      ))}
    </div>

  </div>
</div>

      {/* CATEGORY SECTIONS */}
      {Object.keys(grouped).map(cat => (
        <CategorySection
          key={cat}
          title={cat}
          posts={grouped[cat]}
        />
      ))}

      {/* ALL POSTS */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">All Articles</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="mt-20 bg-purple-600 text-white rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold">
          Want More Leads From Google Ads?
        </h2>
        <p className="mt-2">
          Get expert help to scale your campaigns profitably.
        </p>

        <a
          href="https://scalewithclicks.com"
          className="inline-block mt-4 bg-white text-purple-600 px-6 py-2 rounded-full"
        >
          Get Started →
        </a>
      </div>

    </div>
  );
}
