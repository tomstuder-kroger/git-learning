# Git Learning System

A comprehensive Git and GitHub training system designed for product developers working with Claude Code.

## What's Included

### 1. Learning Content (`git-learning-complete.md`)
- 305 minutes of structured Git training
- 6 phases covering Git Basics, Safety Setup, Inspection, Branching, Pull Requests, and Claude + Git
- Hands-on exercises with step-by-step instructions
- Resources (Pro Git book, videos, readings) for each topic
- Reflection questions to deepen understanding

### 2. Web App (`git-learning-app/`)
- Interactive localhost web interface
- Visual progress tracking
- Copy-to-clipboard for git commands
- Collapsible session cards
- Built with React + MXWeb components

## Quick Start

### Option 1: Use the Web App (Recommended)

```bash
cd git-learning-app
npm install  # First time only
npm run dev
```

Then open http://localhost:5173 in your browser.

### Option 2: Read the Markdown Directly

Open `git-learning-complete.md` in your editor and follow along.

## Workflow

1. **Learn:** View content in web app or markdown file
2. **Practice:** Run git commands in your terminal
3. **Track Progress:** Update checkboxes in `git-learning-complete.md`
4. **Refresh:** See progress updates in web app

## Features

### Web App Features
- ✅ Navigate between phases and sessions
- ✅ Visual progress bars
- ✅ Copy git commands to clipboard
- ✅ Open resource links directly
- ✅ Collapsible session content
- ✅ Responsive design

### Learning Features
- ✅ Structured 5-phase curriculum
- ✅ Time estimates for each session
- ✅ Hands-on exercises with real git commands
- ✅ Safety practices for working with Claude Code
- ✅ Pull request practice
- ✅ Emergency recovery techniques

## Project Structure

```
git-learning/
├── README.md                      # This file
├── git-learning-complete.md       # Learning content (edit this)
├── git-learning-app/              # Web app
│   ├── src/
│   │   ├── components/            # UI components
│   │   ├── utils/                 # Parser & helpers
│   │   └── App.jsx                # Main app
│   ├── package.json
│   └── README.md                  # App-specific readme
└── docs/
    └── superpowers/specs/         # Design specs
```

## Phases Overview

### Phase 0: Git Foundations - The Basics (60 mins)
Learn Git fundamentals: what it is, how to install, first repository, connecting to GitHub

### Phase 1: Safety Setup (20 mins)
Protect main branch and establish team agreements

### Phase 2: Inspection (60 mins)
Learn to inspect changes with `git status` and `git diff`

### Phase 3: Branching (50 mins)
Master branch isolation and workflows

### Phase 4: Pull Requests (70 mins)
Practice creating, reviewing, and merging PRs

### Phase 5: Claude + Git Safety (45 mins)
Safe practices for working with AI-generated code

**Total Time:** 305 minutes (5 hours 5 minutes)

## Tech Stack (Web App)

- **React:** 19.2.4
- **Vite:** 6.0.0
- **MXWeb Components:** 5.1.0
- **Node:** LTS recommended

## Development

### Web App Development

```bash
cd git-learning-app

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### Updating Content

  When you are in progress or complete sessions, edit `git-learning-complete.md` and:
  1. Change status from ⬜ to 🔄 (in progress) or ✅ (complete)
  2. Add dates (Date Started, Date Completed)
  3. Add notes if you want
  4. Check off learning objectives: - [ ] → - [x]
  5. Refresh your browser to see the changes in the web app

## Tips

- **Use the web app** for a better learning experience
- **Copy commands** instead of typing them manually
- **Track progress** by updating the markdown file
- **Create real branches** during exercises
- **Practice PRs** when you reach Phase 3
- **Ask questions** during exercises to deepen understanding

## Support

For issues or questions about:
- **The web app:** Check `git-learning-app/README.md`
- **Learning content:** Review session objectives and resources
- **Git itself:** Refer to linked resources in each session

## License

Internal use only - Kroger product development training material.
