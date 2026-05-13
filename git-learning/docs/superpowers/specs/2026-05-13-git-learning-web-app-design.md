# Git Learning Web App - Design Specification

**Date:** 2026-05-13
**Author:** Product Development Technical Trainer
**Status:** Approved
**Version:** 1.0

## Executive Summary

A simple, clean localhost web application that displays the existing `git-learning-complete.md` content in an interactive, navigable interface using MXWeb components. The app provides a better learning experience than reading raw markdown by offering collapsible sessions, copy-to-clipboard for git commands, clickable resource links, and visual progress tracking.

## Problem Statement

The existing `git-learning-complete.md` provides comprehensive Git training content but is:
- Hard to navigate (245 minutes of content in one long file)
- Difficult to track progress visually
- Requires manual scrolling to find sessions
- Git commands must be manually typed (no copy button)
- Resource links aren't clickable in most text editors
- No visual progress indicators

A web interface solves these problems while keeping the markdown file as the source of truth.

## Goals

### Primary Goals
1. Display markdown content in a clean, navigable web UI
2. Provide easy navigation between phases and sessions
3. Enable copy-to-clipboard for all git commands
4. Make resource links clickable and open in new tabs
5. Show visual progress bars and completion status
6. Use MXWeb components for consistent Kroger design system

### Secondary Goals
1. Keep architecture simple (no backend, no database)
2. Manual markdown editing remains the workflow
3. Refresh browser to see updated content
4. Work on localhost without complex setup
5. Match the look and feel of existing capacity planning app

## Non-Goals

- Auto-save checkbox states to markdown (user edits manually)
- Database or backend server
- Real-time markdown file watching (manual refresh is fine)
- Authentication or multi-user support
- Mobile app version
- Cloud deployment (localhost is sufficient)
- Automated testing or validation of exercises

## User Workflow

### Initial Setup (One Time)

1. Navigate to `git-learning` directory
2. Create `git-learning-app` subdirectory
3. Copy `.npmrc` from capacity planning app (Kroger npm registry)
4. Run `npm install`
5. Run `npm run dev`
6. Open `http://localhost:5173` in browser

### Daily Usage

1. Run `npm run dev` in `git-learning-app` directory
2. Browser opens with learning content displayed
3. Navigate phases/sessions in the UI
4. Click copy buttons to copy git commands
5. Click resource links to open readings/videos
6. When completing a session:
   - Edit `git-learning-complete.md` in VS Code
   - Update checkboxes, dates, notes
   - Refresh browser to see progress update
7. Continue learning journey

### Making Updates

- Edit markdown file in VS Code or any editor
- Save changes
- Refresh browser (Cmd+R / Ctrl+R)
- See updated content immediately

## Technical Architecture

### Stack

- **Frontend:** React 19.2.4 (matching capacity planning app)
- **Build Tool:** Vite 6
- **Component Library:** MXWeb Components 5.1.0 (matching capacity app)
- **Styling:** MXWeb CSS + minimal custom CSS
- **State:** React hooks (no Redux/Context needed)
- **Data:** Markdown file read via Vite `?raw` import

### File Structure

```
git-learning/
├── git-learning-complete.md          # Source of truth (user edits)
├── git-learning-app/                 # Web app (new)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .npmrc                        # Kroger npm config
│   └── src/
│       ├── main.jsx                  # Entry point
│       ├── App.jsx                   # Root component
│       ├── App.css                   # Main styles
│       │
│       ├── components/
│       │   ├── Sidebar.jsx           # Navigation panel
│       │   ├── PhaseView.jsx         # Display a phase
│       │   ├── SessionCard.jsx       # Collapsible session
│       │   ├── ProgressBar.jsx       # Visual progress
│       │   ├── CommandBlock.jsx      # Git command with copy
│       │   └── ResourceLink.jsx      # Clickable resource
│       │
│       ├── utils/
│       │   ├── markdownParser.js     # Parse markdown to JSON
│       │   └── clipboard.js          # Copy helpers
│       │
│       └── styles/
│           └── custom.css            # Additional styles
```

### Data Flow

