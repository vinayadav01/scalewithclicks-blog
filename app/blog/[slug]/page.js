import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import Image from "next/image";

function extractHeadings(content) {
  const lines = content.split("\n");

  return lines
    .filter(line => line.startsWith("## "))
    .map(line => {
      const text = line.replace("## ", "").trim();

      const id = text
        .toLowerCase()
        .replace(/[^\w]+/g, "-");

      return { text, id };
    });
}

// ✅ Prevents random 404 issues
export const dynamicParams = true;

// ✅ TEMP FIX
export const dynamic = "force-dynamic";

// ✅ Generates all blog routes
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: file.replace(".md", "").replace(".mdx", ""),
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = await params;

  const mdPath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  const mdxPath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  let filePath = "";

  if (fs.existsSync(mdPath)) filePath = mdPath;
  else if (fs.existsSync(mdxPath)) filePath = mdxPath;
  else {
       return <div>FILE NOT FOUND: {slug}</div>;
}

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const headings = extractHeadings(content);
  
  // ✅ Markdown pipeline
  const processedContent = await remark()
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeStringify)
  .process(content);

  const contentHtml = processedContent.toString();

  // ✅ SCHEMA (safe image handling)
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://blog.scalewithclicks.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://blog.scalewithclicks.com" },
      { "@type": "ListItem", position: 3, name: data.title, item: `https://blog.scalewithclicks.com/blog/${slug}` },
    ],
  };

 return (
  <>
    <Navbar />

    <div id="progress-bar"></div>

    {/* SCHEMA */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />

    <div className="blog-layout">

      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-inner">
          <div className="author">
          <Image
  src="/images/author.jpg"
  alt="author"
  width={60}
  height={60}
/>
            <p>{data.author || "Vinay Yadav"}</p>
          </div>

          <div className="toc">
            <p>TABLE OF CONTENTS</p>

            {headings.map((item, index) => (
              <a key={index} href={`#${item.id}`}>
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        <h1>{data.title}</h1>
        <p className="date">{data.date}</p>

        {data.image && (
  <Image
    src={data.image}
    alt={data.title}
    width={800}
    height={400}
    style={{ width: "100%", height: "auto", borderRadius: "10px" }}
  />
)}

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>

    </div>
  </>
);          
}
