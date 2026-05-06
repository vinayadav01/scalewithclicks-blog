import { getPosts } from "@/lib/getPosts";
import { notFound } from "next/navigation";
import TableOfContents from "@/components/TableOfContents";

export default function BlogPost({ params }) {
  const posts = getPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  const related = posts
    .filter(
      (p) => p.category === post.category && p.slug !== post.slug
    )
    .slice(0, 3);

  return (
    <div className="bg-white text-gray-900">

      {/* HERO */}
      <div className="relative">
        <img
          src={post.image}
          className="w-full h-[420px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
        <div className="absolute bottom-0 max-w-6xl mx-auto px-6 pb-10 text-white">
          <p className="text-sm opacity-80">
            {post.category} • {post.readingTime}
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold mt-2">
            {post.title}
          </h1>

          <p className="mt-3 text-gray-200 max-w-2xl">
            {post.description}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-12">

        <article className="lg:col-span-3">
          <div
            className="prose max-w-none prose-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents toc={post.toc} />
          </div>
        </aside>

      </div>

      {/* RELATED */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-semibold mb-6">
          Related Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {related.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="border rounded-xl p-5 hover:shadow-lg transition"
            >
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-gray-600 text-sm mt-2">
                {post.description}
              </p>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
