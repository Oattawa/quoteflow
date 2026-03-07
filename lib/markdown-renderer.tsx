import React from "react";

/* ── Inline bold/italic renderer ── */
export function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ── Block-based markdown renderer ── */
export function ProposalRenderer({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H1
    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={i} className="text-xl font-bold text-gray-900 mt-4 mb-2">
          <InlineText text={line.slice(2)} />
        </h1>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={i} className="text-sm font-semibold text-gray-800 mt-4 mb-1">
          <InlineText text={line.slice(4)} />
        </h3>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={i} className="text-xs font-semibold text-violet-700 uppercase tracking-wide mt-5 mb-2">
          <InlineText text={line.slice(3)} />
        </h2>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---" || line.trim() === "***") {
      blocks.push(<hr key={i} className="border-gray-200 my-3" />);
      i++;
      continue;
    }

    // Table — collect all consecutive pipe lines
    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter(
        (l) => !/^\|[-| :]+\|$/.test(l.trim())
      );
      if (rows.length > 0) {
        const parseRow = (row: string) =>
          row.split("|").slice(1, -1).map((cell) => cell.trim());
        const [headerRow, ...bodyRows] = rows;
        blocks.push(
          <div key={i} className="overflow-x-auto my-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-violet-50">
                  {parseRow(headerRow).map((cell, ci) => (
                    <th key={ci} className="text-left px-3 py-2 font-semibold text-violet-700 border border-gray-200">
                      <InlineText text={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {parseRow(row).map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 text-gray-700 border border-gray-200">
                        <InlineText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Bullet / numbered list
    if (line.startsWith("- ") || line.startsWith("• ") || /^\d+\.\s/.test(line)) {
      const listLines: string[] = [];
      while (
        i < lines.length &&
        (lines[i].startsWith("- ") || lines[i].startsWith("• ") || /^\d+\.\s/.test(lines[i]))
      ) {
        listLines.push(lines[i]);
        i++;
      }
      blocks.push(
        <ul key={i} className="list-disc ml-5 space-y-1 my-2">
          {listLines.map((l, li) => (
            <li key={li} className="text-gray-700 leading-relaxed">
              <InlineText text={l.replace(/^[-•]\s|\d+\.\s/, "")} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      blocks.push(<div key={i} className="h-1" />);
      i++;
      continue;
    }

    // Regular paragraph
    blocks.push(
      <p key={i} className="text-gray-700 leading-relaxed">
        <InlineText text={line} />
      </p>
    );
    i++;
  }

  return <>{blocks}</>;
}
