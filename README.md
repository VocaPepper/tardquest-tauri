# TARDQUEST Online II: A Realm Unborn

![MIT License](https://img.shields.io/badge/license-MIT-blue)
![Tauri 2](https://img.shields.io/badge/Tauri-2-purple)

A cross-platform Tauri v2 desktop wrapper for [TardQuest](https://tardquest.online/), a browser-based multiplayer RPG. Embeds the full game with a custom titlebar, retro CRT filters, and border art.

## Features

- Custom frameless titlebar with window controls
- Retro CRT filter (scanlines + dithering)
- Selectable border art (Characters, Erok, tile1)
- TardBoard leaderboard integration
- Auto-updater and window state persistence
- Cross-platform: Windows, Linux, Android

## Prerequisites

- Rust (edition 2021, MSRV 1.77.2)
- Node.js
- `cargo tauri` CLI

## Development

```sh
npm run tauri:dev
```

## Building

```sh
# Current platform
npm run tauri:build

# Specific targets
npm run tauri:build:win      # Windows (x86_64-pc-windows-msvc)
npm run tauri:build:linux    # Linux (x86_64-unknown-linux-gnu)

# Android
npm run tauri:android:dev
npm run tauri:android:build
```

## License

MIT © TardQuest Team
