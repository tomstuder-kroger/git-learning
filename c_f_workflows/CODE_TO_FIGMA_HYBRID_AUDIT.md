# Code to Figma Design Library - Hybrid Audit Workflow

A comprehensive workflow for aligning existing code to Figma design systems through automated audits, batch fixes, and periodic drift detection.

## Purpose

This workflow is optimized for:
- **Initial migrations** from prototypes to design systems
- **Large codebases** (30+ files) with unknown alignment gaps
- **Comprehensive gap analysis** with prioritized action plans
- **Frequent design system changes** that need drift detection
- **Teams that prefer automated guidance** over manual review

**Estimated token usage:** 30,000-70,000 tokens during initial migration, 10,000-25,000 tokens/month for maintenance

**Alternative:** If you have a stable design system, small codebase, and know what needs fixing, use [CODE_TO_FIGMA_EXTRACT_ONCE.md](CODE_TO_FIGMA_EXTRACT_ONCE.md) for lower token costs.

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

### ✅ Use Hybrid Audit When:

1. **Initial migration**
   - Moving from prototype to production with design system
   - Unknown number of gaps between code and design system
   - Need comprehensive analysis before starting work
   - Want prioritized action plan for team

2. **Large codebase**
   - 30+ files with styling
   - Manual gap identification would take hours/days
   - Need to distribute fixes across team
   - Want automated reporting

3. **Comprehensive gap analysis needed**
   - Management wants effort estimates
   - Need to prioritize by impact (Critical/High/Medium/Low)
   - Want to track progress systematically
   - Building backlog from audit results

4. **Frequent design system changes**
   - Design system updated monthly or more
   - Need drift detection between updates
   - Want automated "what changed" reports
   - Prefer automated alignment checks over manual review

5. **Quarterly health checks**
   - Want periodic comprehensive audits
   - Check for drift from design system
   - Ensure new code follows patterns
   - Maintain high design system adoption

### ❌ Use Extract-Once Instead When:

- Design system is stable (changes quarterly or less)
- Small codebase (<30 files) where manual review is feasible
- Token budget is constrained
- You know exactly what needs fixing
- Prefer manual control over automated reports

**Workflow transition:** After initial migration with Hybrid Audit, switch to Extract-Once for ongoing maintenance to reduce token costs. Run Hybrid audits quarterly for health checks.

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

**This is your single source of truth** for styling in this workflow.

### Automated Audits

**Automated audits** compare your codebase against the Figma design system and generate comprehensive gap reports.

**Claude scans:**
- CSS files for hardcoded values (colors, spacing, sizing)
- Component files for pattern mismatches
- HTML for structural issues

**Claude compares against:**
- Figma variables (design tokens)
- Component specifications
- Design system patterns

**Claude reports:**
- **Critical**: Accessibility issues, major visual breaks
- **High**: Hardcoded values, missing components
- **Medium**: Minor spacing/sizing differences
- **Low**: Nice-to-have refinements

### Drift Detection

**Drift** occurs when code diverges from the design system over time:
- New hardcoded values introduced
- Components updated without using tokens
- Inconsistent implementations across files

**Drift detection** automatically identifies these issues by comparing current code state to design system and previous code state.

---

## Step-by-Step Workflow

This workflow has four phases:
1. **Initial Extraction** - Extract Figma design system to `DESIGN_SYSTEM.md`
2. **Automated Audit** - Scan codebase and generate gap report
3. **Batch or Incremental Fixes** - Update code based on prioritized gaps
4. **Periodic Health Checks** - Quarterly drift detection and re-audits

---

### Phase 1: Initial Extraction

Extract the design system from Figma into a markdown reference document that lives in your repository.

**Time estimate:** 15-30 minutes
**Token cost:** 5,000-15,000 tokens (one-time)

---

#### Follow Extract-Once Phase 1 Steps

