# Product Design Resource Management App - Design Specification

**Date:** 2026-06-17
**Author:** Design collaboration with user
**Status:** Approved for implementation

## Executive Summary

Building a standalone resource management dashboard for product design team managers to track designer capacity, utilization, allocation across product teams, run rates, and ROI. This MVP focuses on two core pages (Individual Designers and Team Summary) with full CRUD capabilities for all entities, and can import initial data from the existing capacity-planning-app.

## Problem Statement

Design managers need visibility into:
- How designer time is allocated across product teams and portfolios
- Team capacity and utilization metrics
- Financial run rates and ROI
- Resource planning and bottleneck identification

Current capacity-planning-app tracks project-based work ("4 weeks on Project X"), which causes false capacity overages because it doesn't distinguish between project duration and actual time allocation percentage. This new app uses steady-state allocation percentages ("60% of time on Team A, 40% on Team B").

## Goals

### MVP Goals
1. Track 11 designers with steady-state team allocations
2. Calculate accurate utilization and run rates
3. Provide individual and team-level views
4. Enable CRUD operations for all entities (designers, teams, portfolios)
5. Import initial data from capacity-planning-app
6. Export/import JSON for backups and sharing

### Future Goals (Phase 2+)
- Portfolio breakdown page with drill-down analytics
- Detailed outcomes tracker per product team
- Executive dashboard with trends over time
- Forecasting and hiring recommendations
- Historical snapshots and comparison

## Architecture

### Technology Stack
- **Frontend:** React 19
- **UI Components:** mx-web-components v5.1.0, react-mx-web-components v5.1.0
- **State Management:** React Context API
- **Charts:** Recharts
- **Styling:** Custom CSS matching capacity-planning-app patterns
- **Data Persistence:** localStorage with JSON export/import
- **Build Tools:** Create React App with craco

### Design System
Reuses capacity-planning-app design patterns:
- **Primary Color:** #0F52A2 (blue)
- **Fonts:** Roboto (body), Nunito (headings/names)
- **Card Layout:** kds-Card components
- **Color Coding:**
  - Under-allocated (<70%): Gray #9ca3af
  - Good utilization (70-100%): Green #2e7d32
  - Over-allocated (>100%): Red #d32f2f
- **Background:** #f4f4f4
- **Spacing:** 8px grid system

### Directory Structure
```
pd-resource-mgmt/
├── public/
├── src/
│   ├── components/
│   │   ├── GlobalNavBar.jsx           // Top navigation
│   │   ├── DesignerCard.jsx           // Individual designer card
│   │   ├── DesignerGrid.jsx           // Grid of designer cards
│   │   ├── TeamSummary.jsx            // Summary page with charts
│   │   ├── CapacityWaterfallChart.jsx // Chart component
│   │   ├── CostVsOutcomesChart.jsx    // Scatter chart
│   │   ├── ROIByPortfolioChart.jsx    // Bar chart
│   │   └── SettingsPanel.jsx          // Settings modal/page
│   ├── context/
│   │   └── ResourceContext.jsx        // Global state provider
│   ├── utils/
│   │   ├── calculations.js            // Formulas for capacity, utilization, ROI
│   │   ├── storage.js                 // localStorage utilities
│   │   └── importCapacityApp.js       // One-time import logic
│   ├── data/
│   │   ├── krogerFiscalCalendar.json  // Imported from capacity-planning-app
│   │   └── placeholderData.js         // Initial 11 designers + teams
│   ├── App.jsx                        // Main app component
│   ├── App.css                        // App-specific styles
│   ├── index.css                      // Global styles
│   └── index.js                       // Entry point
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-06-17-pd-resource-mgmt-design.md
├── package.json
├── craco.config.js
└── CLAUDE.md                          // Context file
```

## Data Models

### Designer
```javascript
{
  id: "uuid",
  name: "Jane Smith",
  level: "SPD",                        // APD | PD | SPD
  employmentStatus: "FTE",             // FTE | SOW | SOW Koncert
  allocations: [
    { productTeamId: "team-uuid-1", percentage: 50 },
    { productTeamId: "team-uuid-2", percentage: 50 }
  ]
}
```

