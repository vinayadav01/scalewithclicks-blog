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
    <div className="bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight max-w-3xl mx-auto">
          Grow Your Business with{" "}
          <span className="text-indigo-600">Google Ads & SEO</span>
        </h1>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Actionable marketing strategies, case studies, and proven tactics to
          scale your campaigns profitably.
        </p>

        <a
          href="https://scalewithclicks.com"
          className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition"
        >
          Get Free Strategy →
        </a>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">

          {/* MAIN */}
          <a
            href={`/blog/${posts[0].slug}`}
            className="md:col-span-2 group relative rounded-2xl overflow-hidden"
          >
            <img
              src={posts[0].image}
              alt={posts[0].title}
              className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-0 p-6 text-white">
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur">
                {posts[0].category || "Marketing"}
              </span>

              <h2 className="text-2xl md:text-3xl font-semibold mt-3">
                {posts[0].title}
              </h2>

              <p className="text-gray-200 mt-2 text-sm">
                {posts[0].description}
              </p>
            </div>
          </a>

          {/* SIDE */}
          <div className="flex flex-col gap-6">
            {posts.slice(1, 3).map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border rounded-xl p-5 hover:shadow-md transition"
              >
                <p className="text-xs text-gray-500 mb-1">
                  {post.category || "Marketing"}
                </p>

                <h3 className="font-semibold text-lg group-hover:text-indigo-600 transition">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  {post.description}
                </p>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ================= CATEGORY SECTIONS ================= */}
      <section className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {Object.keys(grouped).map((cat) => (
          <CategorySection
            key={cat}
            title={cat}
            posts={grouped[cat]}
          />
        ))}
      </section>

      {/* ================= ALL POSTS ================= */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-8">
          Latest Articles
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-12">

          <h2 className="text-3xl font-semibold">
            Want More Leads From Google Ads?
          </h2>

          <p className="mt-3 text-white/90">
            Get a free strategy tailored to your business.
          </p>

          <a
            href="https://wa.me/919589188668"
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition"
          >
            Book Free Call →
          </a>

        </div>
      </section>

    </div>
  );
}