```
git-learning-complete.md
    ↓ (read via Vite ?raw import)
main.jsx
    ↓
markdownParser.js
    ↓ (parse into structured JSON)
App.jsx (React state)
    ↓ (render)
Components (MXWeb + custom)
    ↓ (display in browser)
User Interface
```

### Reading Markdown File

**Vite Configuration (`vite.config.js`):**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@data': '/..'  // Access parent directory
    }
  }
});
```

**In App Component:**
```javascript
import markdownContent from '../git-learning-complete.md?raw';
import { parseMarkdown } from './utils/markdownParser';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const parsed = parseMarkdown(markdownContent);
    setData(parsed);
  }, []);

  // Render UI
}
```

**Benefits:**
- No backend server needed
- No file system API required
- Works on localhost immediately
- Dev server hot-reloads on file changes

## Markdown Parser

### Input

The existing `git-learning-complete.md` file with:
- Overall progress table
- 5 phases (Phase 0-4)
- Sessions within each phase
- Learning objectives (checkboxes)
- Resources (reading/video links)
- Exercise steps with bash commands
- Reflection questions

### Output Structure

```javascript
{
  overall: {
    totalTime: 245,        // minutes
    completedTime: 0,      // parsed from table
    percentComplete: 0     // calculated
  },
  phases: [
    {
      id: 0,
      name: "Foundation",
      status: "not-started",  // ⬜, 🔄, or ✅
      timeEstimate: 20,
      timeSpent: 0,
      tasks: [
        {
          id: "0-1",
          name: "Protect Main Branch",
          timeEstimate: 5,
          status: "not-started",
          steps: [...],
          resources: [...]
        }
      ]
    },
    {
      id: 1,
      name: "Inspection",
      status: "not-started",
      timeEstimate: 60,
      timeSpent: 0,
      sessions: [
        {
          id: "1.1",
          name: "What Changed?",
          learningTime: 15,
          practiceTime: 15,
          totalTime: 30,
          status: "not-started",
          objectives: [
            "Understand what 'git status' shows",
            "Understand what 'git diff' shows",
            // ...
          ],
          resources: [
            {
              type: "reading",
              title: "Atlassian: Inspecting a Repository",
              url: "https://...",
              time: 15
            },
            {
              type: "video",
              title: "Git Diff Explained",
              url: "https://...",
              time: 8
            }
          ],
          exercise: {
            steps: [
              "Create test directory",
              "Initialize repository",
              // ...
            ],
            commands: [
              "mkdir git-learning-test && cd git-learning-test",
              "git init",
              // ...
            ]
          },
          reflectionQuestions: [
            "What's the difference between git status and git diff?",
            // ...
          ]
        }
      ]
    }
  ]
}
```

### Parsing Strategy

**High-Level Approach:**
1. Split markdown by headings (`##`, `###`)
2. Identify phase sections by pattern matching
3. Extract sessions within each phase
4. Parse metadata (time estimates, status)
5. Extract objectives (checkbox lists)
6. Extract resources (markdown links with emojis)
7. Extract exercise steps and bash commands
8. Extract reflection questions

**Key Functions:**

```javascript
// Main parser
export function parseMarkdown(content) {
  const lines = content.split('\n');
  return {
    overall: parseOverallProgress(lines),
    phases: parsePhases(lines)
  };
}

// Parse overall progress table
function parseOverallProgress(lines) {
  // Find table in "📊 Overall Progress" section
  // Extract completed time, total time
  // Calculate percentage
}

// Parse all phases
function parsePhases(lines) {
  // Find each "## 🎯 Phase X:" section
  // Parse phase metadata and sessions/tasks
}

// Parse individual session
function parseSession(sectionLines) {
  return {
    id: extractSessionId(sectionLines),
    name: extractSessionName(sectionLines),
    status: extractStatus(sectionLines),
    objectives: extractObjectives(sectionLines),
    resources: extractResources(sectionLines),
    exercise: extractExercise(sectionLines),
    reflectionQuestions: extractReflection(sectionLines)
  };
}

// Status detection
function extractStatus(lines) {
  // Look for emoji: ⬜ (not started), 🔄 (in progress), ✅ (complete)
  // Default to not-started if missing
}

// Resources extraction
function extractResources(lines) {
  // Match pattern: 📖 [Title](url) (X mins)
  // or: 🎥 [Title](url) (X mins)
  const resourceRegex = /[📖🎥]\s*\[(.+?)\]\((.+?)\)\s*\((\d+)\s*mins?\)/g;
  // Return array of {type, title, url, time}
}

// Exercise extraction
function extractExercise(lines) {
  // Find bash code blocks between ```bash and ```
  // Extract step descriptions
  // Return {steps: [...], commands: [...]}
}
```

