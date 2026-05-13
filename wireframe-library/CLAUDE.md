# Wireframe Library Project - Claude Context

## Project Overview

This is a **design system documentation and prototyping project** for the **MX Low-Fidelity Component Library** from Figma. The goal is to enable rapid wireframe prototyping using a grayscale-only component library.

**Figma File:** https://www.figma.com/design/kQHACQaxZP5ioEEh25XIWk/MX-Low-Fidelity-Component-Library?m=dev

### 🎯 User's Goal: Complete Figma Independence

**IMPORTANT:** User wants a fully independent design reference file so they don't need to access Figma for prototyping.

**What this means:**
- ✅ Add exact hex codes (not just token names)
- ✅ Include complete CSS implementations (copy-paste ready)
- ✅ Add screenshots or visual diagrams of components
- ✅ Document exact pixel dimensions for everything
- ✅ Provide framework-specific code examples (React, Vue, etc.)
- ✅ Include all interaction states with exact specifications

**Current status:** DESIGN-SYSTEM.md has comprehensive specs but still references Figma for visual confirmation and some exact values.

**Future enhancement:** Make DESIGN-SYSTEM.md 100% self-sufficient for prototyping without ever opening Figma.

---

## Core Principle: Grayscale-Only Design

### ⚫ THE MOST IMPORTANT RULE

**This design system uses ONLY grayscale colors (Fill/0 through Fill/100).**

- ❌ **NO colored status indicators** (no green/red/yellow/blue)
- ❌ **NO accent colors**
- ❌ **NO brand colors**
- ✅ **ONLY black, white, and shades of grey**

### Why This Matters

When working on this project:
1. **Always use grayscale** for any prototypes
2. **Status is shown with Fill levels** (Fill/80 = high, Fill/40 = medium, Fill/20 = low)
3. **Use symbols for meaning** (✓✕⚠ℹ, not colors)
4. **Interactive states use Fill progression** (Fill/80 → Fill/90 → Fill/100)

**If you see ANY colored elements in code or designs, they are WRONG and must be fixed.**

See `GRAYSCALE_WIREFRAME_PRINCIPLES.md` for complete guidelines.

---

## Project Structure

### Documentation Files

**THE Master File:**
- `DESIGN-SYSTEM.md` - Everything you need in one place
  - Grayscale principles
  - Design tokens (CSS variables)
  - All components with specs
  - Quick reference tables
  - Usage guidelines
  - Code examples

