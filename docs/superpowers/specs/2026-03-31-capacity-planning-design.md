# IC Capacity Planning Web App - Design Specification

**Date:** 2026-03-31
**Author:** Design Session with User
**Status:** Approved for Implementation

---

## 1. Overview

### Purpose
Build a React-based web application to help Individual Contributors (ICs) and managers estimate quarterly capacity using a standardized methodology. The app calculates available time vs. planned work, identifies over/under capacity situations, and generates formatted summaries for team discussions.

### Users
- **Primary:** Both ICs (self-planning) and managers (team planning)
- **Use Cases:**
  - ICs fill in their own capacity data and review utilization
  - Managers input data for multiple team members to assess team capacity
  - Generate reports for prioritization conversations with stakeholders

### Key Requirements
- Based on the IC Quarterly Capacity Planning Methodology
- Local storage persistence (browser-based, no backend)
- Support multiple IC plans with easy switching
- Real-time calculation and visual dashboard
- Formatted text output matching methodology template
- Copy/paste functionality for sharing results

---

## 2. Technical Architecture

### Tech Stack
- **Framework:** React (Create React App)
- **UI Library:** Material-UI v5 (MUI)
- **State Management:** React Context API
- **Persistence:** localStorage
- **Visualization:** Recharts (optional for charts)
- **Build Tool:** Create React App defaults

### Why This Stack?
- Material-UI provides professional form components and dashboard widgets out of the box
- React Context is sufficient for this single-page app's state needs
- localStorage keeps it simple while meeting browser-based persistence requirement
- No backend complexity - fast to build and deploy

### Project Location
The app will be created in a new directory: `/Users/ts73344/Desktop/claudeTest/capacity-planning-app/`

This keeps it separate from existing projects in the workspace.

### Project Structure
```
capacity-planning-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ICSelector.jsx          # Dropdown to switch between saved ICs
│   │   ├── QuarterInfoForm.jsx     # Quarter name & weeks input
│   │   ├── ICInfoForm.jsx          # IC name & role
│   │   ├── TimeOffForm.jsx         # OKR, PTO, Dev, Holiday inputs
│   │   ├── DomainForm.jsx          # Single domain with project inputs
│   │   ├── DomainList.jsx          # Dynamic list of domains (add/remove)
│   │   ├── CapacityDashboard.jsx   # Visual summary with status indicators
│   │   └── FormattedOutput.jsx     # Text template output with copy button
│   ├── context/
│   │   └── CapacityContext.jsx     # State management & localStorage
│   ├── utils/
│   │   ├── calculations.js         # All formula logic
│   │   └── storage.js              # localStorage helpers
│   ├── App.jsx                      # Main layout & routing
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

---

## 3. Data Model

### IC Plan Data Structure
```javascript
{
  id: "unique-uuid-123",              // Generated UUID
  icName: "Joe Test",                 // Required
  icRole: "PD",                       // Required
  quarter: "Q1 2024",                 // Required, manual input
  weeksInQuarter: 13,                 // Required, manual input

  timeOff: {
    okrTime: {
      value: 2,                       // Non-negative, decimals allowed
      unit: "weeks"                   // "weeks" or "days"
    },
    ptoDays: 5,                       // Non-negative, decimals allowed
    devDays: 1,                       // Non-negative, decimals allowed
    holidayDays: 1                    // Non-negative, decimals allowed
  },

  domains: [
    {
      id: "domain-uuid-1",
      name: "TEST",                   // Required when domain exists
      smallProjects: 0,               // Non-negative integers
      mediumProjects: 0,              // Non-negative integers
      largeProjects: 2                // Non-negative integers
    }
    // Dynamic array - user can add/remove domains
  ],

  lastModified: "2024-03-31T15:00:00Z"
}
```

### Calculated Results (Computed, Not Stored)
```javascript
{
  totalWeeksInQuarter: 13,
  totalTimeOffWeeks: 3.4,
  totalWeeksAvailable: 9.6,

  domainEfforts: [
    {
      domainId: "domain-uuid-1",
      domainName: "TEST",
      totalWeeks: 16.0,
      breakdown: {
        smallWeeks: 0,
        mediumWeeks: 0,
        largeWeeks: 16.0
      }
    }
  ],

  totalPlannedWork: 16.0,
  capacityUtilization: 125,              // percentage
  overUnderCapacity: 3.4,                // positive = over, negative = under
  status: "over"                         // "over" | "fully" | "under"
}
```

### localStorage Schema
```javascript
// Key: "capacity-planning-ics"
// Value: Array of IC plan objects
[
  { id: "uuid-1", icName: "Joe Test", ... },
  { id: "uuid-2", icName: "Jane Smith", ... }
]

