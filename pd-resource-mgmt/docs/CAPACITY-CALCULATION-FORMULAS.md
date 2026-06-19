# Resource Management Calculations - Finance Review

**Document Purpose:** Formula definitions for Team Summary page metrics and calculations

**Date:** 2026-06-17

**Status:** Draft for Finance Review

---

## Individual Designer Calculations (Already Implemented)

### 1. Available Hours per Designer
```
Available Hours = (40 hours/week × 52 weeks) - PTO adjustment - Holiday adjustment
                = 2,080 - 80 - 160
                = 1,840 hours/year
```

### 2. Allocated Hours per Designer
```
Allocated Hours = Available Hours × (Sum of allocation percentages / 100)

Example: Designer with 60% to Team A + 40% to Team B
       = 1,840 × (60% + 40%)
       = 1,840 × 1.0
       = 1,840 hours
```

### 3. Designer Utilization %
```
Utilization % = (Allocated Hours / Available Hours) × 100

Example: 1,840 allocated / 1,840 available × 100 = 100%
```

### 4. Monthly Run Rate per Designer
```
Monthly Run Rate = (Hourly Rate × Available Hours) / 12 months

Example for PD at $115/hr:
             = ($115 × 1,840) / 12
             = $211,600 / 12
             = $17,633/month
```

**Hourly Rates by Level:**
- APD: $95/hour
- PD: $115/hour
- SPD: $135/hour

---

## Team-Level Aggregate Calculations (Proposed for Team Summary Page)

### 5. Total Team Monthly Run Rate
```
Total Monthly Run Rate = Sum of all designers' monthly run rates

Example with 11 designers:
  2 APD @ $14,517/mo = $29,034
  5 PD  @ $17,633/mo = $88,165
  4 SPD @ $20,700/mo = $82,800
  ────────────────────────────
  Total              = $199,999/month
```

**Annual Projection:**
```
Annual Run Rate = Total Monthly Run Rate × 12
```

### 6. Average Team Utilization %
```
Average Utilization = Sum of all designer utilization % / Number of designers

Example:
  Designer A: 100%
  Designer B: 80%
  Designer C: 90%
  ─────────────────
  Average: (100 + 80 + 90) / 3 = 90%
```

### 7. Total Hours Available (Team)
```
Total Hours Available = Sum of all designers' available hours

Example with 11 designers (all at 1,840 hours):
  = 11 × 1,840
  = 20,240 hours/year
```

### 8. Total Hours Allocated (Team)
```
Total Hours Allocated = Sum of all designers' allocated hours

Example:
  Designer A: 1,840 hours (100%)
  Designer B: 1,472 hours (80%)
  Designer C: 1,656 hours (90%)
  ────────────────────────────
  Total: 4,968 hours
```

### 9. Headcount by Level
```
Simple count grouped by level:
  APD: 2 designers
  PD:  5 designers
  SPD: 4 designers
```

### 10. Average Run Rate per Designer
```
Average Run Rate per Designer = Total Monthly Run Rate / Number of designers

Example:
  $199,999 / 11 = $18,181/month per designer
```

---

## Outcomes & ROI Calculations (Proposed)

### 11. Total Outcomes Value
```
Total Outcomes Value = Sum of outcomes values entered for all product teams

**MVP Approach:**
- User enters outcomes value per product team in a simple table
- Examples: revenue impact, cost savings, customer value
- If any team has no value entered, Total = null (incomplete data)

Example:
  Item Pricing Team:     $500,000
  Item Catalog Team:     $350,000
  Assortment Discovery:  $400,000
  ... (all 10 teams)
  ────────────────────────────────
  Total:                 $2,000,000
```

### 12. Overall ROI %
```
Overall ROI % = (Total Outcomes Value / Annual Team Cost) × 100

Annual Team Cost = Total Monthly Run Rate × 12

Example:
  Total Outcomes = $2,000,000
  Annual Cost    = $199,999 × 12 = $2,399,988

  ROI = ($2,000,000 / $2,399,988) × 100
      = 83.3%

**Display Logic:**
- If ALL teams have outcomes data: Show calculated ROI %
- If ANY team missing outcomes: Show "Incomplete Data"
```

**Interpretation:**
- ROI > 100%: Outcomes exceed costs (positive return)
- ROI = 100%: Break-even
- ROI < 100%: Outcomes less than costs

### 13. Monthly Cost per Product Team
```
Monthly Cost per Team = Sum of (Designer allocation % × Designer monthly run rate)

Example for Item Pricing Team:
  Designer A: 50% allocation × $17,633/mo = $8,817
  Designer B: 30% allocation × $20,700/mo = $6,210
  Designer C: 20% allocation × $14,517/mo = $2,903
  ──────────────────────────────────────────────
  Team Monthly Cost:                      $17,930
```

### 14. ROI per Portfolio
```
Portfolio ROI % = (Portfolio Outcomes / Portfolio Annual Cost) × 100

Portfolio Outcomes = Sum of outcomes for all teams in that portfolio
Portfolio Cost = Sum of monthly costs for all teams in that portfolio × 12

Example for "Item" Portfolio (4 teams):
  Team costs: $17,930 + $15,200 + $12,800 + $18,000 = $63,930/month
  Annual cost: $63,930 × 12 = $767,160

  Team outcomes: $500,000 + $350,000 + $300,000 + $400,000 = $1,550,000

  ROI = ($1,550,000 / $767,160) × 100
      = 202.0%

**Display Logic:**
- If ANY team in portfolio missing outcomes: ROI = null, show "N/A"
- If all teams have data: Show calculated ROI %
```

---

## Capacity Breakdown by Level (For Waterfall Chart)

### 15. Capacity by Level
```
For each level (APD, PD, SPD):
  Available Hours   = Sum of available hours for all designers at that level
  Allocated Hours   = Sum of allocated hours for all designers at that level
  Unallocated Hours = Available Hours - Allocated Hours

Example for PD level (5 designers):
  Available:   5 × 1,840 = 9,200 hours
  Allocated:   1,840 + 1,472 + 1,840 + 1,656 + 1,472 = 8,280 hours
  Unallocated: 9,200 - 8,280 = 920 hours

  Utilization: (8,280 / 9,200) × 100 = 90%
```

---

## Questions for Finance Review

1. **ROI Formula:** Is `(Outcomes / Annual Cost) × 100` the right formula, or should we use a different ROI calculation?

2. **Incomplete Data Handling:** For MVP, we show "Incomplete Data" if any team is missing outcomes. Is this acceptable, or should we calculate partial ROI?

3. **Outcomes Definition:** Should "outcomes value" be strictly financial (revenue, cost savings), or can it include other value metrics?

4. **Time Period:** All calculations are annual. Do you need monthly or quarterly ROI views?

5. **Cost Allocation:** When a designer is split across teams, we allocate their cost proportionally. Is this the right approach?

6. **Hourly Rates:** Current rates (APD: $95, PD: $115, SPD: $135) - are these fully-loaded rates including benefits, or base rates?

---

## Future Enhancements (Post-MVP)

- Historical ROI trending over time
- Forecasting based on hiring plans
- Variance analysis (planned vs. actual outcomes)
- Portfolio-level budget tracking
- Quarterly snapshots and comparisons
- Outcomes tracking per team over time (not just current value)

---

**Action Required:** Please review formulas and provide feedback, especially on ROI calculation methodology and incomplete data handling.
