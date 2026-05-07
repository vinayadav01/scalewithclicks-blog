export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    Sitemap: "https://blog.scalewithclicks.com/sitemap.xml",
  };
}
