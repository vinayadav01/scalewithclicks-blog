"use client";

import { useEffect, useState } from "react";

export default function Post({ params }) {
  const [data, setData] = useState({});
  const [contentHtml, setContentHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch(`/api/post?slug=${params.slug}`, {
          cache: "no-store",
        });

        // ❌ API failed
        if (!res.ok) {
          throw new Error("Post not found");
        }

        const json = await res.json();

        setData(json.data || {});
        setContentHtml(json.contentHtml || "");
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Post not found");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [params.slug]);

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Loading article...
      </div>
    );
  }

  // ❌ ERROR STATE
  if (error || !data?.title) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        ❌ Post not found
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "40px 20px" }}>
      
      {/* TITLE */}
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        {data.title}
      </h1>

      {/* META */}
      <p style={{ color: "#777", marginBottom: "20px" }}>
        {data.date || "No date"} • {data.author || "Vinay Yadav"}
      </p>

      {/* FEATURED IMAGE */}
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "30px",
          }}
        />
      )}

      {/* CONTENT */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
