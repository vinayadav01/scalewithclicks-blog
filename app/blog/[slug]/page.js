import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ✅ ONE normalize function ONLY
const normalize = (str) =>
  str?.toLowerCase().trim().replace(/[\s_]+/g, "-");

export default async function BlogPost({ params }) {
  try {
    const slug = normalize(params?.slug);

    // ✅ CORRECT PATH (ROOT content folder)
    const dir = path.join(process.cwd(), "content/blog");

    if (!fs.existsSync(dir)) {
      console.error("❌ Blog folder not found:", dir);
      return notFound();
    }

    const files = fs.readdirSync(dir);

    console.log("👉 URL slug:", slug);
    console.log("👉 Files:", files);

    // ✅ MATCH FILE PROPERLY
    let matchedFile = null;

for (const file of files) {
  const fileSlug = normalize(file.replace(/\.(md|mdx)$/, ""));

  console.log("👉 Comparing:");
  console.log("URL slug:", slug);
  console.log("File slug:", fileSlug);

  if (fileSlug === slug) {
    matchedFile = file;
    break;
  }
}

console.log("✅ MATCHED FILE:", matchedFile);

    if (!matchedFile) {
      console.error("❌ No match for slug:", slug);
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
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gap: "40px",
          }}
        >
          
          {/* MAIN CONTENT */}
          <article>

            {categorySlug && (
              <Link href={`/category/${categorySlug}`}>
                <span
                  style={{
                    background: "#e0e7ff",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                  }}
                >
                  {data.category}
                </span>
              </Link>
            )}

            <h1 style={{ fontSize: "36px", marginTop: "20px" }}>
              {data.title}
            </h1>

            <p style={{ color: "#64748b" }}>
              {data.date} • {data.author || "Admin"}
            </p>

            {data.image && (
              <img
                src={data.image}
                alt={data.title}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  margin: "20px 0",
                }}
              />
            )}

            <div
              dangerouslySetInnerHTML={{ __html: contentHtml }}
              style={{
                lineHeight: "1.8",
                fontSize: "18px",
              }}
            />

          </article>

          {/* SIDEBAR */}
          <aside style={{ position: "sticky", top: "100px" }}>
            <div
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>🚀 Want More Leads?</h3>
              <a
                href="https://calendly.com/vinayyadav01992"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  background: "#fff",
                  color: "#2563eb",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
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
