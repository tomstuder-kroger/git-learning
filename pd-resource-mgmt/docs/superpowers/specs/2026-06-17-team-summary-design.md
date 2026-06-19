# Team Summary Page - Design Specification

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Date:** 2026-06-17
**Author:** Design collaboration with user
**Status:** Approved for implementation

## Goal

Build the Team Summary page - the second core view in the PD Resource Management MVP. This page provides managers with aggregate team-level metrics, visualizations, and the ability to track outcomes for ROI calculation.

## Architecture

**Approach:** Modular component architecture with focused, single-purpose components

**Rationale:** Each component has one clear responsibility, can be tested independently, and is easier to maintain. When future enhancements are added (view toggles, additional metrics), only the relevant component needs modification.

## Global Constraints

- React 19.2.4 with functional components and hooks
- mx-web-components v5.1.0 and react-mx-web-components for UI
- Recharts v2.12.0 for charts
- React Context API (useResource hook) for state
- Color coding: <70% gray (#9ca3af), 70-100% green (#2e7d32), >100% red (#d32f2f)
- Primary color: #0F52A2 (blue)
- Fonts: Roboto (body), Nunito (headings/names)
- localStorage auto-save with 500ms debounce
- All calculations documented in `docs/CAPACITY-CALCULATION-FORMULAS.md`
- **Scope:** Product Design resources only - ROI and costs represent PD team, not full cross-functional team

---

## Component Structure

### File Organization

```
src/components/
├── TeamSummary.jsx              (~150 lines) - Main coordinator
├── TeamMetricCards.jsx          (~80 lines)  - 4 key metric cards
├── TeamSecondaryStats.jsx       (~60 lines)  - Secondary stats row
├── CapacityByLevelChart.jsx     (~100 lines) - Waterfall by APD/PD/SPD
├── CostOutcomesChart.jsx        (~80 lines)  - Scatter plot
├── ROIByPortfolioChart.jsx      (~80 lines)  - Bar chart
├── OutcomesTable.jsx            (~100 lines) - Editable outcomes table
└── PortfolioDesignerBreakdown.jsx (~120 lines) - Expandable designer detail

src/utils/
└── calculations.js              - Add team-level calculation functions
```

### Data Flow

**TeamSummary.jsx** is the coordinator:
1. Consumes `useResource()` to get designers, productTeams, portfolios, outcomes, capacitySettings, updateOutcomes()
2. Calculates aggregate metrics using utility functions from `utils/calculations.js`
3. Passes specific data slices to each child component as props
4. Child components are presentation-only (no direct context access)

---

## Component Specifications

### 1. TeamSummary.jsx (Main Coordinator)

**Purpose:** Page layout and data coordination

**State:**
- No local state (all data from context)
- Expanded/collapsed state for portfolio accordions managed locally

**Layout:**
```jsx
<div className="team-summary-page">
  <TeamMetricCards {...metrics} />
  <TeamSecondaryStats {...stats} />

  <section className="charts-section">
    <CapacityByLevelChart data={capacityByLevel} />
    <PortfolioDesignerBreakdown
      portfolios={portfolios}
      groupBy="level"
      data={designersGroupedByLevel}
    />

    <CostOutcomesChart data={teamCostOutcomes} />
    <PortfolioDesignerBreakdown
      portfolios={portfolios}
      groupBy="portfolio"
      data={designersGroupedByPortfolio}
    />

    <ROIByPortfolioChart data={portfolioROI} />
    <PortfolioDesignerBreakdown
      portfolios={portfolios}
      groupBy="portfolio"
      data={designersGroupedByPortfolio}
    />
  </section>

  <OutcomesTable
    teams={productTeams}
    outcomes={outcomes}
    onUpdateOutcome={updateOutcomes}
  />

  <div className="page-footnote">
    *ROI and cost values represent Product Design resources only.
  </div>
</div>
```

**Integration:** Replaces placeholder in App.jsx when `currentView === 'summary'`

---

### 2. TeamMetricCards.jsx

**Purpose:** Display 4 primary KPI cards

**Props:**
```javascript
{
  totalMonthlyRunRate: 199999,
  averageUtilization: 82,
  totalOutcomesValue: 2000000,  // or null if incomplete
  overallROI: 83.3,              // or null if incomplete
  incompleteTeamsCount: 3        // for "X of 10 teams tracked"
}
```

**Layout:** Responsive grid (4 cols → 2 cols → 1 col)

**Card 1: Total Team Monthly Run Rate**
```jsx
<div className="kds-Card kds-Card--m kds-card-section metric-card">
  <div className="metric-primary" style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'Nunito' }}>
    ${formatCurrency(totalMonthlyRunRate)}
  </div>
  <div className="metric-secondary" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
    Monthly
  </div>
  <div className="metric-tertiary" style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
    Annual: ${formatCurrency(totalMonthlyRunRate * 12)}
  </div>
</div>
```

**Card 2: Team Utilization %**
```jsx
<div className="metric-primary" style={{
  fontSize: '3rem',
  fontWeight: 700,
  fontFamily: 'Nunito',
  color: getUtilizationColor(averageUtilization)  // existing function
}}>
  {averageUtilization.toFixed(0)}%
</div>
<div className="metric-secondary">Average Utilization</div>
<div className="metric-tertiary">Target: 80%</div>
```

**Card 3: Total Outcomes Value**
```jsx
<div className="metric-primary" style={{
  fontSize: '3rem',
  color: totalOutcomesValue ? '#000' : '#9ca3af'
}}>
  {totalOutcomesValue ? `$${formatCurrency(totalOutcomesValue)}` : 'Incomplete Data'}
</div>
<div className="metric-secondary">Total Value Delivered</div>
<div className="metric-tertiary">
  {incompleteTeamsCount > 0
    ? `${productTeams.length - incompleteTeamsCount} of ${productTeams.length} teams tracked`
    : 'All teams tracked ✓'}
</div>
```

**Card 4: ROI %**
```jsx
<div className="metric-primary" style={{
  fontSize: '3rem',
  color: overallROI === null ? '#9ca3af' : (overallROI > 100 ? '#2e7d32' : '#d32f2f')
}}>
  {overallROI !== null ? `${overallROI.toFixed(1)}%` : 'Incomplete Data'}
</div>
<div className="metric-secondary">Return on Investment</div>
```

---

### 3. TeamSecondaryStats.jsx

**Purpose:** Display supporting metrics

**Props:**
```javascript
{
  totalHoursAvailable: 20240,
  totalHoursAllocated: 18400,
  headcountByLevel: { APD: 2, PD: 5, SPD: 4 },
  averageRunRatePerDesigner: 18181
}
```

**Layout:** 4-column grid (responsive to 2 cols → 1 col)

```jsx
<div className="secondary-stats-grid">
  <div className="stat-item">
    <div className="stat-label">Total Hours Available</div>
    <div className="stat-value">{totalHoursAvailable.toLocaleString()} hours</div>
  </div>

  <div className="stat-item">
    <div className="stat-label">Total Hours Allocated</div>
    <div className="stat-value">{totalHoursAllocated.toLocaleString()} hours</div>
  </div>

  <div className="stat-item">
    <div className="stat-label">Headcount by Level</div>
    <div className="stat-value">
      {headcountByLevel.APD} APD, {headcountByLevel.PD} PD, {headcountByLevel.SPD} SPD
    </div>
  </div>

  <div className="stat-item">
    <div className="stat-label">Avg Run Rate per Designer</div>
    <div className="stat-value">${averageRunRatePerDesigner.toLocaleString()}/mo</div>
  </div>
</div>
```

**Styling:**
- stat-label: 0.75rem, gray, uppercase, letter-spacing
- stat-value: 1.125rem, bold, black

---

### 4. CapacityByLevelChart.jsx

**Purpose:** Waterfall chart showing capacity breakdown by designer level

**Props:**
```javascript
{
  data: [
    { level: 'APD', available: 3680, allocated: 3312, unallocated: 368 },
    { level: 'PD', available: 9200, allocated: 8280, unallocated: 920 },
    { level: 'SPD', available: 7360, allocated: 6808, unallocated: 552 }
  ]
}
```

**Chart Configuration:**
```jsx
<div className="chart-container">
  <h3 className="chart-title">Team Capacity by Level</h3>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={data}
      layout="horizontal"
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis type="category" dataKey="level" />
      <Tooltip content={<CustomTooltip />} />
      <Legend />

      <Bar dataKey="allocated" stackId="a" fill="#2e7d32" name="Allocated Hours" />
      <Bar dataKey="unallocated" stackId="a" fill="#9ca3af" name="Unallocated Hours" />
    </BarChart>
  </ResponsiveContainer>

  <div className="chart-note" style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
    Note: Future enhancement will allow toggling between by-level, by-portfolio, and by-individual views
  </div>
</div>
```

**Custom Tooltip:**
```javascript
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;

  const allocated = payload[0]?.value || 0;
  const unallocated = payload[1]?.value || 0;
  const total = allocated + unallocated;
  const utilization = (allocated / total * 100).toFixed(1);

  return (
    <div className="custom-tooltip">
      <p><strong>{label}</strong></p>
      <p>Allocated: {allocated.toLocaleString()} hours</p>
      <p>Unallocated: {unallocated.toLocaleString()} hours</p>
      <p>Total: {total.toLocaleString()} hours</p>
      <p>Utilization: {utilization}%</p>
    </div>
  );
}
```

---

### 5. CostOutcomesChart.jsx

**Purpose:** Scatter plot showing monthly cost vs. outcomes by product team

**Props:**
```javascript
{
  data: [
    {
      teamId: '1',
      teamName: 'Item Pricing',
      portfolioId: 'p1',
      portfolioName: 'Item',
      monthlyCost: 45000,
      outcomesValue: 500000,  // or null
      designerCount: 3
    },
    // ... all product teams
  ]
}
```

**Chart Configuration:**
```jsx
<div className="chart-container">
  <h3 className="chart-title">Cost vs. Outcomes by Product Team</h3>

  <ResponsiveContainer width="100%" height={400}>
    <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        type="number"
        dataKey="monthlyCost"
        name="Monthly Cost"
        label={{ value: 'Monthly Design Cost ($)', position: 'bottom' }}
      />
      <YAxis
        type="number"
        dataKey="outcomesValue"
        name="Outcomes Value"
        label={{ value: 'Outcomes Value ($)', angle: -90, position: 'left' }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend />

      <Scatter
        name="Item Portfolio"
        data={data.filter(d => d.portfolioName === 'Item')}
        fill="#0F52A2"
      />
      <Scatter
        name="Assortment Portfolio"
        data={data.filter(d => d.portfolioName === 'Assortment')}
        fill="#2e7d32"
      />
      <Scatter
        name="Supplier Portfolio"
        data={data.filter(d => d.portfolioName === 'Supplier')}
        fill="#ff9800"
      />
    </ScatterChart>
  </ResponsiveContainer>
</div>
```

**Custom Tooltip:**
```javascript
function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload;

  return (
    <div className="custom-tooltip">
      <p><strong>{data.teamName}</strong></p>
      <p>Portfolio: {data.portfolioName}</p>
      <p>Monthly Cost: ${data.monthlyCost.toLocaleString()}</p>
      <p>Outcomes: {data.outcomesValue ? `$${data.outcomesValue.toLocaleString()}` : 'N/A'}</p>
      <p>Designers: {data.designerCount}</p>
    </div>
  );
}
```

**Visual Handling for Missing Outcomes:**
- Teams with null outcomes render at Y=0 with grayed/semi-transparent bubble
- Tooltip shows "N/A" for outcomes value

---

### 6. ROIByPortfolioChart.jsx

**Purpose:** Bar chart showing ROI % by portfolio

**Props:**
```javascript
{
  data: [
    {
      portfolioId: 'p1',
      portfolioName: 'Item',
      monthlyCost: 165000,
      outcomesValue: 1550000,  // or null if any team missing
      roi: 87.9                 // or null
    },
    // ... all portfolios
  ]
}
```

**Chart Configuration:**
```jsx
<div className="chart-container">
  <h3 className="chart-title">ROI by Portfolio</h3>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="portfolioName" />
      <YAxis label={{ value: 'ROI %', angle: -90, position: 'left' }} />
      <Tooltip content={<CustomTooltip />} />
      <ReferenceLine y={100} stroke="#6b7280" strokeDasharray="3 3" label="Target: 100%" />

      <Bar dataKey="roi" fill="#2e7d32">
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={getROIColor(entry.roi)}
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>
```

**Color Logic:**
```javascript
function getROIColor(roi) {
  if (roi === null) return '#9ca3af';      // Gray for N/A
  if (roi > 100) return '#2e7d32';         // Green for positive ROI
  if (roi >= 50) return '#fbbf24';         // Yellow for moderate
  return '#d32f2f';                        // Red for low ROI
}
```

**Custom Tooltip:**
```javascript
function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload;

  return (
    <div className="custom-tooltip">
      <p><strong>{data.portfolioName} Portfolio</strong></p>
      <p>Monthly Cost: ${data.monthlyCost.toLocaleString()}</p>
      <p>Annual Cost: ${(data.monthlyCost * 12).toLocaleString()}</p>
      <p>Outcomes: {data.outcomesValue ? `$${data.outcomesValue.toLocaleString()}` : 'Incomplete'}</p>
      <p>ROI: {data.roi !== null ? `${data.roi.toFixed(1)}%` : 'N/A'}</p>
    </div>
  );
}
```

---

### 7. PortfolioDesignerBreakdown.jsx

**Purpose:** Expandable accordion showing designer contributions grouped by portfolio or level

**Props:**
```javascript
{
  groupBy: 'portfolio' | 'level',  // determines grouping
  data: {
    'Item': {
      designers: [
        {
          id: 'd1',
          name: 'Jane Smith',
          level: 'SPD',
          allocations: [{ productTeamId: 't1', percentage: 50 }],
          monthlyRunRate: 10350,
          utilization: 95
        },
        // ... more designers
      ],
      totalCost: 165000,
      avgUtilization: 88,
      roi: 185  // or null
    },
    'Assortment': { ... },
    'Supplier': { ... }
  }
}
```

**Layout:**
```jsx
<div className="designer-breakdown">
  {Object.entries(data).map(([groupName, groupData]) => (
    <KdsAccordion key={groupName}>
      <KdsAccordionItem>
        <KdsAccordionHeader>
          <div className="breakdown-header">
            <span className="group-name">{groupName}</span>
            <span className="group-stats">
              {groupData.designers.length} designers,
              {groupData.avgUtilization.toFixed(0)}% avg utilization
              {groupData.roi !== null && `, ROI: ${groupData.roi.toFixed(1)}%`}
            </span>
          </div>
        </KdsAccordionHeader>

        <KdsAccordionContent>
          {groupData.designers.map(designer => (
            <div key={designer.id} className="designer-detail-row">
              <div className="designer-info">
                <span className="designer-name">{designer.name}</span>
                <span className="designer-level">({designer.level})</span>
              </div>
              <div className="designer-allocation">
                {designer.utilization.toFixed(0)}% allocated -
                ${designer.monthlyRunRate.toLocaleString()}/mo
              </div>
              <div className="designer-teams">
                {designer.allocations.map(alloc => {
                  const team = findTeamById(alloc.productTeamId);
                  return (
                    <span key={alloc.productTeamId} className="allocation-badge">
                      {team.name} ({alloc.percentage}%)
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </KdsAccordionContent>
      </KdsAccordionItem>
    </KdsAccordion>
  ))}
</div>
```

**Usage Pattern:**
- After CapacityByLevelChart: `<PortfolioDesignerBreakdown groupBy="level" />`
- After CostOutcomesChart and ROIByPortfolioChart: `<PortfolioDesignerBreakdown groupBy="portfolio" />`

---

### 8. OutcomesTable.jsx

**Purpose:** Editable table for entering outcomes value per product team

**Props:**
```javascript
{
  teams: productTeams,  // array of all product teams
  outcomes: {           // object keyed by teamId
    't1': 500000,
    't2': 350000,
    't3': null,         // or undefined
    // ...
  },
  onUpdateOutcome: (teamId, value) => void  // context action
}
```

**Layout:**
```jsx
<div className="outcomes-table-container">
  <h3>Team Outcomes Tracking</h3>

  <table className="outcomes-table">
    <thead>
      <tr>
        <th>Product Team</th>
        <th>Portfolio</th>
        <th>Monthly Design Cost</th>
        <th>Outcomes Value</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {teams.map(team => {
        const portfolio = findPortfolioById(team.portfolioId);
        const cost = calculateTeamMonthlyCost(team, designers, capacitySettings);
        const hasOutcome = outcomes[team.id] != null;

        return (
          <tr key={team.id} className={`portfolio-${portfolio.name.toLowerCase()}`}>
            <td>{team.name}</td>
            <td>
              <KdsTag kind="default" style={{ backgroundColor: getPortfolioColor(portfolio.name) }}>
                {portfolio.name}
              </KdsTag>
            </td>
            <td className="cost-cell">${cost.toLocaleString()}</td>
            <td className="outcome-input-cell">
              <MxInputTextBox
                value={outcomes[team.id]?.toString() || ''}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || null;
                  onUpdateOutcome(team.id, value);
                }}
                mask="currency"
                placeholder="Enter value"
              />
            </td>
            <td className="status-cell">
              {hasOutcome ? (
                <span className="status-complete">✓</span>
              ) : (
                <span className="status-missing">-</span>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>

  <div className="table-footer">
    {incompleteCount > 0 ? (
      <span>{completeCount} of {teams.length} teams tracked</span>
    ) : (
      <span className="all-complete">All teams tracked ✓</span>
    )}
  </div>
</div>
```

**Behavior:**
- Input onChange calls `onUpdateOutcome(teamId, value)` immediately
- Context handles debounced localStorage save (existing pattern)
- Empty/invalid inputs stored as null (not 0)
- Table has sticky header for scrolling
- Visual grouping by portfolio (alternating row backgrounds or borders)

**Portfolio Color Coding:**
```javascript
function getPortfolioColor(portfolioName) {
  const colors = {
    'Item': '#0F52A2',
    'Assortment': '#2e7d32',
    'Supplier': '#ff9800'
  };
  return colors[portfolioName] || '#6b7280';
}
```

---

## Utility Functions (utils/calculations.js)

Add these functions to existing calculations.js:

### calculateTeamMetrics(designers, productTeams, portfolios, outcomes, capacitySettings)

Returns:
```javascript
{
  totalMonthlyRunRate: number,
  averageUtilization: number,
  totalOutcomesValue: number | null,  // null if any team missing
  overallROI: number | null,          // null if incomplete outcomes
  totalHoursAvailable: number,
  totalHoursAllocated: number,
  headcountByLevel: { APD: number, PD: number, SPD: number },
  averageRunRatePerDesigner: number,
  incompleteTeamsCount: number
}
```

**Implementation notes:**
- totalOutcomesValue: sum all team outcomes, or null if any team has null outcome
- overallROI: `(totalOutcomesValue / (totalMonthlyRunRate * 12)) * 100` or null if incomplete
- averageUtilization: mean of all designer utilization percentages
- incompleteTeamsCount: count of teams with null outcomes

### calculateCapacityByLevel(designers, capacitySettings)

Returns array:
```javascript
[
  {
    level: 'APD',
    available: number,    // sum of available hours for all APDs
    allocated: number,    // sum of allocated hours for all APDs
    unallocated: number   // available - allocated
  },
  { level: 'PD', ... },
  { level: 'SPD', ... }
]
```

### calculateTeamCostAndOutcomes(productTeams, designers, outcomes, capacitySettings)

Returns array:
```javascript
[
  {
    teamId: string,
    teamName: string,
    portfolioId: string,
    portfolioName: string,
    monthlyCost: number,      // sum of designer allocations to this team
    outcomesValue: number | null,
    designerCount: number
  },
  // ... for all teams
]
```

**Monthly cost calculation:**
```javascript
// For each team, sum all designer allocations
monthlyCost = designers.reduce((sum, designer) => {
  const allocation = designer.allocations.find(a => a.productTeamId === team.id);
  if (!allocation) return sum;

  const designerMonthlyRate = calculateMonthlyRunRate(designer, capacitySettings);
  return sum + (designerMonthlyRate * allocation.percentage / 100);
}, 0);
```

### calculatePortfolioROI(portfolios, productTeams, designers, outcomes, capacitySettings)

Returns array:
```javascript
[
  {
    portfolioId: string,
    portfolioName: string,
    monthlyCost: number,        // sum of all team costs in this portfolio
    outcomesValue: number | null,  // null if any team in portfolio missing
    roi: number | null          // null if outcomesValue is null
  },
  // ... for all portfolios
]
```

**ROI calculation:**
```javascript
if (outcomesValue === null) {
  roi = null;
} else {
  const annualCost = monthlyCost * 12;
  roi = (outcomesValue / annualCost) * 100;
}
```

### calculateDesignersGroupedByLevel(designers, productTeams, capacitySettings)

Returns object for PortfolioDesignerBreakdown:
```javascript
{
  'APD': {
    designers: [...],  // all APD designers with full details
    totalCost: number,
    avgUtilization: number,
    roi: null  // not applicable for groupBy=level
  },
  'PD': { ... },
  'SPD': { ... }
}
```

### calculateDesignersGroupedByPortfolio(designers, productTeams, portfolios, outcomes, capacitySettings)

Returns object for PortfolioDesignerBreakdown:
```javascript
{
  'Item': {
    designers: [...],  // designers allocated to teams in Item portfolio
    totalCost: number,
    avgUtilization: number,
    roi: number | null  // from calculatePortfolioROI
  },
  'Assortment': { ... },
  'Supplier': { ... }
}
```

---

## Context Updates (ResourceContext.jsx)

Add outcomes to state and CRUD actions:

```javascript
const [state, setState] = useState(() => {
  const stored = loadData();
  if (stored) return {
    ...stored,
    outcomes: stored.outcomes || {},  // Add this
    currentView: 'individual',
    ...filters
  };

  return {
    ...getInitialData(),
    outcomes: {},  // Add this - empty by default
    currentView: 'individual',
    ...filters
  };
});

const updateOutcomes = useCallback((teamId, value) => {
  setState(prev => ({
    ...prev,
    outcomes: {
      ...prev.outcomes,
      [teamId]: value
    }
  }));
}, []);

// Add to context value
return (
  <ResourceContext.Provider value={{
    ...state,
    // ... existing actions
    updateOutcomes
  }}>
    {children}
  </ResourceContext.Provider>
);
```

---

## Testing Strategy

### Unit Tests (utils/calculations.test.js)

Test all new calculation functions:
- `calculateTeamMetrics` - verify aggregations, null handling
- `calculateCapacityByLevel` - verify grouping and sums
- `calculateTeamCostAndOutcomes` - verify cost allocation math
- `calculatePortfolioROI` - verify ROI formula, null propagation
- Edge cases: empty designers, no allocations, division by zero

### Component Tests

**TeamMetricCards.test.js:**
- Renders all 4 cards with correct values
- Color codes utilization and ROI correctly
- Shows "Incomplete Data" when values are null

**CapacityByLevelChart.test.js:**
- Renders chart with correct data
- Tooltip shows hours and percentages
- Handles empty data gracefully

**OutcomesTable.test.js:**
- Renders all teams with input fields
- Calls onUpdateOutcome with correct teamId and value
- Shows status indicators correctly
- Footer shows correct completion count

**PortfolioDesignerBreakdown.test.js:**
- Accordion expands/collapses correctly
- Shows designer details when expanded
- Groups by level or portfolio based on prop

### Integration Test

Full TeamSummary page with test data:
- All metrics calculate correctly
- Charts render with real data
- Outcomes input updates state and metrics
- Expandable sections work
- Responsive layout

---

## Future Enhancements (Post-MVP)

1. **View toggles for capacity chart** - switch between by-level, by-portfolio, by-individual
2. **Export team summary** - PDF or CSV download
3. **Historical trending** - ROI over time, utilization trends
4. **Forecasting** - predict capacity needs based on hiring plans
5. **Detailed outcomes tracking** - per-team outcomes over time with notes
6. **Filtering** - filter all metrics by portfolio, date range, etc.
7. **Comparison views** - compare quarters, compare portfolios

---

## Acceptance Criteria

- [ ] Team Summary page accessible via GlobalNavBar "Team Summary" tab
- [ ] 4 key metric cards display with correct calculations
- [ ] Secondary stats row shows all 4 metrics
- [ ] Capacity by Level chart renders with APD/PD/SPD breakdown
- [ ] Cost vs Outcomes scatter chart shows all teams, color-coded by portfolio
- [ ] ROI by Portfolio bar chart shows all portfolios with color coding
- [ ] Expandable sections below each chart show designer breakdowns
- [ ] Outcomes table allows editing values per team
- [ ] Outcomes changes update metrics in real-time
- [ ] "Incomplete Data" shown for ROI when any team missing outcomes
- [ ] "N/A" shown in charts for teams/portfolios with missing outcomes
- [ ] Page footnote states "*ROI and cost values represent Product Design resources only."
- [ ] All data auto-saves to localStorage (500ms debounce)
- [ ] Responsive layout works on desktop, tablet, mobile
- [ ] All calculations match formulas in CAPACITY-CALCULATION-FORMULAS.md
- [ ] 27+ existing tests still pass
- [ ] New calculation functions have test coverage
