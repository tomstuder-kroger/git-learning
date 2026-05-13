--- START FILE ---

 
# Training Topics Tracker — MVP PRD + Claude Prompt Pack
**Stack:** Create React App (CRA) + JavaScript + MUI + @dnd-kit + LocalStorage  
**Primary View:** Kanban board  
**User:** single user (you)  
**Timeline:** ~1 week to first usable MVP

---

## 1) Product Requirements Doc (PRD)

### 1.1 Problem / user need
You want a lightweight way to:
- Keep track of all topics you are learning
- Show progress at a glance
- Capture where you are stuck and what to learn next (notes + action checkboxes)
- Make it easy enough that you use it 3–5 times/week

General tools (Notion/Trello/Calendar) can do parts of this, but you want a purpose-built workflow: topic → subtopics checklist → notes/actions → kanban status.

### 1.2 Target user
- You (single user for v0.1)
- Web-first, mobile-friendly responsive UI

### 1.3 Success criteria
After 2 weeks:
- You use it **3–5 times/week**
- It feels “easy to use” (low friction to add/update)
- You can quickly see:
  - what’s Primary vs Secondary learning
  - what’s In Progress vs Blocked vs Completed
  - what you noted to do next, and which actions are addressed

### 1.4 MVP scope (v0.1)

#### Must-haves (core scope)
1) **Kanban board** with topic cards and drag/drop between fixed columns  
2) **CRUD Topics** + **in-card subtopic checklist** (subtopics optional)  
3) **Topic notes** that support both:
   - text notes
   - checkbox note items (to confirm/track addressed actions)

#### Explicitly out of scope (v0.1)
- Multi-user/auth/cloud sync
- Calendar view
- Analytics dashboard (time spent, streaks, etc.)
- Attachments/files
- Rich-text editor beyond simple inline editing

### 1.5 Primary workflow (happy path)
1) Create Topic (title required, optional description)
2) Add optional subtopics checklist items
3) Move topic across board columns as status changes
4) Add notes (plain text) and checkbox actions
5) Check off subtopics/checkbox notes as you make progress

---

## 2) Functional Requirements

### 2.1 Kanban board
**Fixed columns (exact names + order):**
1. Primary Learning
2. Secondary Learning
3. Backlog
4. In Progress
5. Completed
6. Blocked

**Drag/drop behavior**
- Dragging a topic card to another column updates **status only** (no sessions/goals/dates beyond completedAt rules).
- Status transitions:
  - If moved into **Completed**, set `completedAt = Date.now()`
  - If moved **out of Completed**, clear `completedAt = undefined`
  - Any change updates `updatedAt = Date.now()`

**MVP simplification**
- No reordering required within a column (cross-column moves only).

### 2.2 Topics (CRUD)
Topic fields (MVP):
- `id` (string)
- `title` (required)
- `description` (optional)
- `status` (one of the fixed column names)
- `createdAt` (number, epoch ms)
- `updatedAt` (number, epoch ms)
- `completedAt` (optional number, epoch ms)
- `subtopics` (array)
- `notes` (array)

Operations:
- Create topic (default status: `Backlog`)
- Edit topic title/description
- Delete topic (confirm dialog)

### 2.3 Subtopics (optional checklist inside a topic)
Subtopic fields:
- `id`, `text`, `done`

Operations:
- Add, edit, toggle done, delete

### 2.4 Notes (Topic-level, mixed types)
Notes attach to **Topic** only.

Two note item types:
- Text note: `{ id, type: "text", text, createdAt }`
- Checkbox note: `{ id, type: "check", text, checked, createdAt }`

Operations:
- Add text note
- Add checkbox note
- Edit note text
- Toggle checkbox (checkbox notes only)
- Delete note

### 2.5 Persistence
- Local-only persistence (v0.1)
- Use `LocalStorage`
- Storage key: `trainingTracker.v1`
- Safe load with defaults if missing/corrupt
- Debounced save (250–500ms)

---

## 3) Non-functional Requirements
- Mobile-friendly responsive layout (horizontal scroll for columns OK)
- Data should persist across refresh
- Confirm before destructive actions
- Reasonable accessibility (focus states, keyboard usage where feasible)
- Smooth drag/drop for typical use (10–200 topics)

---

