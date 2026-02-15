import { useCallback, useEffect, useRef } from "react";
import { compress, decompress } from "../lib/compression";

function normalizePath(p: string): string {
  return (p || "").replace(/^\/+|\/+$/g, "");
}

export function useUrlSync(
  text: string,
  setText: (val: string) => void,
  setHint: (msg: string) => void,
) {
  const initialized = useRef(false);

  const loadFromUrl = useCallback(() => {
    const seg = normalizePath(window.location.pathname);
    if (!seg) {
      setHint("Type to generate a shareable link.");
      return;
    }
    const decoded = decompress(seg);
    setText(decoded);
    setHint(`/${seg}`);
  }, [setText, setHint]);

  // Load from URL on mount (runs first)
  useEffect(() => {
    loadFromUrl();
    initialized.current = true;
  }, [loadFromUrl]);

  // Sync text changes to URL (only after initial load)
  useEffect(() => {
    if (!initialized.current) return;
    const seg = compress(text);
    const base = window.location.origin;
    const path = seg ? `/${seg}` : "/";
    window.history.replaceState({}, "", base + path);
    setHint(path === "/" ? "" : path);
  }, [text, setHint]);

  // Handle browser back/forward
  useEffect(() => {
    const handler = () => loadFromUrl();
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [loadFromUrl]);
}
