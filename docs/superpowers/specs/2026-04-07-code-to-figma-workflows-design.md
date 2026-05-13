# Code to Figma Design Library Workflows - Design Specification

**Date:** 2026-04-07
**Purpose:** Define two comprehensive workflow documents for connecting existing code to Figma design libraries
**Output:** Two equally detailed workflow guides for different use cases

---

## Overview

This specification defines the design for two workflow documents that guide teams in aligning existing code to Figma design systems. These workflows are the reverse of the existing `FIGMA_WORKFLOW.md` (Figma → Code), focusing instead on Code → Figma alignment.

### Problem Statement

Teams often build prototypes with ad-hoc styling (Tailwind, Bootstrap, basic CSS) before design system alignment. Once a Figma design system exists, they need:
- A way to extract the design system into code
- A method to identify gaps between code and design system
- A process to systematically align code to design standards
- Ongoing maintenance to prevent drift

### Target Users

- Design teams with Figma design systems (component libraries or full design systems)
- Development teams working on prototypes or existing apps
- Teams that need both initial migration and ongoing maintenance workflows

---

## Solution: Two Workflow Documents

### Document 1: Extract-Once Workflow
**File:** `CODE_TO_FIGMA_EXTRACT_ONCE.md`

**Purpose:** Token-efficient, manual-alignment workflow for ongoing maintenance

**When to Use:**
- Design system is stable (not changing frequently)
- Team is token-conscious
- Small to medium codebase
- Ongoing maintenance mode
- Developer knows what needs fixing

**Key Features:**
- One-time extraction of Figma design system to `DESIGN_SYSTEM.md`
- Manual identification of alignment gaps
- Targeted updates referencing local doc instead of live Figma queries
- Periodic refresh when Figma updates significantly
- Low token usage (5,000-15,000 for extraction, 1,000-3,000 per task)

### Document 2: Hybrid Audit Workflow
**File:** `CODE_TO_FIGMA_HYBRID_AUDIT.md`

**Purpose:** Comprehensive workflow with automated audits for initial migrations and periodic health checks

**When to Use:**
- Initial migration from prototype to design system
- Large codebase with unknown gaps
- Design system changes frequently
- Need comprehensive gap analysis
- Quarterly health checks required
- Team prefers automated guidance

**Key Features:**
- Initial extraction of design system
- Automated audit comparing code to Figma
- Prioritized gap reports (Critical/High/Medium/Low)
- Batch or incremental fixes
- Periodic drift detection
- Higher token usage (15,000-40,000 for audits) but comprehensive insights

**Note:** Teams can switch between workflows - start with Hybrid for migration, switch to Extract-Once for maintenance.

---

## Document Structure

Both documents will follow this structure with equal depth and detail:

### Common Sections (Both Documents)

1. **Title & Purpose**
   - Clear description of which workflow this is
   - When to use this workflow vs. the other

2. **Prerequisites**
   - Figma Desktop app installed
   - Claude Code CLI installed
   - Figma MCP server configured
   - Existing app/prototype with code

3. **When to Use This Workflow**
   - Clear decision criteria with examples
   - Comparison to the other workflow
   - When to switch workflows

4. **Core Concepts**
   - Design tokens (colors, spacing, typography, effects)
   - Figma variables vs. CSS custom properties
   - Component specifications
   - Code Connect (optional mapping tool)
   - Drift detection

5. **Step-by-Step Workflow**
   - Numbered phases with sub-tasks
   - Code examples for each step
   - Example Claude prompts
   - Expected outputs and results

6. **Validation**
   - Visual validation checklist
   - Automated validation prompts
   - Side-by-side comparison methodology
   - Accessibility checks

7. **Troubleshooting**
   - Common issues and solutions
   - Error messages and fixes
   - MCP connection problems
   - Figma file organization issues

8. **Quick Reference**
   - Table of common prompts/tasks
   - Cheat sheet for frequent operations

9. **Example Session**
   - Full conversation flow with Claude
   - Real prompts and responses
   - Shows complete workflow from start to finish

10. **Token Usage Guide**
    - Estimated costs per operation
    - Optimization tips
    - When to use live Figma vs. local doc

### Document-Specific Sections

**Extract-Once Document:**
- **Extracting the Design System** - Detailed guide on requesting extraction, what gets captured, reviewing output
- **Keeping the Extract Updated** - When to refresh, how to review diffs, updating affected code
- **Manual Alignment Patterns** - Common scenarios with example prompts:
  - Aligning buttons
  - Fixing form components
  - Updating layouts
  - Replacing hardcoded colors
  - Applying spacing tokens

**Hybrid Audit Document:**
- **Running Your First Audit** - How to request audit, interpreting reports, understanding priority levels
- **Prioritizing Gaps** - Critical vs. nice-to-have, batch vs. incremental strategies, team coordination
- **Periodic Health Checks** - When to re-audit, drift indicators, light vs. full audits
- **Extract + Audit Sync** - Keeping reference doc and Figma in sync, when to re-extract vs. audit

---

## Workflow Details

### Extract-Once Workflow

**Phase 1: One-Time Extraction**
1. Open Figma Desktop with design system file
2. Navigate to design system page/components
3. Start Claude Code in project directory
4. Request extraction:
   ```
   "Extract the design system from Figma to a reference document"
   ```
5. Claude executes:
   - Reads Figma variables (colors, spacing, typography, effects)
   - Captures component definitions (variants, properties, states)
   - Documents patterns and usage guidelines
   - Creates `DESIGN_SYSTEM.md` in project root
6. Review extracted document for completeness
7. Commit to git

