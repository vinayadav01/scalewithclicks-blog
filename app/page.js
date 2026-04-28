import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// normalize helper
const normalize = (str) =>
  str
    ?.toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

export default async function BlogPost({ params }) {
  try {
    if (!params?.slug) return notFound();

    const slug = normalize(params.slug);

    const dir = path.join(process.cwd(), "content/blog");

    if (!fs.existsSync(dir)) return notFound();

    const files = fs.readdirSync(dir);

    let matchedFile = null;

    for (const file of files) {
      const fileSlug = normalize(file.replace(/\.(md|mdx)$/, ""));
      if (fileSlug === slug) {
        matchedFile = file;
        break;
      }
    }

    if (!matchedFile) return notFound();

    const filePath = path.join(dir, matchedFile);
    const file = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(file);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    const categorySlug = normalize(data.category);

    return (
      <div style={{ maxWidth: "1100px", margin: "auto", padding: "40px 20px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "40px" }}>

          {/* MAIN */}
          <article>

            {categorySlug && (
              <Link href={`/category/${categorySlug}`}>
                <span
                  style={{
                    background: "#e0e7ff",
                    color: "#3730a3",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {data.category}
                </span>
              </Link>
            )}

            <h1 style={{ fontSize: "42px", marginTop: "20px" }}>
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
                  borderRadius: "16px",
                  margin: "30px 0",
                }}
              />
            )}

            <div
              dangerouslySetInnerHTML={{ __html: contentHtml }}
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
              }}
            />

          </article>

          {/* SIDEBAR CTA */}
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
    console.error("BLOG ERROR:", err);
    return notFound();
  }
}