// Key: "capacity-planning-active-id"
// Value: Currently selected IC's UUID
"uuid-1"

// Key: "capacity-planning-version"
// Value: Schema version for future migrations
1
```

---

## 4. Calculation Logic

All formulas are from the IC Quarterly Capacity Planning Methodology.

### Formula 1: Total Time Off
```javascript
// If OKR time is in weeks:
totalTimeOffWeeks = okrWeeks + ((ptoDays + devDays + holidayDays) / 5)

// If OKR time is in days:
totalTimeOffWeeks = (okrDays + ptoDays + devDays + holidayDays) / 5
```

### Formula 2: Total Weeks Available
```javascript
totalWeeksAvailable = weeksInQuarter - totalTimeOffWeeks
```

### Formula 3: Domain Effort
```javascript
// For each domain:
domainEffort = (smallProjects × 2) + (mediumProjects × 4) + (largeProjects × 8)
```

### Formula 4: Total Planned Work
```javascript
totalPlannedWork = sum(all domain efforts)
```

### Formula 5: Capacity Utilization
```javascript
capacityUtilization = (totalPlannedWork / totalWeeksAvailable) × 100
```

### Formula 6: Over/Under Capacity
```javascript
overUnderCapacity = totalPlannedWork - totalWeeksAvailable

// Interpretation:
// positive value = over capacity
// negative value = under capacity
// zero = fully allocated
```

### Formula 7: Status Classification
```javascript
if (capacityUtilization > 100) {
  status = "over"
} else if (capacityUtilization >= 90) {
  status = "fully"
} else {
  status = "under"
}
```

### Project Size Defaults
- Small project = 2 weeks
- Medium project = 4 weeks
- Large project = 8 weeks

---

## 5. User Interface Design

### Main Layout

```
┌─────────────────────────────────────────────────────┐
│ Header: "IC Capacity Planning"                      │
│ [IC Selector Dropdown ▼] [+ New IC] [Delete IC]    │
├─────────────────────────────────────────────────────┤
│                                                      │
│ ┌─ Input Form (Left 60%) ──┐ ┌─ Dashboard (40%) ─┐ │
│ │                           │ │                    │ │
│ │ Quarter Information       │ │  Capacity Status   │ │
│ │ ├─ Quarter: [_______]    │ │  ┌──────────────┐  │ │
│ │ └─ Weeks: [____]         │ │  │    125%      │  │ │
│ │                           │ │  │  Over Capacity │ │
│ │ IC Information            │ │  └──────────────┘  │ │
│ │ ├─ Name: [__________]    │ │                    │ │
│ │ └─ Role: [__________]    │ │  Available: 9.6w   │ │
│ │                           │ │  Planned: 16.0w    │ │
│ │ Time Off                  │ │  Over by: 3.4w     │ │
│ │ ├─ OKR: [__] ⦿Days ○Weeks│ │                    │ │
│ │ ├─ PTO: [__] days        │ │  Domains: 1        │ │
│ │ ├─ Dev: [__] days        │ │  Projects: 2 Large │ │
│ │ └─ Holiday: [__] days    │ │                    │ │
│ │                           │ │                    │ │
│ │ Domains & Planned Work    │ │  [View Summary]    │ │
│ │ ┌─ Domain 1 ────────────┐│ │                    │ │
│ │ │ Name: [___] [×Remove] ││ │                    │ │
│ │ │ Small:  [_] (2w ea)   ││ │                    │ │
│ │ │ Medium: [_] (4w ea)   ││ │                    │ │
│ │ │ Large:  [_] (8w ea)   ││ │                    │ │
│ │ │ Total: 16.0 weeks     ││ │                    │ │
│ │ └───────────────────────┘│ │                    │ │
│ │ [+ Add Domain]            │ │                    │ │
│ └───────────────────────────┘ └────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Component Specifications

