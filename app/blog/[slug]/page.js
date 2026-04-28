import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function BlogPost({ params }) {
  try {
    const slug = params?.slug?.toLowerCase().trim();

    const dir = path.join(process.cwd(), "app/content/blog");

    // ✅ SAFETY: if folder missing → 404
    if (!fs.existsSync(dir)) {
      console.error("Blog folder not found:", dir);
      return notFound();
    }

    const files = fs.readdirSync(dir);

    // ✅ Match slug safely
    const matchedFile = files.find((file) => {
      const clean = file.replace(/\.(md|mdx)$/, "").toLowerCase().trim();
      return clean === slug;
    });

    // ❌ Not found → 404 (NO CRASH)
    if (!matchedFile) {
      console.error("Post not found for slug:", slug);
      return notFound();
    }

    const filePath = path.join(dir, matchedFile);

    // ✅ Double safety
    if (!fs.existsSync(filePath)) {
      return notFound();
    }

    const file = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(file);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    const categorySlug = data.category
      ?.toLowerCase()
      .replace(/\s+/g, "-");

    return (
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px 20px" }}>

        {/* PROGRESS BAR */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: "100%",
          background: "#e2e8f0",
          zIndex: 999,
        }}>
          <div id="progressBar" style={{
            height: "100%",
            width: "0%",
            background: "#2563eb",
          }} />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: "40px",
        }}>

          {/* MAIN */}
          <article>

            {/* CATEGORY */}
            {categorySlug && (
              <Link href={`/category/${categorySlug}`}>
                <span style={{
                  background: "#e0e7ff",
                  color: "#3730a3",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}>
                  {data.category}
                </span>
              </Link>
            )}

            {/* TITLE */}
            <h1 style={{
              fontSize: "42px",
              fontWeight: "800",
              marginTop: "20px",
            }}>
              {data.title}
            </h1>

            {/* META */}
            <p style={{ color: "#64748b" }}>
              {data.date} • {data.author || "Admin"}
            </p>

            {/* IMAGE */}
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

            {/* CONTENT */}
            <div
              dangerouslySetInnerHTML={{ __html: contentHtml }}
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
              }}
            />

          </article>

          {/* SIDEBAR */}
          <aside style={{ position: "sticky", top: "100px" }}>

            <div style={{
              background: "#2563eb",
              color: "#fff",
              padding: "20px",
              borderRadius: "12px",
            }}>
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
                }}
              >
                Book Call
              </a>
            </div>

          </aside>
        </div>

        {/* SCROLL SCRIPT */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener("scroll", function() {
              const bar = document.getElementById("progressBar");
              if (!bar) return;

              const winScroll = document.documentElement.scrollTop;
              const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              const scrolled = (winScroll / height) * 100;

              bar.style.width = scrolled + "%";
            });
          `,
        }} />

      </div>
    );

  } catch (err) {
    console.error("BLOG PAGE ERROR:", err);
    return notFound(); // ✅ NEVER crash again
  }
}
