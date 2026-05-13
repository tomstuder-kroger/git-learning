# Manager Time Logger - Context for Claude

## Project Overview

A React-based time tracking application for **Tom Studer, Group Manager Product Design** to log daily managerial activities and analyze time distribution across different categories.

**Key Principle**: Built as a configurable system (not hardcoded for one person), but launches with Tom's workflow as the default "Product Design Manager" preset.

---

## Current Status

**Phase**: Phase 1 MVP - Core Time Entry Complete

**Completed**:
- ✅ Project structure created
- ✅ Configuration files set up (.npmrc for Kroger Artifactory)
- ✅ mx-web-components integrated (mx-vertical-nav + mx-layout)
- ✅ Kroger blue header with logo, settings icon, and user avatar (initials)
- ✅ User info bar and navigation tabs
- ✅ Full-width layout (left-aligned, not centered)
- ✅ TimeEntry component with:
  - Date picker (defaults to today)
  - Task type dropdown (11 types with KDS icons)
  - KDS icon display next to selected task type
  - Dynamic form fields based on task type
  - Auto-filled category/task code
  - Custom fields (participant, domain, focus area, etc.)
  - Learned values autocomplete
  - Portfolio, Impact, Role Expectations
  - Notes field with character counter
  - Clear & Save buttons
- ✅ LocalStorage utilities (storage.js)
- ✅ Troubleshooting documentation

**Next Steps**:
1. Build TableView component with filtering and sorting
2. Build Dashboard component with charts (Chart.js)
3. Build Settings modal for editing dropdowns and profile
4. Add data export (CSV)
5. Add validation and error handling

**⚠️ IMPORTANT REMINDER**:
- **User has existing time tracking data in Excel/CSV format**
- When ready, user will share CSV file for import
- Need to build CSV import feature to migrate historical data
- Consider CSV format mapping to current data model

---

## Technical Stack

- **Framework**: React 18 with Vite
- **UI Components**: mx-web-components (Kroger Design System)
- **Package Registry**: Kroger Artifactory (JFrog)
- **Data Storage**: LocalStorage (Phase 1 MVP)
- **Charts**: Chart.js with react-chartjs-2
- **Date Handling**: date-fns
- **Build Tool**: Vite (fast, modern, enterprise-friendly)

### mx-web-components Integration

**Web Components Registration** (in `src/main.jsx`):
```javascript
import { defineCustomElements } from 'mx-web-components/dist/loader';
defineCustomElements(window);
```

**Required CSS imports** (in order, in `src/main.jsx`):
```javascript
import 'mx-web-components/dist/kds-reset.css';
import 'mx-web-components/dist/kds-utils.css';
import 'mx-web-components/dist/kds-components.css';
import 'mx-web-components/dist/light.css';
import 'mx-web-components/dist/mx-web-components/mx-web-components.css';
```

**Using Components**: Use native web component syntax (recommended):
```jsx
// Native syntax (kebab-case attributes)
<mx-vertical-nav>
  <mx-layout layout-type="full-page">
    <kds-icon-settings size="m"></kds-icon-settings>
  </mx-layout>
</mx-vertical-nav>
```

**React Wrappers** (alternative, less reliable):
```javascript
import { KdsButton, MxLayout } from 'react-mx-web-components';
```

**Layout Structure**:
- `mx-vertical-nav` creates the blue Kroger header with logo
- `mx-layout` provides page layout structure (title bar, content areas)
- Use both together for standard Kroger app design

**MCP Server**: After setup, use MCP to look up component APIs and examples

---

## Application Architecture

### Data Model