### Error Handling

- **Missing sections:** Return empty arrays
- **Invalid format:** Log warning, skip item
- **Malformed links:** Still display with placeholder URL
- **No status emoji:** Default to "not-started"
- **Invalid time:** Default to 0

Parser is defensive and always returns valid structure.

## User Interface Design

### Layout

```
┌─────────────────────────────────────────────────────────┐
│  Git Learning Progress Tracker                          │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ SIDEBAR  │           MAIN CONTENT                       │
│          │                                              │
│ Overall: │  ┌──────────────────────────────────────┐   │
│ ████░░░  │  │ Phase 1: Inspection                 │   │
│ 45%      │  │ Progress: ██████░░░░ 60%            │   │
│          │  │ Time: 36/60 mins                     │   │
│ Phases:  │  └──────────────────────────────────────┘   │
│          │                                              │
│ ✓ Phase 0│  [Session Cards - Collapsible]              │
│ → Phase 1│                                              │
│ ⬜ Phase 2│                                              │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

### Components

#### Sidebar (Navigation)

**Purpose:** Navigate between phases, show overall progress

**Elements:**
- Overall progress bar and percentage
- Phase list with status icons:
  - ✓ (complete)
  - → (in progress)
  - ⬜ (not started)
- Click phase to scroll to it
- Highlight current phase

**MXWeb Components Used:**
- Custom layout
- `KdsTag` for status indicators

#### PhaseView (Phase Display)

**Purpose:** Display phase header and list of sessions

**Elements:**
- Phase title and description
- Progress bar for phase completion
- Time estimate vs time spent
- List of session cards

**MXWeb Components Used:**
- Custom header
- Progress bar (custom with MX styling)

#### SessionCard (Collapsible Session)

**Purpose:** Display session content in expandable card

**States:**
- Collapsed: Show title, status, time estimate, expand button
- Expanded: Show all content (objectives, resources, exercise, reflection)

**Collapsed View:**
```
┌──────────────────────────────────────────────────────┐
│ [✓] Session 1.1: What Changed?           [Expand]   │
│     ⏱️ 30 mins                                       │
└──────────────────────────────────────────────────────┘
```

**Expanded View:**
```
┌──────────────────────────────────────────────────────┐
│ [✓] Session 1.1: What Changed?         [Collapse]   │
│     ⏱️ Learning: 15m | Practice: 15m | Total: 30m   │
├──────────────────────────────────────────────────────┤
│ 📚 LEARNING OBJECTIVES                               │
│ ☐ Understand what 'git status' shows                │
│ ☐ Understand what 'git diff' shows                  │
│                                                      │
│ 📖 RESOURCES                                         │
│ • Reading: Atlassian... (15m)      [Open Link →]    │
│ • Video: Git Diff... (8m)          [Open Link →]    │
│                                                      │
│ 💻 HANDS-ON EXERCISE                                 │
│ Step 1: Create test directory                       │
│ ┌────────────────────────────────────────┐          │
│ │ mkdir git-learning-test && cd ...     │ [Copy]   │
│ └────────────────────────────────────────┘          │
│                                                      │
│ 🤔 REFLECTION QUESTIONS                              │
│ • What's the difference between...                  │
└──────────────────────────────────────────────────────┘
```

**MXWeb Components Used:**
- `KdsButton` for expand/collapse
- `KdsTag` for status badge
- `KdsMessage` for tips/info boxes

#### CommandBlock (Git Command with Copy)

**Purpose:** Display bash command with copy-to-clipboard button

**Elements:**
- Code block with syntax highlighting
- Language badge ("bash")
- Copy button that changes to "✓ Copied"

**MXWeb Components Used:**
- `KdsButton` (tertiary, small) for copy

**Behavior:**
- Click copy → copies to clipboard
- Button shows "✓ Copied" for 2 seconds
- Uses `navigator.clipboard.writeText()`

#### ResourceLink (Clickable Resource)

**Purpose:** Display reading/video resource with clickable link

**Elements:**
- Resource type (📖 reading or 🎥 video)
- Title and time estimate
- "Open Link" button

**MXWeb Components Used:**
- `KdsButton` (secondary, small)

**Behavior:**
- Opens link in new tab
- External link indicator (→)

#### ProgressBar (Visual Progress)

**Purpose:** Show completion percentage visually

**Elements:**
- Horizontal bar
- Filled portion based on percentage
- Color: MX blue for in-progress, MX green for complete

**Implementation:**
- Custom CSS with MX design tokens
- Simple div with width percentage

### Color Scheme (MXWeb)

**Status Colors:**
- Complete: MX Green (`--kds-color-success`)
- In Progress: MX Blue (`--kds-color-primary`)
- Not Started: MX Gray (`--kds-color-neutral`)

**UI Elements:**
- Primary actions: MX Blue
- Secondary actions: MX Gray
- Code blocks: MX syntax colors
- Backgrounds: MX Light theme

### Responsive Design

**Desktop (Primary):**
- Sidebar fixed left (250px)
- Main content scrollable right
- Session cards full width

**Tablet:**
- Sidebar collapses to hamburger menu
- Main content full width
- Cards remain full width

**Mobile:**
- Hamburger menu for navigation
- Vertical stacking
- Touch-friendly buttons (44px min)

## MXWeb Component Integration

### Setup

**Install Dependencies:**
```json
{
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "mx-web-components": "^5.1.0",
    "react-mx-web-components": "^5.1.0"
  }
}
```

**Import MXWeb Styles (main.jsx):**
```javascript
import { defineCustomElements } from 'mx-web-components/dist/loader';
import 'mx-web-components/dist/kds-reset.css';
import 'mx-web-components/dist/kds-utils.css';
import 'mx-web-components/dist/kds-components.css';
import 'mx-web-components/dist/light.css';
import 'mx-web-components/dist/mx-web-components/mx-web-components.css';

