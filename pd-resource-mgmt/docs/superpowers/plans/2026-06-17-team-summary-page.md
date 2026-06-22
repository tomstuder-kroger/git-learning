# Team Summary Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Team Summary page with aggregate metrics, 3 charts, expandable designer breakdowns, and outcomes tracking for ROI calculation.

**Architecture:** Modular component design with TeamSummary.jsx as coordinator. Eight focused components (metric cards, stats, 3 charts, designer breakdown, outcomes table) receive specific data slices via props. New team-level calculation functions in utils/calculations.js. Outcomes state added to ResourceContext.

**Tech Stack:** React 19.2.4, mx-web-components v5.1.0, Recharts v2.12.0, React Context API, localStorage

## Global Constraints

- React 19.2.4 with functional components and hooks
- mx-web-components v5.1.0 and react-mx-web-components for UI
- Recharts v2.12.0 for all charts
- React Context API (useResource hook) for state management
- Color coding: <70% gray (#9ca3af), 70-100% green (#2e7d32), >100% red (#d32f2f)
- Primary color: #0F52A2 (blue), Portfolio colors: Item=#0F52A2, Assortment=#2e7d32, Supplier=#ff9800
- Fonts: Roboto (body), Nunito (headings/names)
- localStorage auto-save with 500ms debounce (existing pattern)
- All metrics represent Product Design resources only (footnote on page)
- TDD: Write failing test → run (verify fail) → implement → run (verify pass) → commit
- DRY, YAGNI principles throughout

---

## Task 1: Team-Level Calculation Utilities

**Files:**
- Modify: `src/utils/calculations.js`
- Modify: `src/utils/calculations.test.js`

**Interfaces:**
- Consumes: existing calculateUtilization(), calculateMonthlyRunRate(), calculateAvailableHours(), calculateAllocatedHours()
- Produces:
  - calculateTeamMetrics(designers, productTeams, portfolios, outcomes, capacitySettings) → object
  - calculateCapacityByLevel(designers, capacitySettings) → array
  - calculateTeamCostAndOutcomes(productTeams, designers, outcomes, capacitySettings) → array
  - calculatePortfolioROI(portfolios, productTeams, designers, outcomes, capacitySettings) → array
  - calculateDesignersGroupedByLevel(designers, productTeams, capacitySettings) → object
  - calculateDesignersGroupedByPortfolio(designers, productTeams, portfolios, outcomes, capacitySettings) → object

- [ ] **Step 1: Write failing test for calculateTeamMetrics**

Add to `src/utils/calculations.test.js`:

```javascript
describe('calculateTeamMetrics', () => {
  it('should calculate aggregate team metrics correctly', () => {
    const designers = [
      {
        id: 'd1',
        name: 'Designer 1',
        level: 'PD',
        employmentStatus: 'FTE',
        allocations: [{ productTeamId: 't1', percentage: 100 }]
      },
      {
        id: 'd2',
        name: 'Designer 2',
        level: 'SPD',
        employmentStatus: 'FTE',
        allocations: [{ productTeamId: 't2', percentage: 80 }]
      }
    ];

    const productTeams = [
      { id: 't1', name: 'Team 1', portfolioId: 'p1' },
      { id: 't2', name: 'Team 2', portfolioId: 'p1' }
    ];

    const portfolios = [
      { id: 'p1', name: 'Portfolio 1' }
    ];

    const outcomes = {
      't1': 500000,
      't2': 300000
    };

    const capacitySettings = {
      hoursPerWeek: 40,
      weeksPerYear: 52,
      ptoHours: 80,
      holidayHours: 160,
      rates: {
        APD: 95,
        PD: 115,
        SPD: 135
      }
    };

    const result = calculateTeamMetrics(
      designers,
      productTeams,
      portfolios,
      outcomes,
      capacitySettings
    );

    expect(result.totalMonthlyRunRate).toBeCloseTo(35333, 0);
    expect(result.averageUtilization).toBe(90);
    expect(result.totalOutcomesValue).toBe(800000);
    expect(result.overallROI).toBeCloseTo(188.7, 1);
    expect(result.totalHoursAvailable).toBe(3680);
    expect(result.totalHoursAllocated).toBe(3312);
    expect(result.headcountByLevel).toEqual({ APD: 0, PD: 1, SPD: 1 });
    expect(result.averageRunRatePerDesigner).toBeCloseTo(17666, 0);
    expect(result.incompleteTeamsCount).toBe(0);
  });

  it('should return null for outcomes/ROI when data incomplete', () => {
    const designers = [
      {
        id: 'd1',
        level: 'PD',
        allocations: [{ productTeamId: 't1', percentage: 100 }]
      }
    ];

    const productTeams = [
      { id: 't1', name: 'Team 1', portfolioId: 'p1' }
    ];

    const portfolios = [{ id: 'p1', name: 'Portfolio 1' }];

    const outcomes = {};  // No outcomes entered

    const capacitySettings = {
      hoursPerWeek: 40,
      weeksPerYear: 52,
      ptoHours: 80,
      holidayHours: 160,
      rates: { APD: 95, PD: 115, SPD: 135 }
    };

    const result = calculateTeamMetrics(
      designers,
      productTeams,
      portfolios,
      outcomes,
      capacitySettings
    );

    expect(result.totalOutcomesValue).toBeNull();
    expect(result.overallROI).toBeNull();
    expect(result.incompleteTeamsCount).toBe(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: FAIL with "calculateTeamMetrics is not defined"

- [ ] **Step 3: Implement calculateTeamMetrics in calculations.js**

Add to `src/utils/calculations.js`:

```javascript
export function calculateTeamMetrics(
  designers,
  productTeams,
  portfolios,
  outcomes,
  capacitySettings
) {
  // Total monthly run rate
  const totalMonthlyRunRate = designers.reduce((sum, designer) => {
    return sum + calculateMonthlyRunRate(designer, capacitySettings);
  }, 0);

  // Average utilization
  const utilizationSum = designers.reduce((sum, designer) => {
    return sum + calculateUtilization(designer, capacitySettings);
  }, 0);
  const averageUtilization = designers.length > 0
    ? utilizationSum / designers.length
    : 0;

  // Total hours
  const totalHoursAvailable = designers.reduce((sum, designer) => {
    return sum + calculateAvailableHours(capacitySettings);
  }, 0);

  const totalHoursAllocated = designers.reduce((sum, designer) => {
    return sum + calculateAllocatedHours(designer, capacitySettings);
  }, 0);

  // Headcount by level
  const headcountByLevel = { APD: 0, PD: 0, SPD: 0 };
  designers.forEach(designer => {
    if (headcountByLevel.hasOwnProperty(designer.level)) {
      headcountByLevel[designer.level]++;
    }
  });

  // Average run rate per designer
  const averageRunRatePerDesigner = designers.length > 0
    ? totalMonthlyRunRate / designers.length
    : 0;

  // Check if all teams have outcomes
  const incompleteTeamsCount = productTeams.filter(team => {
    return outcomes[team.id] == null;
  }).length;

  // Total outcomes value (null if any team missing)
  let totalOutcomesValue = null;
  if (incompleteTeamsCount === 0) {
    totalOutcomesValue = productTeams.reduce((sum, team) => {
      return sum + (outcomes[team.id] || 0);
    }, 0);
  }

  // Overall ROI (null if incomplete)
  let overallROI = null;
  if (totalOutcomesValue !== null && totalMonthlyRunRate > 0) {
    const annualCost = totalMonthlyRunRate * 12;
    overallROI = (totalOutcomesValue / annualCost) * 100;
  }

  return {
    totalMonthlyRunRate,
    averageUtilization,
    totalOutcomesValue,
    overallROI,
    totalHoursAvailable,
    totalHoursAllocated,
    headcountByLevel,
    averageRunRatePerDesigner,
    incompleteTeamsCount
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: PASS for calculateTeamMetrics tests

- [ ] **Step 5: Write failing test for calculateCapacityByLevel**

Add to `src/utils/calculations.test.js`:

```javascript
describe('calculateCapacityByLevel', () => {
  it('should group capacity by designer level', () => {
    const designers = [
      {
        id: 'd1',
        level: 'APD',
        allocations: [{ productTeamId: 't1', percentage: 100 }]
      },
      {
        id: 'd2',
        level: 'APD',
        allocations: [{ productTeamId: 't2', percentage: 80 }]
      },
      {
        id: 'd3',
        level: 'PD',
        allocations: [{ productTeamId: 't1', percentage: 100 }]
      }
    ];

    const capacitySettings = {
      hoursPerWeek: 40,
      weeksPerYear: 52,
      ptoHours: 80,
      holidayHours: 160,
      rates: { APD: 95, PD: 115, SPD: 135 }
    };

    const result = calculateCapacityByLevel(designers, capacitySettings);

    expect(result).toHaveLength(3);

    const apdLevel = result.find(r => r.level === 'APD');
    expect(apdLevel.available).toBe(3680);  // 2 designers × 1840 hours
    expect(apdLevel.allocated).toBe(3312);  // (100% + 80%) × 1840
    expect(apdLevel.unallocated).toBe(368);

    const pdLevel = result.find(r => r.level === 'PD');
    expect(pdLevel.available).toBe(1840);
    expect(pdLevel.allocated).toBe(1840);
    expect(pdLevel.unallocated).toBe(0);

    const spdLevel = result.find(r => r.level === 'SPD');
    expect(spdLevel.available).toBe(0);
    expect(spdLevel.allocated).toBe(0);
    expect(spdLevel.unallocated).toBe(0);
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: FAIL with "calculateCapacityByLevel is not defined"

- [ ] **Step 7: Implement calculateCapacityByLevel**

Add to `src/utils/calculations.js`:

```javascript
export function calculateCapacityByLevel(designers, capacitySettings) {
  const levels = ['APD', 'PD', 'SPD'];

  return levels.map(level => {
    const designersAtLevel = designers.filter(d => d.level === level);

    const available = designersAtLevel.reduce((sum, designer) => {
      return sum + calculateAvailableHours(capacitySettings);
    }, 0);

    const allocated = designersAtLevel.reduce((sum, designer) => {
      return sum + calculateAllocatedHours(designer, capacitySettings);
    }, 0);

    const unallocated = available - allocated;

    return {
      level,
      available,
      allocated,
      unallocated
    };
  });
}
```

- [ ] **Step 8: Run test to verify it passes**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: PASS for calculateCapacityByLevel tests

- [ ] **Step 9: Write failing test for calculateTeamCostAndOutcomes**

Add to `src/utils/calculations.test.js`:

```javascript
describe('calculateTeamCostAndOutcomes', () => {
  it('should calculate monthly cost and outcomes per team', () => {
    const designers = [
      {
        id: 'd1',
        level: 'PD',
        allocations: [
          { productTeamId: 't1', percentage: 50 },
          { productTeamId: 't2', percentage: 50 }
        ]
      },
      {
        id: 'd2',
        level: 'SPD',
        allocations: [{ productTeamId: 't1', percentage: 100 }]
      }
    ];

    const productTeams = [
      { id: 't1', name: 'Team 1', portfolioId: 'p1' },
      { id: 't2', name: 'Team 2', portfolioId: 'p2' }
    ];

    const portfolios = [
      { id: 'p1', name: 'Portfolio A' },
      { id: 'p2', name: 'Portfolio B' }
    ];

    const outcomes = {
      't1': 500000,
      't2': null
    };

    const capacitySettings = {
      hoursPerWeek: 40,
      weeksPerYear: 52,
      ptoHours: 80,
      holidayHours: 160,
      rates: { APD: 95, PD: 115, SPD: 135 }
    };

    const result = calculateTeamCostAndOutcomes(
      productTeams,
      designers,
      outcomes,
      capacitySettings
    );

    expect(result).toHaveLength(2);

    const team1 = result.find(t => t.teamId === 't1');
    expect(team1.teamName).toBe('Team 1');
    expect(team1.portfolioName).toBe('Portfolio A');
    expect(team1.monthlyCost).toBeCloseTo(29466, 0);  // 50% PD + 100% SPD
    expect(team1.outcomesValue).toBe(500000);
    expect(team1.designerCount).toBe(2);

    const team2 = result.find(t => t.teamId === 't2');
    expect(team2.monthlyCost).toBeCloseTo(8816, 0);  // 50% PD
    expect(team2.outcomesValue).toBeNull();
    expect(team2.designerCount).toBe(1);
  });
});
```

- [ ] **Step 10: Run test to verify it fails**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: FAIL with "calculateTeamCostAndOutcomes is not defined"

- [ ] **Step 11: Implement calculateTeamCostAndOutcomes**

Add to `src/utils/calculations.js`:

```javascript
export function calculateTeamCostAndOutcomes(
  productTeams,
  designers,
  outcomes,
  capacitySettings
) {
  return productTeams.map(team => {
    // Find portfolio
    const portfolio = team.portfolio || { name: 'Unknown' };

    // Calculate monthly cost for this team
    let monthlyCost = 0;
    let designerCount = 0;

    designers.forEach(designer => {
      const allocation = designer.allocations.find(
        a => a.productTeamId === team.id
      );

      if (allocation) {
        designerCount++;
        const designerMonthlyRate = calculateMonthlyRunRate(
          designer,
          capacitySettings
        );
        monthlyCost += (designerMonthlyRate * allocation.percentage) / 100;
      }
    });

    return {
      teamId: team.id,
      teamName: team.name,
      portfolioId: team.portfolioId,
      portfolioName: portfolio.name,
      monthlyCost,
      outcomesValue: outcomes[team.id] != null ? outcomes[team.id] : null,
      designerCount
    };
  });
}
```

Note: This function needs portfolios joined to teams. We'll need to fix this in the actual implementation.

- [ ] **Step 12: Fix calculateTeamCostAndOutcomes to accept portfolios param**

Update test to pass portfolios and fix implementation:

```javascript
// In test, ensure we pass portfolios as 4th param
const result = calculateTeamCostAndOutcomes(
  productTeams,
  designers,
  outcomes,
  capacitySettings,
  portfolios  // Add this
);
```

Update function signature in `src/utils/calculations.js`:

```javascript
export function calculateTeamCostAndOutcomes(
  productTeams,
  designers,
  outcomes,
  capacitySettings,
  portfolios
) {
  return productTeams.map(team => {
    // Find portfolio
    const portfolio = portfolios.find(p => p.id === team.portfolioId) || { name: 'Unknown' };

    // Calculate monthly cost for this team
    let monthlyCost = 0;
    let designerCount = 0;

    designers.forEach(designer => {
      const allocation = designer.allocations.find(
        a => a.productTeamId === team.id
      );

      if (allocation) {
        designerCount++;
        const designerMonthlyRate = calculateMonthlyRunRate(
          designer,
          capacitySettings
        );
        monthlyCost += (designerMonthlyRate * allocation.percentage) / 100;
      }
    });

    return {
      teamId: team.id,
      teamName: team.name,
      portfolioId: team.portfolioId,
      portfolioName: portfolio.name,
      monthlyCost,
      outcomesValue: outcomes[team.id] != null ? outcomes[team.id] : null,
      designerCount
    };
  });
}
```

- [ ] **Step 13: Run test to verify it passes**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: PASS for calculateTeamCostAndOutcomes tests

- [ ] **Step 14: Write failing test for calculatePortfolioROI**

Add to `src/utils/calculations.test.js`:

```javascript
describe('calculatePortfolioROI', () => {
  it('should calculate ROI per portfolio', () => {
    const portfolios = [
      { id: 'p1', name: 'Portfolio A' },
      { id: 'p2', name: 'Portfolio B' }
    ];

    const productTeams = [
      { id: 't1', name: 'Team 1', portfolioId: 'p1' },
      { id: 't2', name: 'Team 2', portfolioId: 'p1' },
      { id: 't3', name: 'Team 3', portfolioId: 'p2' }
    ];

    const designers = [
      {
        id: 'd1',
        level: 'PD',
        allocations: [{ productTeamId: 't1', percentage: 100 }]
      },
      {
        id: 'd2',
        level: 'PD',
        allocations: [{ productTeamId: 't2', percentage: 100 }]
      },
      {
        id: 'd3',
        level: 'SPD',
        allocations: [{ productTeamId: 't3', percentage: 100 }]
      }
    ];

    const outcomes = {
      't1': 300000,
      't2': 400000,
      't3': null  // Incomplete
    };

    const capacitySettings = {
      hoursPerWeek: 40,
      weeksPerYear: 52,
      ptoHours: 80,
      holidayHours: 160,
      rates: { APD: 95, PD: 115, SPD: 135 }
    };

    const result = calculatePortfolioROI(
      portfolios,
      productTeams,
      designers,
      outcomes,
      capacitySettings
    );

    expect(result).toHaveLength(2);

    const portfolioA = result.find(p => p.portfolioId === 'p1');
    expect(portfolioA.portfolioName).toBe('Portfolio A');
    expect(portfolioA.monthlyCost).toBeCloseTo(35266, 0);  // 2 PDs
    expect(portfolioA.outcomesValue).toBe(700000);
    expect(portfolioA.roi).toBeCloseTo(165.5, 1);

    const portfolioB = result.find(p => p.portfolioId === 'p2');
    expect(portfolioB.outcomesValue).toBeNull();
    expect(portfolioB.roi).toBeNull();
  });
});
```

- [ ] **Step 15: Run test to verify it fails**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: FAIL with "calculatePortfolioROI is not defined"

- [ ] **Step 16: Implement calculatePortfolioROI**

Add to `src/utils/calculations.js`:

```javascript
export function calculatePortfolioROI(
  portfolios,
  productTeams,
  designers,
  outcomes,
  capacitySettings
) {
  return portfolios.map(portfolio => {
    // Find teams in this portfolio
    const teamsInPortfolio = productTeams.filter(
      t => t.portfolioId === portfolio.id
    );

    // Calculate total cost for portfolio
    let monthlyCost = 0;
    let hasIncompleteData = false;
    let totalOutcomes = 0;

    teamsInPortfolio.forEach(team => {
      // Calculate team cost
      designers.forEach(designer => {
        const allocation = designer.allocations.find(
          a => a.productTeamId === team.id
        );

        if (allocation) {
          const designerMonthlyRate = calculateMonthlyRunRate(
            designer,
            capacitySettings
          );
          monthlyCost += (designerMonthlyRate * allocation.percentage) / 100;
        }
      });

      // Check outcomes
      if (outcomes[team.id] == null) {
        hasIncompleteData = true;
      } else {
        totalOutcomes += outcomes[team.id];
      }
    });

    // Calculate ROI
    let roi = null;
    let outcomesValue = null;

    if (!hasIncompleteData) {
      outcomesValue = totalOutcomes;
      if (monthlyCost > 0) {
        const annualCost = monthlyCost * 12;
        roi = (outcomesValue / annualCost) * 100;
      }
    }

    return {
      portfolioId: portfolio.id,
      portfolioName: portfolio.name,
      monthlyCost,
      outcomesValue,
      roi
    };
  });
}
```

- [ ] **Step 17: Run test to verify it passes**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: PASS for calculatePortfolioROI tests

- [ ] **Step 18: Write failing test for calculateDesignersGroupedByLevel**

Add to `src/utils/calculations.test.js`:

```javascript
describe('calculateDesignersGroupedByLevel', () => {
  it('should group designers by level with metrics', () => {
    const designers = [
      {
        id: 'd1',
        name: 'Designer 1',
        level: 'APD',
        allocations: [{ productTeamId: 't1', percentage: 100 }]
      },
      {
        id: 'd2',
        name: 'Designer 2',
        level: 'PD',
        allocations: [{ productTeamId: 't1', percentage: 80 }]
      },
      {
        id: 'd3',
        name: 'Designer 3',
        level: 'PD',
        allocations: [{ productTeamId: 't2', percentage: 100 }]
      }
    ];

    const productTeams = [
      { id: 't1', name: 'Team 1', portfolioId: 'p1' },
      { id: 't2', name: 'Team 2', portfolioId: 'p1' }
    ];

    const capacitySettings = {
      hoursPerWeek: 40,
      weeksPerYear: 52,
      ptoHours: 80,
      holidayHours: 160,
      rates: { APD: 95, PD: 115, SPD: 135 }
    };

    const result = calculateDesignersGroupedByLevel(
      designers,
      productTeams,
      capacitySettings
    );

    expect(result.APD.designers).toHaveLength(1);
    expect(result.APD.designers[0].name).toBe('Designer 1');
    expect(result.APD.totalCost).toBeCloseTo(14516, 0);
    expect(result.APD.avgUtilization).toBe(100);

    expect(result.PD.designers).toHaveLength(2);
    expect(result.PD.avgUtilization).toBe(90);

    expect(result.SPD.designers).toHaveLength(0);
  });
});
```

- [ ] **Step 19: Run test to verify it fails**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: FAIL with "calculateDesignersGroupedByLevel is not defined"

- [ ] **Step 20: Implement calculateDesignersGroupedByLevel**

Add to `src/utils/calculations.js`:

```javascript
export function calculateDesignersGroupedByLevel(
  designers,
  productTeams,
  capacitySettings
) {
  const levels = ['APD', 'PD', 'SPD'];
  const result = {};

  levels.forEach(level => {
    const designersAtLevel = designers.filter(d => d.level === level);

    const totalCost = designersAtLevel.reduce((sum, designer) => {
      return sum + calculateMonthlyRunRate(designer, capacitySettings);
    }, 0);

    const avgUtilization = designersAtLevel.length > 0
      ? designersAtLevel.reduce((sum, designer) => {
          return sum + calculateUtilization(designer, capacitySettings);
        }, 0) / designersAtLevel.length
      : 0;

    // Enrich designers with full details
    const enrichedDesigners = designersAtLevel.map(designer => ({
      ...designer,
      monthlyRunRate: calculateMonthlyRunRate(designer, capacitySettings),
      utilization: calculateUtilization(designer, capacitySettings),
      allocationsWithTeamNames: designer.allocations.map(alloc => {
        const team = productTeams.find(t => t.id === alloc.productTeamId);
        return {
          ...alloc,
          teamName: team ? team.name : 'Unknown'
        };
      })
    }));

    result[level] = {
      designers: enrichedDesigners,
      totalCost,
      avgUtilization,
      roi: null  // Not applicable for groupBy=level
    };
  });

  return result;
}
```

- [ ] **Step 21: Run test to verify it passes**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: PASS for calculateDesignersGroupedByLevel tests

- [ ] **Step 22: Write failing test for calculateDesignersGroupedByPortfolio**

Add to `src/utils/calculations.test.js`:

```javascript
describe('calculateDesignersGroupedByPortfolio', () => {
  it('should group designers by portfolio with metrics', () => {
    const designers = [
      {
        id: 'd1',
        name: 'Designer 1',
        level: 'PD',
        allocations: [{ productTeamId: 't1', percentage: 50 }]
      },
      {
        id: 'd2',
        name: 'Designer 2',
        level: 'SPD',
        allocations: [
          { productTeamId: 't1', percentage: 50 },
          { productTeamId: 't2', percentage: 50 }
        ]
      }
    ];

    const productTeams = [
      { id: 't1', name: 'Team 1', portfolioId: 'p1' },
      { id: 't2', name: 'Team 2', portfolioId: 'p2' }
    ];

    const portfolios = [
      { id: 'p1', name: 'Portfolio A' },
      { id: 'p2', name: 'Portfolio B' }
    ];

    const outcomes = {
      't1': 500000,
      't2': 300000
    };

    const capacitySettings = {
      hoursPerWeek: 40,
      weeksPerYear: 52,
      ptoHours: 80,
      holidayHours: 160,
      rates: { APD: 95, PD: 115, SPD: 135 }
    };

    const result = calculateDesignersGroupedByPortfolio(
      designers,
      productTeams,
      portfolios,
      outcomes,
      capacitySettings
    );

    expect(result['Portfolio A'].designers).toHaveLength(2);
    expect(result['Portfolio A'].roi).toBeCloseTo(283.5, 1);

    expect(result['Portfolio B'].designers).toHaveLength(1);
    expect(result['Portfolio B'].designers[0].name).toBe('Designer 2');
  });
});
```

- [ ] **Step 23: Run test to verify it fails**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: FAIL with "calculateDesignersGroupedByPortfolio is not defined"

- [ ] **Step 24: Implement calculateDesignersGroupedByPortfolio**

Add to `src/utils/calculations.js`:

```javascript
export function calculateDesignersGroupedByPortfolio(
  designers,
  productTeams,
  portfolios,
  outcomes,
  capacitySettings
) {
  const result = {};

  portfolios.forEach(portfolio => {
    const teamsInPortfolio = productTeams.filter(
      t => t.portfolioId === portfolio.id
    );
    const teamIds = teamsInPortfolio.map(t => t.id);

    // Find designers allocated to teams in this portfolio
    const designersInPortfolio = designers.filter(designer => {
      return designer.allocations.some(alloc =>
        teamIds.includes(alloc.productTeamId)
      );
    });

    // Calculate metrics
    let totalCost = 0;
    let hasIncompleteData = false;
    let totalOutcomes = 0;

    teamsInPortfolio.forEach(team => {
      designers.forEach(designer => {
        const allocation = designer.allocations.find(
          a => a.productTeamId === team.id
        );
        if (allocation) {
          const rate = calculateMonthlyRunRate(designer, capacitySettings);
          totalCost += (rate * allocation.percentage) / 100;
        }
      });

      if (outcomes[team.id] == null) {
        hasIncompleteData = true;
      } else {
        totalOutcomes += outcomes[team.id];
      }
    });

    // Calculate ROI
    let roi = null;
    if (!hasIncompleteData && totalCost > 0) {
      const annualCost = totalCost * 12;
      roi = (totalOutcomes / annualCost) * 100;
    }

    // Calculate average utilization
    const avgUtilization = designersInPortfolio.length > 0
      ? designersInPortfolio.reduce((sum, designer) => {
          return sum + calculateUtilization(designer, capacitySettings);
        }, 0) / designersInPortfolio.length
      : 0;

    // Enrich designers
    const enrichedDesigners = designersInPortfolio.map(designer => ({
      ...designer,
      monthlyRunRate: calculateMonthlyRunRate(designer, capacitySettings),
      utilization: calculateUtilization(designer, capacitySettings),
      allocationsWithTeamNames: designer.allocations.map(alloc => {
        const team = productTeams.find(t => t.id === alloc.productTeamId);
        return {
          ...alloc,
          teamName: team ? team.name : 'Unknown'
        };
      })
    }));

    result[portfolio.name] = {
      designers: enrichedDesigners,
      totalCost,
      avgUtilization,
      roi
    };
  });

  return result;
}
```

- [ ] **Step 25: Run test to verify it passes**

Run:
```bash
npm test -- calculations.test.js --watchAll=false
```

Expected: PASS for all new calculation tests

- [ ] **Step 26: Commit calculation utilities**

```bash
git add src/utils/calculations.js src/utils/calculations.test.js
git commit -m "feat: add team-level calculation utilities

- calculateTeamMetrics: aggregate metrics (run rate, utilization, ROI)
- calculateCapacityByLevel: group capacity by APD/PD/SPD
- calculateTeamCostAndOutcomes: cost and outcomes per team
- calculatePortfolioROI: ROI per portfolio
- calculateDesignersGroupedByLevel: designers grouped by level
- calculateDesignersGroupedByPortfolio: designers grouped by portfolio
- Full test coverage for all functions
- Handles incomplete outcomes data (null propagation)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Add Outcomes State to ResourceContext

**Files:**
- Modify: `src/context/ResourceContext.jsx`
- Modify: `src/context/ResourceContext.test.js`

**Interfaces:**
- Consumes: existing loadData(), saveData() from utils/storage.js
- Produces: outcomes (object), updateOutcomes(teamId, value) action

- [ ] **Step 1: Write failing test for outcomes state and updateOutcomes**

Add to `src/context/ResourceContext.test.js`:

```javascript
describe('outcomes management', () => {
  it('should initialize with empty outcomes', () => {
    const { result } = renderHook(() => useResource(), {
      wrapper: ResourceProvider
    });

    expect(result.current.outcomes).toEqual({});
  });

  it('should update outcomes for a team', () => {
    const { result } = renderHook(() => useResource(), {
      wrapper: ResourceProvider
    });

    act(() => {
      result.current.updateOutcomes('team1', 500000);
    });

    expect(result.current.outcomes.team1).toBe(500000);
  });

  it('should handle null outcomes value', () => {
    const { result } = renderHook(() => useResource(), {
      wrapper: ResourceProvider
    });

    act(() => {
      result.current.updateOutcomes('team1', 500000);
    });

    expect(result.current.outcomes.team1).toBe(500000);

    act(() => {
      result.current.updateOutcomes('team1', null);
    });

    expect(result.current.outcomes.team1).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- ResourceContext.test.js --watchAll=false
```

Expected: FAIL with "outcomes is not defined" or "updateOutcomes is not a function"

- [ ] **Step 3: Add outcomes to ResourceContext state**

In `src/context/ResourceContext.jsx`, update the state initialization:

```javascript
const [state, setState] = useState(() => {
  const stored = loadData();
  if (stored) return {
    ...stored,
    outcomes: stored.outcomes || {},  // Add this
    currentView: 'individual',
    filterLevel: null,
    filterStatus: null,
    filterPortfolio: null,
    sortBy: 'name'
  };

  return {
    ...getInitialData(),
    outcomes: {},  // Add this
    currentView: 'individual',
    filterLevel: null,
    filterStatus: null,
    filterPortfolio: null,
    sortBy: 'name'
  };
});
```

- [ ] **Step 4: Add updateOutcomes action**

In `src/context/ResourceContext.jsx`, add the new action:

```javascript
const updateOutcomes = useCallback((teamId, value) => {
  setState(prev => ({
    ...prev,
    outcomes: {
      ...prev.outcomes,
      [teamId]: value
    }
  }));
}, []);
```

- [ ] **Step 5: Add updateOutcomes to context value**

In `src/context/ResourceContext.jsx`, add to the context provider value:

```javascript
return (
  <ResourceContext.Provider value={{
    ...state,
    addDesigner,
    updateDesigner,
    deleteDesigner,
    addProductTeam,
    updateProductTeam,
    deleteProductTeam,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    updateCapacitySettings,
    setView,
    setFilters,
    setSortBy,
    exportData,
    importData,
    updateOutcomes  // Add this
  }}>
    {children}
  </ResourceContext.Provider>
);
```

- [ ] **Step 6: Run test to verify it passes**

Run:
```bash
npm test -- ResourceContext.test.js --watchAll=false
```

Expected: PASS for outcomes tests

- [ ] **Step 7: Commit outcomes state addition**

```bash
git add src/context/ResourceContext.jsx src/context/ResourceContext.test.js
git commit -m "feat: add outcomes state to ResourceContext

- Add outcomes object to state (teamId -> value mapping)
- Add updateOutcomes(teamId, value) action
- Initialize from localStorage or empty object
- Auto-saves with existing debounce pattern
- Full test coverage

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: TeamMetricCards Component

**Files:**
- Create: `src/components/TeamMetricCards.jsx`

**Interfaces:**
- Consumes: props { totalMonthlyRunRate, averageUtilization, totalOutcomesValue, overallROI, incompleteTeamsCount, totalTeamsCount }
- Produces: 4-card responsive grid with formatted metrics

- [ ] **Step 1: Create TeamMetricCards component**

Create `src/components/TeamMetricCards.jsx`:

```javascript
import React from 'react';

function TeamMetricCards({
  totalMonthlyRunRate,
  averageUtilization,
  totalOutcomesValue,
  overallROI,
  incompleteTeamsCount,
  totalTeamsCount
}) {
  const getUtilizationColor = (utilization) => {
    if (utilization < 70) return '#9ca3af';
    if (utilization <= 100) return '#2e7d32';
    return '#d32f2f';
  };

  const getROIColor = (roi) => {
    if (roi === null) return '#9ca3af';
    return roi >= 100 ? '#2e7d32' : '#d32f2f';
  };

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="team-metric-cards">
      <div className="kds-Card kds-Card--m kds-card-section metric-card">
        <div
          className="metric-primary"
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
            color: '#000',
            lineHeight: 1
          }}
        >
          ${formatCurrency(totalMonthlyRunRate)}
        </div>
        <div
          className="metric-secondary"
          style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}
        >
          Monthly
        </div>
        <div
          className="metric-tertiary"
          style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}
        >
          Annual: ${formatCurrency(totalMonthlyRunRate * 12)}
        </div>
      </div>

      <div className="kds-Card kds-Card--m kds-card-section metric-card">
        <div
          className="metric-primary"
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
            color: getUtilizationColor(averageUtilization),
            lineHeight: 1
          }}
        >
          {averageUtilization.toFixed(0)}%
        </div>
        <div
          className="metric-secondary"
          style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}
        >
          Average Utilization
        </div>
        <div
          className="metric-tertiary"
          style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}
        >
          Target: 80%
        </div>
      </div>

      <div className="kds-Card kds-Card--m kds-card-section metric-card">
        <div
          className="metric-primary"
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
            color: totalOutcomesValue ? '#000' : '#9ca3af',
            lineHeight: 1
          }}
        >
          {totalOutcomesValue ? `$${formatCurrency(totalOutcomesValue)}` : 'Incomplete Data'}
        </div>
        <div
          className="metric-secondary"
          style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}
        >
          Total Value Delivered
        </div>
        <div
          className="metric-tertiary"
          style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}
        >
          {incompleteTeamsCount > 0
            ? `${totalTeamsCount - incompleteTeamsCount} of ${totalTeamsCount} teams tracked`
            : 'All teams tracked ✓'}
        </div>
      </div>

      <div className="kds-Card kds-Card--m kds-card-section metric-card">
        <div
          className="metric-primary"
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
            color: getROIColor(overallROI),
            lineHeight: 1
          }}
        >
          {overallROI !== null ? `${overallROI.toFixed(1)}%` : 'Incomplete Data'}
        </div>
        <div
          className="metric-secondary"
          style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}
        >
          Return on Investment
        </div>
      </div>
    </div>
  );
}

