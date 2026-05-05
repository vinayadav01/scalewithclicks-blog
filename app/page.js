import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/getPosts";

export default function Home() {
  const posts = getPosts() || [];

  if (posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <p>No blog posts found.</p>
      </div>
    );
  }

  const featured = posts[0];
  const sidePosts = posts.slice(1, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6">Blog</h1>

      {/* Featured Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured</h2>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Main Featured */}
          <div className="md:col-span-2 bg-gray-100 rounded-2xl overflow-hidden">
            {featured.image && (
              <img
                src={featured.image}
                className="w-full h-64 object-cover"
                alt={featured.title}
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold">{featured.title}</h2>
            </div>
          </div>

          {/* Side Featured */}
          <div className="flex flex-col gap-4">
            {sidePosts.map((post) => (
              <div key={post.slug} className="bg-gray-100 rounded-xl p-4">
                <h3 className="font-semibold">{post.title}</h3>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

    </div>
  );
}