#### ICSelector Component
- **Location:** Top bar
- **Elements:**
  - MUI Select dropdown showing all saved ICs (display: IC name + role)
  - "+ New IC" button (opens create dialog)
  - "Delete IC" button (with confirmation dialog)
  - "Duplicate IC" button (copies current IC)
- **Behavior:**
  - Selecting IC loads data into form
  - All changes auto-save
  - Delete removes from list with confirmation

#### Input Form Section (Always Editable)
- **QuarterInfoForm:**
  - Quarter name TextField (e.g., "Q1 2024")
  - Weeks in quarter TextField (number input)
  - Wrapped in MUI Card

- **ICInfoForm:**
  - IC name TextField
  - IC role TextField
  - Wrapped in MUI Card

- **TimeOffForm:**
  - OKR time TextField with RadioGroup (Days/Weeks)
  - PTO days TextField
  - Dev days TextField
  - Holiday days TextField
  - Shows calculated "Total time off: X.X weeks" at bottom
  - Wrapped in MUI Card

- **DomainList:**
  - Dynamically renders array of DomainForm components
  - "Add Domain" button always visible
  - Empty state: "No domains added yet. Click 'Add Domain' to start."

- **DomainForm:** (one per domain)
  - Domain name TextField
  - Small projects TextField (number, integer only)
  - Medium projects TextField (number, integer only)
  - Large projects TextField (number, integer only)
  - Shows "Domain total: X weeks" calculated inline
  - Remove button (icon button with confirmation)
  - Wrapped in MUI Card

#### CapacityDashboard Component
- **Location:** Right panel
- **Elements:**
  - Large gauge/progress indicator showing utilization %
  - Color-coded by status:
    - Green: < 90% (under capacity)
    - Yellow: 90-100% (fully allocated)
    - Red: > 100% (over capacity)
  - Key metrics displayed as chips/small cards:
    - Total weeks available
    - Total planned work
    - Over/under capacity (with +/- indicator)
    - Number of domains
    - Project count summary (e.g., "2 Large, 1 Medium")
  - "View Summary" button (opens FormattedOutput modal)
- **Behavior:**
  - Updates in real-time as user edits form
  - If validation errors exist, show warning icon/message

#### FormattedOutput Component
- **Type:** Modal dialog
- **Content:**
  - Full text output matching methodology template
  - Formatted as markdown/preformatted text
  - Exactly matches the "IC Capacity Summary" template from methodology
  - Example sections:
    - IC Name, Role, Quarter
    - Capacity Utilization %
    - Summary Calculations
    - Planned Work by Domain
    - Total Planned Work
    - Note for Team Discussion
- **Actions:**
  - "Copy to Clipboard" button
  - "Close" button
- **Behavior:**
  - Click "View Summary" on dashboard to open
  - Copy button provides success feedback (Snackbar: "Copied!")

---

## 6. User Workflows

### Workflow 1: Create First IC Plan
1. App loads, shows empty state: "Create your first IC capacity plan"
2. Click "+ New IC" button
3. Form appears with all fields empty
4. User fills in:
   - Quarter info (name, weeks)
   - IC info (name, role)
   - Time off (OKR with unit selector, PTO, Dev, Holiday)
   - Click "Add Domain" to add first domain
   - Fill in domain name and project counts
5. Dashboard updates in real-time showing calculations
6. Auto-saves to localStorage after each change
7. User can click "View Summary" to see formatted output

### Workflow 2: Switch Between ICs
1. IC Selector dropdown shows list of saved ICs
2. User selects different IC from dropdown
3. Current IC's data auto-saves
4. Selected IC's data loads into form
5. Dashboard updates with new IC's calculations
6. User can edit loaded data immediately