**Validation:**
- Name required
- Level required (one of: APD, PD, SPD)
- Employment status required
- Allocations must sum to 100% (warning shown if not)

### Product Team
```javascript
{
  id: "uuid",
  name: "Item Pricing Team",
  portfolioId: "portfolio-uuid"
}
```

**Validation:**
- Name required, unique within portfolio
- Portfolio ID required

### Portfolio
```javascript
{
  id: "uuid",
  name: "Item"                        // Item | Assortment | Supplier
}
```

**Validation:**
- Name required, unique
- Cannot delete if teams are assigned

### Capacity Settings
```javascript
{
  standardHoursPerWeek: 40,
  weeksPerYear: 52,
  ptoHoursPerYear: 120,               // 15 days × 8
  holidaysHoursPerYear: 80,           // 10 days × 8
  ldHoursPerYear: 24,                 // 3 days × 8
  okrPlanningHoursPerYear: 16,        // 2 days × 8
  ratesByLevel: {
    APD: { actual: 100, blended: 125 },
    PD: { actual: 120, blended: 150 },
    SPD: { actual: 150, blended: 180 }
  }
}
```

### Outcomes (Simple for MVP)
```javascript
{
  totalValue: 2000000                 // Single editable number
}
```

## Calculations

### Available Hours (per designer, annual)
```
availableHours = (standardHoursPerWeek × weeksPerYear)
                 - ptoHoursPerYear
                 - holidaysHoursPerYear
                 - ldHoursPerYear
                 - okrPlanningHoursPerYear

Example: (40 × 52) - 120 - 80 - 24 - 16 = 1,840 hours/year
```

### Allocated Hours (per designer, annual)
```
allocatedHours = availableHours × (sum of allocation percentages / 100)

Example: Designer at 60% to Team A, 40% to Team B
allocatedHours = 1,840 × 100% = 1,840 hours (fully allocated)
```

### Utilization %
```
utilization = (allocatedHours / availableHours) × 100

Example: 1,840 / 1,840 = 100%
```

**Color Coding:**
- < 70%: Gray (under-allocated)
- 70-100%: Green (good utilization)
- > 100%: Red (over-allocated)

### Annual Cost (per designer)
```
annualCost = blendedRate × availableHours

Example: SPD at $180/hr blended rate
annualCost = $180 × 1,840 = $331,200/year
```

### Monthly Run Rate (per designer)
```
monthlyRunRate = annualCost / 12

Example: $331,200 / 12 = $27,600/month
```

### Team Run Rate
```
teamRunRate = sum of all designers' monthly run rates
```

### ROI % (Simple for MVP)
```
totalTeamCost = sum of all annual costs
ROI = ((totalOutcomesValue - totalTeamCost) / totalTeamCost) × 100

Example: ($2,000,000 - $500,000) / $500,000 × 100 = 300%
```

### Cost per Product Team
```
teamCost = sum of (designer's monthly run rate × allocation percentage to this team)

Example:
- Designer A: $20,000/mo, 50% allocated → $10,000
- Designer B: $15,000/mo, 100% allocated → $15,000
- Team cost = $25,000/mo
```

### Cost per Portfolio
```
portfolioCost = sum of all teams in portfolio
```

## Page Designs

### Page 1: Individual Designers

**Purpose:** View and manage individual designer capacity, allocation, and run rate

**Layout:**
- Top controls bar:
  - "Add Designer" button (KdsButton primary)
  - Filter dropdown (by Level, by Employment Status, by Portfolio)
  - Sort dropdown (by Name, by Utilization, by Run Rate)
- Grid of designer cards (3 columns desktop, 2 tablet, 1 mobile)
- Empty state: "No designers yet. Import from Capacity Planning or add manually."