**Time Entry Structure**:
```javascript
{
  id: "uuid",
  date: "2026-04-13",
  taskType: "1on1-meeting",
  time: 0.5,
  category: "Facilitator",
  taskCode: "General Admin",
  portfolio: "Assortment",
  impact: "Medium",
  roleExpectations: ["Delegation"],
  customFields: {
    participant: "Sarah Chen"
  },
  notes: "Discussed Q2 priorities",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

**LocalStorage Keys**:
- `manager-time-logger-entries` - Array of time entries
- `manager-time-logger-config` - User-editable configuration (dropdowns, profile)
- `manager-time-logger-learned-values` - Learned participants, focus areas, etc.

---

## Configuration (src/config/appConfig.js)

### Task Types (11 total)

Each task type has:
- **id**: Unique identifier
- **label**: Display name
- **icon**: Emoji for visual identification
- **defaultTime**: Pre-filled time value (in hours)
- **autoFill**: Auto-populated category/taskCode
- **customFields**: Dynamic fields shown for this task type

**Task Types**:
1. **1:1 Meeting** - Shows participant field, defaults to 0.5h, Facilitator/General Admin
2. **Standup** - Shows domain field, defaults to 0.25h, Collaborator/ProjEx
3. **Focus Time** - Shows focus area field, defaults to 2h, Doer/The Work
4. **Learning & Development** - Shows topic field, defaults to 1h
5. **Admin - Emails** - No custom fields, defaults to 0.5h, Enabler
6. **Admin - Planning** - No custom fields, defaults to 1h, Enabler
7. **Admin - Time Entry** - No custom fields, defaults to 0.25h
8. **Manager Responsibilities** - Shows subtype field (Team Reviews, Coaching, etc.)
9. **KTD Town Hall** - No custom fields, defaults to 1h
10. **Side of Desk Work** - Shows focus area field, no default time
11. **IT Support** - Shows issue field, defaults to 0.5h

### Dropdown Values

**Categories**: Facilitator, Enabler, Collaborator, Doer, ¯\_(ツ)_/¯

**Task Codes**:
- General Admin
- Training - Corp/Personal Development
- ProjEx - OKR / Discovery & Agile Ceremonies
- Capital Expenses - The Work / Flows / Prototype
- ALL
- ¯\_(ツ)_/¯

**Portfolios**: Assortment, Supplier, Item, S/I/A, MSCX, KTD, Other

**Impacts**: High, Medium, Low, ¯\_(ツ)_/¯

**Role Expectations** (multi-select):
- Value direction not delivery
- Step back see the horizon
- Delegation
- Focus: why what not how
- Delivery of strategy document
- Build bridges not silos
- Capacity multiplication
- Psychological safety
- Standards & docs
- Personal Professional Growth
- ALL
- Other

---

## User Interface Design

### Views

**1. Time Entry (Default View)**
- Date selector (defaults to today)
- Task Type dropdown (drives rest of form)
- Dynamic form based on selected task type
- Auto-filled fields collapsed by default
- Notes field (200 char max)
- Clear and Save buttons

**2. Table View**
- Sortable columns
- Multi-select for bulk actions
- Filters: date range, task type, category, text search
- Row actions: edit, duplicate, delete
- Export to CSV
- Pagination

**3. Dashboard**
- Date range selector
- Summary stats (total hours, avg/day, entry count)
- Pie charts: category, task code, portfolio, impact distribution
- Activity heat map (calendar view)
- Top task types list

**4. Settings (Modal)**
- Edit profile (name, title)
- Edit dropdown values
- Export/import data
- Phase 2: Edit task types, entry modes

### Smart Features

**Learned Values**:
- Track frequently used participants, domains, focus areas
- Show "Recent" at top of dropdowns
- Autocomplete as user types

**Quick Duplicate**:
- From table view, duplicate entry with same values
- Useful for recurring weekly meetings

**Time Validation**:
- Warn if time seems unusual for task type
- e.g., 5h for standup, 0.25h for focus time

---

## Phase Roadmap

### Phase 1 - MVP (Current Focus)
- [x] Project setup
- [x] mx-web-components integration (with mx-vertical-nav + mx-layout)
- [x] Kroger blue header with logo
- [x] Time entry form with task types
- [x] LocalStorage utilities
- [x] Dynamic form fields based on task type
- [x] Auto-fill category/task code
- [x] Learned values autocomplete
- [ ] Table view with filtering
- [ ] Dashboard with charts
- [ ] Settings modal for dropdown editing
- [ ] Date utilities and validators

**Constraints**:
- Task types are hardcoded (not editable)
- Only "Quick Entry" mode (no detailed/free-form modes)
- Settings only edit dropdown values and profile

### Phase 2 - Enhanced Flexibility
- Task type editor (add/edit/remove)
- Multiple entry modes (Quick, Detailed, Free-form)
- Import/export configurations
- Template system
- Preset configurations

### Phase 3 - Manager 1:1 Features (Roadmap)
- Monthly focus summary view
- Notes aggregation by category
- 1:1 talking points generation
- Printable reports

### Phase 4 - Backend & Collaboration (Future)
- User authentication
- Cloud sync
- Team dashboards
- Multi-user support

---

## Important Context

### Design Decisions

1. **Configuration-Driven, Not Hardcoded**
   - Even though built for Tom's workflow, the system is flexible
   - Tom's setup = default preset called "Product Design Manager"
   - Others could customize for their needs

2. **Smart Defaults, Not Constraints**
   - Auto-fill saves time but is always editable
   - Default time values speed entry but can be changed
   - Task types guide workflow but don't limit

3. **No Login for MVP**
   - Header shows "Tom Studer - Group Manager Product Design"
   - Settings can change name/title
   - Phase 2+ would add multi-user support

4. **Browser Cache Only (MVP)**
   - LocalStorage for all data
   - Export/import for backup
   - Future: Cloud sync

### User's Explicit Requests

- ✅ Use Kroger Artifactory npm (not public npm)
- ✅ Use mx-web-components (Kroger Design System)
- ✅ No login for MVP
- ✅ Header with name and title
- ✅ Date defaults to today but can edit past/future
- ✅ Time entry: numeric validation only
- ✅ Smart field suggestions based on selections
- ✅ Edit/delete entries (including bulk)
- ✅ Export to CSV
- ✅ Date range filtering
- ✅ Dashboard: pie charts + heat map (NOT line charts or comparisons)
- ✅ Manager 1:1 view on roadmap (not Phase 1)
- ✅ Build flexible system, not Tom-specific
- ⚠️ **DO NOT USE SUPERPOWERS** (user's explicit request)

---

## Common Task Patterns (Tom's Workflow)

Understanding Tom's actual work helps inform UX:

**1:1 Meetings**:
- With specific people (Sarah Chen, Mike Johnson, etc.)
- Usually 0.5h
- Facilitator role

**Standups**:
- With specific domains/portfolios
- Usually 0.25h (15 min)
- Collaborator role

**Focus Time**:
- Deep work on specific areas (Design System, etc.)
- Usually 2h blocks
- Doer role

**Admin Tasks**:
- Emails, planning, time entry itself
- Enabler role
- Varies in duration

**Manager Responsibilities**:
- Team reviews, coaching, finance
- Facilitator role
- Usually 1h blocks

---

## Development Notes

### File Locations

- **Configuration**: `src/config/appConfig.js`
- **Components**: `src/components/`
- **Utilities**: `src/utils/` (to be created)
  - `storage.js` - LocalStorage helpers
  - `dateUtils.js` - Date formatting/validation
  - `validators.js` - Input validation
  - `analytics.js` - Data aggregation for dashboard

### Styling Approach

- Use mx-web-components (KDS) for all interactive elements
- Use KDS CSS variables for colors, spacing
- Custom CSS only for layout/structure
- Fallback values in CSS custom properties for development

### Data Persistence

**Save Strategy**:
- Auto-save on entry creation/edit
- No explicit "Save All" needed
- Export feature for backup

**Load Strategy**:
- Load on app mount
- Rebuild learned values from entries

---

## Questions to Resolve

When you return to this project, consider:

1. **MCP Setup**: Has `npm run setup-mcp` been run? Can we access mx-web-components docs?
2. **Component Choice**: Which KDS components should we use for:
   - Date picker
   - Dropdowns (single and multi-select)
   - Tables
   - Modals
   - Buttons, inputs
3. **Charting Library**: Does mx-web-components include charts, or should we use Chart.js?
4. **Validation**: What validation rules for time entry? (e.g., max 24h per entry?)
5. **Heat Map**: Library preference or build custom?

---

## Troubleshooting & Lessons Learned

This section documents issues encountered during development and their solutions. Useful for future reference and similar projects using mx-web-components.

### Issue 1: mx-web-components Loader Import Path

**Problem**:
```javascript
import { defineCustomElements } from 'mx-web-components/loader';
```
Failed with error: `Failed to resolve import "mx-web-components/loader"`

**Root Cause**: The loader is located in a subdirectory, not at the package root.

**Solution**:
```javascript
import { defineCustomElements } from 'mx-web-components/dist/loader';
```

**Lesson**: Always check the actual package structure in `node_modules` when imports fail. The package.json may not export all paths.

---

### Issue 2: No Blue Kroger Header with mx-layout

**Problem**:
Using `<mx-layout>` directly showed content but no blue Kroger header with logo.

**Root Cause**: `mx-layout` provides page layout structure, but the **blue Kroger header comes from `mx-vertical-nav`**, not `mx-layout`.

**Solution**:
```jsx
<mx-vertical-nav>
  <mx-layout layout-type="full-page">
    {/* content */}
  </mx-layout>
