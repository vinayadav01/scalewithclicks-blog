import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import FloatingShare from "@/components/FloatingShare";

// ✅ Prevent random 404
export const dynamicParams = true;

// ✅ TEMP FIX (force dynamic rendering)
export const dynamic = "force-dynamic";

// ✅ Generate all slugs
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: file.replace(/\.(md|mdx)$/, ""),
  }));
}

export default async function BlogPost({ params }) {
  const slug = params?.slug;

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

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  // ✅ Convert markdown → HTML
  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  // ✅ Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    image: data.image
      ? `https://blog.scalewithclicks.com${data.image}`
      : "https://blog.scalewithclicks.com/images/default.jpg",
    author: {
      "@type": "Person",
      name: data.author || "Vinay Yadav",
    },
    publisher: {
      "@type": "Organization",
      name: "ScaleWithClicks",
      logo: {
        "@type": "ImageObject",
        url: "https://blog.scalewithclicks.com/images/logo.png",
      },
    },
    datePublished: data.date,
    dateModified: data.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://blog.scalewithclicks.com/blog/${slug}`,
    },
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "40px 20px",
        lineHeight: "1.7",
      }}
    >
      <Navbar />

      <div className="hidden md:block">
        <FloatingShare />
      </div>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* TITLE */}
      <h1 style={{ fontSize: "34px" }}>{data.title}</h1>

      {/* DATE */}
      <p style={{ color: "#666" }}>{data.date}</p>

      {/* IMAGE */}
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          style={{ width: "100%", borderRadius: "10px", margin: "20px 0" }}
        />
      )}

      {/* CONTENT */}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
