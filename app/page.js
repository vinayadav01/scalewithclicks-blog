"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("All");

  const limit = 6;

  // 🔥 FETCH POSTS
  async function fetchPosts(pageNumber = 1) {
    const res = await fetch(`/api/posts?page=${pageNumber}&limit=${limit}`);
    const data = await res.json();

    if (pageNumber === 1) {
      setPosts(data.posts);
    } else {
      setPosts((prev) => [...prev, ...data.posts]);
    }

    if (posts.length + data.posts.length >= data.total) {
      setHasMore(false);
    }
  }

  useEffect(() => {
    fetchPosts(1);
  }, []);

  // 🔥 INFINITE SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchPosts(page);
    }
  }, [page]);

  // 🎯 CATEGORY FILTER
  const filteredPosts =
    category === "All"
      ? posts
      : posts.filter((p) => p.category === category);

  const categories = [
    "All",
    ...new Set(posts.map((p) => p.category)),
  ];

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "40px 20px" }}>
      
      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "42px" }}>Growth Insights</h1>
        <p style={{ color: "#666" }}>
          Proven strategies to grow your business
        </p>
      </div>

      {/* 🔥 CATEGORY FILTER BUTTONS */}
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

      {/* POSTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {filteredPosts.map((post) => {
          const categorySlug = post.category
            ?.toLowerCase()
            .replace(/\s+/g, "-");

          return (
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
                  transition: "0.2s",
                }}
              >
                {/* IMAGE */}
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

                  {/* 🔥 CATEGORY LINK (IMPORTANT SEO FIX) */}
                  <Link
                    href={`/category/${categorySlug}`}
                    onClick={(e) => e.stopPropagation()} // prevent card click override
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#4f46e5",
                        marginBottom: "5px",
                        fontWeight: "500",
                      }}
                    >
                      {post.category}
                    </p>
                  </Link>

                  {/* TITLE */}
                  <h3>{post.title}</h3>

                  {/* META */}
                  <p style={{ fontSize: "13px", color: "#999" }}>
                    {post.date} • {post.readingTime}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* LOADING */}
      {hasMore && (
        <p style={{ textAlign: "center", marginTop: "30px", color: "#666" }}>
          Loading more articles...
        </p>
      )}

      {!hasMore && (
        <p style={{ textAlign: "center", marginTop: "30px", color: "#999" }}>
          You’ve reached the end 🚀
        </p>
      )}
    </div>
  );
}
