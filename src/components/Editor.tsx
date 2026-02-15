interface EditorProps {
  text: string;
  onChange: (val: string) => void;
}

export function Editor({ text, onChange }: EditorProps) {
  return (
    <textarea
      value={text}
      onChange={(e) => onChange(e.target.value)}
      className="absolute top-[92px] left-0 right-0 bottom-8 w-full px-5 sm:px-6 pt-6 pb-4 border-none outline-none resize-none bg-transparent text-white/92 text-lg leading-relaxed caret-white/90 scrollbar-hide overflow-y-auto placeholder:text-white/32"
      placeholder="Type something..."
      spellCheck={false}
      autoFocus
    />
  );
}
