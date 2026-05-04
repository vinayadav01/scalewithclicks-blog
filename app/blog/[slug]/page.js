import fs from "fs";
import path from "path";

export default async function BlogPost({ params }) {
  const { slug } = await params;

  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];

  return (
    <div style={{ padding: "40px" }}>
      <h1>DEBUG MODE</h1>

      <p><b>Slug from URL:</b> {slug}</p>

      <h2>Available Files:</h2>
      <ul>
        {files.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
}
