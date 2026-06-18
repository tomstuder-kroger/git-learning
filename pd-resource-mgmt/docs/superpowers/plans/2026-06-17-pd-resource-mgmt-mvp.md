# Product Design Resource Management MVP - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone resource management dashboard for tracking designer capacity, utilization, team allocations, run rates, and ROI.

**Architecture:** React 19 app with mx-web-components for UI, React Context for state management, localStorage for persistence, and Recharts for visualizations. Two main pages: Individual Designers (grid of cards with allocation management) and Team Summary (metrics + 3 charts). Import capability from existing capacity-planning-app.

**Tech Stack:** React 19, mx-web-components v5.1.0, react-mx-web-components v5.1.0, Recharts v2.12.0, craco, uuid

## Global Constraints

- React version: ^19.2.4
- mx-web-components version: ^5.1.0
- Node version: >=14
- Primary color: #0F52A2
- Fonts: Roboto (body), Nunito (headings)
- Color coding: <70% gray (#9ca3af), 70-100% green (#2e7d32), >100% red (#d32f2f)
- All commits must include: `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`

---

### Task 1: Project Setup and Configuration

**Files:**
- Create: `package.json`
- Create: `craco.config.js`
- Create: `public/index.html`
- Create: `public/manifest.json`
- Create: `src/index.js`
- Create: `src/index.css`
- Create: `.gitignore`

**Interfaces:**
- Consumes: None (initial setup)
- Produces: Working React app shell with mx-web-components configured

- [ ] **Step 1: Initialize React app**

```bash
npx create-react-app . --template cra-template
```

- [ ] **Step 2: Install dependencies**

```bash
npm install mx-web-components@5.1.0 react-mx-web-components@5.1.0 recharts@2.12.0 uuid@13.0.0 lodash@4.17.21
npm install --save-dev @craco/craco@7.1.0
```

- [ ] **Step 3: Create craco configuration**

Create `craco.config.js`:

```javascript
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      });
      return webpackConfig;
    }
  }
};
```

- [ ] **Step 4: Update package.json scripts**

Edit `package.json` scripts section:

```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject"
}
```

- [ ] **Step 5: Update index.css with global styles**

Replace `src/index.css`:

```css
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

/* Prevent FOUCE for mx-web-components */
kds-tag:not(:defined),
kds-message:not(:defined),
kds-button:not(:defined) {
  visibility: hidden;
}
```

- [ ] **Step 6: Create basic index.js**

Replace `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 7: Test the setup**

```bash
npm start
```

Expected: App launches on localhost:3000, no console errors

- [ ] **Step 8: Commit setup**

```bash
git add -A
git commit -m "chore: initial project setup with mx-web-components

- Add craco configuration for webpack
- Install mx-web-components, recharts, uuid
- Configure global styles
- Set up React 19 app shell

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 2: Data Models and Placeholder Data

**Files:**
- Create: `src/data/placeholderData.js`
- Create: `src/data/krogerFiscalCalendar.json`

**Interfaces:**
- Consumes: None
- Produces:
  - `getInitialData()` → returns `{ designers: Designer[], productTeams: ProductTeam[], portfolios: Portfolio[], capacitySettings: CapacitySettings, outcomes: Outcomes }`
  - Designer type: `{ id: string, name: string, level: 'APD'|'PD'|'SPD', employmentStatus: 'FTE'|'SOW'|'SOW Koncert', allocations: Array<{productTeamId: string, percentage: number}> }`
  - ProductTeam type: `{ id: string, name: string, portfolioId: string }`
  - Portfolio type: `{ id: string, name: string }`

- [ ] **Step 1: Copy fiscal calendar from capacity-planning-app**

```bash
mkdir -p src/data
cp ../capacity-planning-app/src/data/krogerFiscalCalendar.json src/data/krogerFiscalCalendar.json
```

- [ ] **Step 2: Create placeholder data file**

Create `src/data/placeholderData.js`:

```javascript
import { v4 as uuidv4 } from 'uuid';

// Portfolios
const portfolios = [
  { id: uuidv4(), name: 'Item' },
  { id: uuidv4(), name: 'Assortment' },
  { id: uuidv4(), name: 'Supplier' }
];

// Product Teams
const productTeams = [
  // Item Portfolio
  { id: uuidv4(), name: 'Item Pricing Team', portfolioId: portfolios[0].id },
  { id: uuidv4(), name: 'Item Catalog Team', portfolioId: portfolios[0].id },
  { id: uuidv4(), name: 'Item Discovery Team', portfolioId: portfolios[0].id },
  { id: uuidv4(), name: 'Item Recommendations Team', portfolioId: portfolios[0].id },

  // Assortment Portfolio
  { id: uuidv4(), name: 'Assortment Planning Team', portfolioId: portfolios[1].id },
  { id: uuidv4(), name: 'Category Management Team', portfolioId: portfolios[1].id },
  { id: uuidv4(), name: 'Inventory Optimization Team', portfolioId: portfolios[1].id },

  // Supplier Portfolio
  { id: uuidv4(), name: 'Supplier Onboarding Team', portfolioId: portfolios[2].id },
  { id: uuidv4(), name: 'Supplier Portal Team', portfolioId: portfolios[2].id },
  { id: uuidv4(), name: 'Supplier Analytics Team', portfolioId: portfolios[2].id }
];

// Designers (11 total: 2 APD, 5 PD, 4 SPD)
const designers = [
  // APD
  {
    id: uuidv4(),
    name: 'Alex Chen',
    level: 'APD',
    employmentStatus: 'FTE',
    allocations: [
      { productTeamId: productTeams[0].id, percentage: 50 },
      { productTeamId: productTeams[1].id, percentage: 50 }
    ]
  },
  {
    id: uuidv4(),
    name: 'Jordan Kim',
    level: 'APD',
    employmentStatus: 'FTE',
    allocations: [
      { productTeamId: productTeams[4].id, percentage: 100 }
    ]
  },

  // PD
  {
    id: uuidv4(),
    name: 'Taylor Martinez',
    level: 'PD',
    employmentStatus: 'FTE',
    allocations: [
      { productTeamId: productTeams[2].id, percentage: 60 },
      { productTeamId: productTeams[3].id, percentage: 40 }
    ]
  },
  {
    id: uuidv4(),
    name: 'Morgan Lee',
    level: 'PD',
    employmentStatus: 'SOW',
    allocations: [
      { productTeamId: productTeams[5].id, percentage: 100 }
    ]
  },
  {
    id: uuidv4(),
    name: 'Casey Johnson',
    level: 'PD',
    employmentStatus: 'FTE',
    allocations: [
      { productTeamId: productTeams[6].id, percentage: 100 }
    ]
  },
  {
    id: uuidv4(),
    name: 'Riley Patel',
    level: 'PD',
    employmentStatus: 'FTE',
    allocations: [
      { productTeamId: productTeams[7].id, percentage: 50 },
      { productTeamId: productTeams[8].id, percentage: 50 }
    ]
  },
  {
    id: uuidv4(),
    name: 'Avery Wong',
    level: 'PD',
    employmentStatus: 'SOW Koncert',
    allocations: [
      { productTeamId: productTeams[9].id, percentage: 100 }
    ]
  },

  // SPD
  {
    id: uuidv4(),
    name: 'Jamie Rodriguez',
    level: 'SPD',
    employmentStatus: 'FTE',
    allocations: [
      { productTeamId: productTeams[0].id, percentage: 40 },
      { productTeamId: productTeams[1].id, percentage: 30 },
      { productTeamId: productTeams[2].id, percentage: 30 }
    ]
  },
  {
    id: uuidv4(),
    name: 'Quinn Davis',
    level: 'SPD',
    employmentStatus: 'FTE',
    allocations: [
      { productTeamId: productTeams[4].id, percentage: 50 },
      { productTeamId: productTeams[5].id, percentage: 50 }
    ]
  },
  {
    id: uuidv4(),
    name: 'Sage Williams',
    level: 'SPD',
    employmentStatus: 'FTE',
    allocations: [
      { productTeamId: productTeams[7].id, percentage: 100 }
    ]
  },
  {
    id: uuidv4(),
    name: 'Drew Thompson',
    level: 'SPD',
    employmentStatus: 'FTE',
    allocations: [
      { productTeamId: productTeams[8].id, percentage: 50 },
      { productTeamId: productTeams[9].id, percentage: 50 }
    ]
  }
];

// Capacity Settings
const capacitySettings = {
  standardHoursPerWeek: 40,
  weeksPerYear: 52,
  ptoHoursPerYear: 120,      // 15 days × 8
  holidaysHoursPerYear: 80,   // 10 days × 8
  ldHoursPerYear: 24,         // 3 days × 8
  okrPlanningHoursPerYear: 16, // 2 days × 8
  ratesByLevel: {
    APD: { actual: 100, blended: 125 },
    PD: { actual: 120, blended: 150 },
    SPD: { actual: 150, blended: 180 }
  }
};

// Outcomes
const outcomes = {
  totalValue: 2000000
};

export function getInitialData() {
  return {
    designers,
    productTeams,
    portfolios,
    capacitySettings,
    outcomes
  };
}
```

- [ ] **Step 3: Verify fiscal calendar exists**

```bash
ls -la src/data/krogerFiscalCalendar.json
```

Expected: File exists with JSON data

- [ ] **Step 4: Commit data models**

```bash
git add src/data/
git commit -m "feat: add data models and placeholder data

- Create 11 designers (2 APD, 5 PD, 4 SPD)
- Create 3 portfolios (Item, Assortment, Supplier)
- Create 10 product teams across portfolios
- Define capacity settings with rates by level
- Copy fiscal calendar from capacity-planning-app

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 3: Calculation Utilities with Tests

**Files:**
- Create: `src/utils/calculations.js`
- Create: `src/utils/calculations.test.js`

**Interfaces:**
- Consumes: Designer, CapacitySettings from placeholderData
- Produces:
  - `calculateAvailableHours(capacitySettings)` → number
  - `calculateAllocatedHours(designer, capacitySettings)` → number
  - `calculateUtilization(designer, capacitySettings)` → number
  - `calculateMonthlyRunRate(designer, capacitySettings)` → number
  - `getUtilizationColor(utilization)` → string (#9ca3af | #2e7d32 | #d32f2f)
  - `getUtilizationStatus(utilization)` → 'under' | 'good' | 'over'

- [ ] **Step 1: Write failing test for available hours calculation**

Create `src/utils/calculations.test.js`:

```javascript
import {
  calculateAvailableHours,
  calculateAllocatedHours,
  calculateUtilization,
  calculateMonthlyRunRate,
  getUtilizationColor,
  getUtilizationStatus
} from './calculations';

describe('calculations', () => {
  const mockSettings = {
    standardHoursPerWeek: 40,
    weeksPerYear: 52,
    ptoHoursPerYear: 120,
    holidaysHoursPerYear: 80,
    ldHoursPerYear: 24,
    okrPlanningHoursPerYear: 16,
    ratesByLevel: {
      APD: { actual: 100, blended: 125 },
      PD: { actual: 120, blended: 150 },
      SPD: { actual: 150, blended: 180 }
    }
  };

  describe('calculateAvailableHours', () => {
    it('should calculate available hours correctly', () => {
      const result = calculateAvailableHours(mockSettings);
      expect(result).toBe(1840); // (40 * 52) - 120 - 80 - 24 - 16
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- calculations.test.js
```

Expected: FAIL with "calculateAvailableHours is not defined"

- [ ] **Step 3: Implement available hours calculation**

Create `src/utils/calculations.js`:

```javascript
/**
 * Calculate available hours per year for a designer
 * Formula: (standardHoursPerWeek × weeksPerYear) - all adjustments
 */
export function calculateAvailableHours(capacitySettings) {
  const {
    standardHoursPerWeek,
    weeksPerYear,
    ptoHoursPerYear,
    holidaysHoursPerYear,
    ldHoursPerYear,
    okrPlanningHoursPerYear
  } = capacitySettings;

  return (
    standardHoursPerWeek * weeksPerYear -
    ptoHoursPerYear -
    holidaysHoursPerYear -
    ldHoursPerYear -
    okrPlanningHoursPerYear
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- calculations.test.js
```

Expected: PASS for calculateAvailableHours

- [ ] **Step 5: Write failing tests for allocated hours and utilization**

Add to `src/utils/calculations.test.js`:

```javascript
  describe('calculateAllocatedHours', () => {
    it('should calculate allocated hours for 100% allocation', () => {
      const designer = {
        allocations: [
          { productTeamId: 'team-1', percentage: 100 }
        ]
      };
      const result = calculateAllocatedHours(designer, mockSettings);
      expect(result).toBe(1840);
    });

    it('should calculate allocated hours for 50% allocation', () => {
      const designer = {
        allocations: [
          { productTeamId: 'team-1', percentage: 50 }
        ]
      };
      const result = calculateAllocatedHours(designer, mockSettings);
      expect(result).toBe(920);
    });

    it('should sum multiple allocations', () => {
      const designer = {
        allocations: [
          { productTeamId: 'team-1', percentage: 50 },
          { productTeamId: 'team-2', percentage: 30 }
        ]
      };
      const result = calculateAllocatedHours(designer, mockSettings);
      expect(result).toBe(1472); // 1840 * 0.8
    });

    it('should return 0 for no allocations', () => {
      const designer = { allocations: [] };
      const result = calculateAllocatedHours(designer, mockSettings);
      expect(result).toBe(0);
    });
  });

  describe('calculateUtilization', () => {
    it('should calculate 100% utilization', () => {
      const designer = {
        allocations: [{ productTeamId: 'team-1', percentage: 100 }]
      };
      const result = calculateUtilization(designer, mockSettings);
      expect(result).toBe(100);
    });

    it('should calculate 50% utilization', () => {
      const designer = {
        allocations: [{ productTeamId: 'team-1', percentage: 50 }]
      };
      const result = calculateUtilization(designer, mockSettings);
      expect(result).toBe(50);
    });

    it('should handle over-allocation', () => {
      const designer = {
        allocations: [
          { productTeamId: 'team-1', percentage: 80 },
          { productTeamId: 'team-2', percentage: 40 }
        ]
      };
      const result = calculateUtilization(designer, mockSettings);
      expect(result).toBe(120);
    });

    it('should return 0 for no allocations', () => {
      const designer = { allocations: [] };
      const result = calculateUtilization(designer, mockSettings);
      expect(result).toBe(0);
    });
  });
```

- [ ] **Step 6: Run tests to verify they fail**

```bash
npm test -- calculations.test.js
```

Expected: FAIL for calculateAllocatedHours and calculateUtilization

- [ ] **Step 7: Implement allocated hours and utilization**

Add to `src/utils/calculations.js`:

```javascript
/**
 * Calculate allocated hours per year for a designer
 * Formula: availableHours × (sum of allocation percentages / 100)
 */
export function calculateAllocatedHours(designer, capacitySettings) {
  const availableHours = calculateAvailableHours(capacitySettings);
  const totalAllocationPercentage = designer.allocations.reduce(
    (sum, allocation) => sum + allocation.percentage,
    0
  );
  return availableHours * (totalAllocationPercentage / 100);
}

/**
 * Calculate utilization percentage for a designer
 * Formula: (allocatedHours / availableHours) × 100
 */
export function calculateUtilization(designer, capacitySettings) {
  const availableHours = calculateAvailableHours(capacitySettings);
  const allocatedHours = calculateAllocatedHours(designer, capacitySettings);

  if (availableHours === 0) return 0;

  return (allocatedHours / availableHours) * 100;
}
```

- [ ] **Step 8: Run tests to verify they pass**

```bash
npm test -- calculations.test.js
```

Expected: PASS for all tests so far

- [ ] **Step 9: Write failing tests for run rate**

Add to `src/utils/calculations.test.js`:

```javascript
  describe('calculateMonthlyRunRate', () => {
    it('should calculate monthly run rate for APD', () => {
      const designer = { level: 'APD' };
      const result = calculateMonthlyRunRate(designer, mockSettings);
      // $125/hr × 1840 hrs = $230,000/yr / 12 = $19,166.67/mo
      expect(result).toBeCloseTo(19166.67, 2);
    });

    it('should calculate monthly run rate for PD', () => {
      const designer = { level: 'PD' };
      const result = calculateMonthlyRunRate(designer, mockSettings);
      // $150/hr × 1840 hrs = $276,000/yr / 12 = $23,000/mo
      expect(result).toBeCloseTo(23000, 2);
    });

    it('should calculate monthly run rate for SPD', () => {
      const designer = { level: 'SPD' };
      const result = calculateMonthlyRunRate(designer, mockSettings);
      // $180/hr × 1840 hrs = $331,200/yr / 12 = $27,600/mo
      expect(result).toBeCloseTo(27600, 2);
    });
  });
```

- [ ] **Step 10: Run tests to verify they fail**

```bash
npm test -- calculations.test.js
```

Expected: FAIL for calculateMonthlyRunRate

- [ ] **Step 11: Implement monthly run rate**

Add to `src/utils/calculations.js`:

```javascript
/**
 * Calculate monthly run rate for a designer
 * Formula: (blendedRate × availableHours) / 12
 */
export function calculateMonthlyRunRate(designer, capacitySettings) {
  const availableHours = calculateAvailableHours(capacitySettings);
  const blendedRate = capacitySettings.ratesByLevel[designer.level].blended;
  const annualCost = blendedRate * availableHours;
  return annualCost / 12;
}
```

- [ ] **Step 12: Run tests to verify they pass**

```bash
npm test -- calculations.test.js
```

Expected: PASS for all run rate tests

- [ ] **Step 13: Write failing tests for utilization color and status**

Add to `src/utils/calculations.test.js`:

```javascript
  describe('getUtilizationColor', () => {
    it('should return gray for under-allocation', () => {
      expect(getUtilizationColor(0)).toBe('#9ca3af');
      expect(getUtilizationColor(50)).toBe('#9ca3af');
      expect(getUtilizationColor(69)).toBe('#9ca3af');
    });

    it('should return green for good utilization', () => {
      expect(getUtilizationColor(70)).toBe('#2e7d32');
      expect(getUtilizationColor(85)).toBe('#2e7d32');
      expect(getUtilizationColor(100)).toBe('#2e7d32');
    });

    it('should return red for over-allocation', () => {
      expect(getUtilizationColor(101)).toBe('#d32f2f');
      expect(getUtilizationColor(120)).toBe('#d32f2f');
    });
  });

  describe('getUtilizationStatus', () => {
    it('should return "under" for under-allocation', () => {
      expect(getUtilizationStatus(0)).toBe('under');
      expect(getUtilizationStatus(69)).toBe('under');
    });

    it('should return "good" for good utilization', () => {
      expect(getUtilizationStatus(70)).toBe('good');
      expect(getUtilizationStatus(100)).toBe('good');
    });

    it('should return "over" for over-allocation', () => {
      expect(getUtilizationStatus(101)).toBe('over');
      expect(getUtilizationStatus(150)).toBe('over');
    });
  });
```

- [ ] **Step 14: Run tests to verify they fail**

```bash
npm test -- calculations.test.js
```

Expected: FAIL for color and status functions

- [ ] **Step 15: Implement utilization color and status**

Add to `src/utils/calculations.js`:

```javascript
/**
 * Get color code for utilization percentage
 * < 70%: Gray, 70-100%: Green, > 100%: Red
 */
export function getUtilizationColor(utilization) {
  if (utilization < 70) return '#9ca3af';
  if (utilization <= 100) return '#2e7d32';
  return '#d32f2f';
}

/**
 * Get status label for utilization
 */
export function getUtilizationStatus(utilization) {
  if (utilization < 70) return 'under';
  if (utilization <= 100) return 'good';
  return 'over';
}
```

- [ ] **Step 16: Run all tests to verify they pass**

```bash
npm test -- calculations.test.js
```

Expected: PASS for all calculation tests

- [ ] **Step 17: Commit calculation utilities**

```bash
git add src/utils/
git commit -m "feat: add calculation utilities with full test coverage

- Implement available hours calculation
- Implement allocated hours and utilization
- Implement monthly run rate by level
- Add color coding and status helpers
- Full test coverage for all calculations

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 4: localStorage Utilities with Tests

**Files:**
- Create: `src/utils/storage.js`
- Create: `src/utils/storage.test.js`

**Interfaces:**
- Consumes: Data shape from placeholderData
- Produces:
  - `saveData(data)` → void (saves to localStorage)
  - `loadData()` → object | null (loads from localStorage)
  - `exportToJSON(data, filename)` → void (triggers download)
  - `importFromJSON(file)` → Promise<object> (reads file)
  - `clearData()` → void (removes from localStorage)

- [ ] **Step 1: Write failing test for save and load**

Create `src/utils/storage.test.js`:

```javascript
import { saveData, loadData, clearData } from './storage';

const STORAGE_KEY = 'pd-resource-mgmt-data';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('saveData and loadData', () => {
    it('should save and load data correctly', () => {
      const mockData = {
        designers: [{ id: '1', name: 'Test' }],
        portfolios: [{ id: 'p1', name: 'Test Portfolio' }],
        version: 1
      };

      saveData(mockData);
      const loaded = loadData();

      expect(loaded).toEqual(mockData);
    });

    it('should return null when no data exists', () => {
      const loaded = loadData();
      expect(loaded).toBeNull();
    });

    it('should handle invalid JSON gracefully', () => {
      localStorage.setItem(STORAGE_KEY, 'invalid json');
      const loaded = loadData();
      expect(loaded).toBeNull();
    });
  });

  describe('clearData', () => {
    it('should clear stored data', () => {
      const mockData = { test: 'data' };
      saveData(mockData);

      clearData();

      const loaded = loadData();
      expect(loaded).toBeNull();
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- storage.test.js
```

Expected: FAIL with "saveData is not defined"

- [ ] **Step 3: Implement save, load, and clear**

Create `src/utils/storage.js`:

```javascript
const STORAGE_KEY = 'pd-resource-mgmt-data';
const VERSION = 1;

/**
 * Save data to localStorage
 */
export function saveData(data) {
  try {
    const dataWithVersion = {
      ...data,
      version: VERSION,
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithVersion));
  } catch (error) {
    console.error('Failed to save data:', error);
  }
}

/**
 * Load data from localStorage
 */
export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error('Failed to load data:', error);
    return null;
  }
}

/**
 * Clear all data from localStorage
 */
export function clearData() {
  localStorage.removeItem(STORAGE_KEY);
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- storage.test.js
```

Expected: PASS for save/load/clear tests

- [ ] **Step 5: Write failing test for JSON export**

Add to `src/utils/storage.test.js`:

```javascript
  describe('exportToJSON', () => {
    it('should trigger download with correct filename', () => {
      // Mock document.createElement and click
      const mockLink = {
        href: '',
        download: '',
        click: jest.fn()
      };

      jest.spyOn(document, 'createElement').mockReturnValue(mockLink);
      jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
      jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

      const mockData = { test: 'data' };
      const { exportToJSON } = require('./storage');

      exportToJSON(mockData, 'test-export');

      expect(mockLink.download).toBe('test-export.json');
      expect(mockLink.click).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });
  });
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm test -- storage.test.js
```

Expected: FAIL for exportToJSON

- [ ] **Step 7: Implement JSON export**

Add to `src/utils/storage.js`:

```javascript
/**
 * Export data as JSON file download
 */
export function exportToJSON(data, filename) {
  try {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export data:', error);
  }
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npm test -- storage.test.js
```

Expected: PASS for exportToJSON

- [ ] **Step 9: Write failing test for JSON import**

Add to `src/utils/storage.test.js`:

```javascript
  describe('importFromJSON', () => {
    it('should read and parse JSON file', async () => {
      const mockData = { test: 'data' };
      const file = new File(
        [JSON.stringify(mockData)],
        'test.json',
        { type: 'application/json' }
      );

      const { importFromJSON } = require('./storage');
      const result = await importFromJSON(file);

      expect(result).toEqual(mockData);
    });

    it('should reject invalid JSON', async () => {
      const file = new File(['invalid json'], 'test.json', { type: 'application/json' });

      const { importFromJSON } = require('./storage');

      await expect(importFromJSON(file)).rejects.toThrow();
    });
  });
```

- [ ] **Step 10: Run test to verify it fails**

```bash
npm test -- storage.test.js
```

Expected: FAIL for importFromJSON

- [ ] **Step 11: Implement JSON import**

Add to `src/utils/storage.js`:

```javascript
/**
 * Import data from JSON file
 */
export function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}
```

- [ ] **Step 12: Run all tests to verify they pass**

```bash
npm test -- storage.test.js
```

Expected: PASS for all storage tests

- [ ] **Step 13: Commit storage utilities**

```bash
git add src/utils/
git commit -m "feat: add localStorage utilities with full test coverage

- Implement save/load to localStorage
- Add JSON export (file download)
- Add JSON import (file upload)
- Include versioning and timestamps
- Full test coverage for all storage operations

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 5: Resource Context Provider

**Files:**
- Create: `src/context/ResourceContext.jsx`

**Interfaces:**
- Consumes: placeholderData, storage utilities, calculation utilities
- Produces:
  - Context Provider component: `<ResourceProvider>`
  - Hook: `useResource()` → returns state and actions
  - State shape: `{ designers, productTeams, portfolios, capacitySettings, outcomes, currentView, filterLevel, filterStatus, filterPortfolio, sortBy }`
  - Actions: `{ addDesigner, updateDesigner, deleteDesigner, addProductTeam, updateProductTeam, deleteProductTeam, addPortfolio, updatePortfolio, deletePortfolio, updateCapacitySettings, updateOutcomes, setCurrentView, setFilters, setSortBy, exportData, importData, resetToPlaceholder }`

- [ ] **Step 1: Create context file structure**

Create `src/context/ResourceContext.jsx`:

```javascript
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getInitialData } from '../data/placeholderData';
import { saveData, loadData } from '../utils/storage';

const ResourceContext = createContext();

export function useResource() {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResource must be used within ResourceProvider');
  }
  return context;
}

export function ResourceProvider({ children }) {
  // Initialize state from localStorage or placeholder data
  const [state, setState] = useState(() => {
    const stored = loadData();
    if (stored) {
      return {
        designers: stored.designers || [],
        productTeams: stored.productTeams || [],
        portfolios: stored.portfolios || [],
        capacitySettings: stored.capacitySettings || {},
        outcomes: stored.outcomes || { totalValue: 0 },
        currentView: 'individual',
        filterLevel: null,
        filterStatus: null,
        filterPortfolio: null,
        sortBy: 'name'
      };
    }

    const initial = getInitialData();
    return {
      ...initial,
      currentView: 'individual',
      filterLevel: null,
      filterStatus: null,
      filterPortfolio: null,
      sortBy: 'name'
    };
  });

  // Auto-save to localStorage whenever state changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveData({
        designers: state.designers,
        productTeams: state.productTeams,
        portfolios: state.portfolios,
        capacitySettings: state.capacitySettings,
        outcomes: state.outcomes
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [state.designers, state.productTeams, state.portfolios, state.capacitySettings, state.outcomes]);

  // Designer actions
  const addDesigner = useCallback((designer) => {
    const newDesigner = {
      id: uuidv4(),
      ...designer,
      allocations: designer.allocations || []
    };
    setState(prev => ({
      ...prev,
      designers: [...prev.designers, newDesigner]
    }));
  }, []);

  const updateDesigner = useCallback((id, updates) => {
    setState(prev => ({
      ...prev,
      designers: prev.designers.map(d =>
        d.id === id ? { ...d, ...updates } : d
      )
    }));
  }, []);

  const deleteDesigner = useCallback((id) => {
    setState(prev => ({
      ...prev,
      designers: prev.designers.filter(d => d.id !== id)
    }));
  }, []);

  // Product Team actions
  const addProductTeam = useCallback((team) => {
    const newTeam = {
      id: uuidv4(),
      ...team
    };
    setState(prev => ({
      ...prev,
      productTeams: [...prev.productTeams, newTeam]
    }));
  }, []);

  const updateProductTeam = useCallback((id, updates) => {
    setState(prev => ({
      ...prev,
      productTeams: prev.productTeams.map(t =>
        t.id === id ? { ...t, ...updates } : t
      )
    }));
  }, []);

  const deleteProductTeam = useCallback((id) => {
    setState(prev => ({
      ...prev,
      productTeams: prev.productTeams.filter(t => t.id !== id),
      // Remove allocations to this team from all designers
      designers: prev.designers.map(d => ({
        ...d,
        allocations: d.allocations.filter(a => a.productTeamId !== id)
      }))
    }));
  }, []);

  // Portfolio actions
  const addPortfolio = useCallback((portfolio) => {
    const newPortfolio = {
      id: uuidv4(),
      ...portfolio
    };
    setState(prev => ({
      ...prev,
      portfolios: [...prev.portfolios, newPortfolio]
    }));
  }, []);

  const updatePortfolio = useCallback((id, updates) => {
    setState(prev => ({
      ...prev,
      portfolios: prev.portfolios.map(p =>
        p.id === id ? { ...p, ...updates } : p
      )
    }));
  }, []);

  const deletePortfolio = useCallback((id) => {
    setState(prev => {
      // Check if any teams belong to this portfolio
      const hasTeams = prev.productTeams.some(t => t.portfolioId === id);
      if (hasTeams) {
        throw new Error('Cannot delete portfolio with teams');
      }

      return {
        ...prev,
        portfolios: prev.portfolios.filter(p => p.id !== id)
      };
    });
  }, []);

  // Settings actions
  const updateCapacitySettings = useCallback((settings) => {
    setState(prev => ({
      ...prev,
      capacitySettings: { ...prev.capacitySettings, ...settings }
    }));
  }, []);

  const updateOutcomes = useCallback((outcomes) => {
    setState(prev => ({
      ...prev,
      outcomes: { ...prev.outcomes, ...outcomes }
    }));
  }, []);

  // View actions
  const setCurrentView = useCallback((view) => {
    setState(prev => ({ ...prev, currentView: view }));
  }, []);

  const setFilters = useCallback(({ level, status, portfolio }) => {
    setState(prev => ({
      ...prev,
      filterLevel: level !== undefined ? level : prev.filterLevel,
      filterStatus: status !== undefined ? status : prev.filterStatus,
      filterPortfolio: portfolio !== undefined ? portfolio : prev.filterPortfolio
    }));
  }, []);

  const setSortBy = useCallback((sortBy) => {
    setState(prev => ({ ...prev, sortBy }));
  }, []);

  // Data management actions
  const exportData = useCallback(() => {
    const { exportToJSON } = require('../utils/storage');
    const today = new Date().toISOString().split('T')[0];
    exportToJSON(
      {
        designers: state.designers,
        productTeams: state.productTeams,
        portfolios: state.portfolios,
        capacitySettings: state.capacitySettings,
        outcomes: state.outcomes
      },
      `pd-resource-mgmt-backup-${today}`
    );
  }, [state]);

  const importData = useCallback(async (file) => {
    const { importFromJSON } = require('../utils/storage');
    const data = await importFromJSON(file);

    setState(prev => ({
      ...prev,
      designers: data.designers || [],
      productTeams: data.productTeams || [],
      portfolios: data.portfolios || [],
      capacitySettings: data.capacitySettings || prev.capacitySettings,
      outcomes: data.outcomes || { totalValue: 0 }
    }));
  }, []);

  const resetToPlaceholder = useCallback(() => {
    const initial = getInitialData();
    setState(prev => ({
      ...prev,
      ...initial
    }));
  }, []);

  const value = {
    // State
    designers: state.designers,
    productTeams: state.productTeams,
    portfolios: state.portfolios,
    capacitySettings: state.capacitySettings,
    outcomes: state.outcomes,
    currentView: state.currentView,
    filterLevel: state.filterLevel,
    filterStatus: state.filterStatus,
    filterPortfolio: state.filterPortfolio,
    sortBy: state.sortBy,

    // Actions
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
    updateOutcomes,
    setCurrentView,
    setFilters,
    setSortBy,
    exportData,
    importData,
    resetToPlaceholder
  };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
}
```

- [ ] **Step 2: Test context by creating simple test**

Create `src/context/ResourceContext.test.js`:

```javascript
import React from 'react';
import { render, act } from '@testing-library/react';
import { ResourceProvider, useResource } from './ResourceContext';

function TestComponent() {
  const { designers, addDesigner } = useResource();

  return (
    <div>
      <div data-testid="count">{designers.length}</div>
      <button onClick={() => addDesigner({ name: 'Test', level: 'PD', employmentStatus: 'FTE' })}>
        Add
      </button>
    </div>
  );
}

describe('ResourceContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should provide initial data', () => {
    const { getByTestId } = render(
      <ResourceProvider>
        <TestComponent />
      </ResourceProvider>
    );

    // Should have 11 placeholder designers
    expect(getByTestId('count').textContent).toBe('11');
  });

  it('should add designer', () => {
    const { getByTestId, getByText } = render(
      <ResourceProvider>
        <TestComponent />
      </ResourceProvider>
    );

    act(() => {
      getByText('Add').click();
    });

    expect(getByTestId('count').textContent).toBe('12');
  });
});
```

- [ ] **Step 3: Run context tests**

```bash
npm test -- ResourceContext.test.js
```

Expected: PASS for context initialization and add designer

- [ ] **Step 4: Commit Resource Context**

```bash
git add src/context/
git commit -m "feat: add Resource Context Provider with full state management

- Create ResourceContext with useState and useContext
- Implement CRUD actions for designers, teams, portfolios
- Add auto-save to localStorage (500ms debounce)
- Include export/import and reset functionality
- Add basic tests for context initialization

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 6: App Shell and Navigation

**Files:**
- Create: `src/App.jsx`
- Create: `src/App.css`
- Create: `src/components/GlobalNavBar.jsx`

**Interfaces:**
- Consumes: ResourceProvider, useResource hook
- Produces:
  - `<App />` component with ResourceProvider wrapper
  - `<GlobalNavBar />` with tab navigation and settings icon
  - CSS matching capacity-planning-app style

- [ ] **Step 1: Create App.css with base styles**

Create `src/App.css`:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-shell {
  min-height: 100vh;
  background-color: #f4f4f4;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.kds-card-section {
  margin-bottom: 1rem;
  padding: 1.5rem;
}

/* Grid layouts */
.designer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 900px) {
  .designer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .designer-grid {
    grid-template-columns: 1fr;
  }
}

/* Top controls bar */
.controls-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.controls-bar-left {
  flex: 1;
  display: flex;
  gap: 0.5rem;
}

.controls-bar-right {
  display: flex;
  gap: 0.5rem;
}
```

- [ ] **Step 2: Create GlobalNavBar component**

Create `src/components/GlobalNavBar.jsx`:

```javascript
import React from 'react';
import { KdsButton, KdsIconSettings, KdsIconDownload } from 'react-mx-web-components';
import { useResource } from '../context/ResourceContext';

function GlobalNavBar({ onSettingsClick }) {
  const { currentView, setCurrentView, exportData } = useResource();

  return (
    <div style={{
      background: '#0F52A2',
      color: 'white',
      padding: '1rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <h1 style={{
          margin: 0,
          fontSize: '1.25rem',
          fontWeight: 600,
          fontFamily: 'Nunito, sans-serif'
        }}>
          Design Resource Management
        </h1>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setCurrentView('individual')}
            style={{
              background: currentView === 'individual' ? 'rgba(255,255,255,0.2)' : 'transparent',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: currentView === 'individual' ? 600 : 400,
              transition: 'background 0.2s'
            }}
          >
            Individual Designers
          </button>

          <button
            onClick={() => setCurrentView('summary')}
            style={{
              background: currentView === 'summary' ? 'rgba(255,255,255,0.2)' : 'transparent',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: currentView === 'summary' ? 600 : 400,
              transition: 'background 0.2s'
            }}
          >
            Team Summary
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button
          onClick={exportData}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.5)',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
          title="Export Data"
        >
          <KdsIconDownload size="s" />
        </button>

        <button
          onClick={onSettingsClick}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.5)',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Settings"
        >
          <KdsIconSettings size="s" />
        </button>
      </div>
    </div>
  );
}

