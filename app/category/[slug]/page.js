import { getPosts } from "@/lib/getPosts";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

// ✅ Generate SEO pages
export async function generateStaticParams() {

  const posts = getPosts();

  const categories = [
    ...new Set(
      posts.map((post) =>
        (post.category || "general")
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
      )
    ),
  ];

  return categories.map((slug) => ({
    slug,
  }));
}

// ✅ Dynamic SEO
export async function generateMetadata(props) {

  const params = await props.params;

  const slug = params?.slug || "category";

  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${title} Blogs | ScaleWithClicks`,
    description: `Read the latest ${title} articles and growth strategies.`,
  };
}

// ✅ PAGE
export default async function CategoryPage(props) {

  // ✅ FIX PARAMS
  const params = await props.params;

  const categorySlug = params?.slug || "";

  const posts = getPosts();

  // ✅ FILTER POSTS
  const filteredPosts = posts.filter((post) => {

    const normalizedCategory = (post.category || "general")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    return normalizedCategory === categorySlug;
  });

  // ✅ SORT LATEST FIRST
  filteredPosts.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // ✅ PAGE TITLE
  const categoryTitle = categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">

        <Link href="/" className="hover:text-indigo-600">
          Home
        </Link>

        <span>/</span>

        <span className="text-gray-900">
          {categoryTitle}
        </span>

      </div>

      {/* HEADING */}
      <div className="mb-12">

        <h1 className="text-4xl font-bold text-gray-900">
          {categoryTitle}
        </h1>

        <p className="text-gray-600 mt-3">
          Explore the latest articles in {categoryTitle}.
        </p>

      </div>

      {/* POSTS */}
      {filteredPosts.length > 0 ? (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredPosts.map((post) => (

            <BlogCard
              key={post.slug}
              post={post}
            />

          ))}

        </div>

      ) : (

        <div className="text-center py-20 border border-dashed border-gray-300 rounded-2xl">

          <h2 className="text-2xl font-semibold text-gray-800">
            No articles found
          </h2>

          <p className="text-gray-500 mt-3">
            No blog posts available in this category yet.
          </p>

        </div>

      )}

    </div>
  );
}
