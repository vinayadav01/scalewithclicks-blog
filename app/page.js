const posts = files.map((filename) => {
  const filePath = path.join(dir, filename);
  const file = fs.readFileSync(filePath, "utf8");

  const parsed = matter(file);

  console.log(parsed.data); // 👈 ADD THIS

  return {
    slug: filename.replace(".md", ""),
    title: parsed.data.title || "No title",
  };
});
