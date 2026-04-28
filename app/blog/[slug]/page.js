import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";

export default async function BlogPost({ params }) {
  const slug = params?.slug;

  const dir = path.join(process.cwd(), "app/content/blog");

  // ✅ Get all files
  const files = fs.readdirSync(dir);

  // ✅ Find correct file (FIXED)
  const matchedFile = files.find((file) =>
    file.replace(/\.(md|mdx)$/, "") === slug
  );

  // ❌ If not found
  if (!matchedFile) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Post not found</h2>
        <Link href="/">← Back to Home</Link>
      </div>
    );
  }

  const filePath = path.join(dir, matchedFile);
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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: "100%",
          background: "#e2e8f0",
          zIndex: 999,
        }}
      >
        <div
          id="progressBar"
          style={{
            height: "100%",
            width: "0%",
            background: "#2563eb",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: "40px",
        }}
      >

        {/* MAIN CONTENT */}
        <article>

          {/* CATEGORY */}
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
                  cursor: "pointer",
                }}
              >
                {data.category}
              </span>
            </Link>
          )}

          {/* TITLE */}
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "800",
              marginTop: "20px",
              lineHeight: "1.3",
            }}
          >
            {data.title}
          </h1>

          {/* META */}
          <p style={{ color: "#64748b", marginTop: "10px" }}>
            {data.date} • By {data.author || "Admin"}
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
              color: "#1e293b",
            }}
          />

          {/* CTA */}
          <div
            style={{
              marginTop: "40px",
              padding: "25px",
              background: "#f1f5f9",
              borderRadius: "12px",
            }}
          >
            <h3>🚀 Want More Leads?</h3>
            <p>
              Get a proven strategy to scale your business using ads & SEO.
            </p>
            <a
              href="https://calendly.com/vinayyadav01992"
              style={{
                display: "inline-block",
                marginTop: "10px",
                background: "#2563eb",
                color: "#fff",
                padding: "12px 16px",
                borderRadius: "8px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Book Free Strategy Call
            </a>
          </div>

        </article>

        {/* SIDEBAR */}
        <aside
          style={{
            position: "sticky",
            top: "100px",
            height: "fit-content",
          }}
        >

          {/* CTA */}
          <div
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            <h3>🔥 Scale Faster</h3>
            <p style={{ fontSize: "14px" }}>
              Get expert help with Google Ads & SEO
            </p>
            <a
              href="https://calendly.com/vinayyadav01992"
              style={{
                display: "inline-block",
                marginTop: "10px",
                background: "#fff",
                color: "#2563eb",
                padding: "10px 14px",
                borderRadius: "8px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Book Call
            </a>
          </div>

          {/* SERVICES */}
          <div
            style={{
              border: "1px solid #eee",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h4>Our Services</h4>

            <div style={{ marginTop: "10px", lineHeight: "2" }}>
              <a href="https://scalewithclicks.com/services/google-ads-agency.html">Google Ads</a><br />
              <a href="https://scalewithclicks.com/services/meta-ads-agency.html">Meta Ads</a><br />
              <a href="https://scalewithclicks.com/services/seo-services.html">SEO</a><br />
              <a href="https://scalewithclicks.com/services/conversion-tracking.html">Tracking</a>
            </div>
          </div>

        </aside>
      </div>

      {/* SCROLL BAR FIX */}
      <script
        dangerouslySetInnerHTML={{
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
        }}
      />
    </div>
  );
}
