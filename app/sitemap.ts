import { getPosts } from "../lib/getPosts";

export default function sitemap() {
  const baseUrl = "https://blog.scalewithclicks.com";

  const posts = getPosts();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