### Workflow 3: Add/Remove Domains
1. User clicks "+ Add Domain" button
2. New DomainForm card appears at bottom of list
3. User fills in domain name and project counts
4. Calculations update in real-time
5. To remove: Click "×" button on domain card
6. Confirmation dialog: "Remove domain [name]?"
7. On confirm: Domain removed, calculations update

### Workflow 4: Export/Share Results
1. User completes capacity planning for an IC
2. Clicks "View Summary" on dashboard
3. Modal shows formatted text output
4. Clicks "Copy to Clipboard"
5. Success message: "Summary copied to clipboard!"
6. User pastes into email, Slack, doc, etc.

### Workflow 5: Duplicate IC for New Quarter
1. User selects IC to duplicate
2. Clicks "Duplicate IC" button
3. New IC created with same data
4. User updates quarter name and adjusts values
5. New IC saves as separate entry

---

## 7. Validation & Error Handling

### Input Validation

**Required Fields:**
- Quarter name (non-empty string)
- Weeks in quarter (positive number)
- IC name (non-empty string)
- IC role (non-empty string)
- Domain name (when domain exists, non-empty string)

**Optional Fields (with constraints):**
- All time-off fields: non-negative, decimals allowed
- Project counts: non-negative integers only

**Validation Feedback:**
- MUI TextField `error` prop for red outline
- `helperText` prop for inline error messages
- Real-time validation as user types
- Examples:
  - "Required field"
  - "Must be a positive number"
  - "Must be a whole number (no decimals)"

### Edge Cases

**1. Division by Zero:**
- **Scenario:** Total weeks available = 0 (time off >= quarter weeks)
- **Handling:** Show message on dashboard: "Cannot calculate utilization - no available time"
- **Display:** Disable utilization % display, show warning icon

**2. No Domains:**
- **Scenario:** User hasn't added any domains yet
- **Handling:** Show empty state in DomainList: "No domains added yet. Click 'Add Domain' to start."
- **Dashboard:** Show "Total planned work: 0 weeks"

**3. Negative Available Weeks:**
- **Scenario:** Time off exceeds weeks in quarter
- **Handling:** Show warning banner: "Warning: Time off exceeds quarter length"
- **Dashboard:** Display with warning icon

**4. localStorage Failures:**
- **Scenario:** localStorage quota exceeded or blocked
- **Handling:**
  - Wrap all localStorage ops in try/catch
  - Show persistent warning banner: "Auto-save disabled - data won't persist"
  - App continues working in memory-only mode
  - Snackbar notification: "Failed to save data"

### User Feedback Mechanisms

**Success Notifications (Snackbar):**
- "IC created successfully"
- "IC deleted"
- "Summary copied to clipboard!"
- Brief "Saved" checkmark after auto-save

**Error Notifications (Snackbar):**
- "Failed to save data"
- "Failed to load data"
- "Calculation error"

**Confirmation Dialogs:**
- Delete IC: "Delete [IC Name]? This cannot be undone."
- Remove domain: "Remove domain [Name]?"
- Clear form: "Clear all data for [IC Name]?"

**Tooltips:**
- OKR time unit selector: "Choose whether to enter OKR time in days or weeks"
- Project sizes: "Small: 2 weeks, Medium: 4 weeks, Large: 8 weeks"
- Capacity status colors: "Green: Under capacity, Yellow: Fully allocated, Red: Over capacity"

---

## 8. Data Persistence Strategy

### Auto-Save Behavior

**Debounced Saves:**
- 300ms delay after last keystroke
- Prevents excessive writes during typing
- Uses lodash debounce or custom implementation

**Save Triggers:**
- Any form field change
- Add/remove domain
- Switch between ICs
- IC create/delete operations

**Visual Feedback:**
- Small checkmark icon appears briefly: "Saved"
- Fades out after 2 seconds
- No blocking "Save" button needed

### Initial Load Sequence

1. App mounts
2. Check localStorage for "capacity-planning-ics"
3. **If no data exists:**
   - Show empty state
   - Prompt to create first IC
