# Black Note

A minimalist, zero-storage note-taking app. Your text is compressed directly into the URL — no server, no database, no account required. Just type and share.

## Features

- **URL-based sharing** — Text is compressed into the URL using LZ-String. Copy the link and anyone can read your note.
- **Markdown preview** — Toggle between editing and a formatted markdown preview.
- **Local storage** — Save notes to your browser for later. Load or delete them anytime.
- **Export** — Download your note as `.txt` or `.md`.
- **Character & word count** — Live stats in the status bar.
- **Keyboard shortcuts** — `Ctrl+S` to save, `Ctrl+L` to copy the link.
- **Dark theme** — Minimal, distraction-free design with glass-morphism effects.

## Tech Stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com) v4
- [LZ-String](https://github.com/pieroxy/lz-string) for compression
- [Lucide](https://lucide.dev) for icons
- [react-markdown](https://github.com/remarkjs/react-markdown) for preview

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy

Optimized for [Vercel](https://vercel.com). Connect your GitHub repo and it deploys automatically — build command and output directory are configured in `vercel.json`.

## License

[MIT](LICENSE)
