function extractHeadings(markdown) {
  const lines = markdown.split("\n");

  const headings = [];

  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      const text = line.replace("## ", "").trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");

      headings.push({
        text,
        id,
        level: 2,
      });
    }

    if (line.startsWith("### ")) {
      const text = line.replace("### ", "").trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");

      headings.push({
        text,
        id,
        level: 3,
      });
    }
  });

  return headings;
}