See [CODE_TO_FIGMA_EXTRACT_ONCE.md - Phase 1](CODE_TO_FIGMA_EXTRACT_ONCE.md#phase-1-one-time-extraction) for detailed extraction instructions:

1. Open Figma Desktop with design system file
2. Start Claude Code
3. Request extraction: `"Extract the design system from Figma to a reference document"`
4. Review `DESIGN_SYSTEM.md` for completeness
5. Commit to git

**Quick version:**

```bash
# In Figma: Open design system file
# In terminal:
cd /path/to/your/project
claude
```

Prompt Claude:
```
Extract the design system from Figma to a reference document
```

Review and commit:
```bash
cat DESIGN_SYSTEM.md  # verify completeness
git add DESIGN_SYSTEM.md
git commit -m "docs: extract Figma design system for reference"
```

**✅ Phase 1 Complete!** You now have `DESIGN_SYSTEM.md` as your source of truth.

---

### Phase 2: Automated Audit

Run a comprehensive audit comparing your codebase to the Figma design system.

**Time estimate:** 1-2 hours (audit runs in minutes, review takes time)
**Token cost:** 15,000-40,000 tokens depending on codebase size

---

#### Step 2.1: Run Your First Audit

**Prompt:**
```
Audit this codebase against the Figma design system
```

**For large codebases, scope the audit:**
```
Audit the src/components/ directory against the Figma design system
```

**Claude will automatically:**
1. Read Figma design system (variables, components, patterns)
2. Scan codebase files (CSS, HTML, JS/JSX/Vue/etc.)
3. Compare code vs. design system
4. Identify gaps and categorize by priority
5. Generate comprehensive markdown report

**Wait time:** 1-5 minutes depending on codebase size

---

#### Step 2.2: Interpret the Audit Report

Claude generates a markdown report with this structure:

**Summary:**
```markdown
## Summary
- Files scanned: 12
- Gaps found: 47
- Critical: 3
- High: 15
- Medium: 22
- Low: 7
```

**Understanding priority levels:**

**Critical (fix immediately):**
- Accessibility violations (color contrast, focus indicators)
- Major visual breaks
- Usability issues
- WCAG non-compliance

**High (fix this sprint):**
- Hardcoded design token values (colors, spacing)
- Missing components that exist in design system
- Significant visual mismatches
- Inconsistent patterns

**Medium (fix next sprint):**
- Minor spacing/sizing differences
- Font weight variations
- Non-critical inconsistencies

**Low (backlog):**
- Nice-to-have refinements
- Minor visual polish
- Documentation updates

---

#### Step 2.3: Review Report with Team

**Save the audit report:**

```
Save the audit report to docs/design-system-audit-2026-04-07.md
```

**Team discussion topics:**
1. Which critical issues can we fix today?
2. How many high priority items can we tackle this sprint?
3. Do we need to adjust the design system (if gaps are intentional)?
4. Who owns which categories of fixes?

---

#### Step 2.4: Prioritize Gaps

**Ask Claude for prioritization help:**

```
Show me only the critical and high priority gaps from the audit
```

```
What are the top 5 most important issues to fix based on impact?
```

```
Group the audit gaps by file so we can assign owners
```

**Create backlog:**
- Add each gap as a ticket in your project management tool
- Assign priority labels (Critical/High/Medium/Low)
- Estimate effort (audit often includes time estimates)
- Assign to team members

**✅ Phase 2 Complete!** You have a prioritized action plan.

---

### Phase 3: Batch or Incremental Fixes

Update code based on the prioritized audit gaps.

**Time estimate:** Varies (1-2 weeks for large migrations)
**Token cost:** 3,000-10,000 tokens per batch fix

---

#### Step 3.1: Choose Your Approach

**Batch approach (recommended for initial migration):**
- Fix all gaps of one type across multiple files
- Example: "Fix all hardcoded colors", "Align all buttons"
- Faster, more consistent
- Better for dedicated migration sprints

**Incremental approach (recommended for ongoing work):**
- Fix one file or component at a time
- Example: "Fix header.css", "Align Button component"
- Less disruptive to active development
- Better for parallel feature work

**Hybrid approach:**
- Critical + High priority items in batch
- Medium + Low priority items incrementally

---

#### Step 3.2: Batch Fixes

**Example: Fix all hardcoded colors**

**Prompt:**
```
Fix all hardcoded primary colors to use design tokens. The audit found these in header.css, footer.css, and button.css.
```

**Claude will:**
1. Read `DESIGN_SYSTEM.md` for correct token name
2. Update all three files
3. Ensure `:root` variables are defined
4. Report what was changed

**Validate:**
```
Validate that header.css, footer.css, and button.css now use design tokens for all colors
```

**Commit:**
```bash
git add header.css footer.css button.css
git commit -m "style: replace hardcoded primary colors with design tokens

- header.css: 3 instances
- footer.css: 2 instances
- button.css: 5 instances

All now use var(--color-primary)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

**Example: Fix all spacing inconsistencies**

**Prompt:**
```
Fix all spacing values in form.css to use design system tokens. Round arbitrary values to nearest spacing token.
```

**Claude will:**
- Replace hardcoded pixel values with CSS variables
- Round 12px to either 8px (--spacing-sm) or 16px (--spacing-md)
- Explain rounding decisions

---

#### Step 3.3: Incremental Fixes

**Example: Fix one file**

**Prompt:**
```
Fix the gaps in header.css identified in the audit report
```

**Claude will:**
- Read audit report findings for header.css
- Fix all gaps in that file
- Validate changes

---

**Example: Fix one component**

**Prompt:**
```
Align all buttons across the app to match the Figma Button component
```

**Claude will:**
- Find all button-related CSS and components
- Update to match Button spec from DESIGN_SYSTEM.md
- Ensure consistency across files

---

#### Step 3.4: Track Progress

**After each batch of fixes, check progress:**

```
Re-audit the files we just fixed to verify they're now aligned
```

Or:

```
How many gaps from the original audit are still outstanding?
```

**Update backlog:**
- Mark completed tickets as done
- Track percentage complete (e.g., "Completed 15/47 gaps")

**✅ Phase 3 Complete!** Code is aligned to design system.

---

### Phase 4: Periodic Health Checks

Run regular audits to detect drift and ensure ongoing alignment.

**Frequency:** Quarterly, or when design system has major updates
**Token cost:** 2,000-40,000 tokens depending on audit scope

---

#### Step 4.1: When to Run Health Checks

**Quarterly schedule (recommended):**
- Q1, Q2, Q3, Q4 - run full audit
- Check for drift since last audit
- Update design system extract if Figma changed

**Event-driven:**
- After major design system updates in Figma
- After large feature launches
- When new team members join (ensure they're following patterns)
- If visual inconsistencies noticed

---

#### Step 4.2: Light vs. Full Audits

**Light audit (2,000-8,000 tokens):**
- Scope to specific files or directories
- Check for new hardcoded values since last commit
- Quick drift detection

**Prompt:**
```
Check if any files have drifted from DESIGN_SYSTEM.md since last month
```

```
Audit the src/components/buttons/ directory for design system compliance
```

---

**Full audit (15,000-40,000 tokens):**
- Scan entire codebase
- Comprehensive gap analysis
- Annual or bi-annual

**Prompt:**
```
Audit the entire codebase against the Figma design system
```

---

#### Step 4.3: Review Drift Report

**Claude's drift report shows:**
- New hardcoded values introduced (with dates and authors if using git)
- Files that previously used tokens but now don't
- Inconsistencies across similar components

**Example drift report:**
```markdown
## Drift Detection Report
Period: Last 90 days

⚠️ 3 new hardcoded values introduced:
1. dashboard.css (added 2026-04-02):
   - Line 23: background: #3273D1 (should use var(--color-primary))

✅ No changes to existing token usage (good!)

⚠️ Design system updated on 2026-03-15:
   - color/primary changed from #3273D1 to #2E6BC6
   - DESIGN_SYSTEM.md not refreshed since 2026-03-01

Recommendation: Re-extract design system to capture latest changes
```

---

#### Step 4.4: Fix Drift Issues

**Use Extract-Once approach for maintenance fixes:**

```
Fix the new hardcoded color in dashboard.css to use var(--color-primary)
```

**If design system outdated, refresh it:**

```
Re-extract the design system from Figma and update DESIGN_SYSTEM.md
```

(See [CODE_TO_FIGMA_EXTRACT_ONCE.md - Phase 3](CODE_TO_FIGMA_EXTRACT_ONCE.md#phase-3-maintenance) for details)

---

#### Step 4.5: Archive Audit Reports

**Keep audit history:**

```bash
mkdir -p docs/audits
mv design-system-audit-2026-04-07.md docs/audits/
git add docs/audits/
git commit -m "docs: archive Q2 2026 design system audit"
```

**Track trends over time:**
- Are gaps decreasing quarter-over-quarter?
- Are new files following design system patterns?
- Is token adoption increasing?

**✅ Phase 4 Complete!** Design system health maintained.

---

## Quick Reference

| Task | Prompt |
|------|--------|
| **Initial Setup** |
| Extract design system | `Extract the design system from Figma to a reference document` |
| Run first audit | `Audit this codebase against the Figma design system` |
| Scope audit | `Audit the src/components/ directory against the Figma design system` |
| **Audit Review** |
| Show critical/high only | `Show me only the critical and high priority gaps from the audit` |
| Top issues by impact | `What are the top 5 most important issues to fix?` |
| Group by file | `Group the audit gaps by file` |
| Save audit report | `Save the audit report to docs/design-system-audit-YYYY-MM-DD.md` |
| **Fixes** |
| Batch fix colors | `Fix all hardcoded primary colors to use design tokens in [files]` |
| Batch fix spacing | `Fix all spacing values to use design tokens, rounding to nearest token` |
| Fix one file | `Fix the gaps in header.css identified in the audit report` |
| Align component | `Align all buttons to match the Figma Button component` |
| **Health Checks** |
| Check for drift | `Check if any files have drifted from DESIGN_SYSTEM.md since last month` |
| Light audit | `Audit the src/components/buttons/ directory for compliance` |
| Full audit | `Audit the entire codebase against the Figma design system` |
| Re-extract | `Re-extract the design system from Figma and update DESIGN_SYSTEM.md` |
| **Progress Tracking** |
| Verify fixes | `Re-audit the files we just fixed to verify they're now aligned` |
| Count remaining gaps | `How many gaps from the original audit are still outstanding?` |

---

## When to Switch Workflows

### From Hybrid Audit to Extract-Once

**Switch when:**
- Initial migration complete (all Critical/High gaps fixed)
- Design system stabilizes (quarterly updates or less)
- Team comfortable with design system patterns
- Want to reduce token costs for ongoing maintenance

**How to switch:**
1. Complete your current sprint of fixes
2. Run final full audit to confirm alignment
3. Switch to [CODE_TO_FIGMA_EXTRACT_ONCE.md](CODE_TO_FIGMA_EXTRACT_ONCE.md) for daily work
4. Keep `DESIGN_SYSTEM.md` (already extracted)
5. Return to Hybrid Audit quarterly for health checks

**Token savings:** 15,000-25,000 tokens/month vs. 30,000-70,000 during active migration

---

### From Extract-Once to Hybrid Audit

**Switch when:**
- Codebase has grown significantly
- Suspect widespread drift
- New team members need comprehensive guidance
- Quarterly health check time

**How to switch:**
1. Run full audit using this workflow
2. Review and prioritize gaps
3. Fix gaps using batch approach
4. Return to Extract-Once after cleanup

---

## Notes

- Always keep Figma Desktop open when extracting or auditing
- `DESIGN_SYSTEM.md` is your source of truth
- Archive audit reports to track progress over time
- Batch fixes are more token-efficient than individual fixes
- Switch to Extract-Once workflow after initial migration to save tokens
- Run quarterly audits for drift detection

---

**Last Updated:** 2026-04-07
**Claude Code Version:** Compatible with Figma MCP Server (figma-desktop)
**Related Documents:**
- [CODE_TO_FIGMA_EXTRACT_ONCE.md](CODE_TO_FIGMA_EXTRACT_ONCE.md) - Token-efficient maintenance workflow
- [FIGMA_WORKFLOW.md](FIGMA_WORKFLOW.md) - Figma to Code implementation