**Designer Card (View Mode):**
- Designer name (16px Nunito, bold)
- Role/Level line (14px, gray) - e.g., "Senior Product Designer (SPD)"
- Employment status badge (KdsTag) - "FTE" / "SOW" / "SOW Koncert"
- Large utilization % (48px, color-coded)
  - Green (70-100%), Gray (<70%), Red (>100%)
- Capacity label below: "Capacity"
- Allocation breakdown (list):
  - Item Pricing Team: 50%
  - Item Catalog Team: 50%
- Monthly run rate at bottom (14px, gray label, bold number)
- Hover: box-shadow effect
- Click: opens edit mode

**Designer Card (Edit Mode):**
Opens MxModal with:
- Header: "Edit Designer - [Name]"
- Form fields:
  - Name (MxInputTextBox)
  - Level (MxSingleSelect: APD, PD, SPD)
  - Employment Status (MxSingleSelect: FTE, SOW, SOW Koncert)
- Allocation Editor section:
  - "Team Allocations" heading
  - For each allocation:
    - Product Team dropdown (shows all teams)
    - Percentage slider (0-100%) or input
    - Remove button (X icon)
  - "Add Team Allocation" button
  - Running total display: "Total: 85%" (warns if ≠ 100%)
- Footer buttons:
  - Delete Designer (KdsButton destructive, left-aligned)
  - Cancel (KdsButton secondary)
  - Save (KdsButton primary)

**Add Designer Flow:**
- Click "Add Designer" button
- Opens MxModal with form (same as edit mode, empty fields)
- Defaults: allocations = [], level = PD, status = FTE
- Save creates new designer

**Filter/Sort:**
- Filter by Level: shows only APD/PD/SPD
- Filter by Employment Status: shows only FTE/SOW/Koncert
- Filter by Portfolio: shows designers allocated to teams in that portfolio
- Sort by Name: A-Z
- Sort by Utilization: highest to lowest
- Sort by Run Rate: highest to lowest

### Page 2: Team Summary

**Purpose:** High-level view of entire team performance with key metrics and visualizations

**Layout:**
- Top: Key Metric Cards (4 columns, responsive to 2/1)
- Middle: Secondary stats row
- Charts section: 3 charts stacked vertically
- Bottom: Simple outcomes input

**Key Metric Cards (KdsCard):**

1. **Total Team Monthly Run Rate**
   - Primary number: "$285,000" (3rem, bold)
   - Secondary: "Monthly"
   - Tertiary: "Annual: $3.42M" (smaller, gray)

2. **Team Utilization %**
   - Primary number: "82%" (3rem, bold, color-coded)
   - Secondary: "Average Utilization"
   - Tertiary: "Target: 80%" (smaller, gray)

3. **Total Outcomes Value**
   - Primary number: "$2.0M" (3rem, bold)
   - Secondary: "Total Value Delivered"

4. **ROI %**
   - Primary number: "185%" (3rem, bold, green if positive, red if negative)
   - Secondary: "Return on Investment"

**Secondary Stats (smaller cards or stat rows):**
- Total Hours Available (team): "20,240 hours"
- Total Hours Allocated (team): "18,400 hours"
- Headcount by Level: "2 APD, 5 PD, 4 SPD"
- Average Run Rate per Designer: "$25,909/mo"

**Chart 1: Capacity Waterfall**
- Type: Recharts BarChart (stacked horizontal)
- Shows flow: Available Hours → Allocated Hours → Unallocated Hours
- Colors: Blue (available), Green (allocated), Gray (unallocated)
- Tooltip: shows hours and percentages
- Title: "Team Capacity Overview"

**Chart 2: Cost vs. Outcomes**
- Type: Recharts ScatterChart
- X-axis: Monthly Cost (per product team)
- Y-axis: Outcomes Value (placeholder: split total outcomes proportionally by team cost)
- Bubble size: Number of designers on team
- Color: By Portfolio (Item = blue, Assortment = green, Supplier = orange)
- Tooltip: Team name, monthly cost, outcomes value, designer count
- Title: "Cost vs. Outcomes by Product Team"
- Note: "Detailed outcomes tracking coming in Phase 2"