export default GlobalNavBar;
```

- [ ] **Step 3: Create basic App component**

Replace `src/App.jsx`:

```javascript
import React, { useState } from 'react';
import { ResourceProvider } from './context/ResourceContext';
import GlobalNavBar from './components/GlobalNavBar';
import './App.css';

function AppContent() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="app-shell">
      <GlobalNavBar onSettingsClick={() => setSettingsOpen(true)} />

      <div className="app-container">
        <div className="kds-Card kds-Card--m kds-card-section">
          <h2>Placeholder - Views coming next</h2>
          <p>Navigation is working. Individual Designers and Team Summary pages will be implemented in subsequent tasks.</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ResourceProvider>
      <AppContent />
    </ResourceProvider>
  );
}

export default App;
```

- [ ] **Step 4: Test the app shell**

```bash
npm start
```

Expected: App loads with blue navigation bar, two tabs (Individual Designers, Team Summary), settings and export icons visible

- [ ] **Step 5: Commit app shell and navigation**

```bash
git add src/App.jsx src/App.css src/components/GlobalNavBar.jsx
git commit -m "feat: add app shell with navigation

- Create GlobalNavBar with tab navigation
- Add settings and export icons
- Implement view switching (Individual/Summary)
- Add base CSS matching capacity-planning-app
- Integrate ResourceProvider

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 7: Designer Card Component

