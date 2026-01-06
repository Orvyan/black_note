const editor = document.getElementById("editor");
const copyBtn = document.getElementById("copyBtn");
const hint = document.getElementById("hint");

// ---------- helpers ----------
function setHint(msg) {
  hint.textContent = msg || "";
}

function normalizePath(p) {
  return (p || "").replace(/^\/+|\/+$/g, "");
}

function compress(text) {
  return LZString.compressToEncodedURIComponent(text || "");
}

function decompress(seg) {
  try {
    return LZString.decompressFromEncodedURIComponent(seg || "") ?? "";
  } catch {
    return "";
  }
}

function setPath(seg) {
  const base = window.location.origin;
  const path = seg ? `/${seg}` : "/";
  window.history.replaceState({}, "", base + path);
  setHint(path === "/" ? "" : path);
}

// ---------- load from URL ----------
function loadFromUrl() {
  const seg = normalizePath(window.location.pathname);
  if (!seg) {
    setHint("Type to generate a shareable link.");
    return;
  }

  const text = decompress(seg);
  editor.value = text;
  setHint(`/${seg}`);
}

// ---------- events ----------
editor.addEventListener("input", () => {
  const text = editor.value ?? "";
  const seg = compress(text);
  setPath(seg);
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    setHint("Link copied.");
    setTimeout(loadFromUrl, 900);
  } catch {
    setHint("Clipboard permission blocked.");
  }
});

window.addEventListener("popstate", loadFromUrl);

// ---------- init ----------
loadFromUrl();
