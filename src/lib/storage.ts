export interface SavedNote {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "black_note_saved";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function extractTitle(content: string): string {
  const firstLine = content.trim().split("\n")[0] || "";
  const cleaned = firstLine.replace(/^#+\s*/, "").trim();
  return cleaned.slice(0, 50) || "Untitled";
}

export function getSavedNotes(): SavedNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedNote[];
  } catch {
    return [];
  }
}

export function saveNote(content: string, existingId?: string): SavedNote {
  const notes = getSavedNotes();
  const now = Date.now();

  if (existingId) {
    const idx = notes.findIndex((n) => n.id === existingId);
    if (idx !== -1) {
      notes[idx].content = content;
      notes[idx].title = extractTitle(content);
      notes[idx].updatedAt = now;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      return notes[idx];
    }
  }

  const note: SavedNote = {
    id: generateId(),
    title: extractTitle(content),
    content,
    createdAt: now,
    updatedAt: now,
  };

  notes.unshift(note);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  return note;
}

export function deleteNote(id: string): void {
  const notes = getSavedNotes().filter((n) => n.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
