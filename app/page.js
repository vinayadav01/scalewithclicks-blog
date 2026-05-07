import { getPosts } from "@/lib/getPosts";
import BlogCard from "@/components/BlogCard";
import CategorySection from "@/components/CategorySection";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";

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

      {/* ===== HERO ===== */}
      <FadeIn>
        <section className="relative max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">

          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight max-w-3xl mx-auto">
            Performance Marketing That
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Actually Drives Revenue
            </span>
          </h1>

          <p className="text-gray-600 mt-6 max-w-xl mx-auto text-lg">
            Learn how to scale Google Ads, SEO, and conversion systems with real strategies—not theory.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/"
              className="bg-black text-white px-6 py-3 rounded-full text-sm hover:scale-105 transition"
            >
              Explore Blog
            </a>

            <a
              href="https://wa.me/919589188668"
              className="border border-gray-300 px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition"
            >
              Free Strategy
            </a>
          </div>

        </section>
      </FadeIn>

      {/* ===== FEATURED ===== */}
      {posts.length > 0 && (
        <FadeIn>
          <section className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-6">

              {/* Main Featured */}
              <a
                href={`/blog/${posts[0].slug}`}
                className="md:col-span-2 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                <img
                  src={posts[0].image}
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
                  alt={posts[0].title}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-0 p-6 text-white">
                  <h2 className="text-2xl font-semibold">{posts[0].title}</h2>
                  <p className="text-gray-200 text-sm mt-2">
                    {posts[0].description}
                  </p>
                </div>
              </a>

              {/* Side Blogs */}
              <div className="flex flex-col gap-6">

                {posts.slice(1, 3).map((post) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex gap-5 items-center border border-gray-200 rounded-2xl p-5 h-[200px] hover:shadow-lg transition duration-300"
                  >

                    {/* IMAGE */}
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-28 h-28 object-cover rounded-xl flex-shrink-0 group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-28 h-28 bg-gray-200 rounded-xl flex-shrink-0" />
                    )}

                    {/* TEXT */}
                    <div className="flex-1">

                      <h3 className="font-semibold text-gray-900 text-lg leading-snug group-hover:text-indigo-600 transition">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm mt-2 leading-6 max-h-[4.5rem] overflow-hidden">
                        {post.description}
                      </p>

                    </div>

                  </a>
                ))}

              </div>

            </div>
          </section>
        </FadeIn>
      )}

      {/* ===== CATEGORY ===== */}
      <FadeIn>
        <section className="max-w-6xl mx-auto px-4 py-16 space-y-16">
          {Object.keys(grouped).map((cat) => (
            <CategorySection key={cat} title={cat} posts={grouped[cat]} />
          ))}
        </section>
      </FadeIn>

      {/* ===== GRID ===== */}
      <FadeIn>
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold mb-8">Latest Articles</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ===== CTA ===== */}
      <FadeIn>
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="rounded-2xl p-12 bg-black text-white">

            <h2 className="text-3xl font-semibold">
              Ready to Scale Your Ads?
            </h2>

            <p className="mt-3 text-gray-300">
              Get a free strategy tailored to your business.
            </p>

            <div className="mt-6">
              <MagneticButton
                href="https://wa.me/919589188668"
                className="bg-white text-black px-6 py-3 rounded-full"
              >
                Book Free Call →
              </MagneticButton>
            </div>

          </div>
        </section>
      </FadeIn>

    </div>
  );
}