**Chart 3: ROI by Portfolio**
- Type: Recharts BarChart
- X-axis: Portfolio (Item, Assortment, Supplier)
- Y-axis: ROI %
- Color: Green (>50%), Yellow (20-50%), Red (<20%)
- Tooltip: Portfolio name, cost, outcomes, ROI %
- Title: "ROI by Portfolio"

**Outcomes Input Section:**
- Card at bottom of page
- Heading: "Total Outcomes Value"
- Single currency input (large)
- Help text: "Enter total revenue impact + cost savings across all teams"
- Save button (KdsButton primary)
- Note: "Detailed per-team outcomes tracking coming in Phase 2"

### Page 3: Settings Panel

**Access:** Settings icon (gear) in GlobalNavBar, opens MxModal or dedicated page

**Tab 1: Team Members**
- Simple list view with actions
- Links to Individual Designers page for detailed management
- Quick actions: Add, Edit, Delete

**Tab 2: Product Teams**

**Table View:**
```
Team Name           | Portfolio   | # Designers | Actions
─────────────────────────────────────────────────────────────
Item Pricing Team   | Item        | 3          | Edit | Delete
Item Catalog Team   | Item        | 2          | Edit | Delete
...
```

**CRUD Operations:**

**Create:**
- "Add Product Team" button (KdsButton primary)
- Modal form:
  - Team Name (MxInputTextBox, required)
  - Portfolio (MxSingleSelect from existing portfolios, required)
  - Save/Cancel buttons

**Read:**
- Table displays all teams
- Shows designer count per team
- Portfolio assignment visible

**Update:**
- Click "Edit" → opens modal
- Form fields: Team Name, Portfolio
- Can reassign to different portfolio
- Save/Cancel buttons

**Delete:**
- Click "Delete" → confirmation dialog
- Warning if designers allocated: "X designers are allocated to this team. Remove their allocations first."
- If allocations exist, show list of designers and offer "Remove Allocations & Delete" or "Cancel"
- If no allocations, confirm and delete

**Assign Designers to Team:**
- Click team name or "Manage Designers" link
- Opens modal showing:
  - Team name and portfolio
  - "Assigned Designers" list:
    ```
    Jane Smith (SPD)    50%   [Edit %] [Remove]
    John Doe (PD)      100%   [Edit %] [Remove]
    ```
  - "Add Designer to Team" button:
    - Dropdown: Select designer (shows designers not at 100% allocation)
    - Input: Allocation % for this team
    - Shows warning if designer's new total > 100%
    - Save adds allocation

**Tab 3: Portfolios**

**Table View:**
```
Portfolio Name | # Teams | # Designers | Actions
─────────────────────────────────────────────────
Item          | 4       | 6          | Edit | Delete
Assortment    | 3       | 3          | Edit | Delete
Supplier      | 2       | 2          | Edit | Delete
```

**CRUD Operations:**

**Create:**
- "Add Portfolio" button (KdsButton primary)
- Modal form:
  - Portfolio Name (MxInputTextBox, required, unique)
  - Save/Cancel

**Read:**
- Table shows all portfolios
- Displays team count and designer count (rollup)

**Update:**
- Click "Edit" → modal
- Form: Portfolio Name (can rename)
- Save/Cancel

**Delete:**
- Click "Delete" → confirmation dialog
- Warning: "This portfolio has X teams. Delete or reassign them first."
- Only allowed if no teams assigned (or offer cascade delete with warning)
- Confirmation and delete

**Tab 4: Rate Configuration**

**Heading:** "Hourly Rates by Level"

**Form (3 rows):**
```
Level | Actual Rate       | Blended Rate
─────────────────────────────────────────
APD   | $[100] /hr       | $[125] /hr
PD    | $[120] /hr       | $[150] /hr
SPD   | $[150] /hr       | $[180] /hr
```

- Currency inputs (MxInputTextBox with mask)
- Save button updates global settings
- Changes immediately recalculate all run rates