</mx-vertical-nav>
```

**Lesson**:
- `mx-vertical-nav` = Creates the blue header with Kroger logo
- `mx-layout` = Provides page layout structure (title bar, content areas)
- They work together, not independently

---

### Issue 3: Settings Icon Not in Blue Header

**Problem**:
Settings icon appeared in the white title bar below the blue header, not IN the blue header itself.

**Root Cause**: Different slot hierarchy between `mx-vertical-nav` and `mx-layout`:
- `mx-layout`'s `title-right-content` slot → White title bar
- `mx-vertical-nav`'s `center-block` slot → Blue header

**Solution**:
```jsx
<mx-vertical-nav>
  {/* This goes IN the blue header */}
  <div slot="center-block" style={{ marginLeft: 'auto' }}>
    <button>
      <kds-icon-settings size="m"></kds-icon-settings>
    </button>
  </div>

  <mx-layout layout-type="full-page">
    {/* This goes in white title bar */}
    <div slot="title">Manager Time Logger</div>
  </mx-layout>
</mx-vertical-nav>
```

**Lesson**: Understand the slot hierarchy:
- **Blue header slots**: Use `mx-vertical-nav` slots (`center-block`, `user`, etc.)
- **Title bar slots**: Use `mx-layout` slots (`title`, `title-right-content`)

---

### Issue 4: React Wrapper vs Native Web Components

**Problem**: Started with React wrappers (`MxLayout`, `KdsIconSettings` from `react-mx-web-components`) but they didn't render as expected.

**Root Cause**: React wrappers may have different prop names or slot handling than native web components.

**Solution**: Use native web component syntax directly in JSX:
```jsx
// Instead of:
<MxLayout layoutType="full-page">