4. **If data exists:**
   - Load all ICs into context state
   - Check "capacity-planning-active-id"
   - Load that IC's data into form
   - If active ID invalid, load first IC
5. **If localStorage blocked:**
   - Show warning banner
   - Initialize with empty state in memory

### Data Versioning

**Schema Version Field:**
```javascript
{
  version: 1,  // Current schema version
  ics: [...]
}
```

**Migration Strategy:**
- On load, check version number
- If version < current, run migration function
- Migration functions handle schema changes
- Example: v1 → v2 might add new fields with defaults

### Export/Import Features

**Export Current IC:**
- Button: "Export IC"
- Downloads JSON file: `capacity-[IC-name]-[date].json`
- Contains single IC's data
- User can share or archive

**Import IC:**
- Button: "Import IC"
- File upload input (accepts .json)
- Validates JSON structure
- Adds to IC list if valid
- Shows error if invalid format

---

## 9. Additional Features

### Feature 1: IC Duplication
- **Purpose:** Quickly create similar plans
- **Button:** "Duplicate IC" in top bar
- **Behavior:**
  - Creates new IC with copied data
  - Generates new UUID
  - Appends " (Copy)" to IC name
  - Loads copy into form for editing

### Feature 2: Clear/Reset Form
- **Purpose:** Start over with current IC
- **Button:** "Clear Form" (in menu or toolbar)
- **Behavior:**
  - Confirmation dialog: "Clear all data for [IC Name]?"
  - Resets all fields to empty/default
  - Doesn't delete IC from list
  - Auto-saves empty state

### Feature 3: Export All ICs
- **Purpose:** Backup all data
- **Button:** "Export All" (in settings menu)
- **Behavior:**
  - Downloads JSON file: `capacity-all-ics-[date].json`
  - Contains array of all ICs
  - Can be imported on different browser/computer

### Feature 4: Keyboard Shortcuts
- **Ctrl/Cmd + N:** Create new IC
- **Ctrl/Cmd + S:** Trigger manual save (shows confirmation)
- **Tab:** Navigate through form fields
- **Esc:** Close modal dialogs

---

## 10. Implementation Notes

### State Management with Context

**CapacityContext Structure:**
```javascript
const CapacityContext = createContext({
  // State
  ics: [],              // Array of all IC plans
  activeICId: null,     // UUID of currently selected IC

  // Computed
  activeIC: null,       // Computed from ics + activeICId

  // Actions
  createIC: (icData) => {},
  updateIC: (id, updates) => {},
  deleteIC: (id) => {},
  setActiveIC: (id) => {},
  duplicateIC: (id) => {},
  clearIC: (id) => {},
  importIC: (icData) => {},
  exportIC: (id) => {},
  exportAllICs: () => {}
});
```

**Provider Pattern:**
- Wrap App in CapacityProvider
- All components access context via useContext hook
- Context handles localStorage sync

### Calculation Module (utils/calculations.js)

**Pure Functions:**
```javascript
export const calculateTimeOff = (timeOffData) => { ... }
export const calculateDomainEffort = (domain) => { ... }
export const calculateTotalPlanned = (domains) => { ... }
export const calculateUtilization = (planned, available) => { ... }
export const calculateStatus = (utilization) => { ... }
export const generateSummary = (icData, calculated) => { ... }
```

**Benefits:**
- Easy to test
- Can be used in multiple components
- Matches methodology formulas exactly
- Centralized logic

### Material-UI Theme Customization

**Custom Theme:**
```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Blue
    },
    secondary: {
      main: '#dc004e',  // Red
    },
    success: {
      main: '#2e7d32',  // Green for under capacity
    },
    warning: {
      main: '#ed6c02',  // Yellow for fully allocated
    },
    error: {
      main: '#d32f2f',  // Red for over capacity
    },
  },
});
```

**Responsive Design:**
- Use MUI Grid for layout
- Stack form and dashboard vertically on mobile (<960px)
- Collapse cards on small screens
- Touch-friendly button sizes

---

## 11. Testing Strategy

