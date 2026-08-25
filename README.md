# TardQuest (Tauri v2)

A clean Tauri v2 desktop wrapper for [TardQuest](https://github.com/packardbell95/tardquest), ported from the Electron `tardquest-standalone` app.

## Features

- Frameless window with a custom titlebar — minimize / maximize / fullscreen / close, plus draggable titlebar.
- Toolbar: background border art selector, retro CRT filter (scanlines + dithering), TardBoard (online leaderboard), Dev tools (password-gated TardTest / APITest), and a master game-volume slider.
- The full game runs embedded in an iframe from `src/game/`.
- Draggable sub-windows (TardBoard, TardTest, APITest).
- Window state persistence (position/size) via `tauri-plugin-window-state`.
- Auto-update scaffolding via `tauri-plugin-updater`.

## Layout

```
src/
  index.html          # fallback entry redirecting to shell/
  shell/              # the desktop shell (titlebar + toolbar + draggable windows)
  game/               # TardQuest game content (build input; not committed – see .gitignore)
src-tauri/            # Rust backend (window, plugins, capabilities)
```

## Prerequisites

- Rust (edition 2021, MSRV 1.77.2)
- `cargo-tauri` CLI
- WebView2 (Windows 10/11)

## Development

```sh
npm run dev        # cargo tauri dev
```

The shell is served statically from `src/` (no bundler). Editing `src/` requires a window reload; Rust edits rebuild automatically.

## Building

```sh
# Current platform
npm run build

# Specific targets
npm run build:win     # Windows x86_64-pc-windows-msvc
npm run build:linux   # Linux x86_64-unknown-linux-gnu
```

## Setup: game content

Drop the game files into `src/game/` (this repo ships for Windows/Linux, not the game). The `src/game/` directory is gitignored; the game is copied in as a build input.

## Notes

- The Dev password is a single constant in `src/shell/scripts/devtools.js` (`DEV_PASSWORD`). Set it to the real value before shipping.
- Updater endpoints/pubkey are empty; configure them in `src-tauri/tauri.conf.json` and provide a signing key before enabling auto-updates.

## License

ISC
