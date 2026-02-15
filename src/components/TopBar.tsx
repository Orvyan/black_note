import { useState } from "react";
import {
  Github,
  Copy,
  Check,
  Download,
  FileText,
  FileDown,
  FolderOpen,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { downloadFile } from "../lib/export";

interface TopBarProps {
  text: string;
  showPreview: boolean;
  onTogglePreview: () => void;
  onCopyLink: () => void;
  onSave: () => void;
  onOpenNotes: () => void;
}

export function TopBar({
  text,
  showPreview,
  onTogglePreview,
  onCopyLink,
  onSave,
  onOpenNotes,
}: TopBarProps) {
  const [copied, setCopied] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const handleCopy = async () => {
    onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleExport = (format: "txt" | "md") => {
    downloadFile(text, format);
    setShowExport(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 sm:px-5 border-b border-white/12 bg-black/72 backdrop-blur-[14px] z-10">
      {/* Brand */}
      <div className="flex items-center gap-2.5 select-none tracking-wide">
        <div className="w-2.5 h-2.5 rounded-full bg-white/85 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
        <span className="font-medium">Black Note</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* GitHub */}
        <a
          href="https://github.com/Orvyan/black_note"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-icon opacity-60 hover:opacity-100"
          title="GitHub"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>

        {/* Markdown Preview Toggle */}
        <button
          onClick={onTogglePreview}
          className="btn-icon"
          title={showPreview ? "Edit mode" : "Preview markdown"}
        >
          {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {/* Save */}
        <button
          onClick={onSave}
          className="btn-icon"
          title="Save note (Ctrl+S)"
        >
          <Save size={18} />
        </button>

        {/* Notes List */}
        <button
          onClick={onOpenNotes}
          className="btn-icon"
          title="Saved notes"
        >
          <FolderOpen size={18} />
        </button>

        {/* Export Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowExport(!showExport)}
            className="btn-icon"
            title="Export"
          >
            <Download size={18} />
          </button>
          {showExport && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowExport(false)}
              />
              <div className="absolute right-0 top-full mt-2 bg-white/6 backdrop-blur-xl border border-white/12 rounded-xl overflow-hidden z-30 min-w-[140px]">
                <button
                  onClick={() => handleExport("txt")}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-white/80 hover:bg-white/8 hover:text-white transition-colors"
                >
                  <FileText size={15} />
                  Export .txt
                </button>
                <button
                  onClick={() => handleExport("md")}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-white/80 hover:bg-white/8 hover:text-white transition-colors"
                >
                  <FileDown size={15} />
                  Export .md
                </button>
              </div>
            </>
          )}
        </div>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="btn-pill"
          title="Copy link (Ctrl+L)"
        >
          {copied ? (
            <>
              <Check size={15} />
              Copied
            </>
          ) : (
            <>
              <Copy size={15} />
              Copy link
            </>
          )}
        </button>
      </div>
    </header>
  );
}
