import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/getPosts";
import Image from "next/image";

export const dynamic = "force-static";

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

const headings = [];

const headingRegex = /<h([2-3]) id="(.*?)">(.*?)<\/h\1>/g;

let match;
while ((match = headingRegex.exec(contentHtml)) !== null) {
  headings.push({
    id: match[2],
    text: match[3].replace(/<[^>]+>/g, ""),
  });
}

  // ✅ SMART FAQ EXTRACTION
 const faqs = [];

const faqRegex = /<h3.*?>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g;

let faqMatch;
while ((faqMatch = faqRegex.exec(contentHtml)) !== null) {
  faqs.push({
    question: faqMatch[1].replace(/<[^>]+>/g, ""),
    answer: faqMatch[2].replace(/<[^>]+>/g, ""),
  });
}

  // ✅ RELATED POSTS
  const posts = getPosts() || [];

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

      {/* BREADCRUMB */}
      <p className="text-sm text-gray-500 mb-4">
        <a href="/" className="hover:underline">Home</a> /
        <a href="/" className="hover:underline ml-1">Blog</a> /
        <span className="ml-1 text-gray-700">{data.title}</span>
      </p>

      {/* TOC */}
      {headings.length > 0 && (
        <div className="sticky top-24 mb-10 p-5 bg-gray-50 rounded-xl border">
          <h3 className="font-bold mb-3">Table of Contents</h3>

          <ul className="space-y-2 text-sm">
            {headings.map((h, i) => (
              <li key={i}>
                <a
                  href={`#${h.id}`}
                  className="text-purple-600 hover:underline"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>

      {/* IMAGE */}
    {data.image && (
  <div className="relative w-full h-[400px] mb-6 overflow-hidden rounded-xl">
    <img
      src={data.image}
      alt={data.title}
      className="w-full h-full object-cover"
    />
  </div>
)}

      {/* CONTENT */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* RELATED POSTS */}
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

      {/* AUTHOR BOX */}
      <div className="mt-16 p-6 border rounded-xl bg-gray-50">
        <h4 className="font-bold text-lg">About the Author</h4>

        <p className="text-sm text-gray-600 mt-2">
          Vinay Yadav is a performance marketing expert specializing in Google Ads
          and lead generation strategies. He helps businesses scale profitable campaigns.
        </p>
      </div>

      {/* BLOG SCHEMA */}
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

      {/* BREADCRUMB SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://scalewithclicks.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://blog.scalewithclicks.com",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: data.title,
              },
            ],
          }),
        }}
      />

      {/* FAQ SCHEMA */}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

    </div>
  );
}
