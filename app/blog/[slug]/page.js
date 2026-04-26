import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";

export default async function Post(props) {
  // ✅ FIX: properly resolve params
  const params = await props.params;
  const slug = params?.slug;

  console.log("PARAMS:", params);
  console.log("SLUG:", slug);

  if (!slug) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        ❌ Slug missing — route not working
      </div>
    );
  }

  const filePath = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.md`
  );

  console.log("FILE PATH:", filePath);

  if (!fs.existsSync(filePath)) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        ❌ Post not found <br />
        Slug: {slug}
      </div>
    );
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processed = await remark()
    .use(remarkSlug)
    .use(remarkToc)
    .use(html)
    .process(content);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "40px 20px" }}>
      
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        {data.title}
      </h1>

      <p style={{ color: "#777", marginBottom: "20px" }}>
        {data.date} • {data.author || "Vinay Yadav"}
      </p>

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

      <div dangerouslySetInnerHTML={{ __html: processed.toString() }} />
    </div>
  );
}
