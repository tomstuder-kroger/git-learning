# Product Design Resource Management App - Context

## Project Overview
Building a resource management dashboard for product design team managers to track:
- Designer capacity and utilization
- Team allocation across portfolios and product teams
- Run rates and financial metrics
- ROI tracking

## Relationship to Existing Apps
- **Standalone app** in `pd-resource-mgmt` directory
- Can import data from `../capacity-planning-app` on first launch (one-time)
- Uses same design system (mx-web-components) and patterns
- After import, data lives independently

## Key Decisions Made

### Scope
- **MVP:** Individual Designers page + Team Summary page
- **Phase 2:** Portfolio Breakdown, Outcomes Tracker, Dashboard (full 5-page app from original spec)

### Hierarchy
- **Portfolio → Product Teams** (2 levels only)
- Portfolios: Item, Assortment, Supplier
- Each portfolio has 3-5 product teams
- Old "Domains" concept = "Initiatives" or "Teams" (simplified)

### Designer Data
- **Levels:** APD (Associate Product Designer), PD (Product Designer), SPD (Senior Product Designer)
- **Employment Status:** FTE, SOW, SOW Koncert
- **Rates:** Level-based rates configured in settings (not per-designer)
  - Settings page allows adjusting hourly rates by level
  - Actual Rate vs Blended Rate for each level

### Capacity Calculations
- Import fiscal calendar from capacity-planning-app
- Standard hours/week: 40
- Annual adjustments: PTO days, Holidays, L&D days, OKR Planning days
- Formula: `Available Hours = (40 × 52) - (PTO + Holidays + L&D + OKR) × 8`

### Allocation
- Manual percentage sliders on Individual Designers page
- Designer allocations must sum to 100%
- Allocated by Product Team
- Simple UI: drag sliders to adjust

### Financial Metrics
- **Run Rate:** Blended Rate × Available Hours / 12 (monthly)
- **Utilization %:** Hours Allocated / Hours Available × 100
- **ROI:** Simple outcomes input in Team Summary for MVP (not detailed tracking yet)

### Data Persistence
- **localStorage** for working session
- **JSON export/import** for backup and sharing
- Auto-save on changes

### Placeholder Data
- 11 designers (matching original spec)
- 3 portfolios (Item, Assortment, Supplier)
- 3-5 product teams per portfolio
- Realistic placeholder rates and allocations

### Top 3 Charts (MVP)
1. **Capacity Waterfall** - available → allocated → unallocated
2. **Cost vs. Outcomes** - scatter plot (team cost vs value)
3. **ROI by Portfolio** - bar chart

Plus key metric cards (numbers/percentages)

## Architecture Approved

### Tech Stack
- React 19
- mx-web-components v5.1.0 (same as capacity-planning-app)
- React Context for state management
- Recharts for visualizations
- Custom CSS matching capacity-planning-app look/feel
  - Roboto font
  - Blue #0F52A2
  - Card-based layouts with kds-Card classes

### App Structure
```
pd-resource-mgmt/
├── src/
│   ├── components/
│   │   ├── DesignerCard.jsx          // Individual designer card with allocation sliders
│   │   ├── DesignerGrid.jsx          // Grid of all designer cards
│   │   ├── TeamSummary.jsx           // Summary page with metrics + charts
│   │   ├── CapacityWaterfallChart.jsx
│   │   ├── CostVsOutcomesChart.jsx
│   │   ├── ROIByPortfolioChart.jsx
│   │   └── SettingsPanel.jsx         // Rate configuration
│   ├── context/
│   │   └── ResourceContext.jsx       // Global state (designers, teams, settings)
│   ├── utils/
│   │   ├── calculations.js           // Capacity, utilization, ROI formulas
│   │   ├── storage.js                // localStorage read/write
│   │   └── importCapacityApp.js      // One-time import from capacity-planning-app
│   ├── data/
│   │   ├── krogerFiscalCalendar.json // Imported from capacity-planning-app
│   │   └── placeholderData.js        // 11 designers, portfolios, teams
│   ├── App.jsx
│   ├── App.css
│   └── index.css
```

### Navigation
- Top nav bar (GlobalNavBar pattern from capacity-planning-app)
- Two tabs: "Individual Designers" | "Team Summary"
- Settings icon in nav to configure rates

### State Management
- Single ResourceContext provides all data + actions
- localStorage auto-saves on changes
- JSON export creates backup file
- JSON import loads from file

## Design Section 1 Status
✅ Overall Architecture approved by user

## Next Steps
When we resume:
1. Present Design Section 2: Data Models & Calculations
2. Present Design Section 3: Individual Designers Page
3. Present Design Section 4: Team Summary Page
4. Present Design Section 5: Settings & Import/Export
5. Get final design approval
6. Write design doc to `docs/superpowers/specs/2026-06-17-pd-resource-mgmt-design.md`
7. Spec self-review
8. User reviews spec
9. Invoke writing-plans skill for implementation plan

## Original Spec Reference
User provided comprehensive spec in initial message with:
- 5 pages (MVP focuses on first 2)
- Detailed data models (TypeScript interfaces)
- Calculation formulas
- Full feature set for future phases

## Important Notes
- Keep it simple for MVP
- User wants to iterate and adjust Portfolio/Team structure later
- Outcomes tracking is uncertain - starting very simple
- Focus on getting Individual Designers + Team Summary working well first
