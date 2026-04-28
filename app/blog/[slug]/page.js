import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const normalize = (str) =>
  str?.toLowerCase().trim().replace(/\s+/g, "-");

export default async function BlogPost({ params }) {
  try {
    const slug = normalize(params?.slug);

    // ✅ FIXED PATH
    const dir = path.join(process.cwd(), "content/blog");

    if (!fs.existsSync(dir)) {
      console.error("Blog folder not found:", dir);
      return notFound();
    }

    const files = fs.readdirSync(dir);

   console.log("👉 URL slug:", slug);
console.log("👉 Files:", files); 
    
    const normalize = (str) =>
  str
    ?.toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-");

const matchedFile = files.find((file) => {
  const cleanName = normalize(
    file.replace(/\.(md|mdx)$/, "")
  );

  return cleanName === normalize(slug);
});

    if (!matchedFile) {
      console.error("Post not found for slug:", slug);
      return notFound();
    }

    const filePath = path.join(dir, matchedFile);
    const file = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(file);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    const categorySlug = normalize(data.category);

    return (
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px 20px" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "40px" }}>
          
          <article>

            {categorySlug && (
              <Link href={`/category/${categorySlug}`}>
                <span>{data.category}</span>
              </Link>
            )}

            <h1>{data.title}</h1>

            <p>{data.date} • {data.author || "Admin"}</p>

            {data.image && <img src={data.image} alt={data.title} />}

            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

          </article>

          <aside>
            <div>
              <h3>🚀 Want More Leads?</h3>
              <a href="https://calendly.com/vinayyadav01992">
                Book Call
              </a>
            </div>
          </aside>

        </div>
      </div>
    );

  } catch (err) {
    console.error("BLOG PAGE ERROR:", err);
    return notFound();
  }
}