// Use:
<mx-layout layout-type="full-page">
```

**Lesson**:
- Native web components work reliably in React with JSX
- React wrappers are convenient but may have bugs or inconsistencies
- When in doubt, use native syntax (kebab-case attributes)

---

### Issue 5: Web Components Not Registering

**Problem**: Components showed in DOM but had no styling or behavior.

**Root Cause**: Forgot to call `defineCustomElements()` to register the web components.

**Solution**: In `src/main.jsx`:
```javascript
import { defineCustomElements } from 'mx-web-components/dist/loader';
import 'mx-web-components/dist/kds-reset.css';
import 'mx-web-components/dist/kds-utils.css';
import 'mx-web-components/dist/kds-components.css';
import 'mx-web-components/dist/light.css';
import 'mx-web-components/dist/mx-web-components/mx-web-components.css';

defineCustomElements(window);
```

**Lesson**: CSS imports alone aren't enough - you MUST call `defineCustomElements()` to register the custom element classes.

---

### Issue 6: CSS Import Order Matters

**Problem**: Components rendered but had incorrect or missing styles.

**Root Cause**: CSS files must be imported in a specific order for proper cascade.

**Solution**: Import in this exact order:
```javascript
import 'mx-web-components/dist/kds-reset.css';      // 1. Reset browser defaults
import 'mx-web-components/dist/kds-utils.css';      // 2. Utility classes
import 'mx-web-components/dist/kds-components.css'; // 3. KDS component styles
import 'mx-web-components/dist/light.css';          // 4. Theme (light/dark)
import 'mx-web-components/dist/mx-web-components/mx-web-components.css'; // 5. MX components
```

**Lesson**: Document the required CSS import order in setup instructions. Out-of-order imports cause hard-to-debug styling issues.

---

### General Best Practices for mx-web-components

1. **Check component registration**: Use browser console to verify:
   ```javascript
   console.log('mx-layout defined?', customElements.get('mx-layout'));
   ```
   Should return a class, not `undefined`.

2. **Inspect Shadow DOM**: mx-web-components use Shadow DOM. Use browser DevTools to inspect shadow roots for debugging styles.

3. **Use native syntax**: Prefer `<mx-layout layout-type="full-page">` over React wrappers for reliability.

4. **Documentation**: Always check Storybook (https://mxweb.kroger.com/) for latest component APIs and examples.

5. **Asset paths**: For Vite, web components should auto-resolve assets. If not, you may need to configure `setAssetPath()`.

---

## Quick Start Commands

```bash
# Install dependencies (first time)
npm install