export default TeamMetricCards;
```

- [ ] **Step 2: Add styles for metric cards**

Add to `src/App.css`:

```css
.team-metric-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 1024px) {
  .team-metric-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .team-metric-cards {
    grid-template-columns: 1fr;
  }
}

.metric-card {
  text-align: center;
  padding: 1.5rem;
}
```

- [ ] **Step 3: Test component with sample data**

Update `src/App.jsx` temporarily to test:

```javascript
import TeamMetricCards from './components/TeamMetricCards';

// In AppContent, replace Team Summary placeholder with:
{currentView === 'summary' && (
  <div>
    <TeamMetricCards
      totalMonthlyRunRate={199999}
      averageUtilization={82}
      totalOutcomesValue={2000000}
      overallROI={83.3}
      incompleteTeamsCount={0}
      totalTeamsCount={10}
    />
  </div>
)}
```

- [ ] **Step 4: Run app and verify cards display**

Run:
```bash
npm start
```

Expected:
- Navigate to Team Summary tab
- See 4 metric cards in responsive grid
- Verify number formatting ($199.9k, $2.0M)
- Verify color coding (green for 82% utilization, green for 83.3% ROI)

- [ ] **Step 5: Commit TeamMetricCards component**

```bash
git add src/components/TeamMetricCards.jsx src/App.css src/App.jsx
git commit -m "feat: add TeamMetricCards component

