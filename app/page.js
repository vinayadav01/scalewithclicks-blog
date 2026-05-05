import { getPosts } from "@/lib/getPosts";
import BlogCard from "@/components/BlogCard";
import CategorySection from "@/components/CategorySection";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  let posts = [];

  // ✅ SAFE FETCH
  try {
    const data = getPosts();
    posts = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error loading posts:", err);
    posts = [];
  }

  // ✅ GROUPING
  const grouped = {};
  posts.forEach((post) => {
    const cat = post?.category || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(post);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-4 gap-10">

      {/* MAIN CONTENT */}
      <div className="lg:col-span-3">

        {/* FEATURED */}
        {posts.length > 0 && (
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-6">

              {/* BIG POST */}
              <div className="md:col-span-2 relative rounded-2xl overflow-hidden group">

                {posts[0]?.image ? (
                  <img
                    src={posts[0].image}
                    alt={posts[0]?.title || "blog image"}
                    className="w-full h-[320px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[320px] bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-0 p-6 text-white">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {posts[0]?.category || "General"}
                  </span>

                  <h2 className="text-2xl font-bold mt-2">
                    {posts[0]?.title || "Untitled"}
                  </h2>

                  <p className="text-sm mt-2 text-gray-200">
                    {posts[0]?.description || ""}
                  </p>
                </div>
              </div>

              {/* SIDE POSTS */}
              <div className="flex flex-col gap-4">
                {posts.slice(1, 3).map((post, i) => (
                  <div
                    key={post?.slug || i}
                    className="relative rounded-xl overflow-hidden group"
                  >
                    {post?.image ? (
                      <img
                        src={post.image}
                        alt={post?.title || "blog image"}
                        className="w-full h-[150px] object-cover"
                      />
                    ) : (
                      <div className="w-full h-[150px] bg-gray-200 flex items-center justify-center">
                        No Image
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute bottom-0 p-4 text-white">
                      <h3 className="font-semibold text-sm">
                        {post?.title || "Untitled"}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* CATEGORY */}
        {Object.keys(grouped).map((cat) => (
          <CategorySection
            key={cat}
            title={cat}
            posts={grouped[cat] || []}
          />
        ))}

        {/* ALL POSTS */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">All Articles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <BlogCard key={post?.slug || i} post={post} />
            ))}
          </div>
        </div>

      </div>

      {/* SIDEBAR */}
      <Sidebar posts={posts} />

    </div>
  );
}