# Set up mx-web-components MCP server (first time)
npm run setup-mcp

# Start development
npm run dev

# Build for production
npm run build
```

---

## Session Log: 2026-04-14 - CSV Import & UI Enhancements

This section documents issues encountered, fixes implemented, and lessons learned during the development session focused on CSV import functionality and UI improvements.

---

### Issue 1: CSV Import Failure - Format Mismatches

**Problem**:
User attempted to import existing time tracking data from CSV file (`TomStuder-ManagerDiary.csv`, 695 rows) but received error: "No valid entries found in CSV file"

**Root Causes**:
1. **Date format mismatch**: CSV had "November 20, 2025" format, app expected "YYYY-MM-DD"
2. **Time format mismatch**: CSV had "15 min", "2 hr" format, app expected numeric values (hours)
3. **Column name differences**: CSV used "Tasks" vs "Task Type", "Time" vs "Time (hours)"
4. **Encoding issues**: Special characters (�) in CSV data

**Solution** (`src/utils/csvImport.js`):
- Added `parseFlexibleDate()` function to handle multiple date formats:
  - "Month DD, YYYY" (e.g., "November 20, 2025")
  - "MM/DD/YYYY" or "M/D/YYYY"
  - ISO format "YYYY-MM-DD"
  - Fallback to JavaScript Date parsing
- Added `parseFlexibleTime()` function to convert natural language time:
  - "15 min" → 0.25 hours
  - "2 hr" → 2 hours
  - "1 hr 30 min" → 1.5 hours
  - Plain numbers (e.g., "2" → 2 hours)
- Added `cleanEncodingIssues()` function to replace problematic characters (� → -)
- Modified `mapCSVRowToEntry()` to use case-insensitive column matching
- Enhanced `mapTaskTypeLabel()` with fuzzy matching for task type labels

**Files Modified**:
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/utils/csvImport.js`

**Result**: First import attempt succeeded with 648 entries imported, 36 skipped (5 informational, 31 errors)

---

### Issue 2: Multi-line CSV Field Parsing Errors

**Problem**:
31 rows failed to import with errors like:
- "Invalid date format: '- Effort Estimation & confirming [Design] Epics are in Productboard'"
- "Invalid date format: 'FSMA 204 discussion'"
- "Time must be between 0 and 24 hours (got 30)"

**Root Cause**:
The `parseCSV()` function used `csvText.split('\n')` which split on ALL newlines, including those inside quoted fields (e.g., multi-line Notes fields). This caused continuation lines to be treated as separate CSV rows with invalid data.

**Example**:
```csv
"November 13, 2025","Focus Time","Doer","2 hr","The Work","...","High","Delegation","Reviewing and working on tasks & asks.
- Effort Estimation & confirming [Design] Epics are in Productboard
- Team & Resource planning..."
```

The newlines in the Notes field caused the parser to break this into multiple rows.

**Solution** (`src/utils/csvImport.js:8-89`):
Created new `parseCSVLines()` function to properly handle quoted multi-line fields:
- Tracks whether parser is inside quotes (`inQuotes` state)
- Only creates new row when encountering newline OUTSIDE of quotes
- Handles escaped quotes (`""`)
- Handles different line endings (LF, CRLF, CR)