**Files:**
- Create: `src/components/DesignerCard.jsx`

**Interfaces:**
- Consumes:
  - Designer object from ResourceContext
  - ProductTeam[] from ResourceContext
  - CapacitySettings from ResourceContext
  - Calculation functions from utils/calculations
- Produces:
  - `<DesignerCard designer={designer} onClick={handler} />` component
  - Displays name, level, employment status, utilization %, allocations, run rate

- [ ] **Step 1: Create DesignerCard component**

Create `src/components/DesignerCard.jsx`:

```javascript
import React from 'react';
import { KdsTag } from 'react-mx-web-components';
import { useResource } from '../context/ResourceContext';
import {
  calculateUtilization,
  calculateMonthlyRunRate,
  getUtilizationColor
} from '../utils/calculations';

function DesignerCard({ designer, onClick }) {
  const { capacitySettings, productTeams } = useResource();

  const utilization = calculateUtilization(designer, capacitySettings);
  const monthlyRunRate = calculateMonthlyRunRate(designer, capacitySettings);
  const utilizationColor = getUtilizationColor(utilization);

  const getRoleLabel = (level) => {
    const labels = {
      APD: 'Associate Product Designer',
      PD: 'Product Designer',
      SPD: 'Senior Product Designer'
    };
    return labels[level] || level;
  };

  const getStatusKind = () => {
    if (utilization < 70) return 'default';
    if (utilization <= 100) return 'positive';
    return 'negative';
  };

  return (
    <div
      className="kds-Card kds-Card--m kds-card-section designer-card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: '#000',
          marginBottom: '4px'
        }}>
          {designer.name}
        </div>

        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          {getRoleLabel(designer.level)} ({designer.level})
        </div>
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <KdsTag kind="default">{designer.employmentStatus}</KdsTag>
      </div>

      <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
        <div style={{
          fontSize: '3rem',
          fontWeight: 700,
          fontFamily: 'Nunito, sans-serif',
          lineHeight: 1,
          color: utilizationColor
        }}>
          {utilization.toFixed(0)}%
        </div>
        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
          Capacity
        </div>
      </div>

      {designer.allocations.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem'
          }}>
            Allocations
          </div>
          {designer.allocations.map(allocation => {
            const team = productTeams.find(t => t.id === allocation.productTeamId);
            return (
              <div key={allocation.productTeamId} style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.875rem',
                marginBottom: '0.25rem',
                color: '#374151'
              }}>
                <span>{team?.name || 'Unknown Team'}</span>
                <span style={{ fontWeight: 600 }}>{allocation.percentage}%</span>
              </div>
            );
          })}
        </div>
      )}

      <div style={{
        borderTop: '1px solid #e5e7eb',
        paddingTop: '0.75rem',
        marginTop: '0.75rem'
      }}>
        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
          Monthly Run Rate
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#000' }}>
          ${monthlyRunRate.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </div>
      </div>
    </div>
  );
}

export default DesignerCard;
```

