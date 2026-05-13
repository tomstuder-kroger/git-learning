# Code to Figma Design Library - Extract-Once Workflow

A token-efficient workflow for aligning existing code to Figma design systems through one-time extraction and manual alignment.

## Purpose

This workflow is optimized for:
- **Ongoing maintenance** of code already aligned to a design system
- **Token-conscious teams** who want to minimize API costs
- **Small to medium codebases** where manual gap identification is feasible
- **Stable design systems** that change infrequently (quarterly or less)
- **Developers who know what needs fixing** and want targeted updates

**Estimated token usage:** 15,000-45,000 tokens/month during active development

**Alternative:** If you need comprehensive gap analysis for initial migrations or have a large codebase with unknown alignment gaps, use [CODE_TO_FIGMA_HYBRID_AUDIT.md](CODE_TO_FIGMA_HYBRID_AUDIT.md) instead.

---

## Prerequisites

Before starting this workflow, ensure you have:

### Required Software
- ✅ **Figma Desktop app** installed and running
- ✅ **Claude Code CLI** installed (tested with Claude Sonnet 4.5+)
- ✅ **Figma MCP server** configured in Claude Code settings

### Figma Setup
- ✅ **Design system file** in Figma with:
  - Variables defined (colors, spacing, typography, effects)
  - Components organized in library
  - Meaningful component names (not "Rectangle 47")
- ✅ **Access permissions** to the Figma file (view or edit)

### Project Setup
- ✅ **Existing app/prototype** with code
- ✅ **Git repository** initialized
- ✅ **Local development server** (for validation)

### Verify MCP Connection

Check that Figma MCP is configured:

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

If not configured, add it and restart Claude Code.

---

## When to Use This Workflow

### ✅ Use Extract-Once When:

1. **Design system is stable**
   - Changes less than once per quarter
   - Token values rarely updated
   - New components added infrequently

2. **You know what needs fixing**
   - Specific components need alignment
   - Manual visual review is straightforward
   - Clear understanding of design system

3. **Token-conscious**
   - Budget limits or cost optimization needed
   - Prefer local reference doc over live Figma queries
   - Team uses design system doc for all UI work

4. **Small to medium codebase**
   - <30 files with styling
   - Can review files manually
   - Gap identification is manageable

5. **Ongoing maintenance mode**
   - Initial alignment already complete
   - Incremental updates as features added
   - Periodic refresh when Figma updates

### ❌ Use Hybrid Audit Instead When:

- First-time migration from prototype to design system
- Large codebase (30+ files) with unknown gaps
- Need comprehensive gap analysis and prioritization
- Design system changes frequently (monthly or more)
- Want automated drift detection