**Tab 5: Capacity Settings**

**Form Fields:**
- Standard Hours per Week: [40] (number input)
- Weeks per Year: [52] (number input)

**Annual Adjustments:**
- PTO Days: [15] → displays "120 hours" (calculated)
- Holiday Days: [10] → displays "80 hours"
- L&D Days: [3] → displays "24 hours"
- OKR Planning Days: [2] → displays "16 hours"

**Calculated Display (read-only):**
- Available Hours per Designer: **1,840 hours/year**

**Save Button:**
- Updates global settings
- Recalculates all capacity metrics

**Tab 6: Data Management**

**Section 1: Import from Capacity Planning App**
- Button: "Import Team Members from Capacity App" (KdsButton primary)
- On click:
  - Reads localStorage key from capacity-planning-app
  - Parses IC data
  - Shows preview modal:
    - "Found X team members"
    - "Y will be imported as designers"
    - List of names to be imported
  - Confirm/Cancel buttons
- Status display: "Last imported: [date]" or "Not yet imported"
- Note: "This is a one-time import. Changes in Capacity Planning won't sync automatically."

**Mapping Logic:**
- IC name → Designer name
- IC role → Level (map "Senior Product Designer" → SPD, etc.)
- Employment status defaults to FTE (can edit after import)
- Domains → not imported (allocations start at 0%, manually set in new app)
- Fiscal calendar copied to `/data/krogerFiscalCalendar.json`

**Section 2: Export Data**
- Button: "Export Data" (KdsButton secondary)
- Downloads JSON file: `pd-resource-mgmt-backup-YYYY-MM-DD.json`
- Includes: designers, teams, portfolios, settings, outcomes, metadata

**Section 3: Import Data**
- Button: "Import Data" (KdsButton secondary)
- File picker (accepts .json)
- Validates JSON structure
- Shows confirmation: "This will replace all current data. Continue?"
- On confirm: loads data, reinitializes app

**Section 4: Reset to Placeholder Data**
- Button: "Reset to Placeholder Data" (KdsButton destructive)
- Warning dialog: "This will delete all current data and load 11 placeholder designers. Continue?"
- On confirm: resets to initial state with placeholder data

## Navigation

**GlobalNavBar Component:**
- Logo/Title: "Design Resource Management"
- Main tabs:
  - "Individual Designers" (default view)
  - "Team Summary"
- Right side:
  - Settings icon (gear)
  - Export icon (download, quick export)
- Background: #0F52A2 (matches capacity-planning-app)
- White text

**Routing:**
- Simple state-based routing (currentView state)
- No react-router needed for MVP (only 2 pages + settings modal)

## State Management

### ResourceContext Provider

**State:**
```javascript
{
  designers: [],
  productTeams: [],
  portfolios: [],
  capacitySettings: { ... },
  outcomes: { totalValue: 0 },

  // UI state
  currentView: 'individual', // 'individual' | 'summary'
  filterLevel: null,
  filterStatus: null,
  filterPortfolio: null,
  sortBy: 'name', // 'name' | 'utilization' | 'runRate'
}
```

**Actions:**
```javascript
// Designers
addDesigner(designer)
updateDesigner(id, updates)
deleteDesigner(id)

// Product Teams
addProductTeam(team)
updateProductTeam(id, updates)
deleteProductTeam(id)
assignDesignerToTeam(designerId, teamId, percentage)
removeDesignerFromTeam(designerId, teamId)

// Portfolios
addPortfolio(portfolio)
updatePortfolio(id, updates)
deletePortfolio(id)

// Settings
updateCapacitySettings(settings)
updateRates(ratesByLevel)

// Outcomes
updateOutcomes(outcomes)

// Data Management
exportData() → JSON file download
importData(jsonData)
resetToPlaceholder()
importFromCapacityApp()

// UI
setCurrentView(view)
setFilters({ level, status, portfolio })
setSortBy(sortBy)
```

