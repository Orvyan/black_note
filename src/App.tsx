import { useState, useCallback, useEffect } from "react";
import { TopBar } from "./components/TopBar";
import { Editor } from "./components/Editor";
import { MarkdownPreview } from "./components/MarkdownPreview";
import { StatusBar } from "./components/StatusBar";
import { NotesList } from "./components/NotesList";
import { useUrlSync } from "./hooks/useUrlSync";
import { useLocalNotes } from "./hooks/useLocalNotes";
import type { SavedNote } from "./lib/storage";

export default function App() {
  const [text, setText] = useState("");
  const [hint, setHint] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<string | undefined>();

  const stableSetText = useCallback((val: string) => setText(val), []);
  const stableSetHint = useCallback((msg: string) => setHint(msg), []);

  useUrlSync(text, stableSetText, stableSetHint);
  const { notes, save, remove } = useLocalNotes();

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setHint("Link copied.");
      setTimeout(() => {
        const seg = window.location.pathname.replace(/^\/+|\/+$/g, "");
        setHint(seg ? `/${seg}` : "");
      }, 900);
    } catch {
      setHint("Clipboard permission blocked.");
    }
  }, []);

  const handleSave = useCallback(() => {
    if (!text.trim()) return;
    // Always create a new note (never overwrite)
    const note = save(text);
    setActiveNoteId(note.id);
    setHint("Note saved.");
    setTimeout(() => {
      const seg = window.location.pathname.replace(/^\/+|\/+$/g, "");
      setHint(seg ? `/${seg}` : "");
    }, 900);
  }, [text, save]);

  const handleLoadNote = useCallback(
    (note: SavedNote) => {
      setText(note.content);
      setActiveNoteId(note.id);
      setShowNotes(false);
    },
    [],
  );

  const handleDeleteNote = useCallback(
    (id: string) => {
      remove(id);
      if (activeNoteId === id) {
        setActiveNoteId(undefined);
      }
    },
    [remove, activeNoteId],
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      if (mod && e.key === "l") {
        e.preventDefault();
        handleCopyLink();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSave, handleCopyLink]);

  return (
    <div className="h-full bg-black text-white/92 font-[ui-sans-serif,system-ui,-apple-system,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">
      <TopBar
        text={text}
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview((p) => !p)}
        onCopyLink={handleCopyLink}
        onSave={handleSave}
        onOpenNotes={() => setShowNotes(true)}
      />

      {showPreview ? (
        <MarkdownPreview text={text} />
      ) : (
        <Editor text={text} onChange={setText} />
      )}

      <StatusBar text={text} hint={hint} />

      {showNotes && (
        <NotesList
          notes={notes}
          onLoad={handleLoadNote}
          onDelete={handleDeleteNote}
          onClose={() => setShowNotes(false)}
        />
      )}
    </div>
  );
}
