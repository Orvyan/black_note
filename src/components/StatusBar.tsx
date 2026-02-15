import { useMemo } from "react";

interface StatusBarProps {
  text: string;
  hint: string;
}

export function StatusBar({ text, hint }: StatusBarProps) {
  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return { chars, words };
  }, [text]);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 flex items-center justify-between px-5 text-xs text-white/40 bg-black/60 backdrop-blur-sm border-t border-white/6 z-10">
      <span className="truncate max-w-[60%]">
        {hint || "Type to generate a shareable link."}
      </span>
      <span className="flex-shrink-0">
        {stats.chars} chars &middot; {stats.words} words
      </span>
    </div>
  );
}
