# MX Wireframe Design System

**Complete Reference Guide for Low-Fidelity Prototyping**

**Figma File:** [MX Low-Fidelity Component Library](https://www.figma.com/design/kQHACQaxZP5ioEEh25XIWk/MX-Low-Fidelity-Component-Library?m=dev)

**Last Updated:** 2026-05-08

---

## Table of Contents

1. [Core Principles](#core-principles)
2. [Design Tokens](#design-tokens)
3. [Text Block System](#text-block-system)
4. [Navigation & Layout](#navigation--layout)
5. [Form Components](#form-components)
6. [Data Display](#data-display)
7. [Buttons & Actions](#buttons--actions)
8. [Icons](#icons)
9. [Utility Components](#utility-components)
10. [Quick Reference](#quick-reference)

---

## Core Principles

### ⚫ Grayscale-Only Wireframing

**THE MOST IMPORTANT RULE: This design system uses ONLY grayscale colors.**

- ❌ **NO green** for success
- ❌ **NO red** for errors
- ❌ **NO blue** for links or selections
- ❌ **NO yellow** for warnings
- ❌ **NO brand colors** or accent colors
- ✅ **ONLY black, white, and shades of grey** (Fill/0 through Fill/100)

### Why Grayscale?

**Focus on structure, not aesthetics:**
- ✅ Forces better hierarchy through size, weight, and spacing
- ✅ Prevents premature debates about brand colors
- ✅ Accessible by default (color-blind friendly)
- ✅ Print-friendly documentation
- ✅ Faster iteration without color distractions

### How to Communicate Without Color

**Status & Priority:**
```
High priority:    Fill/80-100 (darkest) + white text + ✓ icon
Medium priority:  Fill/40-60 (medium) + dark text + ⚠ icon
Low priority:     Fill/10-30 (lightest) + light text + ℹ icon
```

**State Changes:**
```
Success:  ✓ checkmark + Fill/80 background
Error:    ✕ close + Fill/80 background
Warning:  ⚠ warning + Fill/60 background
Info:     ℹ info + Fill/40 background
```

**Direction & Change:**
```
Increase:  ↑ symbol + dark text
Decrease:  ↓ symbol + medium text
Neutral:   — symbol + light text
```

**Interactive Progression:**
```
Default → Hover → Active → Disabled
Fill/80 → Fill/90 → Fill/100 → Fill/40 (60% opacity)
```

### When to Add Color

**Only after:**
1. ✅ Wireframes are approved by stakeholders
2. ✅ User flows are validated through testing
3. ✅ Layout and hierarchy are finalized
4. ✅ Moving to high-fidelity design phase

---

## Design Tokens

### Color System (Grayscale Only)

**CSS Variables - Copy & Paste Ready:**

```css
:root {
  /* Fill Levels - The ONLY colors in this system */
  --fill-0: #FFFFFF;   /* Background (lightest) */
  --fill-10: #F5F5F5;  /* Cards, surfaces */
  --fill-20: #EBEBEB;  /* Elevated surfaces */
  --fill-30: #E0E0E0;  /* UI borders, table headers */
  --fill-40: #D6D6D6;  /* Interactive components, disabled states */
  --fill-50: #CCCCCC;  /* Medium emphasis */
  --fill-60: #B8B8B8;  /* Badges, emphasis */
  --fill-70: #A3A3A3;  /* Text blocks in wireframes */
  --fill-80: #8F8F8F;  /* Buttons, selected states, active */
  --fill-90: #7A7A7A;  /* Hover states, high emphasis */
  --fill-100: #666666; /* Maximum contrast, active pressed */

  /* Text Colors */
  --text-dark: #343d48;    /* Primary text, headings */
  --text-middle: #666666;  /* Secondary text, labels */
  --text-light: #999999;   /* Tertiary text, captions */
  --text-inverse: #FFFFFF; /* Text on dark backgrounds */

  /* Stroke Colors */
  --stroke-dark: #b8bbbf;   /* Primary borders, dividers */
  --stroke-light: #d9dbdd;  /* Secondary borders, subtle dividers */
  --stroke-inverse: #FFFFFF; /* Borders on dark backgrounds */

  /* Background Colors */
  --background-primary: #FFFFFF;
  --background-secondary: #F5F5F5;

  /* Utility Colors */
  --utility-dark: #343d48;
  --utility-medium: #8F8F8F;
  --utility-light: #D6D6D6;
  --section-fill: #F5F5F5;

  /* Special */
  --transparent: rgba(0, 0, 0, 0);
  --overlay: rgba(0, 0, 0, 0.3);
  --scrim: rgba(0, 0, 0, 0.5);
}
```

### Spacing System

```css
:root {
  /* Primitive Sizes */
  --size-2: 2px;
  --size-4: 4px;
  --size-6: 6px;
  --size-8: 8px;
  --size-12: 12px;
  --size-16: 16px;
  --size-24: 24px;
  --size-32: 32px;
  --size-48: 48px;

  /* Semantic Spacing */
  --spacing-xxxx-small: 2px;
  --spacing-xxx-small: 4px;
  --spacing-xx-small: 6px;
}
```

### Typography Scale

```css
:root {
  /* Font Family */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;

  /* Headers */
  --header-xl: 38px;      /* Page titles, main headings */
  --header-l: 25px;       /* Section titles */
  --header-m: 19px;       /* Subsection headings */
  --header-s: 17px;       /* Component titles */
  --header-xs: 11px;      /* Compact headings */

  /* Text (Single Line) */
  --text-l: 14px;         /* Large labels, buttons */
  --text-m: 12px;         /* Standard labels */
  --text-s: 10px;         /* Compact labels, captions */

  /* Paragraphs (Multi-line) */
  --paragraph-l: 18px;    /* Large body text */
  --paragraph-m: 16px;    /* Standard body text */
  --paragraph-s: 15px;    /* Small body text */

  /* Utility */
  --annotation: 10px;     /* Fine print, footnotes */
}
```

**Typography Usage:**
```css
/* Headers */
h1 { font-size: var(--header-xl); font-weight: 700; line-height: 1.2; letter-spacing: -0.03em; }
h2 { font-size: var(--header-l); font-weight: 700; line-height: 1.2; letter-spacing: -0.03em; }
h3 { font-size: var(--header-m); font-weight: 700; line-height: 1.2; letter-spacing: -0.03em; }

/* Body Text */
p { font-size: var(--paragraph-m); font-weight: 400; line-height: 1.5; }

/* Labels */
label { font-size: var(--text-m); font-weight: 400; }
```

### Component Sizing

```css
:root {
  /* Corner Radius */
  --radius-full: 100px;   /* Pills, circular elements */
  --radius-small: 4px;    /* Subtle rounded corners */

  /* Element Heights */
  --height-button: 40px;
  --height-input: 40px;
  --height-table-header: 44px;
  --height-table-row: 36px;
  --height-navbar: 56px;

  /* Badge */
  --badge-height: 20px;
  --badge-min-width: 16px;

  /* Icon Sizes */
  --icon-small: 16px;
  --icon-medium: 24px;
  --icon-large: 48px;
}
```

---

## Text Block System

**The Innovation:** This library uses **horizontal bars instead of lorem ipsum** for text placeholders.

### Why Text Blocks?

- ✅ **Faster iteration** - No copying placeholder text
- ✅ **Focus on structure** - Content doesn't distract
- ✅ **Clear hierarchy** - Bar thickness = importance
- ✅ **Language-agnostic** - Works for any locale
- ✅ **Realistic length** - Shows actual content width

### Text Single Line

**Use for:** Headlines, labels, single-line placeholders

**Sizes:**
```
Headline L:  ████████████████████████  (24px bar)
Headline M:  ██████████████████        (18px bar)
Headline S:  ████████████              (12px bar)
Text L:      ████████████              (12px bar)
Text M:      ████████                  (8px bar)
Text S:      ████                      (4px bar)
```

**Alignment:** Full, Left, Center, Right

**CSS:**
```css
.text-block-single {
  height: 8px; /* or 4px, 12px, 18px, 24px */
  background: var(--fill-70);
  border-radius: 2px;
}
```

### Text Paragraph

**Use for:** Body copy, descriptions, multi-line content

**Pattern:**
```
Paragraph (3 lines, Medium):

████████████████████████████████████    (8px bar)
██████████████████████████              (8px bar)
████████████████████████████████████████ (8px bar)

(Gap between lines: 6px)
```

**Variants:**
- Lines: 1, 2, 3, 5
- Size: Large (12px), Medium (8px), Small (4px)
- Alignment: Left, Center, Right

**CSS:**
```css
.text-block-line {
  height: 8px;
  background: var(--fill-70);
  border-radius: 2px;
  margin-bottom: 6px;
}

.text-block-line:last-child {
  margin-bottom: 0;
}
```

### Text Block (Complete)

**Use for:** Article sections, card content, description blocks

**Structure:**
```
█████████████████████  ← Headline (thicker, 12px)

Gap: 16px

████████████████████████████████████  ← Paragraph 1
██████████████████████████
████████████████████████████████████████

Gap: 12px

████████████████████  ← Paragraph 2
██████████████████████████████████
```

**Variants:**
- Headline: Text, Block, None
- Paragraphs: 1, 2
- Size: Large, Medium, Small

---

## Navigation & Layout

### MX Global Navbar (Enterprise Header)

**Node ID:** 730:24683

**Specifications:**
```
Height: 56px (fixed)
Width: 100% (full-width)
Background: var(--fill-80) (#8F8F8F)
Padding: 0 24px
Z-index: 100
Position: Fixed top
```

**Structure:**

**Left Section:**
```html
<div class="navbar-left">
  <button class="hamburger-menu">☰</button>  <!-- 24x24px -->
  <div class="brand-logo">LOGO</div>         <!-- 60x33px -->
  <span class="app-name">App Name</span>     <!-- Inter Bold 14px -->
</div>
```

**Right Section:**
```html
<div class="navbar-right">
  <button class="grid-icon">⊞</button>       <!-- 24x24px -->
  <div class="notification-badge">           <!-- 30x30px container -->
    <svg class="bell-icon"></svg>            <!-- 24x24px -->
    <span class="badge">9</span>             <!-- 16x16px circle -->
  </div>
  <div class="profile-icon">RS</div>         <!-- 24x24px circle -->
</div>
```

**Complete CSS:**
```css
.global-navbar {
  height: 56px;
  background: var(--fill-80);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--size-24);
  color: var(--text-inverse);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  gap: var(--size-24);
}

.hamburger-menu,
.grid-icon {
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.brand-logo {
  height: 33px;
  width: 60px;
}

.app-name {
  font-size: 14px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
}

.notification-badge {
  position: relative;
  width: 30px;
  height: 30px;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background: var(--fill-50);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
}

.profile-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--fill-60);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13.5px;
  font-weight: 700;
  color: white;
}
```

**When to use:**
- Enterprise application headers
- Consistent navigation across all pages
- Multi-app navigation (hamburger menu)
- Notification systems
- User profile access

### Query Panel / Form (Collapsible Sidebar)

**Node IDs:** 434:16633 (collapsed), 434:16635 (expanded)

**Specifications:**
```
Width (collapsed):  48px
Width (expanded):   330px
Height:            100vh
Background:        var(--fill-0)
Border-right:      2px solid var(--fill-30)
Transition:        width 0.3s ease
```

**Structure:**
```html
<aside class="query-panel collapsed">
  <button class="toggle-btn">
    <span class="icon">☰</span>
    <span class="badge">3</span>  <!-- Filter count -->
  </button>

  <div class="panel-content">
    <!-- Filter inputs here -->
  </div>
</aside>
```

**CSS:**
```css
.query-panel {
  width: 330px;
  height: 100vh;
  background: var(--fill-0);
  border-right: 2px solid var(--fill-30);
  padding: var(--size-24);
  overflow-y: auto;
  transition: width 0.3s ease;
}

.query-panel.collapsed {
  width: 48px;
  padding: var(--size-16) var(--size-8);
}

.query-panel.collapsed .panel-content {
  display: none;
}

.toggle-btn {
  width: 32px;
  height: 32px;
  background: var(--fill-80);
  border: none;
  border-radius: 100px;
  color: white;
  cursor: pointer;
  position: relative;
}

.toggle-btn .badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--fill-80);
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 9px;
  font-weight: 600;
}
```

**When to use:**
- Sidebar filters in dashboards
- Advanced search panels
- Collapsible form sections
- Filter drawers

---

## Form Components

### Radio List

**Use for:** Single selection from 2-4 options

**Variants:**
- Layout: Vertical (default), Horizontal
- Options: 1, 2, 3, or 4
- State: Default, Disabled

**HTML:**
```html
<div class="radio-list">
  <label class="radio-item">
    <input type="radio" name="option" value="1">
    <span class="radio-custom"></span>
    <span class="label">Option 1</span>
  </label>
  <label class="radio-item">
    <input type="radio" name="option" value="2">
    <span class="radio-custom"></span>
    <span class="label">Option 2</span>
  </label>
</div>
```

**CSS:**
```css
.radio-item {
  display: flex;
  align-items: center;
  gap: var(--size-8);
  margin-bottom: var(--size-12);
}

.radio-item input[type="radio"] {
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid var(--fill-40);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}

.radio-item input[type="radio"]:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: var(--fill-80);
  border-radius: 50%;
}
```

### Checkbox

**Use for:** Multiple selections

**HTML:**
```html
<label class="checkbox-item">
  <input type="checkbox">
  <span class="label">Option</span>
</label>
```

**CSS (Grayscale Only):**
```css
.checkbox-item input[type="checkbox"] {
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid var(--fill-40);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  background: white;
}

.checkbox-item input[type="checkbox"]:checked {
  background: var(--fill-80);  /* NOT blue! */
  border-color: var(--fill-80);
}

.checkbox-item input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 16px;
  font-weight: bold;
}
```

### Dropdown / Select

**Node ID:** 93:11374 - 93:11380

**Use for:** Selection from 5+ options

**HTML:**
```html
<select class="dropdown">
  <option value="">Select...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

**CSS:**
```css
.dropdown {
  width: 100%;
  height: 40px;
  padding: var(--size-8) var(--size-12);
  border: 2px solid var(--fill-30);
  border-radius: 4px;
  background: white;
  font-size: var(--text-m);
  cursor: pointer;
}

.dropdown:focus {
  border-color: var(--fill-80);
  outline: none;
}
```

### Date Picker

**Node IDs:** 315:28055 (Fiscal), 315:28055 (Ad)

**Specifications:**
```
Width: 390px
Height: 40px (input) + dropdown
Input: MM/DD/YYYY placeholder
Icons: Calendar, Previous/Next
Time picker: 120px dropdown
```

**Use for:**
- Date selection in forms
- Fiscal calendar for business apps
- Scheduling interfaces

### Text Input / Textarea

**HTML:**
```html
<input type="text" class="text-input" placeholder="Placeholder...">
<textarea class="textarea" placeholder="Comment..."></textarea>
```

**CSS:**
```css
.text-input,
.textarea {
  width: 100%;
  padding: var(--size-8) var(--size-12);
  border: 2px solid var(--fill-30);
  border-radius: 4px;
  font-size: var(--text-m);
  background: white;
}

.text-input {
  height: 40px;
}

.textarea {
  min-height: 84px;
  resize: vertical;
}

.text-input:focus,
.textarea:focus {
  border-color: var(--fill-80);
  outline: none;
}
```

---

## Data Display

### Data Table

**Node IDs:** 1178:43261 (simple), 1178:43812 (filterable)

**Specifications:**
```
Header height:   44px
Row height:      36px
Header bg:       var(--stroke-light) (#d9dbdd)
Header border:   2px solid var(--stroke-dark)
Row border:      1px solid var(--fill-30)
Padding:         16px horizontal, 8-12px vertical
```

**Complete CSS:**
```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border: 2px solid var(--fill-30);
  border-radius: 4px;
  overflow: hidden;
}

.data-table thead {
  background: var(--stroke-light);
}

.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: var(--text-m);
  font-weight: 600;
  border-bottom: 2px solid var(--stroke-dark);
  color: var(--text-dark);
  cursor: pointer;
  user-select: none;
}

.data-table th.sortable::after {
  content: '⇅';
  opacity: 0.3;
  margin-left: 8px;
}

.data-table th.sorted-asc::after {
  content: '↑';
  opacity: 1;
}

.data-table th.sorted-desc::after {
  content: '↓';
  opacity: 1;
}

.data-table td {
  padding: 8px 16px;
  border-bottom: 1px solid var(--fill-30);
  font-size: var(--text-m);
  height: 36px;
}

.data-table tbody tr:hover {
  background: var(--fill-10);
}
```

**Pagination:**
```html
<div class="table-pagination">
  <div class="pagination-info">1-10 of 247 items</div>
  <div class="pagination-controls">
    <select class="items-per-page">
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
    </select>
    <button class="page-btn">Previous</button>
    <button class="page-btn active">1</button>
    <button class="page-btn">2</button>
    <button class="page-btn">Next</button>
  </div>
</div>
```

### Progress Bar

**Node IDs:** 549:18520 - 549:18800

**Specifications:**
```
Width:  300px
Height: 24px
Track:  var(--fill-10)
Fill:   var(--fill-30)
Radius: 100px (pill shape)
Label:  Left side, percentage
```

**HTML:**
```html
<div class="progress-bar">
  <span class="progress-label">60%</span>
  <div class="progress-track">
    <div class="progress-fill" style="width: 60%"></div>
  </div>
</div>
```

**CSS:**
```css
.progress-bar {
  display: flex;
  align-items: center;
  gap: var(--size-12);
  width: 300px;
}

.progress-label {
  font-size: var(--text-m);
  font-weight: 600;
  color: var(--text-dark);
  min-width: 40px;
}

.progress-track {
  flex: 1;
  height: 24px;
  background: var(--fill-10);
  border-radius: 100px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--fill-30);
  border-radius: 100px;
  transition: width 0.3s ease;
}
```

### Status Badge (Tag Label)

**Node IDs:** 141:12270 (standard), 141:12421 (compact)

**Specifications:**
```
Standard: 20px height
Compact:  16px height
Padding:  4px horizontal, 2px vertical
Border:   1px solid
Radius:   4px
Font:     10px Inter Regular
```

**Grayscale Status Communication:**
```css
/* High priority / Active */
.badge-active {
  background: var(--fill-80);
  border-color: var(--fill-90);
  color: white;
}

/* Medium priority / Pending */
.badge-pending {
  background: var(--fill-40);
  border-color: var(--fill-60);
  color: var(--text-dark);
}

/* Low priority / Inactive */
.badge-inactive {
  background: var(--fill-20);
  border-color: var(--fill-30);
  color: var(--text-light);
}
```

**HTML:**
```html
<span class="status-badge badge-active">
  <svg class="icon"><!-- icon --></svg>
  <span>Active</span>
</span>
```

**Complete CSS:**
```css
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--size-4);
  height: 20px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  border: 1px solid;
}

.status-badge .icon {
  width: 16px;
  height: 16px;
}
```

### Notification Badge

**Specifications:**
```
Size:       16px circular
Background: var(--fill-50) to var(--fill-80)
Text:       10px, white, Roboto Regular
Position:   Top-right of parent
```

**CSS:**
```css
.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 16px;
  height: 16px;
  background: var(--fill-60);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: white;
  padding: 0 4px;
}
```

---

## Buttons & Actions

### Primary Button

**Specifications:**
```
Height:     40px
Padding:    12px horizontal, 16px vertical
Background: var(--fill-80)
Text:       White, 14px Inter Medium
Radius:     100px (pill shape)
```

**States (Grayscale Progression):**
```
Default:  Fill/80 (#8F8F8F)
Hover:    Fill/90 (#7A7A7A)
Active:   Fill/100 (#666666)
Disabled: Fill/40 (#D6D6D6) + 60% opacity
```

**Complete CSS:**
```css
.btn-primary {
  height: 40px;
  padding: 0 var(--size-16);
  background: var(--fill-80);
  color: white;
  border: none;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.btn-primary:hover {
  background: var(--fill-90);
}

.btn-primary:active {
  background: var(--fill-100);
  transform: scale(0.98);
}

.btn-primary:disabled {
  background: var(--fill-40);
  color: var(--text-light);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Icon Button

**Specifications:**
```
Size:       32x32px
Icon:       24x24px
Background: Transparent
Radius:     100px
Badge:      Optional 16px circle, top-right
```

**CSS:**
```css
.icon-button {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-middle);
  position: relative;
}

.icon-button:hover {
  background: var(--fill-20);
  color: var(--text-dark);
}

.icon-button .icon {
  width: 24px;
  height: 24px;
}

.icon-button .badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  background: var(--fill-80);
  border-radius: 8px;
  font-size: 9px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## Icons

The library includes 50+ icons organized by function. **All icons are grayscale only.**

### Icon Categories

**Navigation:**
- `hamburgerMenuNative` - Menu toggle (24x24px)
- `rightArrow`, `leftArrow` - Navigation
- `caretRight`, `caretLeft` - Dropdowns
- `chevronDown`, `chevronUp` - Accordions, sorting

**Communication:**
- `question` - Help (Outline & Solid variants)
- `info` - Information (Outline & Solid)
- `notification` - Alerts

**Actions:**
- `search` - Search functionality
- `checkMark` - Confirmations (✓)
- `minus` - Remove (−)
- `close` - Dismiss (×)

**Status (Outline & Solid):**
- `success` - Success states (✓) - Use Fill/80, NOT green
- `error` - Errors (×) - Use Fill/80, NOT red
- `warning` - Warnings (⚠) - Use Fill/60, NOT yellow

**File Operations:**
- `file`, `upload`, `download`, `external`, `edit`, `trash`, `draggable`

**Data Visualization:**
- `pieChart`, `barGraph`, `ganttChart`, `hierarchy`

**Filter & View:**
- `gridView`, `sort`, `filters`, `dashboard`

**Shopping:**
- `cart`, `groceries`

**Time:**
- `calendarFiscal`, `calendar`, `calendarAd`

**People:**
- `account` - User profile

**Rating:**
- `ratings` - Stars (Half, Solid, Outline)
- `missingItem`

### Icon Usage

**Sizing:**
```css
.icon-small  { width: 16px; height: 16px; }
.icon-medium { width: 24px; height: 24px; }
.icon-large  { width: 48px; height: 48px; }
```

**Color (Grayscale Only):**
```css
.icon { color: var(--text-middle); }
.icon-active { color: var(--fill-80); }
.icon-inverse { color: white; }
```

---

## Utility Components

### WL Block
**Use for:** Placeholder content blocks for layout structure

### WL Lines
**Use for:** Visual separators, dividers, connection lines

### WL Section Header
**Use for:** Section titles with consistent formatting

### WL Sticky
**Use for:** Sticky note annotations for design notes

### WL Table of Contents
**Use for:** Navigation structure visualization

### WL Text
**Use for:** Lorem ipsum alternatives, content placeholders

### WL Color Swatch
**Use for:** Showing grayscale Fill levels documentation

---

## Quick Reference

### Component Selection Table

| Need | Component | Key Specs |
|------|-----------|----------|
| **Text Placeholders** | | |
| Single line | Text Single Line | 4px to 24px bars, Fill/70 |
| Multi-line | Text Paragraph | 1-5 lines, 4/8/12px bars |
| Content block | Text Block | Headline + 1-2 paragraphs |
| **Navigation & Layout** | | |
| Enterprise header | MX Global Navbar | 56px, Fill/80, full-width |
| Collapsible sidebar | Query Panel | 48px/330px, filter badge |
| **Forms** | | |
| 2-4 options, single | Radio List | 24px circular, Fill/80 when selected |
| Multiple selections | Checkbox | 24px square, Fill/80 when checked |
| 5+ options | Dropdown | 40px height, Fill/30 border |
| Date selection | Date Picker | 390px, fiscal/ad variants |
| Text input | Input/Textarea | 40px/84px, Fill/30 border |
| **Data Display** | | |
| Data table | Table | 44px header, 36px rows, sortable |
| Progress | Progress Bar | 300x24px, Fill/10 track, Fill/30 fill |
| Status | Badge/Tag | Fill/80 (high), Fill/40 (med), Fill/20 (low) |
| Notification count | Badge | 16px circle, Fill/50-80 |
| **Actions** | | |
| Primary action | Button | 40px, Fill/80, pill shape |
| Icon action | Icon Button | 32x32px, optional badge |
| **Icons** | | |
| Status | success/error/warning | Outline or Solid, grayscale only |
| Navigation | arrows/chevrons/carets | 24x24px standard |
| Actions | search/check/close/minus | 16-24px |

### Fill Level Usage Guide

| Priority/State | Fill Level | Background | Text Color | Use Case |
|---------------|-----------|------------|------------|----------|
| **Critical** | Fill/100 | #666666 | White | Active pressed, max emphasis |
| **High** | Fill/80-90 | #8F8F8F-#7A7A7A | White | Buttons, selected, active states |
| **Medium** | Fill/60-70 | #B8B8B8-#A3A3A3 | Dark | Badges, secondary emphasis |
| **Normal** | Fill/40-50 | #D6D6D6-#CCCCCC | Dark | Pending states, medium priority |
| **Low** | Fill/20-30 | #EBEBEB-#E0E0E0 | Dark/Light | Backgrounds, inactive states |
| **Minimal** | Fill/0-10 | #FFFFFF-#F5F5F5 | Any | Page background, cards |

### Common Patterns

**Card Component:**
```css
.card {
  background: var(--fill-0);
  border: 2px solid var(--fill-30);
  border-radius: 4px;
  padding: var(--size-24);
}
```

**Section Separator:**
```css
.divider {
  height: 1px;
  background: var(--fill-30);
  margin: var(--size-32) 0;
}
```

**Hover State Pattern:**
```css
.interactive {
  background: var(--fill-80);  /* Default */
}
.interactive:hover {
  background: var(--fill-90);  /* Darker on hover */
}
.interactive:active {
  background: var(--fill-100); /* Darkest when clicked */
}
```

---

## Examples

**Working Prototypes:**
- `grocery-prototype.html` - Retail landing page with cart
- `pricing-analytics-dashboard.html` - Enterprise dashboard with MX Global Navbar

**Both demonstrate:**
- ✅ 100% grayscale compliance
- ✅ Design token usage
- ✅ Interactive components
- ✅ Responsive layouts
- ✅ Proper hierarchy without color

---

## Resources

**Figma File:** [MX Low-Fidelity Component Library](https://www.figma.com/design/kQHACQaxZP5ioEEh25XIWk/MX-Low-Fidelity-Component-Library?m=dev)

**Documentation:**
- This file contains everything you need for prototyping
- CLAUDE.md - Context for AI sessions only

### Do I Need Figma Access?

**NO - You can prototype without Figma or MCP server!**

**This file is designed to be self-sufficient:**
- ✅ Use this file as reference for all components
- ✅ Copy CSS variables and code examples
- ✅ Build prototypes using the documented specs
- ✅ Paste this file into Claude's context for AI assistance
- ✅ Share with team members as standalone guide

**Current Gap: No Visual References**

This documentation includes:
- ✅ All component specifications (dimensions, colors, spacing)
- ✅ Complete CSS code examples
- ✅ Design tokens ready to use
- ❌ No screenshots or visual examples yet

**What this means:**
- You can build components from specs without seeing them
- The HTML prototypes (`grocery-prototype.html`, `pricing-analytics-dashboard.html`) show working examples
- If you want to SEE a component before building, you'll need to check the Figma file

**Future Enhancement:**
Adding screenshots/diagrams to this file would make it 100% independent. For now, use:
1. This file for specs and code
2. HTML prototypes for working examples
3. Figma (optional) for visual reference

**You only need Figma/MCP server if you want to:**
- Extract NEW components not yet documented
- Update specs from latest Figma changes
- Generate designs directly in Figma
- Maintain the documentation itself

**For 99% of prototyping work: Just use this file + HTML examples!**

**Need Help?**
1. Search this file (Cmd/Ctrl + F)
2. Check the Quick Reference table
3. Reference working prototypes (HTML files)
4. Review the grayscale principles section

---

## Validation Checklist

Before considering any prototype complete:

**Grayscale Compliance:**
- [ ] All colors from Fill/0-100 palette only
- [ ] No green/red/blue/yellow anywhere
- [ ] Status shown with Fill levels + symbols/icons
- [ ] Interactive states use Fill progression
- [ ] Checkboxes grayscale when checked (Fill/80)
- [ ] All badges use Fill levels, not colors

**Design Token Usage:**
- [ ] All colors use CSS variables (var(--fill-X))
- [ ] All spacing uses size tokens (var(--size-X))
- [ ] All typography uses defined scales
- [ ] No hardcoded hex values

**Component Accuracy:**
- [ ] Components match specs in this document
- [ ] Correct dimensions and padding
- [ ] Proper hierarchy (size, weight, spacing)
- [ ] Accessible (keyboard navigation, proper contrast)

**Documentation:**
- [ ] Works in black & white print
- [ ] Accessible to color-blind users
- [ ] Components match Figma library

---

**Last Updated:** 2026-05-08

**Status:** Complete reference for independent prototyping (no Figma needed for basic work)

**Note:** This is currently a reference guide. Future enhancement: Add exact hex codes, full CSS implementations, and screenshots for 100% Figma independence.
