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
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* HERO FEATURED */}
      <div className="mb-20">
        <div className="grid md:grid-cols-3 gap-6">

          {/* 🔥 MAIN FEATURED */}
          <a
            href={`/blog/${posts[0].slug}`}
            className="md:col-span-2 group relative rounded-2xl overflow-hidden block"
          >
            {/* IMAGE */}
            <img
              src={posts[0].image}
              alt={posts[0].title}
              className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-110"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* CONTENT */}
            <div className="absolute bottom-0 p-6 text-white">
              <span className="text-xs uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur">
                {posts[0].category || "Marketing"}
              </span>

              <h2 className="text-2xl md:text-3xl font-semibold mt-3">
                {posts[0].title}
              </h2>

              <p className="text-gray-300 mt-2 text-sm">
                {posts[0].description}
              </p>

              <span className="inline-block mt-4 text-sm text-indigo-300 group-hover:translate-x-1 transition">
                Read article →
              </span>
            </div>
          </a>

          {/* 🔥 SIDE POSTS */}
          <div className="flex flex-col gap-6">
            {posts.slice(1, 3).map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-gray-100 rounded-xl p-5 block hover:shadow-lg transition"
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

                <span className="inline-block mt-3 text-sm text-indigo-600 group-hover:translate-x-1 transition">
                  Read →
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* CATEGORY SECTIONS */}
      {Object.keys(grouped).map((cat) => (
        <CategorySection
          key={cat}
          title={cat}
          posts={grouped[cat]}
        />
      ))}

      {/* ALL POSTS */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">
          All Articles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
            />
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