defineCustomElements();
```

### Components Used

**From react-mx-web-components:**
- `KdsButton` - All action buttons
- `KdsTag` - Status indicators
- `KdsMessage` - Info/warning/success messages
- `KdsTooltippable` + `KdsIconInfo` - Help tooltips
- Icon components as needed

**Custom Components:**
- Sidebar navigation
- Progress bars
- Session cards
- Command blocks

## Key Features

### 1. Copy to Clipboard

**Implementation:**
```javascript
// utils/clipboard.js
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Copy failed:', err);
    return false;
  }
}

// In CommandBlock component
const [copied, setCopied] = useState(false);

const handleCopy = async () => {
  const success = await copyToClipboard(command);
  if (success) {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};
```

**User Experience:**
- Click "Copy" button
- Button text changes to "✓ Copied"
- Returns to "Copy" after 2 seconds
- Command copied to clipboard

### 2. Collapsible Sessions

**Implementation:**
```javascript
const [expandedSession, setExpandedSession] = useState(null);

const toggleSession = (sessionId) => {
  setExpandedSession(
    expandedSession === sessionId ? null : sessionId
  );
};
```

**Behavior:**
- Only one session expanded at a time (accordion)
- Click header to expand/collapse
- Smooth CSS transition
- Preserves scroll position

### 3. Navigation

**Sidebar Navigation:**
- Click phase → scrolls to phase in main content
- Highlight current phase based on scroll position
- Smooth scroll behavior

**Keyboard Navigation:**
- Tab through interactive elements
- Enter to activate buttons
- Escape to collapse session

### 4. External Links

**Implementation:**
```javascript
<KdsButton
  variant="secondary"
  size="small"
  onClick={() => window.open(url, '_blank')}
>
  Open Link →
</KdsButton>
```

**Behavior:**
- Opens in new tab
- External link indicator (→)
- Works for all resource links

### 5. Progress Tracking

**Visual Indicators:**
- Overall progress bar at top of sidebar
- Per-phase progress bars
- Session status tags (✓, →, ⬜)
- Time spent vs estimated

**Data Source:**
- Parsed from markdown file
- Status based on emoji in markdown
- No state persistence (read-only)

## Dependencies

### package.json

```json
{
  "name": "git-learning-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "mx-web-components": "^5.1.0",
    "react-mx-web-components": "^5.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.0"
  }
}
```

### .npmrc (Kroger Registry)

Copy from capacity planning app:
```
registry=https://registry.kroger.com/repository/npm-group/
```

## Development Workflow

### Initial Setup

```bash
# 1. Navigate to project
cd git-learning