- [ ] **Step 2: Add designer card styles to App.css**

Add to `src/App.css`:

```css
.designer-card {
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.designer-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
```

- [ ] **Step 3: Test DesignerCard by adding to App**

Temporarily update `src/App.jsx` to show a card:

```javascript
import React, { useState } from 'react';
import { ResourceProvider, useResource } from './context/ResourceContext';
import GlobalNavBar from './components/GlobalNavBar';
import DesignerCard from './components/DesignerCard';
import './App.css';

function AppContent() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { designers } = useResource();

  return (
    <div className="app-shell">
      <GlobalNavBar onSettingsClick={() => setSettingsOpen(true)} />

      <div className="app-container">
        <h2 style={{ marginBottom: '1rem' }}>Designer Card Test</h2>
        <div className="designer-grid">
          {designers.slice(0, 3).map(designer => (
            <DesignerCard
              key={designer.id}
              designer={designer}
              onClick={() => console.log('Clicked:', designer.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ResourceProvider>
      <AppContent />
    </ResourceProvider>
  );
}

export default App;
```

- [ ] **Step 4: Run app and verify cards display**

```bash
npm start
```

Expected: Three designer cards visible with name, level, utilization %, allocations, and run rate

- [ ] **Step 5: Commit DesignerCard component**

