import { useMemo } from 'react';
import { marked } from 'marked';

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,    // Single line breaks become <br>
  gfm: true,       // GitHub Flavored Markdown (tables, strikethrough, etc.)
});

interface MarkdownContentProps {
  content: string;
}

/** Maps raw <h1>–<h6> to tailwind classes matching the ink-wash aesthetic. */
function headingClass(level: number): string {
  const base = 'text-ink font-bold';
  switch (level) {
    case 1: return `${base} text-lg mt-4 mb-2`;
    case 2: return `${base} text-base mt-3 mb-1.5`;
    case 3: return `${base} text-sm mt-2 mb-1`;
    default: return `${base} text-sm mt-2 mb-1`;
  }
}

/** Post-process the HTML string: add Tailwind classes to raw tags. */
function styleHtml(html: string): string {
  return html
    // Headings
    .replace(/<h1/g, `<h1 class="${headingClass(1)}"`)
    .replace(/<h2/g, `<h2 class="${headingClass(2)}"`)
    .replace(/<h3/g, `<h3 class="${headingClass(3)}"`)
    .replace(/<h4/g, `<h4 class="${headingClass(4)}"`)
    // Paragraphs
    .replace(/<p>/g, '<p class="text-ink-heavy text-sm leading-relaxed mb-1.5">')
    // Bold
    .replace(/<strong>/g, '<strong class="font-bold text-ink">')
    // Unordered lists
    .replace(/<ul>/g, '<ul class="space-y-0.5 ml-1 mt-1 mb-1.5">')
    // Ordered lists
    .replace(/<ol>/g, '<ol class="space-y-0.5 ml-4 mt-1 mb-1.5 list-decimal">')
    // List items – keep text-sm and add a subtle marker
    .replace(/<li>/g, '<li class="text-ink-heavy text-sm leading-relaxed flex items-start gap-2">')
    // But for <li> that contain <strong>, don't lose the marker; add a bullet dot before
    // We handle this by injecting a • before the content of li in ul (not ol)
    .replace(
      /<ul>([\s\S]*?)<\/ul>/g,
      (_: string, inner: string) => {
        const withBullets = inner.replace(
          /<li>/g,
          '<li class="text-ink-heavy text-sm leading-relaxed flex items-start gap-2"><span class="text-cinnabar flex-shrink-0 mt-0.5">•</span> ',
        );
        return `<ul class="space-y-0.5 ml-1 mt-1 mb-1.5">${withBullets}</ul>`;
      },
    )
    // Horizontal rules
    .replace(/<hr>/g, '<hr class="border-ink-pale/20 my-3">')
    // Blockquotes
    .replace(
      /<blockquote>/g,
      '<blockquote class="border-l-2 border-cinnabar/30 pl-3 italic text-ink-light text-sm my-2">',
    )
    // Inline code
    .replace(
      /<code>/g,
      '<code class="bg-ink-pale/10 text-cinnabar text-xs px-1 py-0.5 rounded">',
    )
    // Code blocks
    .replace(
      /<pre>/g,
      '<pre class="bg-ink-pale/10 rounded p-3 overflow-x-auto text-xs my-2 leading-relaxed">',
    )
    // Em (italic)
    .replace(/<em>/g, '<em class="italic text-ink-light">')
    // Links
    .replace(/<a /g, '<a class="text-cinnabar underline underline-offset-2" target="_blank" rel="noopener" ');
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const html = useMemo(() => {
    const raw = marked.parse(content) as string;
    return styleHtml(raw);
  }, [content]);

  return (
    <div
      className="markdown-content text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
