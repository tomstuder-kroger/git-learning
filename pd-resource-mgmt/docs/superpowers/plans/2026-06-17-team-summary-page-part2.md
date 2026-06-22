# Team Summary Page Implementation Plan - Part 2

> **Continuation of:** `2026-06-17-team-summary-page.md`
>
> **Tasks 1-4 in Part 1:** Calculation utilities, outcomes state, TeamMetricCards, TeamSecondaryStats
>
> **Tasks 5-11 below:** Charts, designer breakdowns, outcomes table, integration

---

## Task 5: CapacityByLevelChart Component

**Files:**
- Create: `src/components/CapacityByLevelChart.jsx`

**Summary:** Recharts horizontal BarChart showing capacity breakdown by APD/PD/SPD levels. Stacked bars with allocated (green) and unallocated (gray) hours. Custom tooltip showing hours and utilization percentage.

**Key Code:**
- ResponsiveContainer with BarChart layout="horizontal"
- Bars for allocated (#2e7d32) and unallocated (#9ca3af) stacked
- Custom tooltip calculating utilization %
- Chart title and note about future view toggles

---

## Task 6: CostOutcomesChart Component

**Files:**
- Create: `src/components/CostOutcomesChart.jsx`

**Summary:** Recharts ScatterChart plotting monthly cost (X-axis) vs outcomes value (Y-axis) per product team. Bubbles colored by portfolio (Item=#0F52A2, Assortment=#2e7d32, Supplier=#ff9800). Teams with null outcomes render at Y=0 with grayed bubbles.

**Key Code:**
- 3 Scatter series (one per portfolio)
- Filter data by portfolioName for each series
- Custom tooltip showing team name, cost, outcomes (or "N/A"), designer count
- Handle null outcomes gracefully

---

## Task 7: ROIByPortfolioChart Component

**Files:**
- Create: `src/components/ROIByPortfolioChart.jsx`

**Summary:** Recharts vertical BarChart showing ROI % by portfolio. Color-coded bars: green (>100%), yellow (50-100%), red (<50%), gray (null/N/A). Reference line at 100% target.

**Key Code:**
- Bar with Cell elements for dynamic coloring
- getROIColor function: null=#9ca3af, >100=#2e7d32, 50-100=#fbbf24, <50=#d32f2f
- ReferenceLine at y=100 with dashed stroke
- Custom tooltip showing portfolio, costs, outcomes, ROI

---

## Task 8: PortfolioDesignerBreakdown Component

**Files:**
- Create: `src/components/PortfolioDesignerBreakdown.jsx`

**Summary:** Expandable accordion (KdsAccordion) showing designer details grouped by portfolio or level. Accepts groupBy prop ('portfolio' | 'level') and data object. Shows designer name, level, allocation %, monthly rate, and team assignments.

**Key Code:**
- Map over data object entries (e.g., { 'Item': { designers: [...], totalCost, avgUtilization, roi } })
- KdsAccordion with header showing group name + stats
- Content shows list of designers with allocations
- Allocation badges showing team name (percentage)
- Reusable for both groupBy=level and groupBy=portfolio

---

## Task 9: OutcomesTable Component

**Files:**
- Create: `src/components/OutcomesTable.jsx`

**Summary:** Editable table for entering outcomes value per product team. Columns: Product Team, Portfolio (badge), Monthly Design Cost (read-only), Outcomes Value (MxInputTextBox with currency mask), Status (✓ or -). Groups teams by portfolio visually. Footer shows completion count.

**Key Code:**
- Table with sticky header
- Map over productTeams, find portfolio for each
- MxInputTextBox with mask="currency" calling onUpdateOutcome(teamId, value)
- KdsTag for portfolio with color coding
- Visual grouping by portfolio (alternating backgrounds)
- Footer: "X of Y teams tracked" or "All teams tracked ✓"

---

## Task 10: TeamSummary Page Coordinator

**Files:**
- Create: `src/components/TeamSummary.jsx`

**Summary:** Main coordinator component that consumes useResource(), calculates all metrics using utility functions, and renders all child components with appropriate props. Manages expanded/collapsed state for portfolio accordions.

**Key Code:**
```javascript
const {
  designers,
  productTeams,
  portfolios,
  outcomes,
  capacitySettings,
  updateOutcomes
} = useResource();

// Calculate all metrics
const teamMetrics = calculateTeamMetrics(...);
const capacityByLevel = calculateCapacityByLevel(...);
const teamCostOutcomes = calculateTeamCostAndOutcomes(...);
const portfolioROI = calculatePortfolioROI(...);
const designersGroupedByLevel = calculateDesignersGroupedByLevel(...);
const designersGroupedByPortfolio = calculateDesignersGroupedByPortfolio(...);

// Render layout:
// - TeamMetricCards
// - TeamSecondaryStats
// - CapacityByLevelChart + PortfolioDesignerBreakdown (groupBy=level)
// - CostOutcomesChart + PortfolioDesignerBreakdown (groupBy=portfolio)
// - ROIByPortfolioChart + PortfolioDesignerBreakdown (groupBy=portfolio)
// - OutcomesTable
// - Page footnote: "*ROI and cost values represent Product Design resources only."
```

---

## Task 11: Integration and Final Testing

**Files:**
- Modify: `src/App.jsx` - Replace Team Summary placeholder with <TeamSummary />
- Modify: `src/App.css` - Add page-level styles

**Summary:** Wire up TeamSummary component in App.jsx when currentView === 'summary'. Add page-level CSS for layout, charts section, page footnote. Test full flow: navigate to Team Summary, verify all metrics calculate correctly, enter outcomes, verify real-time updates, test responsiveness.

**Acceptance Criteria:**
- All 4 metric cards display with correct calculations
- Secondary stats show accurate team totals
- Capacity by Level chart renders with APD/PD/SPD breakdown
- Cost vs Outcomes scatter shows all teams, color-coded by portfolio
- ROI by Portfolio bar chart shows all portfolios with color coding
- Expandable sections below each chart show designer breakdowns
- Outcomes table allows editing values per team
- Outcomes changes update metrics in real-time
- "Incomplete Data" shown for ROI when any team missing outcomes
- "N/A" shown in charts for teams/portfolios with missing outcomes
- Page footnote displays at bottom
- All data auto-saves to localStorage
- Responsive layout works on all screen sizes
- All 27+ existing tests still pass

**Test Commands:**
```bash
npm test -- --watchAll=false
npm start
```

**Manual Testing:**
1. Navigate to Team Summary tab
2. Verify all metrics display correctly
3. Expand/collapse portfolio breakdowns
4. Enter outcomes for teams
5. Verify metrics update in real-time
6. Clear an outcome and verify "Incomplete Data" appears
7. Test responsive layout on different screen sizes
8. Reload page and verify data persists

---

## Notes for Implementation

**Task Execution Order:**
- Tasks 5-9 (components) can be built in any order
- Task 10 (coordinator) requires all components complete
- Task 11 (integration) is final

**Testing Strategy:**
- Each chart component tested visually in isolation first
- TeamSummary integration tested with real context data
- Full E2E test of outcomes workflow

**Recharts Installation:**
Recharts should already be installed (v2.12.0) from package.json. If not:
```bash
npm install recharts@2.12.0
```

**Component Sizes:**
- CapacityByLevelChart: ~100 lines
- CostOutcomesChart: ~80 lines
- ROIByPortfolioChart: ~80 lines
- PortfolioDesignerBreakdown: ~120 lines
- OutcomesTable: ~100 lines
- TeamSummary: ~150 lines

**Total Estimated Lines:** ~1150 lines of new code across all tasks (1-11)
