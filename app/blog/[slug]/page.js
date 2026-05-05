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
  const slug = params?.slug;

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

  // ================= READING TIME =================
  const words = content.replace(/[#_*>\-\n]/g, "").split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

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

  const relatedPosts = posts
    .filter((p) => p.category === data.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-4 gap-10">

      {/* PROGRESS BAR */}
      <div
        id="progress-bar"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-purple-600 to-indigo-600 z-50"
        style={{ width: "0%" }}
      />

      {/* ================= MAIN ================= */}
      <article className="lg:col-span-3">

        {/* BREADCRUMB */}
        <p className="text-sm text-gray-500 mb-4">
          <a href="/">Home</a> / <a href="/">Blog</a> / {data.title}
        </p>

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {data.title}
        </h1>

        {/* META */}
        <p className="text-sm text-gray-500 mb-6">
          {data.date} • {readingTime} min read
        </p>

        {/* FEATURED SNIPPET */}
        {data.description && (
          <div className="mb-6 p-5 bg-purple-50 border-l-4 border-purple-600 rounded-lg text-gray-800">
            {data.description}
          </div>
        )}

        {/* IMAGE (FIXED SIZE ISSUE) */}
        {data.image && (
          <div className="relative w-full aspect-[16/9] max-h-[420px] mb-8 rounded-xl overflow-hidden">
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

        {/* CTA 1 */}
        <div className="mt-10 p-6 bg-purple-50 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-700">
            Want better results from your ads?
          </p>
          <a
            href="https://scalewithclicks.com"
            className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition"
          >
            Book Call →
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

        {/* CTA 2 */}
        <div className="mt-16 p-8 bg-gray-900 text-white text-center rounded-xl">
          <h3 className="text-2xl font-bold">Ready to Scale?</h3>
          <a
            href="https://scalewithclicks.com"
            className="inline-block mt-4 bg-purple-600 px-6 py-3 rounded-full"
          >
            Get Started →
          </a>
        </div>

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            {faqs.map((faq, i) => (
              <details key={i} className="mb-3 border p-4 rounded-lg">
                <summary className="font-medium cursor-pointer">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        )}

        {/* EXIT CTA */}
        <div className="mt-20 p-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center rounded-2xl">
          <h2 className="text-3xl font-bold">Need Help?</h2>
          <a
            href="https://scalewithclicks.com"
            className="inline-block mt-6 bg-white text-purple-600 px-6 py-3 rounded-full"
          >
            Get Free Strategy →
          </a>
        </div>

      </article>

      {/* ================= SIDEBAR ================= */}
      <aside className="hidden lg:block">

        <div className="sticky top-24 p-6 bg-purple-600 text-white rounded-xl">
          <h4 className="font-bold">Get More Leads</h4>
          <a
            href="https://scalewithclicks.com"
            className="block mt-3 bg-white text-purple-600 px-4 py-2 rounded-full text-center"
          >
            Book Call →
          </a>
        </div>

      </aside>

    </div>
  );
}