```bash
git add src/components/DesignerCard.jsx src/App.css src/App.jsx
git commit -m "feat: add DesignerCard component

- Display designer name, level, employment status
- Show utilization % with color coding
- List team allocations with percentages
- Display monthly run rate
- Add hover effect

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 8: DesignerGrid with Filters and Sort

**Files:**
- Create: `src/components/DesignerGrid.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: useResource() → designers, productTeams, portfolios, filterLevel, filterStatus, filterPortfolio, sortBy, setFilters, setSortBy
- Produces: `<DesignerGrid onDesignerClick={(designer) => void} />` component with filtering and sorting

- [ ] **Step 1: Create DesignerGrid component**

Create `src/components/DesignerGrid.jsx`:

```javascript
import React, { useMemo } from 'react';
import { KdsButton, MxSingleSelect, KdsIconPlus } from 'react-mx-web-components';
import { useResource } from '../context/ResourceContext';
import DesignerCard from './DesignerCard';
import { calculateUtilization, calculateMonthlyRunRate } from '../utils/calculations';

function DesignerGrid({ onDesignerClick, onAddClick }) {
  const {
    designers,
    productTeams,
    portfolios,
    capacitySettings,
    filterLevel,
    filterStatus,
    filterPortfolio,
    sortBy,
    setFilters,
    setSortBy
  } = useResource();

  // Filter designers
  const filteredDesigners = useMemo(() => {
    return designers.filter(designer => {
      if (filterLevel && designer.level !== filterLevel) return false;
      if (filterStatus && designer.employmentStatus !== filterStatus) return false;

      if (filterPortfolio) {
        // Check if designer is allocated to any team in this portfolio
        const portfolioTeamIds = productTeams
          .filter(t => t.portfolioId === filterPortfolio)
          .map(t => t.id);

        const hasAllocation = designer.allocations.some(a =>
          portfolioTeamIds.includes(a.productTeamId)
        );

        if (!hasAllocation) return false;
      }

      return true;
    });
  }, [designers, filterLevel, filterStatus, filterPortfolio, productTeams]);

  // Sort designers
  const sortedDesigners = useMemo(() => {
    const sorted = [...filteredDesigners];

    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'utilization':
        sorted.sort((a, b) => {
          const utilizationA = calculateUtilization(a, capacitySettings);
          const utilizationB = calculateUtilization(b, capacitySettings);
          return utilizationB - utilizationA; // Descending
        });
        break;
      case 'runRate':
        sorted.sort((a, b) => {
          const rateA = calculateMonthlyRunRate(a, capacitySettings);
          const rateB = calculateMonthlyRunRate(b, capacitySettings);
          return rateB - rateA; // Descending
        });
        break;
      default:
        break;
    }

    return sorted;
  }, [filteredDesigners, sortBy, capacitySettings]);

  return (
    <div>
      <div className="controls-bar">
        <div className="controls-bar-left">
          <KdsButton kind="primary" onClick={onAddClick}>
            <KdsIconPlus size="s" /> Add Designer
          </KdsButton>
        </div>

        <div className="controls-bar-right">
          <MxSingleSelect
            label="Filter by Level"
            items={['All', 'APD', 'PD', 'SPD']}
            value={filterLevel || 'All'}
            emitOnlyValue
            onValueUpdate={(e) => setFilters({ level: e.detail === 'All' ? null : e.detail })}
            style={{ width: '150px' }}
          />

          <MxSingleSelect
            label="Filter by Status"
            items={['All', 'FTE', 'SOW', 'SOW Koncert']}
            value={filterStatus || 'All'}
            emitOnlyValue
            onValueUpdate={(e) => setFilters({ status: e.detail === 'All' ? null : e.detail })}
            style={{ width: '180px' }}
          />

          <MxSingleSelect
            label="Filter by Portfolio"
            items={['All', ...portfolios.map(p => p.name)]}
            value={filterPortfolio ? portfolios.find(p => p.id === filterPortfolio)?.name : 'All'}
            emitOnlyValue
            onValueUpdate={(e) => {
              if (e.detail === 'All') {
                setFilters({ portfolio: null });
              } else {
                const portfolio = portfolios.find(p => p.name === e.detail);
                setFilters({ portfolio: portfolio?.id });
              }
            }}
            style={{ width: '180px' }}
          />

          <MxSingleSelect
            label="Sort by"
            items={['Name', 'Utilization', 'Run Rate']}
            value={sortBy === 'name' ? 'Name' : sortBy === 'utilization' ? 'Utilization' : 'Run Rate'}
            emitOnlyValue
            onValueUpdate={(e) => {
              const sortMap = { 'Name': 'name', 'Utilization': 'utilization', 'Run Rate': 'runRate' };
              setSortBy(sortMap[e.detail]);
            }}
            style={{ width: '150px' }}
          />
        </div>
      </div>

      {sortedDesigners.length === 0 ? (
        <div className="kds-Card kds-Card--m kds-card-section" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1rem' }}>
            No designers found
          </div>
          <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1.5rem' }}>
            {designers.length === 0
              ? 'Get started by importing from Capacity Planning or adding designers manually'
              : 'Try adjusting your filters'
            }
          </div>
          {designers.length === 0 && (
            <KdsButton kind="primary" onClick={onAddClick}>
              <KdsIconPlus size="s" /> Add Designer
            </KdsButton>
          )}
        </div>
      ) : (
        <div className="designer-grid">
          {sortedDesigners.map(designer => (
            <DesignerCard
              key={designer.id}
              designer={designer}
              onClick={() => onDesignerClick(designer)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DesignerGrid;
```

