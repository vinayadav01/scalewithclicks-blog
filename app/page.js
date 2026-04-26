"use client";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { useState, useEffect } from "react";

// 📖 Reading time
function getReadingTime(text) {
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200) + " min read";
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function loadPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    }

    loadPosts();
  }, []);

  // 🔍 FILTER LOGIC
  useEffect(() => {
    let temp = [...posts];

    if (category !== "All") {
      temp = temp.filter((p) => p.category === category);
    }

    if (search) {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredPosts(temp);
  }, [search, category, posts]);

  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "40px 20px" }}>
      
      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "42px" }}>Growth Insights</h1>
        <p style={{ color: "#666" }}>
          Proven strategies to grow your business
        </p>
      </div>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          marginBottom: "20px",
        }}
      />

      {/* 🏷 CATEGORY FILTER */}
      <div style={{ marginBottom: "30px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              marginRight: "10px",
              marginBottom: "10px",
              padding: "8px 14px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              background: category === cat ? "#4f46e5" : "#fff",
              color: category === cat ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 📚 POSTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#fff",
              }}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div style={{ padding: "15px" }}>
                <p style={{ fontSize: "12px", color: "#888" }}>
                  {post.category}
                </p>

                <h3>{post.title}</h3>

                <p style={{ fontSize: "13px", color: "#999" }}>
                  {post.date} • {post.readingTime}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