# 2. Create app directory
mkdir git-learning-app
cd git-learning-app

# 3. Copy npm config
cp ../../capacity-planning-app/.npmrc .

# 4. Install dependencies
npm install

# 5. Start dev server
npm run dev
```

### Daily Development

```bash
# Start app
npm run dev

# Browser opens at http://localhost:5173

# Edit markdown → refresh browser → see changes
```

### Making Changes

**To markdown content:**
1. Edit `git-learning-complete.md` in VS Code
2. Save file
3. Refresh browser
4. Changes appear immediately

**To app code:**
1. Edit React components in `src/`
2. Save file
3. Vite hot-reloads automatically

### Building for Production

```bash
npm run build
# Creates dist/ folder

npm run preview
# Preview production build locally
```

## Error Handling

### Markdown Parsing Errors

**Strategy:** Defensive parsing, graceful degradation

**Handling:**
- Missing sections → return empty arrays
- Invalid format → log warning, skip item
- Malformed links → display with placeholder
- No status → default to "not-started"
- Invalid time → default to 0

**User Impact:** App always renders, even with partial data

### Runtime Errors

**Copy Fails:**
```javascript
if (!success) {
  // Show error message
  setError('Copy failed. Please copy manually.');
}
```

**Link Fails:**
- Browser handles invalid URLs
- Console log for debugging

**Render Errors:**
```javascript
// Error boundary component
class ErrorBoundary extends React.Component {
  componentDidCatch(error) {
    console.error('Render error:', error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <KdsMessage variant="error">
        Something went wrong. Please refresh.
      </KdsMessage>;
    }
    return this.props.children;
  }
}
```

## Performance

### Load Time

**Expected:**
- Markdown parsing: <50ms
- Initial render: <100ms
- Total load: <200ms

**Optimization:**
- Parse markdown once on mount
- Memoize parsed data
- Lazy render collapsed sessions
- Virtual scrolling not needed (reasonable data size)

### Bundle Size

**Estimated:**
- React 19: ~150KB
- MXWeb components: ~200KB
- Custom code: ~20KB
- Total: ~370KB

**Acceptable** for localhost development tool

### Updates

**Workflow:**
- Edit markdown → save
- Refresh browser (Cmd+R)
- Parser runs (~50ms)
- UI updates immediately

**No optimization needed** - simple refresh is fast enough

## Browser Compatibility

**Supported Browsers:**
- Chrome 90+ (primary)
- Safari 14+ (macOS)
- Firefox 88+
- Edge 90+

**Required APIs:**
- Clipboard API (requires localhost or HTTPS)
- ES6+ JavaScript features
- Modern CSS (flexbox, grid)

**Not Supported:**
- Internet Explorer (any version)
- Older mobile browsers

## Testing Strategy

### Manual Testing Checklist

**Functionality:**
- [ ] App loads without errors
- [ ] All phases display correctly
- [ ] Session cards expand/collapse
- [ ] Copy buttons work for all commands
- [ ] Resource links open in new tabs
- [ ] Progress bars show correct percentages
- [ ] Sidebar navigation works
- [ ] Markdown updates appear on refresh

**Browser Testing:**
- [ ] Chrome (latest)
- [ ] Safari (macOS)
- [ ] Firefox (latest)
- [ ] Edge (latest)

**Responsive Testing:**
- [ ] Desktop (1920x1080)
- [ ] Laptop (1440x900)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

### Edge Cases

- Empty sections (no resources, no reflection)
- Very long session names
- Many sessions in one phase
- All phases complete
- No phases complete
- Malformed markdown

## Future Enhancements (Not in V1)

**Potential Additions:**
1. File watcher for auto-refresh (no manual refresh needed)
2. Dark mode toggle
3. Search/filter sessions by keyword
4. Keyboard shortcuts for navigation
5. Print-friendly view
6. Export progress report
7. localStorage for UI preferences (expanded sessions, theme)
8. Share progress link (if deployed to web)
9. Gamification (badges, achievements)
10. Mobile app (React Native version)

**Not Planned:**
- Backend server
- Database
- Auto-save to markdown
- Multi-user support
- Real-time collaboration

## Success Criteria

**The app is successful if:**

1. ✅ Displays all markdown content in clean UI
2. ✅ Navigation is intuitive and fast
3. ✅ Copy buttons work for all git commands
4. ✅ Resource links open correctly
5. ✅ Progress bars reflect actual completion
6. ✅ Manual markdown edits appear on refresh
7. ✅ Looks professional with MXWeb components
8. ✅ User prefers it over reading raw markdown
9. ✅ Works on localhost without issues
10. ✅ Setup takes less than 5 minutes

## Deployment

### Development (Primary Use Case)

**Usage:**
```bash
cd git-learning/git-learning-app
npm run dev
# Access at http://localhost:5173
```

**When to use:** Daily learning sessions

### Production Build (Optional)

**Build:**
```bash
npm run build
# Creates dist/ folder with static files
```

**Deploy Options:**
- Copy `dist/` to any static host
- GitHub Pages
- Internal Kroger hosting
- Share with teammates

**Not required for individual use**

## Maintenance

### Updating Content

**Process:**
1. Edit `git-learning-complete.md`
2. Save changes
3. Refresh browser
4. Verify parsing worked correctly

**No app changes needed** for content updates

### Updating Dependencies

**Periodically:**
```bash
npm update
npm audit fix
```

**Major version updates:**
- Test thoroughly
- Check MXWeb compatibility
- Verify React 19 compatibility

### Bug Fixes

**Process:**
1. Reproduce in dev environment
2. Fix code in `src/`
3. Test in browser
4. Commit changes

**Common issues:**
- Parser not handling new markdown format
- Copy button not working in some browsers
- Layout issues on mobile

## Appendix A: Component API

### SessionCard Props

```javascript
<SessionCard
  session={sessionData}      // Session object from parser
  isExpanded={boolean}        // Expanded state
  onToggle={() => void}       // Toggle callback
