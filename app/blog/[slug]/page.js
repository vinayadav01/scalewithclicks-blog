import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

// ✅ Prevents random 404 issues
export const dynamicParams = false;

// ✅ TEMP FIX (ensures blog works even if static fails)
export const dynamic = "force-dynamic";

// ✅ Generates all blog routes at build time
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) {
    return [];
  }

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
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

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
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* STYLES */}
      <style jsx>{`
        .blog-content h1,
        .blog-content h2,
        .blog-content h3 {
          margin-top: 30px;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .blog-content h2 {
          font-size: 26px;
        }

        .blog-content h3 {
          font-size: 22px;
        }

        .blog-content p {
          margin-bottom: 15px;
          color: #333;
        }

        .blog-content ul {
          padding-left: 20px;
          margin-bottom: 20px;
        }

        .blog-content li {
          margin-bottom: 8px;
        }

        .blog-content img {
          width: 100%;
          margin: 20px 0;
          border-radius: 10px;
        }

        .blog-content a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }

        .blog-content a:hover {
          text-decoration: underline;
        }

        .blog-content hr {
          margin: 30px 0;
          border: none;
          border-top: 1px solid #eee;
        }

        .blog-content strong {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
