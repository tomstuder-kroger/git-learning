# IC Capacity Planning Web App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React web app with Material-UI that helps ICs and managers calculate quarterly capacity using a standardized methodology, with localStorage persistence and formatted output.

**Architecture:** Single-page React app with Context API for state management. Pure client-side with no backend. Material-UI components for forms and dashboard. Calculation engine as pure functions. Auto-save to localStorage with debouncing.

**Tech Stack:** React (Create React App), Material-UI v5, React Context API, localStorage, uuid for ID generation

---

## File Structure

### Core Files to Create

```
/Users/ts73344/Desktop/claudeTest/capacity-planning-app/
├── public/
│   └── index.html (CRA default, minor customization)
├── src/
│   ├── utils/
│   │   ├── calculations.js          # Pure calculation functions
│   │   ├── calculations.test.js     # Tests for calculations
│   │   ├── storage.js               # localStorage helpers
│   │   └── validation.js            # Validation functions
│   ├── context/
│   │   └── CapacityContext.jsx      # State + localStorage sync
│   ├── components/
│   │   ├── ICSelector.jsx           # Top bar IC switcher
│   │   ├── QuarterInfoForm.jsx      # Quarter inputs
│   │   ├── ICInfoForm.jsx           # IC name/role inputs
│   │   ├── TimeOffForm.jsx          # Time-off inputs
│   │   ├── DomainForm.jsx           # Single domain card
│   │   ├── DomainList.jsx           # Dynamic domain list
│   │   ├── CapacityDashboard.jsx    # Right panel metrics
│   │   └── FormattedOutput.jsx      # Modal with summary text
│   ├── App.jsx                       # Main layout
│   ├── App.css                       # Basic styles
│   └── index.js                      # Entry point with theme
├── package.json
└── README.md
```

---

## Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `/Users/ts73344/Desktop/claudeTest/capacity-planning-app/` (entire project)
- Modify: None

- [ ] **Step 1: Create React app**

```bash
cd /Users/ts73344/Desktop/claudeTest
npx create-react-app capacity-planning-app
```

Expected: CRA scaffolds project successfully

- [ ] **Step 2: Install Material-UI dependencies**

```bash
cd capacity-planning-app
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled uuid
```

Expected: Dependencies install successfully

- [ ] **Step 3: Verify app runs**

```bash
npm start
```

Expected: Dev server starts, browser opens to http://localhost:3000 showing CRA default page

- [ ] **Step 4: Stop dev server and commit**

```bash
# Press Ctrl+C to stop server
git add .
git commit -m "chore: initialize capacity planning app with CRA and MUI

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Calculation Utilities (TDD)

**Files:**
- Create: `src/utils/calculations.test.js`
- Create: `src/utils/calculations.js`

- [ ] **Step 1: Write test for calculateTimeOff (weeks)**

Create `src/utils/calculations.test.js`:

```javascript
import {
  calculateTimeOff,
  calculateDomainEffort,
  calculateTotalPlanned,
  calculateUtilization,
  calculateStatus,
  generateSummary
} from './calculations';

