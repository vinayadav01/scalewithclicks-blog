import Link from "next/link";
import { getPosts } from "@/lib/getPosts";

export default function Home() {
  const posts = getPosts() || [];

  if (!posts.length) {
    return <div className="p-10">No posts</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* ================= FEATURED ================= */}
      <h2 className="text-lg font-semibold mb-6">▶ FEATURED</h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* BIG CARD */}
        <Link href={`/blog/${posts[0].slug}`}>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">

            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
              {posts[0].category}
            </span>

            <div className="mt-4 grid md:grid-cols-2 gap-4 items-center">

              {/* TEXT */}
              <div>
                <h2 className="text-xl font-bold leading-snug">
                  {posts[0].title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {posts[0].description}
                </p>
              </div>

              {/* IMAGE (FIXED HEIGHT) */}
              <div className="relative w-full h-[160px] overflow-hidden rounded-xl">
                <img
                  src={posts[0].image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </Link>

        {/* RIGHT SMALL CARDS */}
        <div className="flex flex-col gap-6">

          {posts.slice(1, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">

                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                  {post.category}
                </span>

                <div className="mt-3 flex gap-4">

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {post.title}
                    </h3>
                  </div>

                  <div className="w-[90px] h-[70px] overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>
              </div>
            </Link>
          ))}

        </div>

        {/* SIDE TEXT LIST */}
        <div className="flex flex-col gap-6">

          {posts.slice(3, 6).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="flex gap-3 items-start">

                <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                  <img src={post.image} className="w-full h-full object-cover" />
                </div>

                <div>
                  <h4 className="text-sm font-medium line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    2 min read
                  </p>
                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>

      {/* ================= SECTION ================= */}
      <div className="mt-16">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">▶ PERFORMANCE</h2>
          <span className="text-sm text-gray-500 cursor-pointer">
            View More →
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {posts.slice(0, 6).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

                <div className="h-[180px] overflow-hidden">
                  <img
                    src={post.image}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {post.title}
                  </h3>
                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}