- [ ] **Step 2: Update App.jsx to use DesignerGrid**

Replace test code in `src/App.jsx`:

```javascript
import React, { useState } from 'react';
import { ResourceProvider, useResource } from './context/ResourceContext';
import GlobalNavBar from './components/GlobalNavBar';
import DesignerGrid from './components/DesignerGrid';
import './App.css';

function AppContent() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const { currentView } = useResource();

  return (
    <div className="app-shell">
      <GlobalNavBar onSettingsClick={() => setSettingsOpen(true)} />

      <div className="app-container">
        {currentView === 'individual' && (
          <DesignerGrid
            onDesignerClick={(designer) => setSelectedDesigner(designer)}
            onAddClick={() => console.log('Add designer')}
          />
        )}

        {currentView === 'summary' && (
          <div className="kds-Card kds-Card--m kds-card-section">
            <h2>Team Summary</h2>
            <p>Coming in next tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ResourceProvider>
      <AppContent />
    </ResourceProvider>
  );
}

export default App;
```

- [ ] **Step 3: Test filters and sorting**

```bash
npm start
```

Expected:
- All 11 designers visible by default
- Filter by Level (APD/PD/SPD) works
- Filter by Status (FTE/SOW) works
- Filter by Portfolio works
- Sort by Name (A-Z) works
- Sort by Utilization (high to low) works
- Sort by Run Rate (high to low) works