**Phase 2: Align Code to Design System**
1. Developer identifies what needs updating (manual review or specific component)
2. Prompt Claude with targeted requests:
   - `"Update styles.css to use the design tokens from DESIGN_SYSTEM.md"`
   - `"Align this button to match the Figma Button component"`
   - `"Replace hardcoded colors with CSS variables from the design system"`
3. Claude reads `DESIGN_SYSTEM.md` (not Figma) for token values and component specs
4. Claude updates code files
5. Validate changes visually against Figma

**Phase 3: Maintenance**
1. When Figma design system has significant updates, refresh the extract
2. Prompt:
   ```
   "Re-extract the design system from Figma and update DESIGN_SYSTEM.md"
   ```
3. Review git diff to see what changed in the design system
4. Update affected code based on design system changes

**Token Usage:**
- Initial extraction: 5,000-15,000 tokens (one-time)
- Daily alignment tasks: 1,000-3,000 tokens per task
- Refresh extract: 5,000-15,000 tokens (quarterly)
- Monthly estimate: 15,000-45,000 tokens

### Hybrid Audit Workflow

**Phase 1: Initial Extraction**
1. Same as Extract-Once Phase 1
2. Extract Figma design system to `DESIGN_SYSTEM.md`
3. Commit as source of truth

**Phase 2: Automated Audit**
1. Request audit:
   ```
   "Audit this codebase against the Figma design system"
   ```
2. Claude executes:
   - Reads Figma design system (tokens, components, variables)
   - Scans codebase files (CSS, HTML, JS/JSX components)
   - Compares code vs. design system
   - Identifies gaps:
     - Hardcoded values that should use tokens
     - Components that don't match Figma specs
     - Missing design system patterns
     - Inconsistent implementations
   - Generates prioritized gap report:
     - **Critical**: Accessibility issues, major visual mismatches
     - **High**: Hardcoded colors/spacing, missing components
     - **Medium**: Minor spacing/sizing differences
     - **Low**: Nice-to-have refinements
3. Review report with team, prioritize fixes

**Phase 3: Batch or Incremental Fixes**
1. Choose approach based on report and team capacity:
   - **Batch**: `"Fix all hardcoded colors to use design tokens"`
   - **Incremental**: `"Fix the buttons in header.html to match Figma"`
2. Claude updates code referencing `DESIGN_SYSTEM.md` and/or Figma
3. Validate each batch of changes
4. Commit incrementally

**Phase 4: Periodic Health Checks**
1. Quarterly or when Figma updates, run light audit:
   - `"Check if buttons.css has drifted from the design system"`
   - `"Audit the spacing tokens in styles.css"`
2. If significant drift detected, re-extract design system
3. Fix gaps incrementally using Extract-Once approach

**Token Usage:**
- Initial extraction: 5,000-15,000 tokens (one-time)
- Full app audit: 15,000-40,000 tokens (initial + quarterly)
- File-specific audit: 2,000-8,000 tokens (as needed)
- Batch fixes: 3,000-10,000 tokens per batch
- Monthly estimate (initial migration): 30,000-70,000 tokens
- Monthly estimate (maintenance): 10,000-25,000 tokens

---

## Technical Implementation

### Design System Extraction Format

The `DESIGN_SYSTEM.md` document will be structured as follows:

#### 1. Design Tokens Section

```markdown
## Design Tokens

### Colors
- Primary: `#3273D1` (Variable: `color/primary`)
- Text Primary: `#1D1E1F` (Variable: `color/text/primary`)
- Border: `#BBBCBE` (Variable: `color/border/default`)
- Background: `#FFFFFF` (Variable: `color/background/default`)
...

### Spacing Scale
- 2xs: 2px (Variable: `spacing/2xs`)
- xs: 4px (Variable: `spacing/xs`)
- sm: 8px (Variable: `spacing/sm`)
- md: 16px (Variable: `spacing/md`)
- lg: 24px (Variable: `spacing/lg`)
...

### Typography
- Font Family: Roboto (Variable: `font/family/primary`)
- Heading 1: 32px / 700 / 40px line-height
- Heading 2: 24px / 700 / 32px line-height
- Body: 16px / 400 / 24px line-height
- Caption: 12px / 400 / 16px line-height
...

### Effects
- Shadow/elevation-1: 0px 2px 4px rgba(0,0,0,0.1)
- Shadow/elevation-2: 0px 4px 8px rgba(0,0,0,0.15)
- Border Radius/small: 4px
- Border Radius/medium: 8px
...
```

#### 2. Component Specifications

```markdown
## Components

### Button
**Variants:** Primary, Secondary, Tertiary, Danger
**States:** Default, Hover, Active, Focus, Disabled

