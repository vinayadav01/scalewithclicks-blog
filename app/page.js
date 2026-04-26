import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default function Page({ params }) {
  const filePath = path.join(
    process.cwd(),
    "app/content/blog",
    `${params.slug}.md`
  );

  return (
    <pre>
      {JSON.stringify(
        {
          slug: params.slug,
          filePath,
          exists: fs.existsSync(filePath),
        },
        null,
        2
      )}
    </pre>
  );
}
