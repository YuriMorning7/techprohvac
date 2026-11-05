import type { ReactNode } from "react";

// Tiny Markdown renderer tailored to the blog drafts we have. The source
// Markdown only uses: `### Heading`, bulleted lists (`- item`), paragraphs,
// and `**bold**`. We render those explicitly with the site's typography
// classes — no runtime dependency needed.

type Block =
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "paragraph"; text: string };

function parse(md: string): Block[] {
  const blocks: Block[] = [];
  const lines = md.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ kind: "heading", text: line.slice(4).trim() });
      i++;
      continue;
    }
    if (line.trimStart().startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
        items.push(lines[i].trimStart().slice(2).trim());
        i++;
      }
      blocks.push({ kind: "list", items });
      continue;
    }
    // Paragraph — consume until blank line.
    const buf: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith("### ") && !lines[i].trimStart().startsWith("- ")) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ kind: "paragraph", text: buf.join(" ") });
  }
  return blocks;
}

function renderInline(text: string): ReactNode[] {
  // Handle **bold** by splitting on the pattern. Nothing else inline needed.
  const out: ReactNode[] = [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  parts.forEach((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      out.push(
        <strong key={idx} className="font-[700] text-navy">
          {part.slice(2, -2)}
        </strong>,
      );
    } else if (part) {
      out.push(part);
    }
  });
  return out;
}

export function RenderMarkdown({ md }: { md: string }) {
  const blocks = parse(md);
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "heading") {
          return (
            <h2
              key={i}
              className="text-[22px] sm:text-[26px] font-[800] text-navy leading-tight tracking-tight mt-8 mb-3"
            >
              {b.text}
            </h2>
          );
        }
        if (b.kind === "list") {
          return (
            <ul key={i} className="mt-2 mb-5 space-y-2.5">
              {b.items.map((item, j) => (
                <li
                  key={j}
                  className="text-[15.5px] sm:text-[16px] text-text-dark leading-relaxed pl-6 relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[.6em] w-2 h-2 rounded-full bg-orange"
                  />
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={i}
            className="text-[15.5px] sm:text-[16px] text-text-dark leading-relaxed mb-4"
          >
            {renderInline(b.text)}
          </p>
        );
      })}
    </>
  );
}