## 4) Screens / Information Architecture (MVP)
1) **Board View (main)**
   - AppBar + Add Topic
   - Columns with topic cards
2) **Topic Detail Drawer (right)**
   - Edit title/description
   - Subtopics checklist editor
   - Notes editor (text + checkbox)
   - Delete topic

---

## 5) Data Model (draft)

```js
// Statuses are fixed strings.
const Statuses = [
  "Primary Learning",
  "Secondary Learning",
  "Backlog",
  "In Progress",
  "Completed",
  "Blocked"
];

// Note items are mixed types:
/// { id, type: "text", text, createdAt }
/// { id, type: "check", text, checked, createdAt }

// Topic:
/// {
///   id,
///   title,
///   description?,
///   status,
///   createdAt,
///   updatedAt,
///   completedAt?,
///   subtopics: [{id, text, done}],
///   notes: [NoteItem]
/// }

6) Acceptance Criteria (MVP)
Board / status changes
Dragging a topic card to another column updates its status and persists after refresh.
Moving into Completed sets completedAt; moving out clears completedAt.
Topic CRUD
Create/edit/delete topics works and persists after refresh.
Delete requires confirmation.
Subtopics
Add/edit/toggle/delete subtopics works and persists after refresh.
Notes
Add text note works and persists after refresh.
Add checkbox note, toggle, edit, delete works and persists after refresh.
Resilience
If LocalStorage is corrupt, the app resets safely to defaults (and does not crash).

2) Claude Prompt Pack (CRA + MUI + @dnd-kit)
Use these prompts in order. Each prompt requests specific files + code.

Prompt 0 — Setup commands + dependencies

“Act as a senior React engineer. Propose an MVP architecture for a React (JS) browser app with: Kanban board, topic CRUD, subtopic checklist inside topic, topic notes with checkboxes, and LocalStorage persistence. 

Output:

component tree
state shape
data flow approach (useReducer vs Zustand, etc.)
routing (if any)
recommended drag/drop library (or minimal custom) and rationale

Keep it simple for a 1-week MVP.”

“You are building a Create React App (CRA) project (JavaScript, not TypeScript). Provide the exact install commands for dependencies for:

MUI (Material UI)
@dnd-kit (core/sortable/utilities)

Also mention any required peer deps (emotion). Then provide a recommended folder structure under src/ for this app.”

Prompt 1 — Data model + reducer actions (single source of truth)
“Create the app state model and reducer for a learning-topics Kanban app.

Requirements:

Fixed statuses/columns in this order: Primary Learning, Secondary Learning, Backlog, In Progress, Completed, Blocked.
Topic cards only.
Topic fields: id, title (required), description (optional), status, createdAt, updatedAt, completedAt (optional), subtopics[], notes[].
Subtopics are checklist items: id, text, done.
Notes support two types:
text note: {id, type:'text', text, createdAt}
checkbox note: {id, type:'check', text, checked, createdAt}
Status transition rules:
moving into Completed sets completedAt=Date.now()
moving out of Completed clears completedAt
any change sets updatedAt=Date.now()
Actions to implement (with payload shapes):

TOPIC_CREATE, TOPIC_UPDATE (title/description), TOPIC_DELETE
TOPIC_MOVE_STATUS
SUBTOPIC_ADD, SUBTOPIC_UPDATE_TEXT, SUBTOPIC_TOGGLE, SUBTOPIC_DELETE
NOTE_ADD_TEXT, NOTE_ADD_CHECK, NOTE_UPDATE_TEXT, NOTE_TOGGLE_CHECK, NOTE_DELETE
UI_SELECT_TOPIC, UI_CLOSE_TOPIC
Output:

src/constants/statuses.js
src/state/initialState.js
src/state/actions.js (action creators optional but include action type constants)
src/state/reducer.js (pure reducer + helper functions)

Use plain JS. Use a simple uid() helper (or nanoid if you prefer, but then include dependency + install note).”
Prompt 2 — LocalStorage persistence (safe load + debounced save)
“Implement LocalStorage persistence for the reducer state.

Requirements:

Storage key: trainingTracker.v1
loadState() returns default initial state if missing/corrupt
saveState(state) debounced (e.g., 250–500ms)
Only persist the minimum necessary (topics + maybe ui selectedTopicId optional)
Include a tiny migration/version placeholder
Output these files:

src/storage/storage.js
Show how to wire it into src/index.js or src/App.js (where to call loadState and how to subscribe/save).”
Prompt 3 — App shell + MUI theme + layout
“Generate the CRA React components for the app shell using MUI.

Requirements:

Top AppBar with app name + ‘Add Topic’ button
Main content is the Kanban board
Responsive: columns in a horizontally scrollable row on small screens
Use MUI components and sx styling
Output:

src/App.js
src/components/AppShell.js (optional if you prefer)
src/theme/theme.js (optional)

Include all imports.”
Prompt 4 — Kanban board with @dnd-kit (drag topic cards between columns)
“Implement the Kanban board using @dnd-kit + MUI.

Requirements:

Fixed columns in correct order
Each column renders its topics
Dragging a topic card to another column updates status via TOPIC_MOVE_STATUS
Use @dnd-kit sensors for mouse/touch
Provide clear drop targets per column
Keep it simple (no reordering within a column required for MVP, unless trivial)
Output:

src/components/Board/Board.js
src/components/Board/Column.js
src/components/Topic/TopicCard.js
Also show the exact reducer dispatch call made on drag end, including handling of Completed rules through reducer.”

Prompt 5 — Add Topic modal (MUI Dialog)
“Implement an ‘Add Topic’ modal dialog in MUI.

Requirements:

Title required validation
Optional description
Default status should be Backlog
On submit dispatch TOPIC_CREATE
Close on cancel or submit
Output:

src/components/Topic/AddTopicDialog.js
Update AppBar button wiring in App shell/App.js to open it.”
Prompt 6 — Topic detail Drawer (edit + subtopics + notes + delete)
“Implement a Topic Detail view as a right-side MUI Drawer.

Requirements:

Clicking a TopicCard opens the Drawer (UI_SELECT_TOPIC)
Drawer shows:
editable title + description
status display (read-only for MVP; status changes via board drag)
completedAt display if present
Delete topic with confirmation dialog
Contains two sections:
Subtopics checklist editor
Notes (text + checkbox items)
Close drawer action (UI_CLOSE_TOPIC)
Output:

src/components/Topic/TopicDrawer.js
src/components/Topic/DeleteTopicDialog.js
Update TopicCard click handler to open drawer
Any required selector helpers (e.g., getTopicById).”
Prompt 7 — Subtopics checklist components
“Implement Subtopics UI inside the TopicDrawer.

Requirements:

List subtopics with checkbox toggle (done)
Add subtopic input + button
Edit subtopic text inline
Delete subtopic

Dispatch actions: SUBTOPIC_ADD, SUBTOPIC_UPDATE_TEXT, SUBTOPIC_TOGGLE, SUBTOPIC_DELETE
Output:

src/components/Subtopics/SubtopicsPanel.js”
Prompt 8 — Notes components (text notes + checkbox notes mixed)
“Implement Notes UI inside the TopicDrawer.

Requirements:

Add TEXT note (no checkbox)
Add CHECK note (with checkbox)
Render mixed list in created order (append)
Edit note text inline
Toggle checkbox for check notes only
Delete note

Dispatch: NOTE_ADD_TEXT, NOTE_ADD_CHECK, NOTE_UPDATE_TEXT, NOTE_TOGGLE_CHECK, NOTE_DELETE
Output:

src/components/Notes/NotesPanel.js”
Prompt 9 — Wiring: Context provider for state/dispatch + selectors
“Provide a simple state management wiring using React Context + useReducer.

Requirements:

StateProvider loads initial state from loadState() (LocalStorage)
On state changes, call debounced saveState(state)
Expose useAppState() and useAppDispatch()
Ensure no infinite loops
Keep code idiomatic for CRA
Output:

src/state/StateProvider.js
Show how to wrap <App /> in src/index.js.”
Prompt 10 — MVP QA checklist + edge cases
“Give a focused QA checklist for this app and list edge cases to test.

Include:

drag/drop across columns + Completed date set/cleared
persistence after refresh
deleting selected topic while drawer open
mobile responsiveness
corrupt LocalStorage recovery”
Implementation defaults (documented)
New topics default to Backlog
Drag/drop supports cross-column moves only (no within-column ordering)