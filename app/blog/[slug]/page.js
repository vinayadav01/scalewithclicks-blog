import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import FloatingShare from "@/components/FloatingShare";

// ✅ Prevents random 404 issues
export const dynamicParams = false;

// ✅ TEMP FIX (ensures blog works even if static fails)
export const dynamic = "force-dynamic";

// ✅ Generates all blog routes at build time

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

 const files = fs.readdirSync(dir);

const matchedFile = files.find((file) => {
  return file.replace(/\.(md|mdx)$/, "") === slug;
});

export default async function BlogPost({ params }) {
  const slug = params?.slug;

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

 const processedContent = await remark()
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeStringify)
  .process(content);
const schema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: data.title,
  description: data.description,
  image: `https://blog.scalewithclicks.com${data.image}`,
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
    "@id": `https://blog.scalewithclicks.com/blog/${params.slug}`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://blog.scalewithclicks.com",
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
      item: `https://blog.scalewithclicks.com/blog/${params.slug}`,
    },
  ],
};  
  
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "40px 20px",
        lineHeight: "1.7",
        fontSize: "16px",
      }}
    >

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
/>
        
      {/* TITLE */}
      <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
        {data.title || "No title"}
      </h1>

      {/* DATE */}
      <p style={{ color: "#666", marginBottom: "20px" }}>
        {data.date || ""}
      </p>

      {/* FEATURE IMAGE */}
      {data.image && (
        <img
          src={data.image}
          alt={data.title || ""}
          style={{
            width: "100%",
            margin: "20px 0",
            borderRadius: "10px",
          }}
        />
      )}

      {/* BLOG CONTENT */}
      <div
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        style={{
          color: "#333",
        }}
      />

      {/* INLINE GLOBAL STYLING */}
      <style>{`
        h2 {
          font-size: 26px;
          margin-top: 30px;
          margin-bottom: 10px;
        }

        h3 {
          font-size: 22px;
          margin-top: 25px;
          margin-bottom: 8px;
        }

        p {
          margin-bottom: 15px;
        }

        ul {
          padding-left: 20px;
          margin-bottom: 20px;
        }

        li {
          margin-bottom: 8px;
        }

        img {
          width: 100%;
          margin: 20px 0;
          border-radius: 10px;
        }

        a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }

        a:hover {
          text-decoration: underline;
        }

        hr {
          margin: 30px 0;
          border: none;
          border-top: 1px solid #eee;
        }
      `}</style>
    </div>
  );
}