- [ ] **Step 4: Commit DesignerGrid with filters/sort**

```bash
git add src/components/DesignerGrid.jsx src/App.jsx
git commit -m "feat: add DesignerGrid with filtering and sorting

- Implement filter by level, status, and portfolio
- Add sort by name, utilization, and run rate
- Show empty state when no designers match
- Integrate Add Designer button

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 9: Designer Edit Modal

**Files:**
- Create: `src/components/DesignerEditModal.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: useResource() → productTeams, addDesigner, updateDesigner, deleteDesigner
- Produces: `<DesignerEditModal designer={designer|null} isOpen={bool} onClose={() => void} />` component

- [ ] **Step 1: Create DesignerEditModal component**

Create `src/components/DesignerEditModal.jsx`:

```javascript
import React, { useState, useEffect } from 'react';
import {
  MxModal,
  MxModalBody,
  MxInputTextBox,
  MxSingleSelect,
  KdsButton,
  KdsMessage,
  KdsIconTrash,
  KdsIconClose
} from 'react-mx-web-components';
import { useResource } from '../context/ResourceContext';

function DesignerEditModal({ designer, isOpen, onClose }) {
  const { productTeams, addDesigner, updateDesigner, deleteDesigner } = useResource();

  const [name, setName] = useState('');
  const [level, setLevel] = useState('PD');
  const [employmentStatus, setEmploymentStatus] = useState('FTE');
  const [allocations, setAllocations] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Initialize form when designer changes
  useEffect(() => {
    if (designer) {
      setName(designer.name);
      setLevel(designer.level);
      setEmploymentStatus(designer.employmentStatus);
      setAllocations(designer.allocations || []);
    } else {
      // Reset for new designer
      setName('');
      setLevel('PD');
      setEmploymentStatus('FTE');
      setAllocations([]);
    }
  }, [designer]);

  const totalAllocation = allocations.reduce((sum, a) => sum + a.percentage, 0);

  const handleSave = () => {
    if (!name.trim()) return;

    const designerData = {
      name: name.trim(),
      level,
      employmentStatus,
      allocations
    };

    if (designer) {
      updateDesigner(designer.id, designerData);
    } else {
      addDesigner(designerData);
    }

    onClose();
  };

  const handleDelete = () => {
    if (designer) {
      deleteDesigner(designer.id);
      onClose();
    }
  };

  const handleAddAllocation = () => {
    setAllocations([...allocations, { productTeamId: '', percentage: 0 }]);
  };

  const handleRemoveAllocation = (index) => {
    setAllocations(allocations.filter((_, i) => i !== index));
  };

  const handleAllocationChange = (index, field, value) => {
    const updated = [...allocations];
    updated[index] = { ...updated[index], [field]: value };
    setAllocations(updated);
  };

  return (
    <>
      <MxModal
        isOpened={isOpen}
        headercontent={designer ? `Edit Designer - ${designer.name}` : 'Add Designer'}
        footerPrimaryButtonText="Save"
        footerSecondaryButtonText="Cancel"
        closeOnSecondaryButton
        onApplyClick={handleSave}
        onSecondaryClick={onClose}
        onModalClose={onClose}
        size="l"
      >
        <MxModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <MxInputTextBox
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              mask="none"
              required
            />

            <MxSingleSelect
              label="Level"
              items={['APD', 'PD', 'SPD']}
              value={level}
              emitOnlyValue
              onValueUpdate={(e) => setLevel(e.detail)}
            />

            <MxSingleSelect
              label="Employment Status"
              items={['FTE', 'SOW', 'SOW Koncert']}
              value={employmentStatus}
              emitOnlyValue
              onValueUpdate={(e) => setEmploymentStatus(e.detail)}
            />

            <div style={{ marginTop: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Team Allocations</h3>
                <KdsButton kind="secondary" variant="minimal" onClick={handleAddAllocation}>
                  + Add Allocation
                </KdsButton>
              </div>

              {allocations.map((allocation, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-end',
                  marginBottom: '0.75rem',
                  padding: '0.75rem',
                  background: '#f9fafb',
                  borderRadius: '4px'
                }}>
                  <div style={{ flex: 2 }}>
                    <MxSingleSelect
                      label="Product Team"
                      items={productTeams.map(t => t.name)}
                      value={productTeams.find(t => t.id === allocation.productTeamId)?.name || ''}
                      emitOnlyValue
                      onValueUpdate={(e) => {
                        const team = productTeams.find(t => t.name === e.detail);
                        if (team) {
                          handleAllocationChange(index, 'productTeamId', team.id);
                        }
                      }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <MxInputTextBox
                      label="Percentage"
                      value={allocation.percentage.toString()}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        handleAllocationChange(index, 'percentage', Math.max(0, Math.min(100, val)));
                      }}
                      mask="none"
                      type="number"
                    />
                  </div>

                  <KdsButton
                    kind="negative"
                    variant="minimal"
                    onClick={() => handleRemoveAllocation(index)}
                    style={{ marginBottom: '0.5rem' }}
                  >
                    <KdsIconClose size="s" />
                  </KdsButton>
                </div>
              ))}

              {allocations.length === 0 && (
                <div style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  background: '#f9fafb',
                  borderRadius: '4px'
                }}>
                  No allocations yet. Click "Add Allocation" to assign this designer to teams.
                </div>
              )}

              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: totalAllocation === 100 ? '#f0fdf4' : '#fef3c7',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Total Allocation:</span>
                <span style={{
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  color: totalAllocation === 100 ? '#16a34a' : totalAllocation > 100 ? '#dc2626' : '#9ca3af'
                }}>
                  {totalAllocation}%
                </span>
              </div>

              {totalAllocation !== 100 && allocations.length > 0 && (
                <KdsMessage kind="warning" style={{ marginTop: '0.5rem' }}>
                  Allocations should total 100% for full capacity utilization
                </KdsMessage>
              )}
            </div>

            {designer && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                <KdsButton kind="destructive" variant="minimal" onClick={() => setShowDeleteConfirm(true)}>
                  <KdsIconTrash size="s" /> Delete Designer
                </KdsButton>
              </div>
            )}
          </div>
        </MxModalBody>
      </MxModal>

      <MxModal
        isOpened={showDeleteConfirm}
        headercontent="Delete Designer"
        footerPrimaryButtonText="Delete"
        footerPrimaryButtonKind="destructive"
        footerSecondaryButtonText="Cancel"
        closeOnSecondaryButton
        onApplyClick={handleDelete}
        onSecondaryClick={() => setShowDeleteConfirm(false)}
        onModalClose={() => setShowDeleteConfirm(false)}
      >
        <MxModalBody>
          <p>Are you sure you want to delete "{designer?.name}"? This action cannot be undone.</p>
        </MxModalBody>
      </MxModal>
    </>
  );
}

export default DesignerEditModal;
```

