import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ✅ Strong normalize (handles everything)
const normalize = (str) =>
  str
    ?.toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

export default async function BlogPost({ params }) {
  try {
    console.log("👉 PARAMS:", params);

    if (!params?.slug) {
      console.error("❌ No slug received");
      return notFound();
    }

    const slug = normalize(params.slug);

    // ✅ Correct path
    const dir = path.join(process.cwd(), "content/blog");

    console.log("📁 BLOG DIR:", dir);

    if (!fs.existsSync(dir)) {
      console.error("❌ Blog folder NOT FOUND");
      return notFound();
    }

    const files = fs.readdirSync(dir);

    console.log("📄 FILES:", files);

    if (!files.length) {
      console.error("❌ No files inside blog folder");
      return notFound();
    }

    let matchedFile = null;

    for (const file of files) {
      const fileSlug = normalize(file.replace(/\.(md|mdx)$/, ""));

      console.log("🔍 Comparing:");
      console.log("URL:", slug);
      console.log("FILE:", fileSlug);

      if (fileSlug === slug) {
        matchedFile = file;
        break;
      }
    }

    console.log("✅ MATCHED:", matchedFile);

    if (!matchedFile) {
      console.error("❌ No matching blog found");
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
    console.error("🔥 BLOG ERROR:", err);
    return notFound();
  }
}
