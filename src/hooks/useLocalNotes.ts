import { useState, useCallback } from "react";
import {
  getSavedNotes,
  saveNote,
  deleteNote,
  type SavedNote,
} from "../lib/storage";

export function useLocalNotes() {
  const [notes, setNotes] = useState<SavedNote[]>(() => getSavedNotes());

  const refresh = useCallback(() => {
    setNotes(getSavedNotes());
  }, []);

  const save = useCallback(
    (content: string, existingId?: string) => {
      const note = saveNote(content, existingId);
      refresh();
      return note;
    },
    [refresh],
  );

  const remove = useCallback(
    (id: string) => {
      deleteNote(id);
      refresh();
    },
    [refresh],
  );

  return { notes, save, remove };
}
