"use client";

import { useEffect, useState } from "react";

export default function Post({ params }) {
  const [progress, setProgress] = useState(0);
  const [contentHtml, setContentHtml] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    async function loadPost() {
      const res = await fetch(`/api/post?slug=${params.slug}`);
      const json = await res.json();

      setData(json.data);
      setContentHtml(json.contentHtml);
    }

    loadPost();

    // SCROLL PROGRESS
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scroll = window.scrollY;
      setProgress((scroll / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [params.slug]);

  // 🔥 Create category slug safely
  const categorySlug = data.category
    ? data.category.toLowerCase().replace(/\s+/g, "-")
    : "general";

  return (
    <>
      {/* 🔥 PROGRESS BAR */}
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr 260px",
            gap: "40px",
            maxWidth: "1200px",
            width: "100%",
            padding: "40px 20px",
          }}
        >

          {/* LEFT: TOC */}
          <div className="toc-sidebar">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  contentHtml.match(/<nav[\s\S]*<\/nav>/)?.[0] || "",
              }}
            />
          </div>

          {/* CENTER: BLOG */}
          <div>

            {/* 🔥 BREADCRUMBS */}
            <div
              style={{
                fontSize: "14px",
                marginBottom: "15px",
                color: "#666",
              }}
            >
              <a href="/" style={{ color: "#4f46e5" }}>
                Home
              </a>{" "}
              →{" "}
              <a
                href={`/category/${categorySlug}`}
                style={{ color: "#4f46e5" }}
              >
                {data.category || "General"}
              </a>{" "}
              → {data.title}
            </div>

            {/* TITLE */}
            <h1 style={{ fontSize: "38px", marginBottom: "10px" }}>
              {data.title}
            </h1>

            {/* DATE */}
            <p style={{ color: "#777", marginBottom: "20px" }}>
              {data.date}
            </p>

            {/* FEATURE IMAGE */}
            {data.image && (
              <img
                src={data.image}
                alt={data.title}
                style={{
                  width: "100%",
                  borderRadius: "14px",
                  marginBottom: "30px",
                }}
              />
            )}

            {/* BLOG CONTENT */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{
                __html: contentHtml.replace(
                  /<nav[\s\S]*<\/nav>/,
                  ""
                ),
              }}
            />

          </div>

          {/* RIGHT: AUTHOR + CTA */}
          <div>

            {/* AUTHOR */}
            <div className="author-card">
              <h3>About the Author</h3>
              <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                {data.author || "Vinay Yadav"}
              </p>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Helping businesses generate consistent leads and scale.
              </p>
            </div>

            {/* CTA */}
            <div className="cta-box">
              <h3>Get More Leads</h3>
              <p>Join our newsletter for proven strategies.</p>
              <a
                href="https://forms.gle/Gi2tGtBjUzGQMvgAA"
                target="_blank"
              >
                Subscribe Free
              </a>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
