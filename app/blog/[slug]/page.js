import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";
import Link from "next/link";

// ✅ Generate Static Params
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: file.replace(/\.(md|mdx)$/, ""),
  }));
}

// ✅ Blog Page
export default async function BlogPost({ params }) {
  // ✅ NEXT 16 FIX
  const { slug } = await params;

  if (!slug) return notFound();

  const mdPath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  const mdxPath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  let filePath = "";

  if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else {
    return notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <div className="bg-white">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          
          {/* BLOG CONTENT */}
          <article className="max-w-4xl">
            
            {/* CATEGORY */}
            {data.category && (
              <p className="text-orange-500 font-semibold uppercase tracking-wide mb-4">
                {data.category}
              </p>
            )}

            {/* TITLE */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-6">
              {data.title}
            </h1>

            {/* META */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8 border-b pb-6">
              {data.author && <span>By {data.author}</span>}
              {data.date && <span>{data.date}</span>}
            </div>

            {/* FEATURED IMAGE */}
            {data.image && (
              <div className="mb-10 overflow-hidden rounded-3xl">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* BLOG CONTENT */}
            <div
              className="
                prose 
                prose-lg 
                max-w-none
                prose-headings:font-bold
                prose-headings:text-gray-900
                prose-p:text-gray-700
                prose-p:leading-8
                prose-a:text-orange-500
                prose-img:rounded-2xl
                prose-li:text-gray-700
              "
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </article>

          {/* SIDEBAR CTA */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-[#f5f7ff] rounded-3xl p-8 shadow-sm border border-gray-100">
              
              <h3 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                Need More Leads?
              </h3>

              <p className="text-gray-600 leading-7 mb-8">
                Grow your business with high-converting Google Ads campaigns
                managed by experts.
              </p>

              <Link
                href="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  w-full
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  font-semibold
                  py-4
                  px-6
                  rounded-full
                  transition-all
                  duration-300
                "
              >
                Contact Us
              </Link>

              {/* OPTIONAL SMALL POINTS */}
              <div className="mt-8 space-y-3 text-sm text-gray-600">
                <div>✔ Conversion Focused Campaigns</div>
                <div>✔ Better ROAS</div>
                <div>✔ Keyword Research</div>
                <div>✔ Landing Page Guidance</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
