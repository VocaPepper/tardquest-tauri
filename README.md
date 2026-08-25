# TardQuest (Tauri v2) v1.20.1

Tauri v2 desktop wrapper for [TardQuest](https://github.com/packardbell95/tardquest), ported from the Electron `tardquest-standalone` app. The version matches the standalone app.

## Features

- Frameless window with a custom, draggable titlebar.
- Toolbar controls for border art, the CRT filter, TardBoard, developer tools, and game volume.
- Game content embedded from `src/game/`.
- Draggable TardBoard, TardTest, and APITest windows.
- Window position and size persistence via `tauri-plugin-window-state`.
- Auto-update support via `tauri-plugin-updater`.

## Layout

```
src/
  index.html          # fallback entry redirecting to shell/
  shell/              # the desktop shell (titlebar + toolbar + draggable windows)
  game/               # TardQuest game content
src-tauri/            # Rust backend (window, plugins, capabilities)
```

The game content is committed to the repository.

## Prerequisites

- Rust (edition 2021, MSRV 1.77.2)
- `cargo-tauri` CLI, or use the npm scripts below
- WebView2 (Windows 10/11); on Linux, GTK/WebKitGTK dev packages (see CI workflow)

## Development

```sh
npm run dev        # cargo tauri dev
```

The shell is served statically from `src/` (no bundler). Editing `src/` requires a window reload; Rust edits rebuild automatically.

## Building

The default build produces an app binary without an installer.

```sh
# Binary for the current platform
npm run build

# Explicit targets
npm run build:win       # Windows x86_64-pc-windows-msvc
npm run build:linux     # Linux x86_64-unknown-linux-gnu

# Build Linux packages
cargo tauri build --target x86_64-unknown-linux-gnu --bundles appimage,deb
```

## CI

`.github/workflows/build.yml` builds automatically on push / pull-request / tag / manual dispatch:

- **Windows** → standalone `tardquest.exe` (no installer) uploaded as an artifact.
- **Linux** → `AppImage` + `.deb` uploaded as an artifact.
- Pushing a `v*` tag also publishes the cross-platform artifacts to a GitHub Release.

## Notes

- Updater endpoints/pubkey are empty; configure them in `src-tauri/tauri.conf.json` and provide a signing key before enabling auto-updates. Updater artifacts are intentionally disabled until then.
- The build is verified offline against cached crates; CI resolves dependencies normally.

## License

ISC
