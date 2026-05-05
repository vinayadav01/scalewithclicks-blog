import { getPosts } from "@/lib/getPosts";
import Link from "next/link";

export default function Home() {
  const posts = getPosts() || [];

  if (posts.length === 0) {
    return <div className="p-10">No posts found</div>;
  }

  const featured = posts[0];
  const sidePosts = posts.slice(1, 4);
  const latestPosts = posts.slice(4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* ================= HERO SECTION ================= */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">

        {/* FEATURED BIG */}
        <Link href={`/blog/${featured.slug}`} className="lg:col-span-2 group">
          <div className="relative h-[420px] rounded-2xl overflow-hidden">

            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-0 p-6 text-white">
              <span className="text-xs bg-white/20 px-2 py-1 rounded">
                {featured.category}
              </span>

              <h2 className="text-2xl md:text-3xl font-bold mt-2 leading-tight">
                {featured.title}
              </h2>

              <p className="text-sm mt-2 text-gray-200 line-clamp-2">
                {featured.description}
              </p>
            </div>
          </div>
        </Link>

        {/* SIDE POSTS */}
        <div className="flex flex-col gap-6">
          {sidePosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">

              <div className="flex gap-4 items-center">

                <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div>
                  <p className="text-xs text-purple-600 font-medium">
                    {post.category}
                  </p>

                  <h3 className="text-sm font-semibold leading-snug group-hover:text-purple-600">
                    {post.title}
                  </h3>
                </div>

              </div>

            </Link>
          ))}
        </div>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid lg:grid-cols-4 gap-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-3">

          <h2 className="text-xl font-bold mb-6">Latest Articles</h2>

          <div className="space-y-10">

            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>

                <div className="flex flex-col md:flex-row gap-6 group border-b pb-8">

                  {/* IMAGE */}
                  <div className="md:w-[260px] h-[160px] rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  {/* TEXT */}
                  <div className="flex flex-col justify-between">

                    <div>
                      <p className="text-xs text-purple-600 font-medium">
                        {post.category}
                      </p>

                      <h3 className="text-lg font-semibold mt-1 group-hover:text-purple-600">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {post.description}
                      </p>
                    </div>

                    <span className="text-sm text-gray-500 mt-3">
                      Read →
                    </span>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

        {/* ================= SIDEBAR ================= */}
        <aside className="space-y-6">

          {/* CTA */}
          <div className="p-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl">

            <h4 className="text-lg font-bold">
              Want More Leads?
            </h4>

            <p className="text-sm mt-2 text-white/80">
              Get a free Google Ads strategy tailored to your business.
            </p>

            <a
              href="https://scalewithclicks.com"
              className="block mt-4 bg-white text-purple-600 text-center px-4 py-2 rounded-full font-semibold"
            >
              Get Free Strategy →
            </a>

          </div>

          {/* CATEGORIES */}
          <div className="p-5 border rounded-xl bg-gray-50">
            <h4 className="font-semibold mb-3">Categories</h4>

            <div className="flex flex-wrap gap-2">
              {[...new Set(posts.map(p => p.category))].map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xs bg-white px-3 py-1 rounded-full border hover:bg-purple-50"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
}