- [ ] **Step 2: Integrate modal into App**

Update `src/App.jsx`:

```javascript
import React, { useState } from 'react';
import { ResourceProvider, useResource } from './context/ResourceContext';
import GlobalNavBar from './components/GlobalNavBar';
import DesignerGrid from './components/DesignerGrid';
import DesignerEditModal from './components/DesignerEditModal';
import './App.css';

function AppContent() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { currentView } = useResource();

  const handleDesignerClick = (designer) => {
    setSelectedDesigner(designer);
    setEditModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedDesigner(null);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedDesigner(null);
  };

  return (
    <div className="app-shell">
      <GlobalNavBar onSettingsClick={() => setSettingsOpen(true)} />

      <div className="app-container">
        {currentView === 'individual' && (
          <DesignerGrid
            onDesignerClick={handleDesignerClick}
            onAddClick={handleAddClick}
          />
        )}

        {currentView === 'summary' && (
          <div className="kds-Card kds-Card--m kds-card-section">
            <h2>Team Summary</h2>
            <p>Coming in next tasks</p>
          </div>
        )}
      </div>

      <DesignerEditModal
        designer={selectedDesigner}
        isOpen={editModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

function App() {
  return (
    <ResourceProvider>
      <AppContent />
    </ResourceProvider>
  );
}

export default App;
```

- [ ] **Step 3: Test add/edit/delete flows**

```bash
npm start
```

Expected:
- Click "Add Designer" opens modal with empty form
- Fill form and save creates new designer
- Click designer card opens edit modal with data
- Edit and save updates designer
- Delete button shows confirmation, deletes designer
- Allocation total shows color-coded warning

- [ ] **Step 4: Commit designer edit modal**

```bash
git add src/components/DesignerEditModal.jsx src/App.jsx
git commit -m "feat: add designer edit modal with CRUD operations

- Create modal for add/edit designer
- Implement allocation editor with add/remove
- Show total allocation with color coding
- Add delete confirmation dialog
- Integrate with DesignerGrid

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

This plan continues with the remaining tasks. Given the length, should I create a separate file for the remaining tasks (Tasks 10-17) or would you like me to continue appending to this file?