**For AI Only:**
- `CLAUDE.md` - Session context (you're reading this now)

### Working Prototypes

**Examples:**
- `grocery-prototype.html` - Retail landing page with shopping cart
- `pricing-analytics-dashboard.html` - Enterprise dashboard with MX Global Navbar

**Both are:**
- ✅ 100% grayscale compliant
- ✅ Fully interactive (no frameworks needed)
- ✅ Standalone HTML files (open in any browser)
- ✅ Using MX design system tokens

---

## Key Components Documented

### Must-Know Components

1. **Text Blocks** (Horizontal Bars)
   - The core innovation: bars instead of lorem ipsum
   - Text Single Line, Text Paragraph, Text Block
   - Used for all placeholder text in wireframes

2. **MX Global Navbar** (Node: 730:24683)
   - Enterprise header component
   - 56px height, Fill/80 background
   - Includes: hamburger menu, logo, app name, notifications, profile

3. **Data Table** (Nodes: 1178:43261, 1178:43812)
   - Sortable columns
   - Filter row (optional)
   - Pagination
   - Checkbox selection

4. **Query Panel/Form**
   - Collapsible sidebar (48px → 330px)
   - Filter icon with badge

### Design Tokens

**Colors (Grayscale Only):**
```css
--fill-0: #FFFFFF   (background)
--fill-10: #F5F5F5  (cards)
--fill-20: #EBEBEB  (surfaces)
--fill-30: #E0E0E0  (borders)
--fill-40: #D6D6D6  (interactive)
--fill-50: #CCCCCC  (medium)
--fill-60: #B8B8B8  (badges)
--fill-70: #A3A3A3  (text blocks)
--fill-80: #8F8F8F  (buttons)
--fill-90: #7A7A7A  (emphasis)
--fill-100: #666666 (max contrast)
```

**Spacing:**
- Size/size-4, 8, 16, 24, 32, 48

**Typography:**
- Header XL/L/M/S/XS (38px down to 11px)
- Text L/M/S (14px, 12px, 10px)

---

## Common Tasks

### Creating a New Prototype

1. **Start with design.md** - Reference which components to use
2. **Copy design tokens** - Use CSS variables from existing prototypes
3. **Use grayscale only** - Fill/0-100 palette exclusively
4. **Reference examples** - grocery-prototype.html or pricing-analytics-dashboard.html
5. **Validate compliance** - No colors, only grey shades

### Adding a New Component to Documentation

1. **Get node ID** from Figma (use get_metadata)
2. **Document in design.md** (quick reference section)
3. **Add full spec to design-system-complete.md** (with dimensions, variants)
4. **Include grayscale usage** (which Fill levels to use)
5. **Update quick reference tables**

### Fixing Color Violations

If you find colored elements:

```css
/* WRONG */
.status-success { color: green; }
.checkbox:checked { background: blue; }

/* CORRECT */
.status-success {
  background: var(--fill-80);  /* Dark emphasis */
  color: white;
}
.checkbox:checked {
  background: var(--fill-80);
  color: white;
}
```

---

## Figma Integration

### Available MCP Tools

**Connected:** Figma Desktop MCP server at http://127.0.0.1:3845/mcp

**Use these tools:**
- `get_design_context` - Get component code and design
- `get_screenshot` - Visual reference
- `get_metadata` - Structure and node IDs
- `get_variable_defs` - Design token values

### Node ID Reference

**Key Components:**
- MX Global Navbar: `730:24683`
- Simple Data Table: `1178:43261`
- Filterable Table: `1178:43812`
- Query Panel (collapsed): `434:16633`
- Query Panel (expanded): `434:16635`
- Tag Label Standard: `141:12270`
- Tag Label Compact: `141:12421`

See design-system-complete.md for full list.

---

## Design Patterns

### Status Communication (Grayscale)

**High Priority/Active:**
```css
background: var(--fill-80);  /* Dark */
color: white;
icon: ✓ or relevant symbol
```

**Medium Priority/Pending:**
```css
background: var(--fill-40);  /* Medium */
color: var(--text-dark);
icon: ⚠ or relevant symbol
```

**Low Priority/Inactive:**
```css
background: var(--fill-20);  /* Light */
color: var(--text-light);
icon: ℹ or relevant symbol
```

### Interactive States

**Buttons:**
```css
default: Fill/80
hover: Fill/90
active: Fill/100
disabled: Fill/40 + opacity 0.6
```

**Form Inputs:**
```css
default: white background, Fill/30 border
focus: Fill/80 border, 2px
error: Fill/80 border (NOT red!)
disabled: Fill/20 background
```

---

## What NOT to Do

### ❌ Common Mistakes

1. **Using colors for status**
   ```css
   /* WRONG */
   .success { color: green; }
   ```

2. **Guessing hex codes**
   - Always use design tokens (var(--fill-X))
   - Never hardcode colors

3. **Adding blue checkboxes**
   - Use Fill/80 background when checked
   - White checkmark symbol

4. **Colored icons or badges**
   - All icons are grayscale
   - Badges use Fill levels for emphasis

5. **Skipping design.md**
   - Always check documentation first
   - Components are already defined

---

## Testing & Validation

### Grayscale Compliance Checklist

Before finishing any work:

- [ ] All colors are from Fill/0-100 palette
- [ ] No green/red/blue/yellow anywhere
- [ ] Status shown with Fill levels + symbols
- [ ] Interactive states use Fill progression
- [ ] Checkboxes are grayscale when checked
- [ ] Badges use Fill levels (not colors)
- [ ] Design works in black & white print
- [ ] Components match design.md specifications

### Cross-Browser Testing

Open prototypes in:
- Chrome/Edge
- Firefox
- Safari

All should work identically (no frameworks, pure HTML/CSS/JS).

---

## Workflow

### Typical Session Flow

1. **User asks to create a prototype**
   - Reference design.md for components
   - Check examples (grocery or dashboard)
   - Use design tokens from existing files

2. **Building the prototype**
   - Copy CSS variables (design tokens)
   - Use grayscale only
   - Reference component specs from design-system-complete.md
   - Validate with get_screenshot if using Figma

3. **User reviews and requests changes**
   - Check if changes maintain grayscale
   - Update components as needed
   - Document any new patterns

4. **Finalizing**
   - Run grayscale compliance checklist
   - Update documentation if new components added
   - Create summary of what was built

---

## File Organization

```
wireframe-library/
├── DESIGN-SYSTEM.md                   # THE master file (everything you need)
├── CLAUDE.md (this file)              # Context for AI only
├── grocery-prototype.html             # Working example 1
└── pricing-analytics-dashboard.html   # Working example 2
```

**Simple. Clean. 4 files total.**

- **DESIGN-SYSTEM.md** - Comprehensive reference, paste into Claude context
- **CLAUDE.md** - AI session context (user doesn't read this)
- **HTML files** - Working prototypes demonstrating the system

---

## Quick Wins

### Fast References

**Everything in one place:**
→ DESIGN-SYSTEM.md (search with Cmd/Ctrl + F)

**Need a specific component?**
→ DESIGN-SYSTEM.md → Quick Reference table (bottom)

**Need exact specs?**
→ DESIGN-SYSTEM.md → Component sections (detailed specs)

**Need to understand grayscale?**
→ DESIGN-SYSTEM.md → Core Principles section

**Need working code?**
→ DESIGN-SYSTEM.md (CSS examples) or HTML prototypes

**Need design tokens?**
→ DESIGN-SYSTEM.md → Design Tokens section (copy-paste CSS)

---

## Context for Claude

### What You Should Know

1. **This is a wireframe library** - Low-fidelity only, grayscale only
2. **User wants prototypes** - Working HTML files, not Figma designs
3. **Documentation is source of truth** - DESIGN-SYSTEM.md has everything
4. **Figma is reference** - We document from it, don't edit it
5. **Grayscale is non-negotiable** - Any colors = wrong
6. **Goal: Figma independence** - User wants to prototype without opening Figma

### What You Should Do

✅ **Always reference DESIGN-SYSTEM.md first** before suggesting components
✅ **Use design tokens** from DESIGN-SYSTEM.md (CSS variables)
✅ **Validate grayscale** - Double-check no colors snuck in
✅ **Check examples** - See how patterns are implemented in HTML files
✅ **Update DESIGN-SYSTEM.md** - If you discover/add new components

❌ **Don't guess components** - They're all documented in DESIGN-SYSTEM.md
❌ **Don't use colors** - Grayscale only
❌ **Don't reinvent patterns** - They exist in examples
❌ **Don't create multiple docs** - Keep everything in one master file

---

## Recent Work (Session Context)

### What We Just Completed

1. ✅ Created grocery landing page prototype
2. ✅ Created pricing analytics dashboard
3. ✅ Added MX Global Navbar to dashboard
4. ✅ Fixed all color violations (blue checkboxes, red/green status)
5. ✅ Documented all components in design.md and design-system-complete.md
6. ✅ Created grayscale principles guide
7. ✅ Updated all cross-references

### Current State

- All documentation files are synchronized
- Both prototypes are 100% grayscale compliant
- All MX components are documented with node IDs
- Design tokens are consistent across all files

---

## Future Sessions

### If User Asks To...

**"Create a new prototype"**
→ Reference design.md components, use existing prototypes as templates

**"Add a component"**
→ Check Figma with get_design_context, document in both .md files

**"Fix colors"**
→ Replace with Fill levels, add symbols, update to grayscale

**"Update documentation"**
→ Keep design.md and design-system-complete.md in sync

**"Explain grayscale approach"**
→ Reference GRAYSCALE_WIREFRAME_PRINCIPLES.md

---

## Success Criteria

A session is successful if:

✅ All prototypes use only Fill/0-100 (grayscale)
✅ Documentation is complete and synchronized
✅ New components are added to both .md files
✅ Examples work in all browsers
✅ User understands the grayscale principle

---

## Last Updated

**Date:** 2026-05-08
**Session:** Initial setup complete
**Status:** All files updated and synchronized
**Grayscale Compliance:** 100%