### Unit Tests
- **Calculation functions:** Test all formulas with various inputs
- **Edge cases:** Zero values, negative results, division by zero
- **Validation logic:** Required fields, number constraints

### Component Tests
- **Form inputs:** onChange handlers, validation display
- **Domain management:** Add/remove domains
- **IC switching:** Load correct data

### Integration Tests
- **Full workflow:** Create IC → Fill form → View summary → Export
- **localStorage:** Save/load cycles, data persistence
- **Error handling:** localStorage failures, invalid data

### Manual Testing Checklist
- Create multiple ICs with various data
- Switch between ICs, verify data loads correctly
- Add/remove domains dynamically
- Test all validation scenarios
- Copy summary text, verify format
- Export/import ICs
- Test on different browsers (Chrome, Firefox, Safari)
- Test responsive design on mobile

---

## 12. Deployment

### Build Process
```bash
npm run build
# Creates optimized production build in /build directory
```

### Hosting Options
- **Static hosting:** Netlify, Vercel, GitHub Pages
- **Simple deployment:** Just upload /build folder
- **No backend needed:** Pure client-side app

### Environment Considerations
- No environment variables needed (all client-side)
- localStorage works in all modern browsers
- Graceful degradation if localStorage disabled

---

## 13. Future Enhancements (Out of Scope)

These are NOT part of the initial implementation but could be added later:

1. **Backend Integration:**
   - Move from localStorage to database
   - Multi-user support with authentication
   - Team-level views

2. **Advanced Visualizations:**
   - Charts showing capacity trends over quarters
   - Team capacity heatmaps
   - Burndown/burnup charts

3. **Collaboration Features:**
   - Share plans via URL
   - Comments/notes on plans
   - Approval workflows

4. **Customization:**
   - Configurable project sizes (not just 2/4/8 weeks)
   - Custom time-off categories
   - Organization-specific templates

5. **Integrations:**
   - Import from Jira/project management tools
   - Export to spreadsheets
   - Calendar integrations

---

## 14. Success Criteria

The app will be considered successful when:

1. **Functional:**
   - All calculations match methodology exactly
   - Data persists across browser sessions
   - Can manage multiple ICs
   - Summary output matches template format

2. **Usable:**
   - Forms are intuitive and easy to fill
   - Real-time feedback on capacity status
   - Clear validation messages
   - One-click copy to clipboard

3. **Reliable:**
   - No data loss on page refresh
   - Graceful error handling
   - Works in modern browsers (Chrome, Firefox, Safari)
   - Responsive on desktop and tablet

4. **Maintainable:**
   - Clean component structure
   - Well-documented code
   - Testable calculation logic
   - Clear README with setup instructions

---

## 15. Open Questions / Decisions Needed

None - all design decisions have been made during brainstorming session.

---

## Appendix A: Methodology Reference

All calculations are based on: `/Users/ts73344/Desktop/pd_capacity/IC Capacity Methodology.md`

Key formulas implemented:
1. Total Time Off
2. Total Weeks Available
3. Domain Effort
4. Total Planned Work
5. Capacity Utilization
6. Over/Under Capacity
7. Status Classification

Project sizing: Small (2w), Medium (4w), Large (8w)

---

## Appendix B: Example Data Flow

**User Input:**
- Quarter: "Q1 2024", Weeks: 13
- IC: "Joe Test", Role: "PD"
- Time Off: OKR 2 weeks, PTO 5 days, Dev 1 day, Holiday 1 day
- Domain "TEST": 0 Small, 0 Medium, 2 Large

**Calculated:**
- Total time off: 2 + (5+1+1)/5 = 3.4 weeks
- Total available: 13 - 3.4 = 9.6 weeks
- Domain effort: (0×2) + (0×4) + (2×8) = 16 weeks
- Total planned: 16 weeks
- Utilization: (16 / 9.6) × 100 = 166.67%
- Over/under: 16 - 9.6 = +6.4 weeks (over)
- Status: "over"

**Output:**
Formatted text summary with all values, ready to copy/paste.

---

**End of Design Specification**