**localStorage Integration:**
- Auto-save on every state change (debounced 500ms)
- Key: `pd-resource-mgmt-data`
- Versioning: include version number for future migrations

**Computed Values (useMemo):**
```javascript
// Per designer
calculateAvailableHours(designerId)
calculateAllocatedHours(designerId)
calculateUtilization(designerId)
calculateMonthlyRunRate(designerId)

// Per team
calculateTeamCost(teamId)
calculateTeamDesignerCount(teamId)

// Per portfolio
calculatePortfolioCost(portfolioId)
calculatePortfolioROI(portfolioId)

// Team-wide
calculateTotalTeamRunRate()
calculateAverageUtilization()
calculateTotalROI()
```

## Placeholder Data

### Designers (11 total)
- 2 APD (Associate Product Designers)
- 5 PD (Product Designers)
- 4 SPD (Senior Product Designers)
- Employment mix: 8 FTE, 2 SOW, 1 SOW Koncert
- Sample allocations: mix of 50/50, 100%, 40/60 splits
- Names: Realistic placeholder names

### Portfolios (3)
- Item
- Assortment
- Supplier

### Product Teams (3-5 per portfolio, ~12 total)

**Item Portfolio:**
- Item Pricing Team
- Item Catalog Team
- Item Discovery Team
- Item Recommendations Team

**Assortment Portfolio:**
- Assortment Planning Team
- Category Management Team
- Inventory Optimization Team

**Supplier Portfolio:**
- Supplier Onboarding Team
- Supplier Portal Team
- Supplier Analytics Team

### Capacity Settings (defaults)
- 40 hrs/week, 52 weeks/year
- 15 PTO days (120 hrs)
- 10 holidays (80 hrs)
- 3 L&D days (24 hrs)
- 2 OKR planning days (16 hrs)
- Available: 1,840 hrs/year

### Rates (defaults)
- APD: $100 actual, $125 blended
- PD: $120 actual, $150 blended
- SPD: $150 actual, $180 blended

### Outcomes
- Total value: $2,000,000 (placeholder)

## User Flows

### Flow 1: Add New Designer
1. User clicks "Add Designer" on Individual Designers page
2. Modal opens with empty form
3. User enters name, selects level (PD), selects status (FTE)
4. User optionally adds team allocations via "Add Team Allocation"
5. User clicks Save
6. Designer card appears in grid
7. localStorage auto-saves

### Flow 2: Edit Designer Allocation
1. User clicks designer card
2. Modal opens with current data
3. User adjusts allocation sliders (e.g., Team A: 50% → 60%, Team B: 50% → 40%)
4. Running total updates in real-time
5. User clicks Save
6. Card updates with new utilization %
7. Team Summary metrics recalculate

### Flow 3: Assign Designer to Team (from Team View)
1. User opens Settings → Product Teams tab
2. User clicks "Manage Designers" on a team row
3. Modal shows current designers assigned
4. User clicks "Add Designer to Team"
5. Selects designer from dropdown
6. Enters allocation % (e.g., 25%)
7. Warning shows if total > 100% for that designer
8. User confirms and saves
9. Designer's allocations update

### Flow 4: Create New Product Team
1. User opens Settings → Product Teams tab
2. User clicks "Add Product Team"
3. Modal opens with form
4. User enters team name, selects portfolio
5. User clicks Save
6. Team appears in table
7. Now available in allocation dropdowns

### Flow 5: View Team Summary
1. User clicks "Team Summary" tab in nav
2. Page loads with calculated metrics
3. Key cards show: run rate, utilization, outcomes, ROI
4. Charts render: waterfall, cost vs outcomes, ROI by portfolio
5. User scrolls to outcomes input
6. User updates total outcomes value
7. Charts and ROI metrics recalculate

### Flow 6: Import from Capacity Planning App
1. User opens Settings → Data Management tab
2. User clicks "Import Team Members from Capacity App"
3. System reads capacity-planning-app localStorage
4. Preview modal shows found ICs (e.g., "Found 11 team members")
5. User clicks Confirm
6. Designers created with names and levels
7. Fiscal calendar copied
8. Success message: "Imported 11 designers"
9. User navigates to Individual Designers to set allocations

