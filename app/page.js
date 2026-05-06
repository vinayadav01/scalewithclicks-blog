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

      {/* TEST BLOCK */}
      <div className="grid grid-cols-4 gap-4 bg-red-500 text-white p-4">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>

      {/* HERO FEATURED */}
      <div className="mb-16">

        <div className="grid md:grid-cols-3 gap-6">

          {/* Big */}
          <div className="md:col-span-2 bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={posts[0].image}
              className="w-full h-72 object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold">
                {posts[0].title}
              </h2>

              <p className="text-gray-600 mt-2">
                {posts[0].description}
              </p>
            </div>
          </div>

          {/* Side */}
          <div className="flex flex-col gap-4">
            {posts.slice(1, 3).map(post => (
              <div
                key={post.slug}
                className="bg-gray-100 rounded-xl p-4"
              >
                <h3 className="font-semibold">
                  {post.title}
                </h3>
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
        <h2 className="text-2xl font-bold mb-6">
          All Articles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
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
