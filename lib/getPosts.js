type Post = {
  slug: string;
  title?: string;
  description?: string;
  date?: string;
  image?: string;
  category?: string;
};

export function getPosts(): Post[] {
  const dir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  return files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/, "");

    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContent);

    return {
      slug,
      ...data,
    };
  });
}
