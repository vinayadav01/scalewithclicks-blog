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
    console.error(err);
    posts = [];
  }

  // GROUPING
  const grouped = {};
  posts.forEach((post) => {
    const cat = post?.category || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(post);
  });

  const featured = posts[0];
  const secondary = posts.slice(1, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-4 gap-10">

      {/* MAIN */}
      <div className="lg:col-span-3">

        {/* HERO SECTION */}
        {featured && (
          <div className="mb-16 grid md:grid-cols-3 gap-6">

            {/* BIG FEATURE */}
            <Link href={`/blog/${featured.slug}`}>
              <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">

                <div className="w-full h-[350px] overflow-hidden">
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-0 p-6 text-white">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {featured.category}
                  </span>

                  <h2 className="text-2xl font-bold mt-2">
                    {featured.title}
                  </h2>

                  <p className="text-sm mt-2 text-gray-200 line-clamp-2">
                    {featured.description}
                  </p>
                </div>

              </div>
            </Link>

            {/* SIDE POSTS */}
            <div className="flex flex-col gap-4">
              {secondary.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="flex gap-4 items-center group cursor-pointer">

                    <div className="w-24 h-20 overflow-hidden rounded-lg">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold group-hover:text-purple-600 transition line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {post.category}
                      </p>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

          </div>
        )}

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
          <h2 className="text-2xl font-bold mb-6">All Articles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-10 rounded-3xl text-center">

          <h2 className="text-3xl font-bold">
            Want More Leads from Google Ads?
          </h2>

          <p className="mt-3 text-white/80">
            Stop wasting budget. Get high-converting campaigns built for growth.
          </p>

          <a
            href="https://scalewithclicks.com"
            className="inline-block mt-6 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Get Free Strategy →
          </a>

        </div>

      </div>

      {/* SIDEBAR */}
      <Sidebar posts={posts} />

    </div>
  );
}
