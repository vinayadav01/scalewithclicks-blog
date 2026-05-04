import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import Navbar from "../../components/Navbar";
import ProgressBar from "../../components/ProgressBar";
import FloatingShare from "../../components/FloatingShare";

// ✅ Extract headings
function extractHeadings(content) {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace("## ", "").trim();
      const id = text.toLowerCase().replace(/[^\w]+/g, "-");
      return { text, id };
    });
}

// ✅ Generate routes
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: file.replace(/\.(md|mdx)$/, ""),
  }));
}

// ✅ Main page
export default async function BlogPost({ params }) {
  const slug = params?.slug;

  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) {
    return <div>No blog directory found</div>;
  }

  const files = fs.readdirSync(dir);

  const matchedFile = files.find((file) => {
    return file.replace(/\.(md|mdx)$/, "") === slug;
  });

  if (!matchedFile) {
    return <div>FILE NOT FOUND: {slug}</div>;
  }

  const filePath = path.join(dir, matchedFile);

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const headings = extractHeadings(content);

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <>
      <Navbar />
      <ProgressBar image={data.image} />

      <div className="hidden md:block">
        <FloatingShare />
      </div>

      <div className="blog-layout">
        <aside className="sidebar">
          <div className="sidebar-inner">
            <div className="toc">
              <p>TABLE OF CONTENTS</p>
              {headings.map((item, i) => (
                <a key={i} href={`#${item.id}`}>
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <h1>{data.title}</h1>

          {data.image && (
            <img src={data.image} alt={data.title} />
          )}

          <div
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </>
  );
}
