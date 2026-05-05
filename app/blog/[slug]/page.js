import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/getPosts"; // or getAllPosts (match your export)

// ✅ generate static paths
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: file.replace(/\.(md|mdx)$/, ""),
  }));
}

// ✅ MAIN BLOG PAGE
export default async function BlogPost({ params }) {
  const { slug } = params;

  if (!slug) return notFound();

  const mdPath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  const mdxPath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  let filePath = "";

  if (fs.existsSync(mdPath)) filePath = mdPath;
  else if (fs.existsSync(mdxPath)) filePath = mdxPath;
  else return notFound();

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  // ✅ get all posts for related section
  const posts = getPosts(); // or getAllPosts()
  const currentPost = {
    slug,
    ...data,
  };

  const relatedPosts = posts
    .filter(
      (p) =>
        p.category === currentPost.category &&
        p.slug !== currentPost.slug
    )
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>

      {/* Image */}
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full rounded-xl mb-6"
        />
      )}

      {/* Content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <>
          <h3 className="text-xl font-bold mt-16 mb-4">
            Related Articles
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: data.title,
            description: data.description,
            image: data.image,
            author: {
              "@type": "Person",
              name: "Vinay Yadav",
            },
            publisher: {
              "@type": "Organization",
              name: "ScaleWithClicks",
            },
            datePublished: data.date,
          }),
        }}
      />

    </div>
  );
}
