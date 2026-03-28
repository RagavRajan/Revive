# Revive

An attendance tracking PWA that uses barcode scanning for check-ins and check-outs.

## Features

- **Barcode Scanner** — Register any barcode (ID badge, book, etc.) and scan it to record check-in/check-out events with audio and visual feedback
- **Calendar View** — Monthly overview of attendance with color-coded statuses: on-time (green), missed deadline (orange), absent (red), day off (gray)
- **Day Details** — Tap any day to see a full timeline of check-in/check-out events
- **Configurable Deadline** — Set a daily check-in deadline to track punctuality
- **Shared Calendar** — Generate a shareable link so others can view your attendance (read-only)
- **CSV Export** — Download your full attendance history
- **Midnight Auto-close** — Automatically checks you out at midnight if still checked in
- **Offline Support** — PWA with service worker and IndexedDB persistence

## Tech Stack

- React 19 + TypeScript
- Vite + vite-plugin-pwa
- Firebase (Auth + Firestore)
- html5-qrcode
- GitHub Pages (CI/CD via GitHub Actions)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
