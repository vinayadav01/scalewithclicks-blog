import { getPosts } from "@/lib/getPosts";
import BlogCard from "@/components/BlogCard";
import CategorySection from "@/components/CategorySection";

export default function Home() {
  const posts = getPosts();

  const grouped = posts.reduce((acc, post) => {
    const cat = post.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(post);
    return acc;
  }, {});

  return (
    <div className="bg-[#020617] text-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
          Grow Faster with
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Performance Marketing
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Learn Google Ads, SEO, and conversion strategies that actually drive results — not vanity metrics.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/blog"
            className="bg-white text-black px-6 py-3 rounded-md font-medium"
          >
            Explore Blog
          </a>

          <a
            href="https://wa.me/919589188668"
            className="border border-white/20 px-6 py-3 rounded-md hover:bg-white/10 transition"
          >
            Get Free Strategy
          </a>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-3 gap-6">

          {/* Big */}
          <div className="md:col-span-2 bg-[#0b1220] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition">
            <img
              src={posts[0].image}
              className="w-full h-72 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold">{posts[0].title}</h2>
              <p className="text-gray-400 mt-2">{posts[0].description}</p>
            </div>
          </div>

          {/* Side */}
          <div className="flex flex-col gap-4">
            {posts.slice(1, 3).map((post) => (
              <div
                key={post.slug}
                className="bg-[#0b1220] border border-white/10 rounded-xl p-4 hover:border-white/20 transition"
              >
                <h3 className="font-medium text-white">{post.title}</h3>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* CATEGORY SECTIONS */}
      <div className="max-w-6xl mx-auto px-6">
        {Object.keys(grouped).map((cat) => (
          <CategorySection
            key={cat}
            title={cat}
            posts={grouped[cat]}
          />
        ))}
      </div>

      {/* ALL POSTS */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-semibold mb-8">All Articles</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-6 mt-24 mb-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold">
            Want More Leads From Google Ads?
          </h2>
          <p className="mt-2 text-gray-200">
            Get expert help to scale your campaigns profitably.
          </p>

          <a
            href="https://scalewithclicks.com"
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-md font-medium"
          >
            Get Started →
          </a>
        </div>
      </div>

    </div>
  );
}