### Flow 7: Export Data
1. User clicks Export icon in nav (or in Settings)
2. File downloads: `pd-resource-mgmt-backup-2026-06-17.json`
3. User saves file
4. Can later import to restore data

### Flow 8: Configure Rates
1. User opens Settings → Rate Configuration tab
2. User updates SPD blended rate: $180 → $200
3. User clicks Save
4. All SPD run rates recalculate
5. Team Summary updates instantly

## Error Handling & Validation

### Validation Rules
- Designer name required
- Team name required, unique within portfolio
- Portfolio name required, unique
- Allocation percentages: 0-100
- Rates: positive numbers only

### Warnings (non-blocking)
- Designer allocations ≠ 100%: Yellow warning badge, "Total allocations: 85%"
- Team has no designers assigned: Gray "No designers" text
- Portfolio has no teams: Gray "No teams" text

### Errors (blocking)
- Cannot delete portfolio with teams: "Delete or reassign teams first"
- Cannot delete team with allocations: "Remove allocations first" (offer cascade)
- Duplicate team name in portfolio: "Team name already exists in this portfolio"
- Import fails (no data found): "Capacity Planning App data not found"
- Invalid JSON import: "Invalid file format"

### User Feedback
- Success: KdsMessage kind="success" (green) - "Designer added", "Settings saved"
- Warning: KdsMessage kind="warning" (yellow) - "Allocations don't sum to 100%"
- Error: KdsMessage kind="negative" (red) - "Failed to delete team"
- Loading: Spinner during data operations

## Responsive Design

### Breakpoints
- Desktop: > 900px (3-column grid)
- Tablet: 600-900px (2-column grid)
- Mobile: < 600px (1-column grid)

### Mobile Optimizations
- Top nav: collapse to hamburger menu
- Charts: scale to fit, rotate labels if needed
- Tables: convert to stacked cards
- Modals: full-screen on mobile
- Sliders: larger touch targets

## Performance Considerations

### Optimization Strategies
- useMemo for expensive calculations (team rollups, portfolio totals)
- useCallback for event handlers
- Debounce localStorage writes (500ms)
- Lazy load charts (only render when visible)
- Virtualize long lists if > 50 items (future)

### Data Constraints (MVP)
- Max 50 designers
- Max 20 portfolios
- Max 100 product teams
- (No hard limits enforced, but performance tested at these levels)

## Testing Strategy

### Unit Tests (utils/calculations.test.js)
- Test all calculation formulas
- Edge cases: 0 hours, 0 allocations, division by zero
- Validate rounding and precision

### Component Tests
- Designer card renders correctly
- Modals open/close
- Forms validate inputs
- Charts render with data

### Integration Tests
- Add/edit/delete flows
- Import from capacity-planning-app
- Export/import JSON
- localStorage persistence

### Manual Testing Checklist
- Create designer → appears in grid
- Edit allocation → utilization updates
- Delete designer → removed from grid and team allocations
- Import → data populates correctly
- Export → file downloads and can be re-imported
- Settings changes → metrics recalculate
- Responsive: test on mobile/tablet/desktop

## Accessibility

### ARIA Labels
- Buttons: aria-label for icon-only buttons
- Form fields: proper label associations
- Charts: aria-label with summary description

### Keyboard Navigation
- Tab order: logical flow
- Modal focus trap
- Enter to submit forms
- Escape to close modals

### Color Contrast
- WCAG AA compliance
- Don't rely on color alone (use icons + text)

### Screen Readers
- Semantic HTML
- Alt text for charts (provide data table alternative)
- Announce dynamic updates

## Future Enhancements (Phase 2+)

### Portfolio Breakdown Page
- Drill-down table view
- Cost, ROI, efficiency by portfolio/domain/team
- Designer allocation heatmap