**Code**:
```javascript
function parseCSVLines(csvText) {
  const lines = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentLine += '""';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
        currentLine += char;
      }
    } else if (char === '\n' && !inQuotes) {
      // End of line (only when not inside quotes)
      if (currentLine.trim()) {
        lines.push(currentLine);
      }
      currentLine = '';
    } else {
      currentLine += char;
    }
  }

  return lines;
}
```

**Files Modified**:
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/utils/csvImport.js`

**Result**: Reduced errors from 31 to 1

---

### Issue 3: Time Value Edge Case - "30" Interpreted as 30 Hours

**Problem**:
Row 281 failed validation: "Time must be between 0 and 24 hours (got 30)"
- The CSV had a plain "30" value in the Time column (missing "min" unit)
- Parser correctly read it as number 30, but this exceeded validation limits

**Root Cause**:
The `parseFlexibleTime()` function treated all plain numbers as hours. A value of "30" likely meant "30 minutes" but was interpreted as "30 hours".

**Solution** (`src/utils/csvImport.js:257-290`):
Enhanced `parseFlexibleTime()` logic to detect edge cases:
- Numbers > 24 are assumed to be minutes (e.g., "30" → 30 min → 0.5 hours)
- Numbers ≤ 24 are treated as hours (e.g., "2" → 2 hours)

**Rationale**: Nobody works 30+ hours in a single time entry, so large numbers are almost certainly minutes with missing unit labels.

**Files Modified**:
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/utils/csvImport.js`

**Result**: Final import - 649 entries imported successfully, 5 skipped (informational PTO/Note entries), 0 errors ✅

---

### Issue 4: Header Layout Reorganization

**Problem**:
User requested header layout changes:
- "Manager Time Logger" should be in blue header next to Kroger logo
- "Tom Studer - Group Manager Product Design" should replace title in white bar
- User name and title text should not be bold

**Solution** (`src/App.jsx` and `src/App.css`):

1. **Moved app title to blue header** using `center-block` slot with proper KDS class:
```jsx
<div slot="center-block" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
  <span className="mx-vertical-nav__app-title" style={{ marginLeft: '16px' }}>
    Manager Time Logger
  </span>
  <button className="settings-button" onClick={() => setShowSettings(true)} style={{ marginLeft: 'auto' }}>
    <kds-icon-settings size="m"></kds-icon-settings>
  </button>
</div>
```

2. **Updated title slot** to show user name and title:
```jsx
<div slot="title">
  {APP_CONFIG.userProfile.name} - {APP_CONFIG.userProfile.title}
</div>
```

3. **Removed bold styling** from title text:
```css
mx-layout [slot="title"] {
  font-weight: normal;
}
```

**Files Modified**:
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/App.jsx`
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/App.css`

**Result**: Header layout now matches user's design requirements

---

### Issue 5: Missing Table Columns - Task Code & Role Expectations

**Problem**:
User noticed that Task Code and Role Expectations columns were missing from the table view, even though these fields were included in CSV export.

**Solution** (`src/components/TableView.jsx`):

Added both columns to table headers and rows:

**Headers**:
```jsx
<th>Task Code</th>
<th>Role Expectations</th>
```

**Row cells**:
```jsx
<td>{entry.taskCode || '-'}</td>
<td>{entry.roleExpectations?.join('; ') || '-'}</td>
```