- 4-card responsive grid (4 cols -> 2 cols -> 1 col)
- Monthly run rate with annual projection
- Average utilization with color coding
- Total outcomes with completion status
- ROI with color coding
- Currency formatting (M/k abbreviations)
- Handles incomplete data (shows 'Incomplete Data')

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: TeamSecondaryStats Component

**Files:**
- Create: `src/components/TeamSecondaryStats.jsx`

**Interfaces:**
- Consumes: props { totalHoursAvailable, totalHoursAllocated, headcountByLevel, averageRunRatePerDesigner }
- Produces: 4-column stats grid

- [ ] **Step 1: Create TeamSecondaryStats component**

Create `src/components/TeamSecondaryStats.jsx`:

```javascript
import React from 'react';

function TeamSecondaryStats({
  totalHoursAvailable,
  totalHoursAllocated,
  headcountByLevel,
  averageRunRatePerDesigner
}) {
  return (
    <div className="team-secondary-stats">
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
  );
}

export default TeamSecondaryStats;
```

- [ ] **Step 2: Add styles for secondary stats**

Add to `src/App.css`:

```css
.team-secondary-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .team-secondary-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .team-secondary-stats {
    grid-template-columns: 1fr;
  }
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #000;
}
```

- [ ] **Step 3: Test component with sample data**

Update `src/App.jsx` temporarily:

```javascript
import TeamSecondaryStats from './components/TeamSecondaryStats';

// Add below TeamMetricCards:
<TeamSecondaryStats
  totalHoursAvailable={20240}
  totalHoursAllocated={18400}
  headcountByLevel={{ APD: 2, PD: 5, SPD: 4 }}
  averageRunRatePerDesigner={18181}
/>
```

- [ ] **Step 4: Run app and verify stats display**

Run:
```bash
npm start
```

Expected:
- See 4 stats in responsive grid below metric cards
- Verify number formatting with commas
- Verify responsive layout

- [ ] **Step 5: Commit TeamSecondaryStats component**

```bash
git add src/components/TeamSecondaryStats.jsx src/App.css src/App.jsx
git commit -m "feat: add TeamSecondaryStats component

- 4-column responsive grid (4 -> 2 -> 1)
- Total hours available and allocated
- Headcount breakdown by level
- Average run rate per designer
- Clean label/value layout with background

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

Due to length constraints, I'll create the plan file now with Tasks 1-4 complete and continue with Tasks 5-11 (the remaining components and integration) in a follow-up. This ensures we have a working foundation before building the chart components.

