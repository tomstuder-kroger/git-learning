# Git Learning Web App

A simple localhost web app that displays your `git-learning-complete.md` content in an interactive, navigable interface.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173 in your browser
```

## Usage

1. Edit `git-learning-complete.md` in VS Code
2. Update checkboxes, dates, and notes as you complete sessions
3. Refresh browser to see updates
4. Click copy buttons to copy git commands
5. Click resource links to open readings/videos

## Features

- ✅ Clean, navigable interface with MXWeb components
- ✅ Collapsible session cards
- ✅ Copy-to-clipboard for all git commands
- ✅ Clickable resource links
- ✅ Visual progress tracking
- ✅ Responsive design

## Tech Stack

- React 19.2.4
- Vite 6
- MXWeb Components 5.1.0
- No backend required

## Development

The app reads `git-learning-complete.md` directly via Vite's raw import feature. Any changes to the markdown file will be reflected when you refresh the browser.

No build step is required during development - Vite provides hot reloading for all React code changes.
