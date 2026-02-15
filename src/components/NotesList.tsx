import { Trash2, FileText, X } from "lucide-react";
import type { SavedNote } from "../lib/storage";

interface NotesListProps {
  notes: SavedNote[];
  onLoad: (note: SavedNote) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NotesList({ notes, onLoad, onDelete, onClose }: NotesListProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 max-h-[70vh] flex flex-col bg-white/[0.04] backdrop-blur-2xl border border-white/12 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <h2 className="text-sm font-medium text-white/80">Saved Notes</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/80 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {notes.length === 0 ? (
            <div className="px-5 py-12 text-center text-white/30 text-sm">
              No saved notes yet.
              <br />
              Press Ctrl+S to save the current note.
            </div>
          ) : (
            <div className="divide-y divide-white/6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="group flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.04] transition-colors cursor-pointer"
                  onClick={() => onLoad(note)}
                >
                  <FileText
                    size={16}
                    className="flex-shrink-0 text-white/30"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white/80 truncate">
                      {note.title}
                    </div>
                    <div className="text-xs text-white/30 mt-0.5">
                      {formatDate(note.updatedAt)}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(note.id);
                    }}
                    className="flex-shrink-0 p-1.5 rounded-lg text-white/0 group-hover:text-white/30 hover:!text-red-400 hover:bg-white/8 transition-all"
                    title="Delete note"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