**Switching workflows:** You can start with Hybrid Audit for initial migration, then switch to Extract-Once for ongoing maintenance. See [When to switch workflows](#when-to-switch-workflows).

---

## Core Concepts

Understanding these concepts will help you use this workflow effectively.

### Design Tokens

**Design tokens** are named values that represent design decisions:

```markdown
Primary Color: #3273D1 (Variable: color/primary)
Small Spacing: 8px (Variable: spacing/sm)
Bold Font Weight: 700 (Variable: font/weight/bold)
```

**In code (CSS variables):**

```css
:root {
  --color-primary: #3273D1;
  --spacing-sm: 8px;
  --font-weight-bold: 700;
}
```

### Figma Variables vs. CSS Custom Properties

**Figma Variables** (in Figma Desktop):
- Defined in Variables panel (right sidebar)
- Organized in collections (Colors, Spacing, Typography)
- Applied to component properties
- Example: `color/primary/default`

**CSS Custom Properties** (in code):
- Defined in `:root` or component scope
- Referenced with `var()` syntax
- Browser-native, no build step needed
- Example: `var(--color-primary-default)`

**This workflow extracts Figma Variables and translates them to CSS naming conventions.**

### Component Specifications

**Component specs** define how UI components should look and behave:

```markdown
## Button Component

**Variants:** Primary, Secondary, Tertiary, Danger
**States:** Default, Hover, Active, Focus, Disabled

**Primary Button:**
- Background: color/primary (#3273D1)
- Text: color/text/inverse (#FFFFFF)
- Padding: spacing/sm spacing/md (8px 16px)
- Border Radius: radius/small (4px)
- Height: 40px
```

### DESIGN_SYSTEM.md

The **design system reference document** is a markdown file that contains:
1. All design tokens (colors, spacing, typography, effects)
2. Component specifications (Button, Input, Card, etc.)
3. Patterns and usage guidelines

**This is your single source of truth** for styling in this workflow. You extract it once from Figma, then reference it for all alignment work.

### Manual Alignment

**Manual alignment** means you identify what needs updating through:
- Visual comparison (Figma vs. rendered code)
- Code review (spotting hardcoded values)
- Feature work (new components need design system styling)

Then you prompt Claude with specific requests to fix identified gaps.

**This is different from automated audits** (see Hybrid Audit workflow) where Claude scans and reports all gaps automatically.

---

## Step-by-Step Workflow

This workflow has three phases:
1. **One-Time Extraction** - Extract Figma design system to `DESIGN_SYSTEM.md`
2. **Align Code** - Update code to use design tokens (manual identification)
3. **Maintenance** - Refresh extract when Figma updates

---

### Phase 1: One-Time Extraction

Extract the design system from Figma into a markdown reference document that lives in your repository.

**Time estimate:** 15-30 minutes
**Token cost:** 5,000-15,000 tokens (one-time)

---

#### Step 1.1: Open Figma Desktop

1. **Launch Figma Desktop app** (not browser version)
2. **Open your design system file**
3. **Navigate to the design system page**
   - Usually named "Design System", "Tokens", "Foundations", or "Variables"
   - If unsure, look for the page with Variables panel populated

**Keep Figma Desktop running** throughout the extraction process. The MCP server reads from the active Figma window.

---

#### Step 1.2: Start Claude Code

Open your terminal and navigate to your project:

```bash
cd /path/to/your/project
```

Start Claude Code:

```bash
claude
```

**Verify MCP connection** on startup. You should see:

```
Connected MCP servers:
  - figma-desktop
```

If Figma MCP is not listed, check Prerequisites section for configuration help.

---

#### Step 1.3: Request Extraction

Prompt Claude with:

```
Extract the design system from Figma to a reference document
```

**Claude will automatically:**
- Connect to Figma via MCP server
- Read all Variables from the Variables panel (colors, spacing, typography, effects)
- Capture component definitions, variants, and states
- Document patterns and usage guidelines
- Create `DESIGN_SYSTEM.md` in your project root
- Format everything in readable markdown

**Wait time:** 30-60 seconds depending on design system size

---

#### Step 1.4: Review Extracted Document

Open the generated file:

```bash
cat DESIGN_SYSTEM.md
```

Or open in your editor.

**✅ Verify completeness:**

**Design Tokens section should include:**
- [ ] All color variables (primary, secondary, text, backgrounds, borders)
- [ ] Complete spacing scale (2xs through 3xl or similar)
- [ ] Typography tokens (font families, sizes, weights, line heights)
- [ ] Effects (shadows, border radii, transitions)

**Components section should include:**
- [ ] Commonly used components (Button, Input, Card, etc.)
- [ ] Variants for each component (Primary/Secondary buttons, etc.)
- [ ] States for interactive components (Default, Hover, Focus, Disabled)
- [ ] Specifications (colors, spacing, dimensions)

**Patterns section should include:**
- [ ] Layout patterns (form layouts, card layouts, etc.)
- [ ] Usage guidelines

**⚠️ If anything is missing:**

```
"The spacing tokens are incomplete - extract all spacing variables from Figma"
```

Or extract incrementally:

```
"Extract only the color variables from Figma"
"Extract Button component specifications from Figma"
```

---

#### Step 1.5: Commit to Git

Once you've verified the extraction is complete:

```bash
git add DESIGN_SYSTEM.md
git commit -m "docs: extract Figma design system for reference

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**✅ Phase 1 Complete!** You now have a design system reference document.

> **💡 Tip:** Keep this file at the project root for easy access. All team members should reference this doc when building UI.

---

### Phase 2: Align Code to Design System

Update your code to use design tokens from `DESIGN_SYSTEM.md` instead of hardcoded values.

**Frequency:** Per feature, per file, or per component as needed
**Token cost:** 1,000-3,000 tokens per alignment task

---

#### Step 2.1: Identify What Needs Updating

**Three ways to identify alignment needs:**

**1. Visual comparison (recommended for first-time alignment):**
- Open Figma Design System file
- Open your app in browser
- Compare side-by-side
- Note discrepancies (colors, spacing, sizing, typography)

**2. Code review:**
- Scan CSS files for hardcoded hex colors (`#3273D1`)
- Look for hardcoded pixel values (`16px`, `8px`)
- Find arbitrary values not in design system (`12px`, `18px`)

**3. During feature work:**
- Building new component? Reference `DESIGN_SYSTEM.md` for specs
- Adding new page? Use design tokens from the start

**Document gaps** (optional but helpful):

```markdown
## Alignment TODO
- [ ] Header: button color should be --color-primary
- [ ] Footer: spacing should use --spacing-lg
- [ ] Form inputs: border radius should be --radius-small
```

---

#### Step 2.2: Prompt Claude for Targeted Updates

**Claude reads `DESIGN_SYSTEM.md` (not live Figma)** for all alignment work in this phase. This keeps token costs low.

---

**Example 1: Align entire CSS file to use tokens**

**Prompt:**
```
Update styles.css to use the design tokens from DESIGN_SYSTEM.md
```

**What Claude does:**
1. Reads `DESIGN_SYSTEM.md` to understand token names and values
2. Reads `styles.css` to find hardcoded values
3. Replaces hardcoded values with CSS variables
4. Adds `:root` section with variable definitions if missing

**Before:**
```css
.button {
  background-color: #3273D1;
  padding: 8px 16px;
  border-radius: 4px;
}
```

**After:**
```css
:root {
  --color-primary: #3273D1;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --radius-small: 4px;
}

.button {
  background-color: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-small);
}
```

---

**Example 2: Align specific component**

**Prompt:**
```
Align the button styles in header.css to match the Figma Button component from DESIGN_SYSTEM.md
```

**Claude will:**
- Read Button component spec from `DESIGN_SYSTEM.md`
- Update `header.css` button styles to match exactly
- Ensure all variants and states are included

---

**Example 3: Replace hardcoded colors across multiple files**

**Prompt:**
```
Replace all hardcoded primary color (#3273D1) with var(--color-primary) in header.css, footer.css, and button.css
```

**Claude will:**
- Find all instances of `#3273D1` in the three files
- Replace with `var(--color-primary)`
- Ensure `:root` variable is defined

**Token tip:** Batching multiple files in one prompt is more efficient than separate prompts.

---

**Example 4: Fix spacing to use design system scale**

**Prompt:**
```
Update spacing in form.css to use spacing tokens from DESIGN_SYSTEM.md. Round arbitrary values to nearest token value.
```

**Claude will:**
- Identify spacing values (margin, padding, gap)
- Map to nearest design system token (12px → 8px or 16px)
- Update to use CSS variables

---

#### Step 2.3: Validate Changes

After each alignment, verify the changes work correctly.

**Visual validation:**
1. Start your local dev server
2. Open the app in browser
3. Compare against Figma design
4. Check that styles match (colors, spacing, sizing)

**Code validation:**

```bash
# Check that CSS variables are used
grep -n "var(--" styles.css

# Check for remaining hardcoded colors (should find none)
grep -n "#[0-9A-Fa-f]\{6\}" styles.css
```

**Prompt Claude for automated validation:**

```
Validate that styles.css correctly uses all design tokens from DESIGN_SYSTEM.md
```

Claude will report:
- ✅ Token usage percentage
- ❌ Remaining hardcoded values (with line numbers)
- Recommendations for fixes

---

#### Step 2.4: Commit After Each Alignment

Commit incrementally as you align files:

```bash
git add styles.css
git commit -m "style: align styles.css to design system tokens

- Replace hardcoded colors with CSS variables
- Update spacing to use design system scale
- Add :root with token definitions

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**✅ Phase 2 Complete!** Your code now uses design system tokens.

---

### Phase 3: Maintenance

Keep `DESIGN_SYSTEM.md` in sync with Figma when the design system changes.

**Frequency:** Quarterly, or when major Figma updates occur
**Token cost:** 5,000-15,000 tokens per refresh

---

#### Step 3.1: Determine When to Refresh

**Refresh the extract when:**
- ✅ Design system has significant updates (new colors, components, tokens)
- ✅ Quarterly maintenance (scheduled sync)
- ✅ Designer notifies you of changes
- ✅ You notice mismatches between `DESIGN_SYSTEM.md` and Figma

**Check last update date:**

```bash
git log -1 --format="%ai %s" DESIGN_SYSTEM.md
```

If more than 3 months old and design system is active, consider refreshing.

---

#### Step 3.2: Re-Extract Design System

Open Figma Desktop with the design system file, then prompt Claude:

```
Re-extract the design system from Figma and update DESIGN_SYSTEM.md
```

Claude will:
- Read current Figma design system
- Overwrite `DESIGN_SYSTEM.md` with latest values
- Preserve the structure you're familiar with

---

#### Step 3.3: Review Changes

Check what changed using git diff:

```bash
git diff DESIGN_SYSTEM.md
```

**Common changes to look for:**

```diff
- Primary: `#3273D1` (Variable: `color/primary`)
+ Primary: `#2E6BC6` (Variable: `color/primary`)

+ New component: Badge
+ - Variants: Info, Success, Warning, Error
+ - States: Default, Hover, Active
```

**Ask Claude to summarize changes:**

```
Show me a summary of what changed in DESIGN_SYSTEM.md compared to the previous version
```

---

#### Step 3.4: Update Affected Code

**If token values changed:**

Good news! If you're using CSS variables correctly, **no code changes needed**. The CSS variables reference the new values automatically.

```css
/* This automatically updates when DESIGN_SYSTEM.md changes */
:root {
  --color-primary: #2E6BC6; /* Updated value */
}

.button {
  background: var(--color-primary); /* No change needed */
}
```

**If new components added:**

Consider using them in new features. Example:

```
"I see Badge component was added to DESIGN_SYSTEM.md. Create a reusable Badge component in components/Badge.js following the design system specs"
```

**If tokens removed:**

Find alternative tokens:

```
"The color/accent token was removed from DESIGN_SYSTEM.md. What should I replace it with? Suggest an alternative from the current design system."
```

---

#### Step 3.5: Commit Updated Design System

```bash
git add DESIGN_SYSTEM.md
git commit -m "docs: refresh design system from Figma

- Update primary color from #3273D1 to #2E6BC6
- Add Badge component specifications
- Update spacing scale (added 2xs and 3xl)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**✅ Phase 3 Complete!** Design system is up-to-date.

---

## Quick Reference

| Task | Prompt |
|------|--------|
| **Initial Setup** |
| Extract design system | `Extract the design system from Figma to a reference document` |
| Verify extraction | `cat DESIGN_SYSTEM.md` |
| **Alignment** |
| Align entire file | `Update styles.css to use the design tokens from DESIGN_SYSTEM.md` |
| Align specific component | `Align button styles to match the Figma Button component from DESIGN_SYSTEM.md` |
| Replace hardcoded colors | `Replace all hardcoded #3273D1 with var(--color-primary) in [files]` |
| Fix spacing | `Update spacing in form.css to use spacing tokens, rounding to nearest token` |
| **Validation** |
| Validate file | `Validate that styles.css correctly uses all design tokens from DESIGN_SYSTEM.md` |
| Check for hardcoded values | `grep -n "#[0-9A-Fa-f]\{6\}" styles.css` |
| **Maintenance** |
| Refresh extract | `Re-extract the design system from Figma and update DESIGN_SYSTEM.md` |
| See what changed | `git diff DESIGN_SYSTEM.md` |
| Summarize changes | `Show me a summary of what changed in DESIGN_SYSTEM.md` |

---

## When to Switch Workflows

### From Extract-Once to Hybrid Audit

**Switch when:**
- Codebase has grown significantly (now 30+ files)
- Suspect widespread drift from design system
- Need comprehensive gap report for planning
- New team members joining (want automated onboarding)

**How to switch:**
1. Keep your `DESIGN_SYSTEM.md` (already extracted)
2. Follow [CODE_TO_FIGMA_HYBRID_AUDIT.md](CODE_TO_FIGMA_HYBRID_AUDIT.md)
3. Run initial audit to find all gaps
4. Fix gaps incrementally
5. Return to Extract-Once for maintenance

### From Hybrid Audit to Extract-Once

**Switch when:**
- Initial migration complete (all major gaps fixed)
- Design system stabilizes (quarterly updates or less)
- Team comfortable with design system
- Want to reduce token costs

**How to switch:**
1. You already have `DESIGN_SYSTEM.md` from Hybrid workflow
2. Follow this document for ongoing alignment
3. Run Hybrid audit quarterly for health checks

---

## Notes

- Always keep Figma Desktop app open when extracting
- `DESIGN_SYSTEM.md` is your single source of truth for styling
- Commit this file to git so entire team uses the same reference
- Refresh quarterly or when design system has major updates
- Token costs stay low because you reference local doc, not live Figma

---

**Last Updated:** 2026-04-07
**Claude Code Version:** Compatible with Figma MCP Server (figma-desktop)
**Related Documents:**
- [CODE_TO_FIGMA_HYBRID_AUDIT.md](CODE_TO_FIGMA_HYBRID_AUDIT.md) - Automated audit workflow
- [FIGMA_WORKFLOW.md](FIGMA_WORKFLOW.md) - Figma to Code implementation