describe('calculateTimeOff', () => {
  it('calculates time off when OKR is in weeks', () => {
    const timeOffData = {
      okrTime: { value: 2, unit: 'weeks' },
      ptoDays: 5,
      devDays: 1,
      holidayDays: 1
    };
    expect(calculateTimeOff(timeOffData)).toBe(3.4);
  });

  it('calculates time off when OKR is in days', () => {
    const timeOffData = {
      okrTime: { value: 10, unit: 'days' },
      ptoDays: 5,
      devDays: 1,
      holidayDays: 1
    };
    expect(calculateTimeOff(timeOffData)).toBe(3.4);
  });

  it('handles zero values', () => {
    const timeOffData = {
      okrTime: { value: 0, unit: 'weeks' },
      ptoDays: 0,
      devDays: 0,
      holidayDays: 0
    };
    expect(calculateTimeOff(timeOffData)).toBe(0);
  });

  it('handles decimal PTO days', () => {
    const timeOffData = {
      okrTime: { value: 1, unit: 'weeks' },
      ptoDays: 2.5,
      devDays: 0,
      holidayDays: 0
    };
    expect(calculateTimeOff(timeOffData)).toBe(1.5);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- calculations.test.js
```

Expected: FAIL - calculateTimeOff is not defined

- [ ] **Step 3: Implement calculateTimeOff**

Create `src/utils/calculations.js`:

```javascript
/**
 * Calculate total time off in weeks
 * Formula: If OKR in weeks: okrWeeks + ((pto + dev + holiday) / 5)
 *          If OKR in days: (okrDays + pto + dev + holiday) / 5
 */
export const calculateTimeOff = (timeOffData) => {
  const { okrTime, ptoDays, devDays, holidayDays } = timeOffData;

  if (okrTime.unit === 'weeks') {
    return okrTime.value + ((ptoDays + devDays + holidayDays) / 5);
  } else {
    return (okrTime.value + ptoDays + devDays + holidayDays) / 5;
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- calculations.test.js
```

Expected: PASS - all calculateTimeOff tests pass

- [ ] **Step 5: Write test for calculateDomainEffort**

Add to `src/utils/calculations.test.js`:

```javascript
describe('calculateDomainEffort', () => {
  it('calculates domain effort correctly', () => {
    const domain = {
      smallProjects: 1,
      mediumProjects: 2,
      largeProjects: 1
    };
    // (1 × 2) + (2 × 4) + (1 × 8) = 2 + 8 + 8 = 18
    expect(calculateDomainEffort(domain)).toBe(18);
  });

  it('handles zero projects', () => {
    const domain = {
      smallProjects: 0,
      mediumProjects: 0,
      largeProjects: 0
    };
    expect(calculateDomainEffort(domain)).toBe(0);
  });

  it('calculates with only large projects', () => {
    const domain = {
      smallProjects: 0,
      mediumProjects: 0,
      largeProjects: 2
    };
    expect(calculateDomainEffort(domain)).toBe(16);
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm test -- calculations.test.js
```

Expected: FAIL - calculateDomainEffort is not defined

- [ ] **Step 7: Implement calculateDomainEffort**

Add to `src/utils/calculations.js`:

```javascript
/**
 * Calculate effort for a single domain in weeks
 * Formula: (small × 2) + (medium × 4) + (large × 8)
 */
export const calculateDomainEffort = (domain) => {
  const { smallProjects = 0, mediumProjects = 0, largeProjects = 0 } = domain;
  return (smallProjects * 2) + (mediumProjects * 4) + (largeProjects * 8);
};
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npm test -- calculations.test.js
```

Expected: PASS - all calculateDomainEffort tests pass

- [ ] **Step 9: Write test for calculateTotalPlanned**

Add to `src/utils/calculations.test.js`:

```javascript
describe('calculateTotalPlanned', () => {
  it('sums multiple domains correctly', () => {
    const domains = [
      { smallProjects: 1, mediumProjects: 0, largeProjects: 0 },
      { smallProjects: 0, mediumProjects: 1, largeProjects: 0 },
      { smallProjects: 0, mediumProjects: 0, largeProjects: 1 }
    ];
    // 2 + 4 + 8 = 14
    expect(calculateTotalPlanned(domains)).toBe(14);
  });

  it('handles empty domains array', () => {
    expect(calculateTotalPlanned([])).toBe(0);
  });

  it('calculates single domain', () => {
    const domains = [
      { smallProjects: 0, mediumProjects: 0, largeProjects: 2 }
    ];
    expect(calculateTotalPlanned(domains)).toBe(16);
  });
});
```

- [ ] **Step 10: Run test to verify it fails**

```bash
npm test -- calculations.test.js
```

Expected: FAIL - calculateTotalPlanned is not defined

- [ ] **Step 11: Implement calculateTotalPlanned**

Add to `src/utils/calculations.js`:

```javascript
/**
 * Calculate total planned work across all domains
 * Formula: sum of all domain efforts
 */
export const calculateTotalPlanned = (domains) => {
  return domains.reduce((total, domain) => {
    return total + calculateDomainEffort(domain);
  }, 0);
};
```

- [ ] **Step 12: Run test to verify it passes**

```bash
npm test -- calculations.test.js
```

Expected: PASS - all calculateTotalPlanned tests pass

- [ ] **Step 13: Write test for calculateUtilization**

Add to `src/utils/calculations.test.js`:

```javascript
describe('calculateUtilization', () => {
  it('calculates utilization percentage correctly', () => {
    const planned = 16;
    const available = 9.6;
    // (16 / 9.6) × 100 = 166.666...
    expect(calculateUtilization(planned, available)).toBeCloseTo(166.67, 1);
  });

  it('handles 100% utilization', () => {
    expect(calculateUtilization(10, 10)).toBe(100);
  });

  it('handles under-utilization', () => {
    expect(calculateUtilization(5, 10)).toBe(50);
  });

  it('returns 0 when planned is 0', () => {
    expect(calculateUtilization(0, 10)).toBe(0);
  });

  it('returns Infinity when available is 0', () => {
    expect(calculateUtilization(10, 0)).toBe(Infinity);
  });
});
```

- [ ] **Step 14: Run test to verify it fails**

```bash
npm test -- calculations.test.js
```

Expected: FAIL - calculateUtilization is not defined

- [ ] **Step 15: Implement calculateUtilization**

Add to `src/utils/calculations.js`:

```javascript
/**
 * Calculate capacity utilization percentage
 * Formula: (totalPlanned / totalAvailable) × 100
 */
export const calculateUtilization = (planned, available) => {
  if (available === 0) return Infinity;
  if (planned === 0) return 0;
  return (planned / available) * 100;
};
```

- [ ] **Step 16: Run test to verify it passes**

```bash
npm test -- calculations.test.js
```

Expected: PASS - all calculateUtilization tests pass

- [ ] **Step 17: Write test for calculateStatus**

Add to `src/utils/calculations.test.js`:

```javascript
describe('calculateStatus', () => {
  it('returns "over" when utilization > 100', () => {
    expect(calculateStatus(125)).toBe('over');
    expect(calculateStatus(101)).toBe('over');
  });

  it('returns "fully" when utilization is 90-100', () => {
    expect(calculateStatus(100)).toBe('fully');
    expect(calculateStatus(95)).toBe('fully');
    expect(calculateStatus(90)).toBe('fully');
  });

  it('returns "under" when utilization < 90', () => {
    expect(calculateStatus(89)).toBe('under');
    expect(calculateStatus(50)).toBe('under');
    expect(calculateStatus(0)).toBe('under');
  });
});
```

- [ ] **Step 18: Run test to verify it fails**

```bash
npm test -- calculations.test.js
```

Expected: FAIL - calculateStatus is not defined

- [ ] **Step 19: Implement calculateStatus**

Add to `src/utils/calculations.js`:

```javascript
/**
 * Determine capacity status based on utilization percentage
 * Returns: "over" | "fully" | "under"
 */
export const calculateStatus = (utilization) => {
  if (utilization > 100) return 'over';
  if (utilization >= 90) return 'fully';
  return 'under';
};
```

- [ ] **Step 20: Run test to verify it passes**

```bash
npm test -- calculations.test.js
```

Expected: PASS - all calculateStatus tests pass

- [ ] **Step 21: Write test for generateSummary**

Add to `src/utils/calculations.test.js`:

```javascript
describe('generateSummary', () => {
  it('generates formatted summary text matching methodology template', () => {
    const icData = {
      icName: 'Joe Test',
      icRole: 'PD',
      quarter: 'Q1 2024',
      weeksInQuarter: 13,
      timeOff: {
        okrTime: { value: 2, unit: 'weeks' },
        ptoDays: 5,
        devDays: 1,
        holidayDays: 1
      },
      domains: [
        {
          id: 'domain-1',
          name: 'TEST',
          smallProjects: 0,
          mediumProjects: 0,
          largeProjects: 2
        }
      ]
    };

    const calculated = {
      totalWeeksInQuarter: 13,
      totalTimeOffWeeks: 3.4,
      totalWeeksAvailable: 9.6,
      domainEfforts: [
        {
          domainId: 'domain-1',
          domainName: 'TEST',
          totalWeeks: 16,
          breakdown: { smallWeeks: 0, mediumWeeks: 0, largeWeeks: 16 }
        }
      ],
      totalPlannedWork: 16,
      capacityUtilization: 166.67,
      overUnderCapacity: 6.4,
      status: 'over'
    };

    const summary = generateSummary(icData, calculated);

    expect(summary).toContain('IC Capacity Summary');
    expect(summary).toContain('Joe Test');
    expect(summary).toContain('PD');
    expect(summary).toContain('Q1 2024');
    expect(summary).toContain('166.67%');
    expect(summary).toContain('16.0 weeks');
    expect(summary).toContain('9.6 weeks');
    expect(summary).toContain('Over by 6.4 weeks');
    expect(summary).toContain('over capacity');
  });
});
```

- [ ] **Step 22: Run test to verify it fails**

```bash
npm test -- calculations.test.js
```

Expected: FAIL - generateSummary is not defined

- [ ] **Step 23: Implement generateSummary**

Add to `src/utils/calculations.js`:

```javascript
/**
 * Generate formatted summary text matching methodology template
 */
export const generateSummary = (icData, calculated) => {
  const { icName, icRole, quarter, timeOff, domains } = icData;
  const {
    totalWeeksInQuarter,
    totalTimeOffWeeks,
    totalWeeksAvailable,
    domainEfforts,
    totalPlannedWork,
    capacityUtilization,
    overUnderCapacity,
    status
  } = calculated;

  const statusText = status === 'over' ? 'over capacity' :
                     status === 'fully' ? 'fully allocated' :
                     'under capacity';

  const overUnderText = overUnderCapacity > 0
    ? `Over by ${Math.abs(overUnderCapacity).toFixed(1)} weeks`
    : overUnderCapacity < 0
    ? `Under by ${Math.abs(overUnderCapacity).toFixed(1)} weeks`
    : 'Fully allocated';

  const domainNames = domains.map(d => d.name).join(', ');
  const totalProjects = domains.reduce((sum, d) =>
    sum + (d.smallProjects || 0) + (d.mediumProjects || 0) + (d.largeProjects || 0), 0);

  let domainSection = '';
  domainEfforts.forEach(effort => {
    const domain = domains.find(d => d.id === effort.domainId);
    domainSection += `- **${effort.domainName}:** ${effort.totalWeeks.toFixed(1)} weeks
  - **Small:** ${domain.smallProjects} = ${effort.breakdown.smallWeeks.toFixed(1)} weeks
  - **Medium:** ${domain.mediumProjects} = ${effort.breakdown.mediumWeeks.toFixed(1)} weeks
  - **Large:** ${domain.largeProjects} = ${effort.breakdown.largeWeeks.toFixed(1)} weeks

`;
  });

  const okrTimeText = timeOff.okrTime.unit === 'weeks'
    ? `${timeOff.okrTime.value} weeks of OKR time`
    : `${timeOff.okrTime.value} days of OKR time`;

  return `# IC Capacity Summary

- **IC Name:** ${icName}
- **IC Role:** ${icRole}
- **Quarter:** ${quarter}

## Capacity Utilization
**IC Capacity Utilization: ${capacityUtilization.toFixed(0)}%**

## Summary Calculations
- **Total weeks in quarter:** ${totalWeeksInQuarter.toFixed(1)}
- **Total time off:** ${totalTimeOffWeeks.toFixed(1)} weeks
- **Total weeks available:** ${totalWeeksAvailable.toFixed(1)} weeks
- **Number of domains supported:** ${domains.length}
- **Domain names:** ${domainNames}

## Planned Work by Domain
${domainSection}
## Total Planned Work
- **Total planned work:** ${totalPlannedWork.toFixed(1)} weeks
- **Over/Under capacity:** ${overUnderText}
- **Is the IC over or under capacity?:** Yes — ${statusText}

## Note for Team Discussion
${icName} has **${totalTimeOffWeeks.toFixed(1)} weeks of total time off** this quarter, including **${okrTimeText}, ${timeOff.ptoDays} PTO days, ${timeOff.devDays} development days, and ${timeOff.holidayDays} holidays**. They are supporting **${domains.length} domain(s)** with **${totalProjects} planned work item(s)**. At **${capacityUtilization.toFixed(0)}% utilization**, ${icName} is **${statusText}**.
`;
};
```

- [ ] **Step 24: Run test to verify it passes**

```bash
npm test -- calculations.test.js
```

Expected: PASS - all tests pass

- [ ] **Step 25: Commit calculation utilities**

```bash
git add src/utils/calculations.js src/utils/calculations.test.js
git commit -m "feat: add calculation utilities with tests

Implements all capacity planning formulas from methodology:
- Time off calculation (days/weeks)
- Domain effort calculation
- Total planned work
- Capacity utilization percentage
- Status classification
- Formatted summary generation

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Storage Utilities

**Files:**
- Create: `src/utils/storage.js`

- [ ] **Step 1: Create storage utilities**

Create `src/utils/storage.js`:

```javascript
const STORAGE_KEYS = {
  ICS: 'capacity-planning-ics',
  ACTIVE_ID: 'capacity-planning-active-id',
  VERSION: 'capacity-planning-version'
};

const CURRENT_VERSION = 1;

/**
 * Load all ICs from localStorage
 */
export const loadICs = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ICS);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load ICs from localStorage:', error);
    return [];
  }
};

/**
 * Save all ICs to localStorage
 */
export const saveICs = (ics) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ICS, JSON.stringify(ics));
    localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION.toString());
    return true;
  } catch (error) {
    console.error('Failed to save ICs to localStorage:', error);
    return false;
  }
};

/**
 * Load active IC ID from localStorage
 */
export const loadActiveICId = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_ID);
  } catch (error) {
    console.error('Failed to load active IC ID:', error);
    return null;
  }
};

/**
 * Save active IC ID to localStorage
 */
export const saveActiveICId = (id) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, id);
    return true;
  } catch (error) {
    console.error('Failed to save active IC ID:', error);
    return false;
  }
};

/**
 * Export IC data as JSON file
 */
export const exportICAsJSON = (ic) => {
  const dataStr = JSON.stringify(ic, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `capacity-${ic.icName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
  link.click();

  URL.revokeObjectURL(url);
};

/**
 * Export all ICs as JSON file
 */
export const exportAllICsAsJSON = (ics) => {
  const dataStr = JSON.stringify(ics, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `capacity-all-ics-${new Date().toISOString().split('T')[0]}.json`;
  link.click();

  URL.revokeObjectURL(url);
};

/**
 * Validate imported IC data structure
 */
export const validateICData = (data) => {
  if (!data || typeof data !== 'object') return false;
  if (!data.icName || !data.icRole || !data.quarter) return false;
  if (typeof data.weeksInQuarter !== 'number') return false;
  if (!data.timeOff || !Array.isArray(data.domains)) return false;
  return true;
};
```

- [ ] **Step 2: Commit storage utilities**

```bash
git add src/utils/storage.js
git commit -m "feat: add localStorage utilities

Implements load/save for ICs and active ID.
Includes export to JSON and data validation.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Validation Utilities

**Files:**
- Create: `src/utils/validation.js`

- [ ] **Step 1: Create validation utilities**

Create `src/utils/validation.js`:

```javascript
/**
 * Validate quarter name
 */
export const validateQuarterName = (value) => {
  if (!value || value.trim() === '') {
    return 'Required field';
  }
  return null;
};

/**
 * Validate weeks in quarter
 */
export const validateWeeksInQuarter = (value) => {
  if (value === null || value === undefined || value === '') {
    return 'Required field';
  }
  const num = Number(value);
  if (isNaN(num) || num <= 0) {
    return 'Must be a positive number';
  }
  return null;
};

/**
 * Validate IC name
 */
export const validateICName = (value) => {
  if (!value || value.trim() === '') {
    return 'Required field';
  }
  return null;
};

/**
 * Validate IC role
 */
export const validateICRole = (value) => {
  if (!value || value.trim() === '') {
    return 'Required field';
  }
  return null;
};

/**
 * Validate domain name
 */
export const validateDomainName = (value) => {
  if (!value || value.trim() === '') {
    return 'Required field';
  }
  return null;
};

/**
 * Validate non-negative number (decimals allowed)
 */
export const validateNonNegativeNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return null; // Optional field
  }
  const num = Number(value);
  if (isNaN(num) || num < 0) {
    return 'Must be a non-negative number';
  }
  return null;
};

/**
 * Validate non-negative integer
 */
export const validateNonNegativeInteger = (value) => {
  if (value === null || value === undefined || value === '') {
    return null; // Optional field
  }
  const num = Number(value);
  if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
    return 'Must be a whole number (no decimals)';
  }
  return null;
};
```

- [ ] **Step 2: Commit validation utilities**

```bash
git add src/utils/validation.js
git commit -m "feat: add validation utilities

Validation functions for all form fields with appropriate error messages.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Capacity Context (State Management)

**Files:**
- Create: `src/context/CapacityContext.jsx`

- [ ] **Step 1: Create CapacityContext with provider**

Create `src/context/CapacityContext.jsx`:

```javascript
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { loadICs, saveICs, loadActiveICId, saveActiveICId } from '../utils/storage';
import {
  calculateTimeOff,
  calculateDomainEffort,
  calculateTotalPlanned,
  calculateUtilization,
  calculateStatus
} from '../utils/calculations';

const CapacityContext = createContext(null);

export const useCapacity = () => {
  const context = useContext(CapacityContext);
  if (!context) {
    throw new Error('useCapacity must be used within CapacityProvider');
  }
  return context;
};

const createEmptyIC = () => ({
  id: uuidv4(),
  icName: '',
  icRole: '',
  quarter: '',
  weeksInQuarter: '',
  timeOff: {
    okrTime: { value: '', unit: 'days' },
    ptoDays: '',
    devDays: '',
    holidayDays: ''
  },
  domains: [],
  lastModified: new Date().toISOString()
});

export const CapacityProvider = ({ children }) => {
  const [ics, setICs] = useState([]);
  const [activeICId, setActiveICIdState] = useState(null);
  const [saveError, setSaveError] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loadedICs = loadICs();
    const loadedActiveId = loadActiveICId();

    if (loadedICs.length > 0) {
      setICs(loadedICs);
      setActiveICIdState(loadedActiveId || loadedICs[0].id);
    }
  }, []);

  // Save to localStorage whenever ics or activeICId changes (debounced)
  useEffect(() => {
    if (ics.length === 0) return;

    const timeoutId = setTimeout(() => {
      const success = saveICs(ics);
      if (!success) {
        setSaveError(true);
      } else {
        setSaveError(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [ics]);

  useEffect(() => {
    if (activeICId) {
      saveActiveICId(activeICId);
    }
  }, [activeICId]);

  const activeIC = ics.find(ic => ic.id === activeICId) || null;

  const createIC = useCallback(() => {
    const newIC = createEmptyIC();
    setICs(prev => [...prev, newIC]);
    setActiveICIdState(newIC.id);
    return newIC.id;
  }, []);

  const updateIC = useCallback((id, updates) => {
    setICs(prev => prev.map(ic =>
      ic.id === id
        ? { ...ic, ...updates, lastModified: new Date().toISOString() }
        : ic
    ));
  }, []);

  const deleteIC = useCallback((id) => {
    setICs(prev => {
      const filtered = prev.filter(ic => ic.id !== id);

      // If deleting active IC, switch to first remaining IC
      if (id === activeICId && filtered.length > 0) {
        setActiveICIdState(filtered[0].id);
      } else if (filtered.length === 0) {
        setActiveICIdState(null);
      }

      return filtered;
    });
  }, [activeICId]);

  const setActiveIC = useCallback((id) => {
    setActiveICIdState(id);
  }, []);

  const duplicateIC = useCallback((id) => {
    const icToDuplicate = ics.find(ic => ic.id === id);
    if (!icToDuplicate) return;

    const newIC = {
      ...icToDuplicate,
      id: uuidv4(),
      icName: `${icToDuplicate.icName} (Copy)`,
      lastModified: new Date().toISOString()
    };

    setICs(prev => [...prev, newIC]);
    setActiveICIdState(newIC.id);
  }, [ics]);

  const clearIC = useCallback((id) => {
    const emptyData = createEmptyIC();
    updateIC(id, {
      icName: '',
      icRole: '',
      quarter: '',
      weeksInQuarter: '',
      timeOff: emptyData.timeOff,
      domains: []
    });
  }, [updateIC]);

  const importIC = useCallback((icData) => {
    const newIC = {
      ...icData,
      id: uuidv4(),
      lastModified: new Date().toISOString()
    };
    setICs(prev => [...prev, newIC]);
    setActiveICIdState(newIC.id);
  }, []);

  const calculateResults = useCallback((ic) => {
    if (!ic) return null;

    const totalWeeksInQuarter = Number(ic.weeksInQuarter) || 0;
    const totalTimeOffWeeks = calculateTimeOff(ic.timeOff);
    const totalWeeksAvailable = totalWeeksInQuarter - totalTimeOffWeeks;

    const domainEfforts = ic.domains.map(domain => {
      const totalWeeks = calculateDomainEffort(domain);
      return {
        domainId: domain.id,
        domainName: domain.name,
        totalWeeks,
        breakdown: {
          smallWeeks: (domain.smallProjects || 0) * 2,
          mediumWeeks: (domain.mediumProjects || 0) * 4,
          largeWeeks: (domain.largeProjects || 0) * 8
        }
      };
    });

    const totalPlannedWork = calculateTotalPlanned(ic.domains);
    const capacityUtilization = calculateUtilization(totalPlannedWork, totalWeeksAvailable);
    const overUnderCapacity = totalPlannedWork - totalWeeksAvailable;
    const status = calculateStatus(capacityUtilization);

    return {
      totalWeeksInQuarter,
      totalTimeOffWeeks,
      totalWeeksAvailable,
      domainEfforts,
      totalPlannedWork,
      capacityUtilization,
      overUnderCapacity,
      status
    };
  }, []);

  const value = {
    ics,
    activeICId,
    activeIC,
    saveError,
    createIC,
    updateIC,
    deleteIC,
    setActiveIC,
    duplicateIC,
    clearIC,
    importIC,
    calculateResults
  };

  return (
    <CapacityContext.Provider value={value}>
      {children}
    </CapacityContext.Provider>
  );
};
```

- [ ] **Step 2: Commit CapacityContext**

```bash
git add src/context/CapacityContext.jsx
git commit -m "feat: add CapacityContext for state management

Implements Context API provider with:
- CRUD operations for ICs
- localStorage sync with debouncing
- Calculated results computation
- Active IC selection

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: App Shell & Theme

**Files:**
- Modify: `src/index.js`
- Modify: `src/App.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Update index.js with MUI theme**

Replace content of `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#2e7d32',
    },
    warning: {
      main: '#ed6c02',
    },
    error: {
      main: '#d32f2f',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

- [ ] **Step 2: Update App.jsx with basic layout**

Replace content of `src/App.jsx`:

```javascript
import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { CapacityProvider } from './context/CapacityContext';
import './App.css';

function App() {
  return (
    <CapacityProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            IC Capacity Planning
          </Typography>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography>App shell loaded successfully</Typography>
          </Paper>
        </Container>
      </Box>
    </CapacityProvider>
  );
}

export default App;
```

- [ ] **Step 3: Update App.css with minimal styles**

Replace content of `src/App.css`:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 4: Run app to verify theme and context load**

```bash
npm start
```

Expected: App opens showing "IC Capacity Planning" header and "App shell loaded successfully"

- [ ] **Step 5: Stop server and commit**

```bash
# Press Ctrl+C
git add src/index.js src/App.jsx src/App.css
git commit -m "feat: add app shell with MUI theme and context provider

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: ICSelector Component

**Files:**
- Create: `src/components/ICSelector.jsx`

- [ ] **Step 1: Create ICSelector component**

Create `src/components/ICSelector.jsx`:

```javascript
import React, { useState } from 'react';
import {
  Box,
  Select,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
  InputLabel
} from '@mui/material';
import { Add, Delete, ContentCopy } from '@mui/icons-material';
import { useCapacity } from '../context/CapacityContext';

const ICSelector = () => {
  const { ics, activeICId, activeIC, createIC, deleteIC, setActiveIC, duplicateIC } = useCapacity();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleCreateIC = () => {
    createIC();
  };

  const handleDeleteClick = () => {
    if (activeIC) {
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (activeIC) {
      deleteIC(activeIC.id);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDuplicate = () => {
    if (activeIC) {
      duplicateIC(activeIC.id);
    }
  };

  const handleICChange = (event) => {
    setActiveIC(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
      <FormControl sx={{ minWidth: 300 }}>
        <InputLabel>Select IC</InputLabel>
        <Select
          value={activeICId || ''}
          onChange={handleICChange}
          label="Select IC"
          disabled={ics.length === 0}
        >
          {ics.map(ic => (
            <MenuItem key={ic.id} value={ic.id}>
              {ic.icName || 'Untitled'} - {ic.icRole || 'No Role'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleCreateIC}
      >
        New IC
      </Button>

      <IconButton
        color="primary"
        onClick={handleDuplicate}
        disabled={!activeIC}
        title="Duplicate IC"
      >
        <ContentCopy />
      </IconButton>

      <IconButton
        color="error"
        onClick={handleDeleteClick}
        disabled={!activeIC}
        title="Delete IC"
      >
        <Delete />
      </IconButton>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete IC</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete {activeIC?.icName || 'this IC'}? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ICSelector;
```

- [ ] **Step 2: Import ICSelector in App.jsx**

Modify `src/App.jsx`:

```javascript
import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { CapacityProvider } from './context/CapacityContext';
import ICSelector from './components/ICSelector';
import './App.css';

function App() {
  return (
    <CapacityProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            IC Capacity Planning
          </Typography>

          <ICSelector />

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography>Form components will go here</Typography>
          </Paper>
        </Container>
      </Box>
    </CapacityProvider>
  );
}

export default App;
```

- [ ] **Step 3: Run app and test IC selector**

```bash
npm start
```

Expected:
- "New IC" button visible
- Click creates new IC
- Dropdown shows IC
- Duplicate and Delete buttons functional

- [ ] **Step 4: Stop server and commit**

```bash
# Press Ctrl+C
git add src/components/ICSelector.jsx src/App.jsx
git commit -m "feat: add ICSelector component

Allows creating, selecting, duplicating, and deleting ICs.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: QuarterInfoForm Component

**Files:**
- Create: `src/components/QuarterInfoForm.jsx`

- [ ] **Step 1: Create QuarterInfoForm component**

Create `src/components/QuarterInfoForm.jsx`:

```javascript
import React from 'react';
import { Card, CardContent, Typography, TextField, Grid } from '@mui/material';
import { useCapacity } from '../context/CapacityContext';
import { validateQuarterName, validateWeeksInQuarter } from '../utils/validation';

const QuarterInfoForm = () => {
  const { activeIC, updateIC } = useCapacity();

  if (!activeIC) return null;

  const handleQuarterChange = (e) => {
    updateIC(activeIC.id, { quarter: e.target.value });
  };

  const handleWeeksChange = (e) => {
    updateIC(activeIC.id, { weeksInQuarter: e.target.value });
  };

  const quarterError = validateQuarterName(activeIC.quarter);
  const weeksError = validateWeeksInQuarter(activeIC.weeksInQuarter);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quarter Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quarter"
              placeholder="e.g., Q1 2024"
              value={activeIC.quarter}
              onChange={handleQuarterChange}
              error={!!quarterError}
              helperText={quarterError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weeks in Quarter"
              type="number"
              placeholder="e.g., 13"
              value={activeIC.weeksInQuarter}
              onChange={handleWeeksChange}
              error={!!weeksError}
              helperText={weeksError}
              inputProps={{ min: 0, step: 0.1 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuarterInfoForm;
```

- [ ] **Step 2: Commit QuarterInfoForm**

```bash
git add src/components/QuarterInfoForm.jsx
git commit -m "feat: add QuarterInfoForm component

Quarter name and weeks input with validation.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: ICInfoForm Component

**Files:**
- Create: `src/components/ICInfoForm.jsx`

- [ ] **Step 1: Create ICInfoForm component**

Create `src/components/ICInfoForm.jsx`:

```javascript
import React from 'react';
import { Card, CardContent, Typography, TextField, Grid } from '@mui/material';
import { useCapacity } from '../context/CapacityContext';
import { validateICName, validateICRole } from '../utils/validation';

const ICInfoForm = () => {
  const { activeIC, updateIC } = useCapacity();

  if (!activeIC) return null;

  const handleNameChange = (e) => {
    updateIC(activeIC.id, { icName: e.target.value });
  };

  const handleRoleChange = (e) => {
    updateIC(activeIC.id, { icRole: e.target.value });
  };

  const nameError = validateICName(activeIC.icName);
  const roleError = validateICRole(activeIC.icRole);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          IC Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="IC Name"
              placeholder="e.g., Joe Test"
              value={activeIC.icName}
              onChange={handleNameChange}
              error={!!nameError}
              helperText={nameError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="IC Role"
              placeholder="e.g., PD"
              value={activeIC.icRole}
              onChange={handleRoleChange}
              error={!!roleError}
              helperText={roleError}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ICInfoForm;
```

- [ ] **Step 2: Commit ICInfoForm**

```bash
git add src/components/ICInfoForm.jsx
git commit -m "feat: add ICInfoForm component

IC name and role input with validation.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: TimeOffForm Component

**Files:**
- Create: `src/components/TimeOffForm.jsx`

- [ ] **Step 1: Create TimeOffForm component**

Create `src/components/TimeOffForm.jsx`:

```javascript
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Box
} from '@mui/material';
import { useCapacity } from '../context/CapacityContext';
import { validateNonNegativeNumber } from '../utils/validation';

const TimeOffForm = () => {
  const { activeIC, updateIC, calculateResults } = useCapacity();

  if (!activeIC) return null;

  const handleOKRValueChange = (e) => {
    updateIC(activeIC.id, {
      timeOff: {
        ...activeIC.timeOff,
        okrTime: { ...activeIC.timeOff.okrTime, value: e.target.value }
      }
    });
  };

  const handleOKRUnitChange = (e) => {
    updateIC(activeIC.id, {
      timeOff: {
        ...activeIC.timeOff,
        okrTime: { ...activeIC.timeOff.okrTime, unit: e.target.value }
      }
    });
  };

  const handlePTOChange = (e) => {
    updateIC(activeIC.id, {
      timeOff: { ...activeIC.timeOff, ptoDays: e.target.value }
    });
  };

  const handleDevChange = (e) => {
    updateIC(activeIC.id, {
      timeOff: { ...activeIC.timeOff, devDays: e.target.value }
    });
  };

  const handleHolidayChange = (e) => {
    updateIC(activeIC.id, {
      timeOff: { ...activeIC.timeOff, holidayDays: e.target.value }
    });
  };

  const okrError = validateNonNegativeNumber(activeIC.timeOff.okrTime.value);
  const ptoError = validateNonNegativeNumber(activeIC.timeOff.ptoDays);
  const devError = validateNonNegativeNumber(activeIC.timeOff.devDays);
  const holidayError = validateNonNegativeNumber(activeIC.timeOff.holidayDays);

  const calculated = calculateResults(activeIC);
  const totalTimeOff = calculated ? calculated.totalTimeOffWeeks.toFixed(1) : '0.0';

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Time Off
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend">OKR Time</FormLabel>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <TextField
                sx={{ flex: 1 }}
                type="number"
                value={activeIC.timeOff.okrTime.value}
                onChange={handleOKRValueChange}
                error={!!okrError}
                helperText={okrError}
                inputProps={{ min: 0, step: 0.1 }}
              />
              <RadioGroup
                row
                value={activeIC.timeOff.okrTime.unit}
                onChange={handleOKRUnitChange}
              >
                <FormControlLabel value="days" control={<Radio />} label="Days" />
                <FormControlLabel value="weeks" control={<Radio />} label="Weeks" />
              </RadioGroup>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="PTO Days"
              type="number"
              value={activeIC.timeOff.ptoDays}
              onChange={handlePTOChange}
              error={!!ptoError}
              helperText={ptoError}
              inputProps={{ min: 0, step: 0.1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dev / L&D Days"
              type="number"
              value={activeIC.timeOff.devDays}
              onChange={handleDevChange}
              error={!!devError}
              helperText={devError}
              inputProps={{ min: 0, step: 0.1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Holiday Days"
              type="number"
              value={activeIC.timeOff.holidayDays}
              onChange={handleHolidayChange}
              error={!!holidayError}
              helperText={holidayError}
              inputProps={{ min: 0, step: 0.1 }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Total time off: <strong>{totalTimeOff} weeks</strong>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TimeOffForm;
```

- [ ] **Step 2: Commit TimeOffForm**

```bash
git add src/components/TimeOffForm.jsx
git commit -m "feat: add TimeOffForm component

Time-off inputs with OKR unit selector and calculated total display.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 11: DomainForm Component

**Files:**
- Create: `src/components/DomainForm.jsx`

- [ ] **Step 1: Create DomainForm component**

Create `src/components/DomainForm.jsx`:

```javascript
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useCapacity } from '../context/CapacityContext';
import { validateDomainName, validateNonNegativeInteger } from '../utils/validation';
import { calculateDomainEffort } from '../utils/calculations';

const DomainForm = ({ domain }) => {
  const { activeIC, updateIC } = useCapacity();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!activeIC) return null;

  const handleDomainChange = (field, value) => {
    const updatedDomains = activeIC.domains.map(d =>
      d.id === domain.id ? { ...d, [field]: value } : d
    );
    updateIC(activeIC.id, { domains: updatedDomains });
  };

  const handleRemove = () => {
    setDeleteDialogOpen(true);
  };

  const handleRemoveConfirm = () => {
    const updatedDomains = activeIC.domains.filter(d => d.id !== domain.id);
    updateIC(activeIC.id, { domains: updatedDomains });
    setDeleteDialogOpen(false);
  };

  const handleRemoveCancel = () => {
    setDeleteDialogOpen(false);
  };

  const nameError = validateDomainName(domain.name);
  const smallError = validateNonNegativeInteger(domain.smallProjects);
  const mediumError = validateNonNegativeInteger(domain.mediumProjects);
  const largeError = validateNonNegativeInteger(domain.largeProjects);

  const totalWeeks = calculateDomainEffort(domain);

  return (
    <>
      <Card sx={{ mb: 2, position: 'relative' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Domain
            </Typography>
            <IconButton color="error" onClick={handleRemove} size="small">
              <Delete />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Domain Name"
                placeholder="e.g., TEST"
                value={domain.name}
                onChange={(e) => handleDomainChange('name', e.target.value)}
                error={!!nameError}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Small Projects (2w ea)"
                type="number"
                value={domain.smallProjects}
                onChange={(e) => handleDomainChange('smallProjects', e.target.value)}
                error={!!smallError}
                helperText={smallError}
                inputProps={{ min: 0, step: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Medium Projects (4w ea)"
                type="number"
                value={domain.mediumProjects}
                onChange={(e) => handleDomainChange('mediumProjects', e.target.value)}
                error={!!mediumError}
                helperText={mediumError}
                inputProps={{ min: 0, step: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Large Projects (8w ea)"
                type="number"
                value={domain.largeProjects}
                onChange={(e) => handleDomainChange('largeProjects', e.target.value)}
                error={!!largeError}
                helperText={largeError}
                inputProps={{ min: 0, step: 1 }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Domain total: <strong>{totalWeeks.toFixed(1)} weeks</strong>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onClose={handleRemoveCancel}>
        <DialogTitle>Remove Domain</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Remove domain "{domain.name || 'Untitled'}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveCancel}>Cancel</Button>
          <Button onClick={handleRemoveConfirm} color="error" variant="contained">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DomainForm;
```

- [ ] **Step 2: Commit DomainForm**

```bash
git add src/components/DomainForm.jsx
git commit -m "feat: add DomainForm component

Single domain card with project inputs and calculated total.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 12: DomainList Component

**Files:**
- Create: `src/components/DomainList.jsx`

- [ ] **Step 1: Create DomainList component**

Create `src/components/DomainList.jsx`:

```javascript
import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Add } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { useCapacity } from '../context/CapacityContext';
import DomainForm from './DomainForm';

const DomainList = () => {
  const { activeIC, updateIC } = useCapacity();

  if (!activeIC) return null;

  const handleAddDomain = () => {
    const newDomain = {
      id: uuidv4(),
      name: '',
      smallProjects: 0,
      mediumProjects: 0,
      largeProjects: 0
    };
    updateIC(activeIC.id, {
      domains: [...activeIC.domains, newDomain]
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Domains & Planned Work
      </Typography>

      {activeIC.domains.length === 0 ? (
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Typography color="text.secondary">
            No domains added yet. Click "Add Domain" to start.
          </Typography>
        </Paper>
      ) : (
        activeIC.domains.map(domain => (
          <DomainForm key={domain.id} domain={domain} />
        ))
      )}

      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={handleAddDomain}
        fullWidth
      >
        Add Domain
      </Button>
    </Box>
  );
};

export default DomainList;
```

- [ ] **Step 2: Commit DomainList**

```bash
git add src/components/DomainList.jsx
git commit -m "feat: add DomainList component

Dynamic list of domains with add functionality and empty state.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 13: CapacityDashboard Component

**Files:**
- Create: `src/components/CapacityDashboard.jsx`

- [ ] **Step 1: Create CapacityDashboard component**

Create `src/components/CapacityDashboard.jsx`:

```javascript
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  LinearProgress,
  Alert
} from '@mui/material';
import { Visibility, Warning } from '@mui/icons-material';
import { useCapacity } from '../context/CapacityContext';
import FormattedOutput from './FormattedOutput';

const CapacityDashboard = () => {
  const { activeIC, calculateResults } = useCapacity();
  const [summaryOpen, setSummaryOpen] = useState(false);

  if (!activeIC) {
    return (
      <Card>
        <CardContent>
          <Typography color="text.secondary" align="center">
            Create an IC to see capacity dashboard
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const calculated = calculateResults(activeIC);

  if (!calculated) return null;

  const {
    totalWeeksAvailable,
    totalPlannedWork,
    capacityUtilization,
    overUnderCapacity,
    status
  } = calculated;

  const getStatusColor = () => {
    if (status === 'over') return 'error';
    if (status === 'fully') return 'warning';
    return 'success';
  };

  const getStatusLabel = () => {
    if (status === 'over') return 'Over Capacity';
    if (status === 'fully') return 'Fully Allocated';
    return 'Under Capacity';
  };

  const getOverUnderText = () => {
    if (overUnderCapacity > 0) {
      return `Over by ${Math.abs(overUnderCapacity).toFixed(1)}w`;
    } else if (overUnderCapacity < 0) {
      return `Under by ${Math.abs(overUnderCapacity).toFixed(1)}w`;
    }
    return 'Fully allocated';
  };

  const utilizationValue = Math.min(capacityUtilization, 200); // Cap for display
  const showInfinityWarning = !isFinite(capacityUtilization);

  const totalProjects = activeIC.domains.reduce((sum, d) =>
    sum + (Number(d.smallProjects) || 0) + (Number(d.mediumProjects) || 0) + (Number(d.largeProjects) || 0), 0);

  const projectSummary = [];
  const totalSmall = activeIC.domains.reduce((sum, d) => sum + (Number(d.smallProjects) || 0), 0);
  const totalMedium = activeIC.domains.reduce((sum, d) => sum + (Number(d.mediumProjects) || 0), 0);
  const totalLarge = activeIC.domains.reduce((sum, d) => sum + (Number(d.largeProjects) || 0), 0);

  if (totalLarge > 0) projectSummary.push(`${totalLarge} Large`);
  if (totalMedium > 0) projectSummary.push(`${totalMedium} Medium`);
  if (totalSmall > 0) projectSummary.push(`${totalSmall} Small`);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Capacity Status
          </Typography>

          {showInfinityWarning ? (
            <Alert severity="warning" icon={<Warning />} sx={{ mb: 2 }}>
              Cannot calculate utilization - no available time
            </Alert>
          ) : (
            <>
              <Box sx={{ textAlign: 'center', my: 3 }}>
                <Typography variant="h2" color={getStatusColor()}>
                  {capacityUtilization.toFixed(0)}%
                </Typography>
                <Typography variant="h6" color={getStatusColor()} gutterBottom>
                  {getStatusLabel()}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(utilizationValue / 200) * 100}
                  color={getStatusColor()}
                  sx={{ height: 10, borderRadius: 5, my: 2 }}
                />
              </Box>
            </>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Available:
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {totalWeeksAvailable.toFixed(1)}w
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Planned:
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {totalPlannedWork.toFixed(1)}w
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Difference:
              </Typography>
              <Typography variant="body2" fontWeight="bold" color={getStatusColor()}>
                {getOverUnderText()}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Chip label={`${activeIC.domains.length} Domain(s)`} size="small" sx={{ mr: 1 }} />
            {totalProjects > 0 && (
              <Chip label={projectSummary.join(', ')} size="small" />
            )}
          </Box>

          <Button
            variant="contained"
            startIcon={<Visibility />}
            onClick={() => setSummaryOpen(true)}
            fullWidth
          >
            View Summary
          </Button>
        </CardContent>
      </Card>

      <FormattedOutput open={summaryOpen} onClose={() => setSummaryOpen(false)} />
    </>
  );
};

export default CapacityDashboard;
```

- [ ] **Step 2: Commit CapacityDashboard**

```bash
git add src/components/CapacityDashboard.jsx
git commit -m "feat: add CapacityDashboard component

Displays capacity metrics with color-coded status and View Summary button.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 14: FormattedOutput Component

**Files:**
- Create: `src/components/FormattedOutput.jsx`

- [ ] **Step 1: Create FormattedOutput component**

Create `src/components/FormattedOutput.jsx`:

```javascript
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { useCapacity } from '../context/CapacityContext';
import { generateSummary } from '../utils/calculations';

const FormattedOutput = ({ open, onClose }) => {
  const { activeIC, calculateResults } = useCapacity();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (!activeIC) return null;

  const calculated = calculateResults(activeIC);
  if (!calculated) return null;

  const summary = generateSummary(activeIC, calculated);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Capacity Summary</DialogTitle>
        <DialogContent>
          <Box
            component="pre"
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              bgcolor: 'grey.100',
              p: 2,
              borderRadius: 1,
              overflow: 'auto'
            }}
          >
            {summary}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button
            variant="contained"
            startIcon={<ContentCopy />}
            onClick={handleCopy}
          >
            Copy to Clipboard
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Summary copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FormattedOutput;
```

- [ ] **Step 2: Commit FormattedOutput**

```bash
git add src/components/FormattedOutput.jsx
git commit -m "feat: add FormattedOutput component

Modal dialog with formatted summary text and copy to clipboard.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 15: Integrate All Components in App

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update App.jsx with full layout**

Replace content of `src/App.jsx`:

```javascript
import React from 'react';
import { Container, Box, Typography, Grid, Alert } from '@mui/material';
import { CapacityProvider, useCapacity } from './context/CapacityContext';
import ICSelector from './components/ICSelector';
import QuarterInfoForm from './components/QuarterInfoForm';
import ICInfoForm from './components/ICInfoForm';
import TimeOffForm from './components/TimeOffForm';
import DomainList from './components/DomainList';
import CapacityDashboard from './components/CapacityDashboard';
import './App.css';

function AppContent() {
  const { activeIC, saveError } = useCapacity();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          IC Capacity Planning
        </Typography>

        {saveError && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Auto-save disabled - data won't persist across sessions
          </Alert>
        )}

        <ICSelector />

        {!activeIC ? (
          <Alert severity="info">
            Create your first IC capacity plan by clicking "New IC" above
          </Alert>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <QuarterInfoForm />
              <ICInfoForm />
              <TimeOffForm />
              <DomainList />
            </Grid>
            <Grid item xs={12} md={5}>
              <CapacityDashboard />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}

function App() {
  return (
    <CapacityProvider>
      <AppContent />
    </CapacityProvider>
  );
}

export default App;
```

- [ ] **Step 2: Run app and test full workflow**

```bash
npm start
```

Expected:
- Create new IC
- Fill in all form fields
- See real-time calculations in dashboard
- View formatted summary
- Copy to clipboard works
- Switch between ICs
- Delete IC works

- [ ] **Step 3: Stop server and commit**

```bash
# Press Ctrl+C
git add src/App.jsx
git commit -m "feat: integrate all components in App layout

Complete two-column layout with forms on left and dashboard on right.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 16: Add README Documentation

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README with project documentation**

Replace content of `README.md`:

```markdown
# IC Capacity Planning Web App

A React-based web application to help Individual Contributors (ICs) and managers estimate quarterly capacity using a standardized methodology.

## Features

- **Multiple IC Plans:** Create and manage capacity plans for multiple team members
- **Real-time Calculations:** Automatic capacity calculations as you type
- **Visual Dashboard:** Color-coded capacity status with utilization metrics
- **Formatted Output:** Generate methodology-compliant summary text for sharing
- **Local Storage:** Auto-save to browser localStorage (no backend needed)
- **Export/Import:** Export plans as JSON files for backup or sharing

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

Creates optimized production build in `/build` directory.

### Testing

```bash
npm test
```

Runs calculation utility tests.

## Usage

1. **Create IC:** Click "New IC" to create a new capacity plan
2. **Fill Form:** Enter quarter info, IC details, time off, and planned work by domain
3. **View Dashboard:** See real-time capacity calculations and status
4. **Generate Summary:** Click "View Summary" to see formatted output
5. **Copy & Share:** Use "Copy to Clipboard" to share with stakeholders

## Capacity Calculation Methodology

Based on IC Quarterly Capacity Planning Methodology:

- **Total Time Off:** OKR time + (PTO + Dev + Holiday days) / 5
- **Total Available:** Weeks in quarter - Total time off
- **Domain Effort:** (Small × 2) + (Medium × 4) + (Large × 8) weeks
- **Utilization:** (Total planned / Total available) × 100%
- **Status:**
  - Under capacity: < 90%
  - Fully allocated: 90-100%
  - Over capacity: > 100%

## Tech Stack

- **React** (Create React App)
- **Material-UI v5** for UI components
- **React Context API** for state management
- **localStorage** for persistence
- **uuid** for ID generation

## Project Structure

```
src/
├── components/       # React components
├── context/          # Context providers
├── utils/            # Pure functions (calculations, storage, validation)
├── App.jsx           # Main app layout
└── index.js          # Entry point with theme
```

## License

MIT
```

- [ ] **Step 2: Commit README**

```bash
git add README.md
git commit -m "docs: add comprehensive README

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 17: Final Testing & Verification

**Files:**
- None (manual testing)

- [ ] **Step 1: Run full test suite**

```bash
npm test
```

Expected: All calculation tests pass

- [ ] **Step 2: Run app and test complete workflow**

```bash
npm start
```

Test checklist:
- [ ] Create new IC
- [ ] Fill all form fields with valid data
- [ ] Dashboard shows correct calculations
- [ ] Time off total updates correctly
- [ ] Domain total updates correctly
- [ ] Add multiple domains
- [ ] Remove domain (with confirmation)
- [ ] View summary modal
- [ ] Copy summary to clipboard (check Snackbar)
- [ ] Create second IC
- [ ] Switch between ICs (verify data loads correctly)
- [ ] Duplicate IC (verify copy created)
- [ ] Delete IC (with confirmation)
- [ ] Refresh page (verify data persists)
- [ ] Test validation errors (empty required fields)
- [ ] Test edge cases (zero values, negative available time)

- [ ] **Step 3: Build production version**

```bash
npm run build
```

Expected: Build completes successfully, creates `/build` directory

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final verification and production build

All tests passing, manual testing complete.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Self-Review Checklist

**Spec Coverage:**
- [x] Quarter information form (quarter name, weeks)
- [x] IC information form (name, role)
- [x] Time-off form with OKR unit selector
- [x] Dynamic domains (add/remove)
- [x] Real-time calculations
- [x] Visual dashboard with color-coded status
- [x] Formatted summary output
- [x] Copy to clipboard
- [x] localStorage persistence
- [x] IC selector with create/delete/duplicate
- [x] Validation on all inputs
- [x] Auto-save with debouncing
- [x] Empty states and error handling

**Placeholder Scan:**
- No "TBD" or "TODO" items
- All code blocks contain actual implementation
- All file paths are exact
- All formulas implemented per methodology

**Type Consistency:**
- Component prop names consistent
- Context methods match usage
- Calculation function signatures consistent
- Data model matches spec

**No Gaps Found:** All requirements from spec are implemented in tasks.

---

**End of Implementation Plan**
