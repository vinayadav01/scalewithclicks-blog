import { getPosts } from "@/lib/getPosts";
import BlogCard from "@/components/BlogCard";
import CategorySection from "@/components/CategorySection";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {

  const posts = getPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="p-10 text-center">
        No blog posts found
      </div>
    );
  }

  // GROUP POSTS
  const grouped = posts.reduce((acc, post) => {
    const cat = (post.category || "Other").trim();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(post);
    return acc;
  }, {});

  // FIX 1: stable featured selection
  const featured = posts[0];
  const sidePosts = posts.slice(1, 3);

  // FIX 2: latest posts should NOT duplicate entire dataset visually
  const latestPosts = posts.slice(0, 6);

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">

      {/* HERO */}
      <FadeIn>
        <section className="relative overflow-hidden max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">

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

          <div className="mt-8 flex justify-center gap-4 flex-wrap">

            <Link
              href="/"
              className="bg-black text-white px-6 py-3 rounded-full text-sm hover:scale-105 transition"
            >
              Explore Blog
            </Link>

            <a
              href="https://wa.me/919589188668"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition"
            >
              Free Strategy
            </a>

          </div>

        </section>
      </FadeIn>

      {/* FEATURED */}
      {featured && (
        <FadeIn>
          <section className="max-w-6xl mx-auto px-4 py-12">

            <div className="grid md:grid-cols-3 gap-6">

              {/* MAIN FEATURED */}
              <Link
                href={`/blog/${featured.slug}`}
                className="md:col-span-2 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >

                {featured.image ? (
                  <img
                    src={featured.image}
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
                    alt={featured.title}
                  />
                ) : (
                  <div className="w-full h-[420px] bg-gray-200" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-0 p-6 text-white">

                  {featured.category && (
                    <Link
                      href={`/category/${featured.category
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="inline-block mb-3 text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
                    >
                      {featured.category}
                    </Link>
                  )}

                  <h2 className="text-2xl font-semibold">
                    {featured.title}
                  </h2>

                  <p className="text-gray-200 text-sm mt-2">
                    {featured.description}
                  </p>

                </div>

              </Link>

              {/* SIDE POSTS */}
              <div className="flex flex-col gap-6">

                {sidePosts.map((post) => {

                  const categorySlug = (post.category || "other")
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex gap-5 items-center border border-gray-200 rounded-2xl p-5 h-[200px] hover:shadow-lg transition duration-300"
                    >

                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-28 h-28 object-cover rounded-xl flex-shrink-0 group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-28 h-28 bg-gray-200 rounded-xl flex-shrink-0" />
                      )}

                      <div className="flex-1 overflow-hidden">

                        <div className="mb-2 text-xs text-indigo-600 font-medium">
                          {post.category || "Other"}
                        </div>

                        <h3 className="font-semibold text-gray-900 text-lg leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                          {post.description}
                        </p>

                      </div>

                    </Link>
                  );
                })}

              </div>

            </div>

          </section>
        </FadeIn>
      )}

      {/* CATEGORY SECTIONS */}
      <FadeIn>
        <section className="max-w-6xl mx-auto px-4 py-16 space-y-16">
          {Object.keys(grouped).map((cat) => (
            <CategorySection
              key={cat}
              title={cat}
              posts={grouped[cat]}
            />
          ))}
        </section>
      </FadeIn>

      {/* LATEST ARTICLES (FIXED) */}
      <FadeIn>
        <section className="max-w-6xl mx-auto px-4 py-12">

          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">

            <h2 className="text-2xl font-semibold">
              Latest Articles
            </h2>

            <Link
              href="/"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View All →
            </Link>

          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}

          </div>

        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">

          <div className="rounded-2xl p-12 bg-black text-white relative overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_40%)]" />

            <h2 className="text-3xl font-semibold relative z-10">
              Ready to Scale Your Ads?
            </h2>

            <p className="mt-3 text-gray-300 relative z-10">
              Get a free strategy tailored to your business.
            </p>

            <div className="mt-6 relative z-10">

              <MagneticButton
                href="https://wa.me/919589188668"
                className="bg-white text-black px-6 py-3 rounded-full inline-block"
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