/>
```

### CommandBlock Props

```javascript
<CommandBlock
  command={string}            // Git command to display
  language="bash"             // Code language
/>
```

### ResourceLink Props

```javascript
<ResourceLink
  type="reading"|"video"      // Resource type
  title={string}              // Display title
  url={string}                // Link URL
  time={number}               // Time in minutes
/>
```

### ProgressBar Props

```javascript
<ProgressBar
  current={number}            // Current progress
  total={number}              // Total amount
  variant="default"|"success" // Color scheme
/>
```

## Appendix B: Markdown Parsing Rules

### Status Detection

**Patterns:**
- ✅ or "✅" → complete
- 🔄 or "→" → in-progress
- ⬜ or default → not-started

### Time Extraction

**Patterns:**
- `**Time Estimate:** 15 minutes` → 15
- `⏱️ 30 mins` → 30
- `(15 mins)` → 15

### Resource Extraction

**Pattern:**
```
📖 [Reading Title](https://url.com) (15 mins)
🎥 [Video Title](https://url.com) (8 mins)
```

**Parsed to:**
```javascript
{
  type: "reading",
  title: "Reading Title",
  url: "https://url.com",
  time: 15
}
```

### Command Extraction

**Pattern:**
````markdown
```bash
git status
git diff file.txt
```
````

**Parsed to:**
```javascript
["git status", "git diff file.txt"]
```

## Sign-Off

This design specification has been reviewed and approved for implementation.

**Next Steps:**
1. User reviews this spec document
2. Invoke writing-plans skill to create implementation plan
3. Implement app (main components, parser, styling)
4. Test on macOS and browsers
5. Deploy locally and start using for training

---

**End of Design Specification**
