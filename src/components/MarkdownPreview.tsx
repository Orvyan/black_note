import Markdown from "react-markdown";

interface MarkdownPreviewProps {
  text: string;
}

export function MarkdownPreview({ text }: MarkdownPreviewProps) {
  return (
    <div className="absolute top-[92px] left-0 right-0 bottom-8 px-5 sm:px-6 pt-6 pb-4 overflow-y-auto scrollbar-hide text-white/92">
      <div className="markdown-body max-w-none">
        {text ? (
          <Markdown>{text}</Markdown>
        ) : (
          <p className="text-white/32 italic">Nothing to preview...</p>
        )}
      </div>
    </div>
  );
}