**Files Modified**:
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/components/TableView.jsx`

**Result**: All data fields now visible in table

---

### Issue 6: Missing Role Expectations Filter

**Problem**:
User requested a filter dropdown for Role Expectations to match other filterable columns (Task Type, Category, Portfolio, Impact).

**Solution** (`src/components/TableView.jsx`):

1. **Added filter state**:
```javascript
const [filters, setFilters] = useState({
  dateFrom: '',
  dateTo: '',
  taskType: '',
  category: '',
  portfolio: '',
  impact: '',
  roleExpectation: '', // NEW
  searchText: ''
});
```

2. **Added filter logic** in `applyFiltersAndSort()`:
```javascript
if (filters.roleExpectation) {
  result = result.filter(e => e.roleExpectations?.includes(filters.roleExpectation));
}
```

3. **Added filter UI**:
```jsx
<div className="filter-group">
  <label htmlFor="filter-role-expectation" className="kds-Label">Role Expectation</label>
  <select
    id="filter-role-expectation"
    value={filters.roleExpectation}
    onChange={(e) => handleFilterChange('roleExpectation', e.target.value)}
    className="kds-Select"
  >
    <option value="">All</option>
    {APP_CONFIG.roleExpectations.map(r => (
      <option key={r} value={r}>{r}</option>
    ))}
  </select>
</div>
```

4. **Updated** `clearFilters()` to include new filter

**Files Modified**:
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/components/TableView.jsx`

**Result**: Users can now filter table by Role Expectations

---

### Issue 7: Collapsible Filters Section

**Problem**:
User wanted ability to show/hide the filters section to save screen space.

**Attempted Solutions & Issues**:

**Attempt 1**: Use mx-accordion component
- **Result**: Component doesn't exist in mx-web-components library

**Attempt 2**: Conditional rendering with `{showFilters && <div>...</div>}`
- **Implementation**: Added toggle button with eye icons from kds-icon-eye and kds-icon-eye-slash
- **Issue**: React crashed with error:
  ```
  NotFoundError: Failed to execute 'removeChild' on 'Node':
  The node to be removed is not a child of this node.
  ```
- **Root Cause**: React and web components (kds-icon) have conflicts during reconciliation when conditionally rendering icon components inside kds-button
- **Lesson**: Conditionally rendering web component children inside other web components causes DOM manipulation conflicts with React's virtual DOM

**Attempt 3**: Render two separate buttons (one for Hide, one for Show)
- **Issue**: Still crashed with same error
- **Root Cause**: React still had issues mounting/unmounting kds-icon web components

**Final Solution**: Use regular HTML `<button>` with KDS CSS classes instead of `<kds-button>` web component:

```jsx
<button
  type="button"
  className="kds-Button kind-secondary palette-brand variant-border filter-toggle-button"
  onClick={toggleFilters}
>
  {showFilters ? 'Hide Filters' : 'Show Filters'}
</button>
```

**New Issue**: Button styling inconsistent - text and border were black instead of blue like other buttons

**Root Cause**: KDS CSS classes weren't applying proper brand colors by default

**Solution**: Added custom CSS class with `!important` overrides:
```css
/* Filter toggle button - force blue styling */
.filter-toggle-button {
  border-color: var(--kds-color-brand-prominent) !important;
  color: var(--kds-color-brand-prominent) !important;
}
```

**Files Modified**:
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/components/TableView.jsx`
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/components/TableView.css`

**Result**: Show/Hide Filters button works correctly with consistent blue styling

**Lessons Learned**:
1. **Web components + React reconciliation = issues**: Conditionally rendering web components (especially icons) inside other web components causes DOM manipulation conflicts
2. **Workaround**: Use regular HTML elements with KDS CSS classes instead of web component wrappers when dynamic rendering is needed
3. **CSS specificity**: May need `!important` to override KDS default styles when using custom implementations
4. **Screenshots are crucial**: Visual bugs are much easier to debug with screenshots showing exact styling issues

---

### Issue 8: Import CSV Button Styling

**Problem**:
Import CSV button had filled blue background (`kind="primary"`), but user wanted it to match Export CSV button (outlined style with white background).

**Solution** (`src/components/TableView.jsx`):
Changed Import button from `kind="primary"` to `kind="secondary"`:

```jsx
// Before:
<kds-button type="button" kind="primary" onClick={handleImportClick}>

// After:
<kds-button type="button" kind="secondary" onClick={handleImportClick}>
```

