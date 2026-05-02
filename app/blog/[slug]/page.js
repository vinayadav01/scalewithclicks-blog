import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

// ✅ Prevents random 404 issues
export const dynamicParams = false;

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
  const slug = params.slug;

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
  
  // ✅ SCHEMA (unchanged)
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://blog.scalewithclicks.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://blog.scalewithclicks.com" },
      { "@type": "ListItem", position: 3, name: data.title, item: `https://blog.scalewithclicks.com/blog/${params.slug}` },
    ],
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* BLOG LAYOUT */}
      <div className="blog-layout">

        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-inner">
            <div className="author">
              <img src="/images/author.jpg" alt="author" />
              <p>{data.author || "Vinay Yadav"}</p>
            </div>

            <div className="toc">
              <p>TABLE OF CONTENTS</p>
              <a href="#1-targeting-the-wrong-keywords">Wrong Keywords</a>
              <a href="#2-ignoring-search-intent">Search Intent</a>
              <a href="#3-no-negative-keywords">Negative Keywords</a>
              <a href="#4-poor-landing-page-experience">Landing Page</a>
              <a href="#5-not-tracking-conversions">Tracking</a>
              <a href="#6-weak-ad-copy">Ad Copy</a>
              <a href="#7-no-optimization-strategy">Optimization</a>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="content">
          <h1>{data.title}</h1>
          <p className="date">{data.date}</p>

          {data.image && <img src={data.image} alt={data.title} />}

          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </main>

        {/* RIGHT CTA */}
        <aside className="right-cta">
          <div className="cta-box">
            <h3>Launch your Campaign!</h3>
            <p>Create full funnel campaigns that drive real business results.</p>
            <button>Start Now</button>
          </div>
        </aside>
      </div>

      {/* STYLES */}
      <style>{`
        /* NAVBAR */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 999;
          padding: 16px 40px;
          background: transparent;
          transition: 0.3s;
        }

        .navbar.scrolled {
          background: #0b1b34;
          color: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar a {
          margin: 0 10px;
          color: #000;
        }

        .cta-btn {
          background: #ff6a00;
          padding: 8px 16px;
          border-radius: 20px;
          color: white;
          border: none;
        }

        /* LAYOUT */
        .blog-layout {
          display: grid;
          grid-template-columns: 250px 1fr 300px;
          gap: 40px;
          max-width: 1200px;
          margin: 40px auto;
        }

        /* SIDEBAR */
        .sidebar-inner {
          position: sticky;
          top: 100px;
        }

        .author img {
          width: 60px;
          border-radius: 50%;
        }

        .toc a {
          display: block;
          margin: 8px 0;
          color: #555;
        }

        /* CONTENT */
        .content {
          max-width: 700px;
        }

        .content h1 {
          font-size: 32px;
        }

        .date {
          color: #666;
          margin-bottom: 10px;
        }

        /* CTA */
        .cta-box {
          position: sticky;
          top: 120px;
          background: #f5f7fb;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }

        @media (max-width: 1024px) {
  .blog-layout {
    grid-template-columns: 1fr;
  }

  .sidebar,
  .right-cta {
    display: none;
  }

  .content {
    max-width: 100%;
  }
}

        /* TYPOGRAPHY */
        h2 { font-size: 26px; margin-top: 30px; }
        h3 { font-size: 22px; margin-top: 25px; }
        p { margin-bottom: 15px; }
        ul { padding-left: 20px; }
        img { width: 100%; border-radius: 10px; margin: 20px 0; }
      `}</style>
    </>
  );
}

