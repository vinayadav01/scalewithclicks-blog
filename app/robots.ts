export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://blog.scalewithclicks.com/sitemap.xml",
  };
}