**Files Modified**:
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/components/TableView.jsx`

**Result**: Import and Export buttons now have consistent outlined styling

---

### Issue 9: Import Duplicate Data & Replace/Merge Options

**Problem**:
User attempted to re-import CSV after fixing parser, causing duplicates. No UI option to choose between replacing existing data or merging.

**Solution** (`src/components/TableView.jsx:277-348`):
Added confirmation dialog before import:

```javascript
async function handleFileSelect(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const currentEntries = getEntries();

  // If there are existing entries, ask whether to replace or merge
  let shouldReplace = false;
  if (currentEntries.length > 0) {
    const userChoice = window.confirm(
      `You have ${currentEntries.length} existing entries.\n\n` +
      `Click OK to REPLACE all existing data.\n` +
      `Click Cancel to MERGE (add to existing data).`
    );
    shouldReplace = userChoice;
  }

  // ... import logic with shouldReplace flag
}
```

**Files Modified**:
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/components/TableView.jsx`

**Result**: Users can choose to replace or merge data during import

---

### Issue 10: Button Type Causing Form Submission

**Problem**:
Clicking certain buttons (like Show/Hide Filters) caused the browser to reload/clear.

**Root Cause**:
Without explicit `type="button"`, HTML buttons default to `type="submit"`, which triggers form submission and page reload.

**Solution** (`src/components/TableView.jsx`):
Added `type="button"` to all kds-button elements:

```jsx
<kds-button type="button" kind="danger" onClick={handleBulkDelete}>
<kds-button type="button" kind="secondary" onClick={toggleFilters}>
<kds-button type="button" kind="primary" onClick={handleImportClick}>
<kds-button type="button" kind="secondary" onClick={clearFilters}>
```

**Files Modified**:
- `/Users/ts73344/Desktop/claudeTest/manager-time/src/components/TableView.jsx`

**Lesson**: Always explicitly set `type="button"` on buttons to prevent unintended form submissions

---

## Key Takeaways & Best Practices

### CSV Import Best Practices

1. **Flexible Parsing**: Always support multiple formats for dates, times, and other common fields
2. **Multi-line Fields**: Respect quoted field boundaries when parsing CSV - don't blindly split on newlines
3. **Edge Cases**: Handle missing units, encoding issues, and malformed data gracefully
4. **Validation**: Provide clear, actionable error messages with row numbers
5. **User Choice**: Allow users to replace or merge data during import

### React + Web Components Integration

1. **Avoid Dynamic Web Component Children**: Don't conditionally render web components (especially icons) inside other web components
2. **Use HTML + CSS Classes**: For dynamic content, use regular HTML elements with KDS CSS classes instead of web component wrappers
3. **Button Types**: Always set `type="button"` to prevent form submissions
4. **CSS Overrides**: May need `!important` to override web component default styles
5. **Screenshots Help**: Visual issues are much faster to debug with screenshots

### User Experience

1. **Collapsible Sections**: Provide show/hide controls for dense UI sections like filters
2. **Consistent Styling**: Ensure all similar buttons have the same visual treatment
3. **Data Safety**: Always confirm destructive operations (replace existing data)
4. **Progress Feedback**: Show clear success/error messages with counts (e.g., "649 imported, 5 skipped")

---

## Files Modified in This Session

1. `/Users/ts73344/Desktop/claudeTest/manager-time/src/utils/csvImport.js` - CSV parsing enhancements
2. `/Users/ts73344/Desktop/claudeTest/manager-time/src/components/TableView.jsx` - Table columns, filters, import UI
3. `/Users/ts73344/Desktop/claudeTest/manager-time/src/components/TableView.css` - Filter toggle button styling
4. `/Users/ts73344/Desktop/claudeTest/manager-time/src/App.jsx` - Header layout changes
5. `/Users/ts73344/Desktop/claudeTest/manager-time/src/App.css` - Title text styling

---

## Current Feature Status

**Completed Today**:
- ✅ CSV import with flexible date/time parsing
- ✅ Multi-line CSV field support
- ✅ Import Replace/Merge option
- ✅ Header layout reorganization
- ✅ Task Code column in table
- ✅ Role Expectations column in table
- ✅ Role Expectations filter
- ✅ Collapsible filters section
- ✅ Consistent button styling

**Known Issues**:
- ⚠️ Filter toggle button hover behavior may need refinement (session ended before full testing)

---

Last Updated: 2026-04-14 (Added session log documenting CSV import implementation and UI enhancements)