### Detailed Outcomes Tracker
- Input outcomes per product team
- Track revenue impact, cost savings separately
- Monthly tracking over time
- Pro-rata attribution to designers

### Executive Dashboard
- Trends over time (run rate, utilization)
- Forecasting and projections
- Hiring recommendations based on capacity gaps
- Historical snapshots and comparison

### Advanced Features
- Bulk operations (reassign multiple designers)
- Matrix view for allocations
- Fiscal calendar integration (period-based views)
- Integration with Jira/Asana (auto-import allocations)
- Custom reports and exports
- User roles and permissions (view-only vs edit)

## Migration & Deployment

### Initial Setup
1. Clone capacity-planning-app structure
2. Install dependencies (same versions)
3. Copy fiscal calendar JSON
4. Initialize placeholder data
5. Configure craco for mx-web-components

### Deployment
- Vercel or Netlify (static hosting)
- GitHub repo for version control
- Environment variables: none needed for MVP (all client-side)

### Data Migration (from capacity-planning-app)
- One-time import on first launch
- User can re-import if needed
- No automated sync (standalone app)

## Dependencies

### Core
- react: ^19.2.4
- react-dom: ^19.2.4
- react-scripts: 5.0.1

### UI Components
- mx-web-components: ^5.1.0
- react-mx-web-components: ^5.1.0

### Utilities
- uuid: ^13.0.0 (for ID generation)
- lodash: 4.17.21 (optional, for utilities)

### Charts
- recharts: ^2.x (exact version TBD)

### Build Tools
- @craco/craco: ^7.1.0
- html-webpack-plugin: ^5.6.6

### Testing
- @testing-library/react: ^16.3.2
- @testing-library/jest-dom: ^6.9.1
- @testing-library/user-event: ^13.5.0

## Success Metrics

### MVP Success Criteria
- ✅ Tracks 11 designers with allocations
- ✅ Calculates accurate utilization and run rates
- ✅ Provides individual and team-level views
- ✅ Full CRUD for designers, teams, portfolios
- ✅ Imports data from capacity-planning-app
- ✅ Exports/imports JSON backups
- ✅ 3 key charts render correctly
- ✅ Matches capacity-planning-app look/feel
- ✅ Responsive design works on mobile/tablet/desktop

### User Acceptance
- Manager can answer: "Who's over/under-allocated?"
- Manager can answer: "What's our monthly run rate?"
- Manager can answer: "What's our ROI?"
- Manager can reassign designers to teams easily
- Manager can export data for presentations

## Open Questions / Decisions Deferred

1. **Outcomes tracking detail:** User wants to start simple, will iterate based on usage
2. **Portfolio/Team structure:** May need adjustments, starting simple
3. **Capacity-planning-app sync:** One-time import for MVP, could add sync later
4. **Historical tracking:** Deferred to Phase 2
5. **Multi-user access:** MVP is single-user (localStorage), could add backend later

## Risks & Mitigations

### Risk: Allocations consistently don't sum to 100%
- **Mitigation:** Show warning but don't block. Educate user that 100% = fully allocated.

### Risk: Import from capacity-planning-app fails
- **Mitigation:** Provide clear error messages, allow manual data entry, offer placeholder data reset.

### Risk: Data loss (localStorage cleared)
- **Mitigation:** Encourage regular JSON exports, show last-saved timestamp, add browser warning on unload if unsaved changes.

### Risk: Calculation errors
- **Mitigation:** Comprehensive unit tests, show formulas in UI (tooltips), allow manual override if needed.

### Risk: Performance with large datasets
- **Mitigation:** Optimize calculations with memoization, virtualize lists if needed, set soft limits.

## Conclusion

This MVP provides a focused, usable tool for managing design team resources with clear visibility into capacity, utilization, and financial metrics. The standalone architecture allows rapid development while the CRUD interfaces and import/export features provide flexibility for iteration and growth. The design follows proven patterns from the capacity-planning-app, ensuring familiarity and consistency for the user.

Next step: Create implementation plan with detailed tasks and component breakdown.
