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

// ================= STATIC PATHS =================
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: file.replace(/\.(md|mdx)$/, ""),
  }));
}

// ================= MAIN =================
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

  // ================= MARKDOWN =================
  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  // ================= TOC =================
  const headings = [];
  const headingRegex = /<h([2-3]) id="(.*?)">(.*?)<\/h\1>/g;

  let match;
  while ((match = headingRegex.exec(contentHtml)) !== null) {
    headings.push({
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ""),
    });
  }

  // ================= FAQ =================
  const faqs = [];
  const faqRegex = /<h3.*?>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g;

  let faqMatch;
  while ((faqMatch = faqRegex.exec(contentHtml)) !== null) {
    faqs.push({
      question: faqMatch[1].replace(/<[^>]+>/g, ""),
      answer: faqMatch[2].replace(/<[^>]+>/g, ""),
    });
  }

  // ================= RELATED =================
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
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-4 gap-10">

      {/* ================= MAIN ================= */}
      <article className="lg:col-span-3">

        {/* BREADCRUMB UI */}
        <p className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:underline">Home</a> /
          <a href="/" className="ml-1 hover:underline">Blog</a> /
          <span className="ml-1 text-gray-700">{data.title}</span>
        </p>

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          {data.title}
        </h1>

        {/* IMAGE */}
        {data.image && (
          <div className="relative w-full h-[420px] mb-8 rounded-2xl overflow-hidden">
            <Image
              src={data.image}
              alt={data.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* CONTENT */}
        <div
          className="prose prose-lg max-w-none
          prose-headings:scroll-mt-28
          prose-a:text-purple-600
          prose-img:rounded-xl
          prose-h2:mt-10
          prose-h3:mt-8"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* INLINE CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl text-center">
          <h3 className="text-2xl font-bold">
            Want Better Results from Google Ads?
          </h3>
          <p className="mt-2 text-white/80">
            Stop wasting budget. Start scaling profitably.
          </p>
          <a
            href="https://scalewithclicks.com"
            className="inline-block mt-4 bg-white text-purple-600 px-6 py-2 rounded-full font-semibold"
          >
            Get Free Strategy →
          </a>
        </div>

        {/* RELATED */}
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

        {/* AUTHOR */}
        <div className="mt-16 p-6 border rounded-xl bg-gray-50">
          <h4 className="font-bold text-lg">About the Author</h4>
          <p className="text-sm text-gray-600 mt-2">
            Vinay Yadav is a performance marketing expert specializing in Google Ads and lead generation.
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

      </article>

      {/* ================= SIDEBAR ================= */}
      <aside className="hidden lg:block">

        {/* TOC */}
        {headings.length > 0 && (
          <div className="sticky top-24 mb-6 p-5 border rounded-xl bg-gray-50">
            <h4 className="font-semibold mb-3">Table of Contents</h4>

            <ul className="text-sm space-y-2">
              {headings.map((h, i) => (
                <li key={i}>
                  <a
                    href={`#${h.id}`}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SIDEBAR CTA */}
        <div className="p-5 bg-purple-600 text-white rounded-xl">
          <h4 className="font-bold">Need More Leads?</h4>
          <p className="text-sm mt-2 text-white/80">
            Get expert help with high-converting campaigns.
          </p>
          <a
            href="https://scalewithclicks.com"
            className="inline-block mt-3 bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-semibold"
          >
            Book Free Call →
          </a>
        </div>

      </aside>

    </div>
  );
}