**Primary Button:**
- Background: `color/primary` (#3273D1)
- Text: `color/text/inverse` (#FFFFFF)
- Padding: `spacing/sm` `spacing/md` (8px 16px)
- Border Radius: `radius/small` (4px)
- Font: `font/weight/bold` (700)
- Height: 40px
- Hover: Background darkens to #2563B8
- Focus: 2px outline `color/primary` with 2px offset
- Disabled: Opacity 0.5, cursor not-allowed

**Usage:** Primary actions, form submissions, CTAs

### Input
**Variants:** Text, Email, Password, Number
**States:** Default, Focus, Error, Disabled

**Default Input:**
- Border: 1px solid `color/border/default`
- Background: `color/background/default`
- Padding: `spacing/sm` `spacing/md`
- Height: 40px
- Border Radius: `radius/small`
- Focus: Border color `color/primary`, 2px width
- Error: Border color `color/error`, helper text in red
...
```

#### 3. Patterns & Guidelines

```markdown
## Patterns

### Form Layout
- Label above input
- Label font: `font/weight/medium` (500)
- Input height: 40px
- Spacing between label and input: `spacing/xs` (4px)
- Spacing between fields: `spacing/lg` (16px)

### Card Layout
- Padding: `spacing/lg` (16px)
- Border: 1px solid `color/border/default`
- Border Radius: `radius/medium` (8px)
- Shadow: `shadow/elevation-1`
...
```

### CSS Variable Alignment Approach

When aligning code to use design tokens, Claude will transform code as follows:

**Input (existing code with hardcoded values):**
```css
.button {
  background-color: #3273D1;
  color: #FFFFFF;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 700;
}

.button:hover {
  background-color: #2563B8;
}
```

**Output (aligned code with CSS variables):**
```css
/* Design tokens from DESIGN_SYSTEM.md */
:root {
  --color-primary: #3273D1;
  --color-primary-dark: #2563B8;
  --color-text-inverse: #FFFFFF;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --radius-small: 4px;
  --font-weight-bold: 700;
}

.button {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-small);
  font-weight: var(--font-weight-bold);
}

.button:hover {
  background-color: var(--color-primary-dark);
}
```

### Component-Based Alignment Approach

For framework-based apps (React, Vue, etc.), Claude can create reusable components:

**Input (existing HTML):**
```html
<button class="primary-btn" onclick="submitForm()">Submit</button>
<button class="secondary-btn" onclick="cancel()">Cancel</button>
```

**Output (React component + styles):**
```javascript
// components/Button.js
export function Button({ variant = 'primary', children, onClick, disabled }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

```css
/* components/Button.css */
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-small);
  font-weight: var(--font-weight-bold);
  height: 40px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

Usage:
```javascript
<Button variant="primary" onClick={submitForm}>Submit</Button>
<Button variant="secondary" onClick={cancel}>Cancel</Button>
```

### Audit Report Format

When running an audit, Claude generates a markdown report:

```markdown
# Design System Audit Report
Generated: 2026-04-07
Codebase: /Users/ts73344/Desktop/claudeTest/work-dashboard-app

## Summary
- Files scanned: 12
- Gaps found: 47
- Critical: 3
- High: 15
- Medium: 22
- Low: 7

## Critical Issues

### 1. Accessibility: Color contrast insufficient
- **File:** `css/styles.css:23`
- **Current:** `color: #BBBCBE` on `background: #FFFFFF`
- **Issue:** Contrast ratio 1.8:1 (WCAG requires 4.5:1 for normal text)
- **Fix:** Use `color/text/primary` (#1D1E1F) instead
- **Impact:** Users with low vision cannot read this text

### 2. Missing focus indicators
- **Files:** `css/styles.css:45-67` (all interactive elements)
- **Issue:** No visible focus outline for keyboard navigation
- **Fix:** Add `:focus { outline: 2px solid var(--color-primary); outline-offset: 2px; }`
- **Impact:** Keyboard users cannot see which element has focus

## High Priority

### 1. Hardcoded primary color
- **Files:**
  - `css/styles.css:45` - button background
  - `css/styles.css:123` - link color
  - `table.html:67` - header background
- **Current:** `#3273D1` (hardcoded in 8 locations)
- **Expected:** `var(--color-primary)` or `color/primary` token
- **Fix:** Replace all instances with CSS variable
- **Effort:** 15 minutes

### 2. Button spacing mismatch
- **File:** `css/styles.css:48`
- **Current:** `padding: 10px 20px`
- **Expected:** `padding: 8px 16px` (spacing/sm spacing/md per design system)
- **Visual Impact:** Buttons appear larger than design specs
- **Fix:** Use `padding: var(--spacing-sm) var(--spacing-md);`

### 3. Inconsistent border radius
- **Files:** Multiple components use different values
  - Buttons: 4px ✓ (correct)
  - Inputs: 6px ✗ (should be 4px)
  - Cards: 8px ✓ (correct for medium radius)
  - Modals: 5px ✗ (should be 8px)
- **Fix:** Standardize using `--radius-small` (4px) and `--radius-medium` (8px)

## Medium Priority

### 1. Font weight variations
- **Files:** Multiple text elements
- **Issue:** Using font-weight: 600, but design system only defines 400, 500, 700
- **Fix:** Map 600 → 700 or add 600 to design system if needed
- **Locations:** 12 instances across 4 files

### 2. Spacing inconsistencies
- **Issue:** Margin values don't align to spacing scale
- **Examples:**
  - 12px used (should be 8px or 16px)
  - 18px used (should be 16px or 24px)
- **Fix:** Round to nearest spacing token value

## Low Priority

### 1. Typography line-height minor differences
- **Issue:** Some headings use 1.5 instead of design system's 1.4
- **Visual impact:** Minimal
- **Fix:** Align to exact values for consistency

## Recommendations

1. **Immediate actions:**
   - Fix critical accessibility issues (focus indicators, contrast)
   - Create CSS variables file with all design tokens

2. **Short-term (this sprint):**
   - Replace all hardcoded color values with tokens
   - Fix button and input styling to match design system

3. **Medium-term (next sprint):**
   - Standardize spacing across all components
   - Componentize buttons and inputs for reusability

4. **Long-term:**
   - Consider Tailwind config using design tokens
   - Set up pre-commit hooks to prevent hardcoded values

## Suggested Fix Order

1. Accessibility (Critical) - 1 hour
2. Color tokens (High) - 2 hours
3. Component spacing (High) - 1 hour
4. Border radius standardization (Medium) - 30 minutes
5. Font weights (Medium) - 30 minutes
6. Other spacing (Medium) - 1 hour
7. Line heights (Low) - 30 minutes

**Total estimated effort:** 6.5 hours
```

### File Organization

Recommended project structure after alignment:

```
project/
├── DESIGN_SYSTEM.md          # Extracted Figma design system reference
├── css/
│   ├── tokens.css            # CSS variables from design system
│   ├── components/
│   │   ├── button.css        # Component-specific styles
│   │   ├── input.css
│   │   ├── card.css
│   │   └── modal.css
│   └── styles.css            # App-specific styles using tokens
├── components/               # React/Vue components (if applicable)
│   ├── Button.js
│   ├── Input.js
│   └── Card.js
├── docs/
│   └── design-system-audit-YYYY-MM-DD.md  # Audit reports (archived)
└── .git/
    └── hooks/
        └── pre-commit        # Optional: check for hardcoded values
```

---

## Validation & Quality Checks

### Visual Validation Process

Both documents will include comprehensive validation guidance:

**Side-by-Side Comparison Method:**
1. Open Figma Desktop with design system file
2. Open your app in a browser (local dev server)
3. Use Figma's Dev Mode to inspect exact values
4. Compare rendered code against Figma specs
5. Use browser DevTools to verify CSS variables applied correctly
6. Check computed styles match expected tokens

**Visual Validation Checklist:**

**Colors:**
- [ ] All text colors match Figma variables (no hardcoded hex)
- [ ] Background colors use design tokens
- [ ] Border colors consistent with design system
- [ ] Hover/active/focus states match Figma component states
- [ ] Color contrast meets WCAG 2.1 Level AA (4.5:1 for normal text)

**Typography:**
- [ ] Font family matches (check font loading if custom fonts)
- [ ] Font sizes match exactly (not approximations)
- [ ] Font weights correct (400 vs. 700 vs. 500)
- [ ] Line heights match Figma specs
- [ ] Letter spacing applied if specified in Figma

**Spacing:**
- [ ] Padding values use spacing tokens
- [ ] Margins use spacing scale
- [ ] Gap between elements matches Figma
- [ ] Component internal spacing correct
- [ ] No arbitrary values (12px, 18px, etc. unless in design system)

**Layout:**
- [ ] Component dimensions match (width, height, min/max)
- [ ] Border radius values correct
- [ ] Alignment matches (center, left, right, justify)
- [ ] Flexbox/grid structure mirrors Figma auto-layout
- [ ] Responsive breakpoints match design system

**Interactive States:**
- [ ] Hover states work and match design
- [ ] Focus states visible and accessible
- [ ] Active/pressed states match
- [ ] Disabled states match Figma specs
- [ ] Loading states match (if applicable)
- [ ] Error states match (for forms)

**Accessibility:**
- [ ] Color contrast meets WCAG standards (4.5:1 for text, 3:1 for UI elements)
- [ ] Focus indicators visible (2px outline minimum)
- [ ] Interactive elements have proper ARIA labels
- [ ] Keyboard navigation works (tab order logical)
- [ ] Screen reader compatible (semantic HTML)

### Automated Validation

Both workflows support automated validation checks:

**Validation Prompt:**
```
"Validate that styles.css correctly uses all design tokens from DESIGN_SYSTEM.md"
```

**Claude's Validation Process:**
- Parse CSS files for token usage (var(--*) references)
- Check for remaining hardcoded values (hex colors, pixel values)
- Report missing token applications
- Verify token names match design system exactly
- Check for typos in variable names

**Example Validation Output:**
```
Design Token Usage Report - styles.css

✅ Colors: 15/15 using tokens (100%)
   - All color properties reference CSS variables
   - No hardcoded hex values found

✅ Spacing: 23/25 using tokens (92%)
   ⚠️  2 instances still hardcoded:
   - line 145: margin-bottom: 12px (should use --spacing-md: 16px or --spacing-sm: 8px)
   - line 203: padding: 10px (should use --spacing-sm: 8px or --spacing-md: 16px)

⚠️  Typography: 8/12 using tokens (67%)
   ❌ Found 4 hardcoded values:
   - line 45: font-size: 14px (should use --font-size-sm: 14px)
   - line 67: font-weight: 600 (not in design system, use 500 or 700)
   - line 89: line-height: 1.5 (should use --line-height-body: 1.6)
   - line 112: font-family: Arial (should use --font-family-primary: Roboto)

✅ Border Radius: 6/6 using tokens (100%)

Overall Token Adoption: 52/58 (90%)

Recommendations:
1. Fix the 2 spacing values (5 min)
2. Update typography to use tokens (10 min)
3. Add font-weight: 600 to design system if needed, or map to 700
```

### Drift Detection

For the Hybrid workflow, periodic drift detection:

**Monthly/Quarterly Drift Check Prompt:**
```
"Check if any files have drifted from DESIGN_SYSTEM.md"
```

**Claude's Drift Detection Process:**
- Scan codebase for changes since last check
- Identify new hardcoded values introduced
- Find components not using latest tokens
- Detect inconsistent implementations across similar components
- Compare current code state to design system

**Drift Indicators:**
- Multiple different spacing values for same semantic use (e.g., card padding is 16px in one file, 20px in another)
- Same color in different formats (#3273D1 vs. rgb(50, 115, 209) vs. #3374D1)
- Component variants that don't follow design system pattern
- New files created without using tokens
- Updated components that removed token usage

**Example Drift Report:**
```
Drift Detection Report
Period: Last 30 days

⚠️  3 new hardcoded values introduced:
1. dashboard.css (added 2026-04-02):
   - Line 23: background: #3273D1 (should use var(--color-primary))

2. modal.css (added 2026-04-05):
   - Line 45: padding: 20px (should use var(--spacing-lg): 24px)
   - Line 67: border-radius: 6px (should use var(--radius-small): 4px)

✅ No changes to existing token usage (good!)

⚠️  Design system updated on 2026-03-15:
   - color/primary changed from #3273D1 to #2E6BC6
   - DESIGN_SYSTEM.md not refreshed since 2026-03-01

Recommendation: Re-extract design system to capture latest changes
```

### Regression Prevention

Both documents will include guidance on preventing future drift:

**Development Guidelines:**

1. **Always reference DESIGN_SYSTEM.md when building new features**
   - Read it before starting any UI work
   - Use it as single source of truth for styling

2. **Use CSS variables/tokens, not hardcoded values**
   - Never hardcode hex colors (#3273D1)
   - Never hardcode pixel spacing (16px) - use tokens
   - If a value isn't in the design system, ask if it should be added

3. **Copy-paste existing aligned components**
   - Don't build buttons from scratch - copy existing Button
   - Reuse patterns that already follow design system
   - Maintain consistency through reuse

4. **When Figma updates, refresh the extract before coding**
   - Check design system changelog
   - Re-extract to DESIGN_SYSTEM.md
   - Review diff to understand changes
   - Update affected code incrementally

5. **Run validation before committing**
   - Check token usage: `"Validate that [file] uses design tokens"`
   - Fix any hardcoded values found
   - Commit only when validation passes

**Git Hooks (Optional):**

Example pre-commit hook to catch hardcoded values:

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Check for hardcoded hex colors in CSS files
if git diff --cached --name-only | grep -E '\.(css|scss)$' > /dev/null; then
    FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(css|scss)$')

    for FILE in $FILES; do
        # Check for hex colors not in var() references
        if git diff --cached "$FILE" | grep -E '^\+.*#[0-9A-Fa-f]{3,6}' | grep -v 'var(--' > /dev/null; then
            echo "❌ Pre-commit hook failed: Hardcoded hex color found in $FILE"
            echo "   Please use CSS variables from design tokens instead"
            echo "   Example: var(--color-primary) instead of #3273D1"
            exit 1
        fi

        # Check for hardcoded pixel values (except in var definitions)
        if git diff --cached "$FILE" | grep -E '^\+.*:\s*[0-9]+px' | grep -v 'var(--' | grep -v ':root' > /dev/null; then
            echo "⚠️  Warning: Hardcoded pixel values found in $FILE"
            echo "   Consider using spacing tokens: var(--spacing-sm), var(--spacing-md), etc."
        fi
    done
fi

exit 0
```

Install hook:
```bash
chmod +x .git/hooks/pre-commit
```

The hook will:
- Block commits with hardcoded hex colors
- Warn about hardcoded pixel values
- Allow CSS variable definitions in :root
- Guide developer to use tokens

---

## Troubleshooting

Both documents will include comprehensive troubleshooting sections:

### Common Issues & Solutions

#### Issue 1: "Extraction is incomplete or missing components"

**Symptoms:**
- DESIGN_SYSTEM.md missing expected colors
- Component definitions incomplete
- No typography tokens captured

**Causes:**
- Figma file not organized with proper variables/components
- Variables not published in Figma library
- MCP server can't access certain Figma elements

**Solutions:**

1. **Check Figma Variables panel:**
   - Open Figma file → Right sidebar → Variables
   - Verify variables are defined (not just random colors in fills)
   - Check that collections are published

2. **Check Figma Components:**
   - Components should be in Components panel
   - Components should be published to library (if shared file)
   - Component names should be meaningful (not "Rectangle 47")

3. **Manually specify what to extract:**
   ```
   "Extract design tokens from the Variables panel in Figma"
   "List all components in this Figma file first"
   "Extract only the color variables from Figma"
   ```

4. **Extract incrementally:**
   - Colors first: `"Extract all color variables from Figma"`
   - Then spacing: `"Extract spacing variables from Figma"`
   - Then components: `"Extract Button component specifications"`

#### Issue 2: "Audit report shows too many gaps (overwhelming)"

**Symptoms:**
- 200+ gaps identified
- Hard to know where to start
- Team paralyzed by scope

**Causes:**
- Large codebase with extensive legacy code
- Prototype built with no design system consideration
- First time running comprehensive audit

**Solutions:**

1. **Scope the audit to specific files/directories:**
   ```
   "Audit only the css/components/ directory"
   "Audit just the buttons.css file"
   "Audit only the landing page (index.html + styles.css)"
   ```

2. **Filter by priority:**
   ```
   "Show only critical and high priority gaps"
   "What are the top 5 most important issues to fix?"
   "Focus the audit on accessibility issues only"
   ```

3. **Take incremental approach:**
   - Sprint 1: Fix critical accessibility issues
   - Sprint 2: Fix color tokens (highest visual impact)
   - Sprint 3: Fix spacing tokens
   - Sprint 4: Fix typography

4. **Create backlog from audit:**
   - Add each gap as ticket/issue in project management tool
   - Prioritize by impact and effort
   - Tackle 5-10 items per sprint

#### Issue 3: "CSS variables not working in older browsers"

**Symptoms:**
- Styling breaks in Internet Explorer 11
- Variables not applied in older Safari/Chrome

**Causes:**
- CSS custom properties (variables) require modern browsers
- IE11 doesn't support CSS variables at all
- Older browsers have partial support

**Solutions:**

1. **Add fallback values:**
   ```css
   .button {
     background: #3273D1; /* Fallback for IE11 */
     background: var(--color-primary); /* Modern browsers */
   }
   ```

2. **Use PostCSS plugin for automatic fallbacks:**
   ```bash
   npm install postcss-custom-properties --save-dev
   ```

   PostCSS will automatically generate fallbacks during build.

3. **Check browser support requirements:**
   - If IE11 not required, no action needed
   - CSS variables supported in all modern browsers (Chrome 49+, Firefox 31+, Safari 9.1+)

4. **Consider CSS-in-JS solution:**
   - For React/Vue apps, styled-components or emotion handle fallbacks automatically

#### Issue 4: "Figma variables don't match what I need in code"

**Symptoms:**
- Variable names too verbose or unclear
- Naming convention doesn't match code style
- Variables organized differently than code needs

**Causes:**
- Figma naming conventions differ from CSS conventions
- Design team uses different terminology

**Solutions:**

1. **Request translation during extraction:**
   ```
   "Map Figma variables to CSS custom properties with kebab-case names"
   "Extract design tokens and convert Figma naming to CSS naming conventions"
   ```

2. **Claude will translate automatically:**
   - Figma: `color/primary/default` → CSS: `--color-primary-default`
   - Figma: `spacing/8` → CSS: `--spacing-md` (with semantic name)
   - Figma: `Border Radius/Small` → CSS: `--radius-small`

3. **Create mapping table in DESIGN_SYSTEM.md:**
   ```markdown
   ## Token Mapping
   | Figma Variable | CSS Variable | Value |
   |----------------|--------------|-------|
   | color/primary/default | --color-primary | #3273D1 |
   | spacing/8 | --spacing-sm | 8px |
   ```

4. **If needed, update Figma naming:**
   - Collaborate with design team to standardize names
   - Use semantic names in Figma (primary, secondary) not numbers (color-1, color-2)

#### Issue 5: "Design system extract is outdated"

**Symptoms:**
- Code references colors that don't exist in DESIGN_SYSTEM.md
- New components added to Figma not in doc
- Token values don't match Figma

**Causes:**
- Figma updated but local doc hasn't been refreshed
- Design team made changes without notifying dev team
- Last extraction was months ago

**Solutions:**

1. **Check when DESIGN_SYSTEM.md was last updated:**
   ```bash
   git log -1 --format="%ai" DESIGN_SYSTEM.md
   ```

2. **Re-extract and review diff:**
   ```
   "Re-extract the design system from Figma and show me what changed"
   ```

3. **Claude will show git diff:**
   ```diff
   - Primary: `#3273D1` (Variable: `color/primary`)
   + Primary: `#2E6BC6` (Variable: `color/primary`)

   + New component: Badge (Variable: component/badge)
   ```

4. **Update affected code:**
   - If token values changed, no code changes needed (CSS variables automatically update)
   - If new components added, consider using them in new features
   - If tokens removed, find alternatives

5. **Set up regular refresh schedule:**
   - Weekly if design system in active development
   - Monthly if design system is stable
   - After any major Figma release

#### Issue 6: "Code changes broke existing functionality"

**Symptoms:**
- Styles not applying correctly after token migration
- Components look wrong
- Interactive states broken

**Causes:**
- CSS specificity issues (hardcoded styles overriding variables)
- JavaScript expecting specific class names
- Selector conflicts after refactoring

**Solutions:**

1. **Test incrementally (prevent this):**
   - Don't update entire app at once
   - Update one file/component at a time
   - Test after each change before moving on

2. **Use browser DevTools to debug:**
   - Inspect element → Computed styles
   - Check which styles are applied
   - Look for overridden styles (crossed out)
   - Verify CSS variable values resolved correctly

3. **Check specificity:**
   ```css
   /* Low specificity - might be overridden */
   .button { background: var(--color-primary); }

   /* Higher specificity - will override */
   div.container .button { background: #3273D1; }
   ```

   Solution: Remove or update higher specificity selectors

4. **Prompt Claude for debugging:**
   ```
   "The button hover state broke after updating to use design tokens - check what's overriding it"
   "Debug why the input border color isn't using the CSS variable"
   ```

5. **Rollback and try smaller change:**
   ```bash
   git revert HEAD
   ```
   Then update one specific selector instead of entire file

#### Issue 7: "MCP server not connected or Figma not responding"

**Symptoms:**
- "Cannot read Figma file" error
- "No node selected" error
- Timeout when requesting extraction

**Causes:**
- Figma Desktop app not running
- MCP server not configured
- File not open in Figma
- Network/connection issues

**Solutions:**

1. **Verify Figma Desktop is running:**
   - Open Figma Desktop app
   - Open the design system file
   - Keep Figma in foreground (not minimized)

2. **Check MCP configuration:**
   ```bash
   cat ~/.claude/settings.json
   ```

   Should include:
   ```json
   {
     "mcpServers": {
       "figma-desktop": {
         "command": "npx",
         "args": ["-y", "@figma/mcp-server-figma"]
       }
     }
   }
   ```

3. **Restart everything:**
   - Quit Figma Desktop
   - Exit Claude Code
   - Restart Figma Desktop, open file
   - Restart Claude Code
   - Verify MCP connection on startup

4. **Check Figma file permissions:**
   - Ensure you have edit access (or at least view access)
   - For team files, check you're logged into correct account

5. **Try URL instead of selected node:**
   - Copy Figma file URL
   - Paste in Claude prompt with @ mention
   - Claude will extract node ID from URL

---

## Token Usage & Cost Optimization

Both documents will include detailed token usage guidance:

### Token Estimates

**Extract-Once Workflow:**

| Operation | Estimated Tokens | Frequency | Notes |
|-----------|-----------------|-----------|-------|
| Initial extraction | 5,000-15,000 | One-time | Depends on design system size |
| Daily alignment tasks | 1,000-3,000 | Per task | File-level updates |
| Refresh extract | 5,000-15,000 | Quarterly | When Figma updates |
| Validation checks | 500-2,000 | Per check | Automated verification |
| Manual review assistance | 500-1,000 | As needed | Answering questions |

**Monthly estimate (active development):** 15,000-45,000 tokens

**Hybrid Audit Workflow:**

| Operation | Estimated Tokens | Frequency | Notes |
|-----------|-----------------|-----------|-------|
| Initial extraction | 5,000-15,000 | One-time | Same as Extract-Once |
| Full app audit (small) | 15,000-25,000 | Initial + quarterly | <10 files |
| Full app audit (medium) | 25,000-40,000 | Initial + quarterly | 10-30 files |
| Full app audit (large) | 40,000-70,000 | Initial + quarterly | 30+ files |
| File-specific audit | 2,000-8,000 | As needed | Targeted drift check |
| Batch fixes | 3,000-10,000 | Per batch | Multiple files updated |
| Refresh extract | 5,000-15,000 | Quarterly | When design system changes |

**Monthly estimate (initial migration):** 30,000-70,000 tokens
**Monthly estimate (maintenance mode):** 10,000-25,000 tokens

### Token Optimization Strategies

**1. Scope audits to specific files/directories**

❌ **High cost:**
```
"Audit the entire codebase"
```
- Reads all files (100+ files)
- Queries Figma for full design system
- Generates massive report
- Cost: 40,000-70,000 tokens

✅ **Low cost:**
```
"Audit the src/components/buttons/ directory"
```
- Reads only 3-5 files
- Focused comparison
- Targeted report
- Cost: 3,000-5,000 tokens

**2. Use the extracted doc for day-to-day work**

❌ **High cost (repeated):**
```
"What color should I use for primary buttons?"
[Claude queries Figma live]
```
- Every question hits Figma MCP
- Repeated extraction overhead
- Cost: 2,000-3,000 tokens per question

✅ **Low cost:**
```
"According to DESIGN_SYSTEM.md, what color should I use for primary buttons?"
```
- Reads local markdown file
- No Figma query needed
- Cost: 200-500 tokens per question

**3. Batch similar updates together**

❌ **High cost (inefficient):**
```
"Fix the hardcoded color in header.css"
"Fix the hardcoded color in footer.css"
"Fix the hardcoded color in button.css"
[10 separate prompts]
```
- 10x file reads
- 10x context setup
- 10x response overhead
- Cost: 10,000-15,000 tokens

✅ **Low cost:**
```
"Fix all hardcoded primary colors across header.css, footer.css, and button.css"
```
- Single context
- Reads files once
- Batch update
- Cost: 2,000-3,000 tokens

**4. Request targeted validation**

❌ **Expensive:**
```
"Check if everything is aligned to the design system"
```
- Scans entire codebase
- Checks every token type
- Comprehensive but costly
- Cost: 15,000-25,000 tokens

✅ **Efficient:**
```
"Check if button.css uses design token variables for colors"
```
- One file
- One token category
- Quick validation
- Cost: 500-1,000 tokens

**5. Cache design system extraction in repo**

✅ **Team efficiency:**
- Extract design system once
- Commit DESIGN_SYSTEM.md to git
- Entire team uses the same doc
- Team of 5 = 5x savings (only 1 extraction instead of 5)

**6. Use light audits for drift detection**

❌ **Expensive (overkill):**
```
Run full audit every week
```
- 15,000-40,000 tokens per audit
- 4x per month = 60,000-160,000 tokens/month
- Most weeks will show no changes

✅ **Efficient:**
```
"Check if any files have new hardcoded values since last commit"
```
- Git diff + quick scan
- 2,000-5,000 tokens
- Only run when suspicious of drift

**7. Progressive disclosure for large reports**

✅ **Smart:**
```
"Audit the codebase and show me just the summary and critical issues"
```
- Gets overview first
- Can drill into details if needed
- Avoids overwhelming report

Then if needed:
```
"Show me the high priority issues from that audit"
```

### When to Use Which Workflow (Token Perspective)

**Use Extract-Once if:**
- ✅ Budget-conscious (token limit <50k/month)
- ✅ Design system is stable (changes <1x per quarter)
- ✅ Small team (1-5 developers)
- ✅ Codebase is small-medium (<30 files)
- ✅ Team has good design system knowledge

**Use Hybrid Audit if:**
- ✅ Initial migration (worth the upfront cost)
- ✅ Large codebase (need automated gap finding)
- ✅ Unknown state (prototype with unclear styling)
- ✅ Quarterly health checks (scheduled budget for audits)
- ✅ Design system changes frequently (need drift detection)

**Hybrid → Extract-Once transition:**
- Month 1-2: Use Hybrid for initial audit + fixes (30k-70k tokens)
- Month 3+: Switch to Extract-Once for maintenance (15k-25k tokens)
- Quarterly: Run Hybrid audit for health check (add 20k-40k tokens that month)

---

## Decision Criteria: Choosing the Right Workflow

### Quick Decision Tree

```
Is this the first time aligning code to this design system?
├─ Yes → Do you have >20 files to update?
│  ├─ Yes → Use Hybrid Audit (comprehensive gap analysis needed)
│  └─ No → Use Extract-Once (manual review feasible)
│
└─ No (already aligned, doing maintenance) → Use Extract-Once
   └─ But run Hybrid audit quarterly for health checks
```

### Detailed Comparison

| Factor | Extract-Once | Hybrid Audit |
|--------|--------------|--------------|
| **Best for** | Ongoing maintenance | Initial migrations |
| **Token cost** | Low (15-45k/mo) | Higher (30-70k initial, 10-25k maintenance) |
| **Setup time** | 15-30 minutes | 1-2 hours (audit review) |
| **Gap identification** | Manual | Automated |
| **Learning curve** | Low | Medium |
| **Design system changes** | Quarterly refresh | Auto-detected drift |
| **Team size** | Small (1-5) | Any size |
| **Codebase size** | Small-Medium | Any size |
| **Reporting** | None (manual tracking) | Comprehensive reports |
| **Maintenance effort** | Higher (manual vigilance) | Lower (automated checks) |

### Use Case Examples

**Scenario 1: Small prototype → production**
- 5 HTML files, 2 CSS files
- Built with basic CSS
- Design system in Figma (20 components)
- Solo developer

**Recommendation:** Extract-Once
- Manual review of 7 files is feasible
- Low token budget sufficient
- Extract design system, update files one-by-one
- Total time: 2-3 hours, <10k tokens

---

**Scenario 2: Large React app → design system alignment**
- 50+ component files
- Mix of inline styles, CSS modules, styled-components
- Mature design system (100+ tokens, 40 components)
- Team of 8 developers

**Recommendation:** Hybrid Audit
- Too many files for manual review
- Need prioritized action plan
- Audit will find hidden gaps
- Can distribute fixes across team
- Total time: 1-2 weeks, 40-70k tokens (one-time)
- Then switch to Extract-Once for maintenance

---

**Scenario 3: Dashboard app with quarterly design updates**
- 15 files total
- Design system updates quarterly (new colors, components)
- 2 developers
- Need to detect drift between updates

**Recommendation:** Hybrid (quarterly audits)
- Use Extract-Once for daily work
- Run full audit each quarter when design updates
- Catches drift, ensures alignment
- Quarterly cost: +20-30k tokens for audit month

---

## Implementation Notes

### Document Formatting

Both documents will use:
- Clear numbered steps
- Code blocks with syntax highlighting
- Tables for quick reference
- Checklists for validation
- Warning/info callouts for important notes
- Real example prompts (copy-paste ready)
- Screenshots where helpful (Figma UI, Claude responses)

### Example Format Snippet

```markdown
## Step 3: Extract Design System

1. **Open Figma Desktop** with your design system file
2. **Navigate to the design system page** (usually named "Design System", "Tokens", or "Foundations")
3. **Start Claude Code** in your project directory:
   ```bash
   cd /path/to/your/project
   claude
   ```

4. **Request extraction** with this prompt:

   ```
   Extract the design system from Figma to a reference document
   ```

5. **Claude will execute the following:**
   - Connect to Figma via MCP server
   - Read all Variables from the Variables panel
   - Capture component definitions and variants
   - Document patterns and usage guidelines
   - Create `DESIGN_SYSTEM.md` in your project root

6. **Review the generated document:**
   ```bash
   cat DESIGN_SYSTEM.md
   ```

   ✅ **Check for:**
   - All colors captured (primary, secondary, text, backgrounds)
   - Spacing scale complete (2xs through 3xl)
   - Typography tokens (font families, sizes, weights, line heights)
   - Component specifications (Button, Input, etc.)

   ⚠️ **If anything is missing:**
   ```
   "The spacing tokens are incomplete - extract all spacing variables from Figma"
   ```

7. **Commit the design system to git:**
   ```bash
   git add DESIGN_SYSTEM.md
   git commit -m "docs: extract Figma design system for reference"
   ```

> **💡 Tip:** Keep this file at the project root for easy access. All team members should reference this doc when building UI.
```

### Maintenance Plan

After creating these documents:

**Quarterly review:**
- Update based on user feedback
- Add new troubleshooting scenarios
- Update token estimates as Claude evolves
- Add new examples from real usage

**When Figma MCP updates:**
- Test all workflows still work
- Update prompts if API changes
- Add new features if available

**Community contributions:**
- Accept PRs for additional examples
- Add team-specific workflows
- Document integration with other tools (Storybook, Chromatic, etc.)

---

## Success Criteria

These documents will be considered successful if:

1. **Completeness:** A developer can follow either workflow start-to-finish without external help
2. **Clarity:** Each step is unambiguous with clear expected outcomes
3. **Examples:** Real prompts, code snippets, and outputs for every major step
4. **Troubleshooting:** Common issues are documented with solutions
5. **Optimization:** Token usage guidance helps teams stay within budget
6. **Flexibility:** Supports both initial migrations and ongoing maintenance
7. **Accessibility:** Clear decision criteria help teams choose the right workflow

---

## Deliverables

1. **CODE_TO_FIGMA_EXTRACT_ONCE.md** - Complete workflow document (~2500-3000 words)
2. **CODE_TO_FIGMA_HYBRID_AUDIT.md** - Complete workflow document (~2500-3000 words)
3. **Design specification** (this document) committed to `docs/superpowers/specs/`
4. Git commits for all three documents

---

## Next Steps

After spec approval:
1. Write both workflow documents
2. Commit to repository
3. Test workflows with real examples
4. Iterate based on testing feedback
5. Consider creating example projects demonstrating each workflow

---

**End of Design Specification**
