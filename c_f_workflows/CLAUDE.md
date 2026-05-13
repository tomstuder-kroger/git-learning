# CLAUDE.md

This file provides guidance to Claude Code when working with the Figma workflow documentation in this directory.

## Purpose

This directory contains **workflow documentation for aligning code to Figma design systems** using Claude Code with the Figma MCP server.

All three documents guide teams through different workflows involving Figma and code:
- **Figma → Code**: Implementing Figma designs into code
- **Code → Figma**: Aligning existing code to Figma design systems (two approaches)

## Documents Overview

### FIGMA_WORKFLOW.md
**Direction:** Figma → Code
**Purpose:** Implement Figma designs into application code
**Use case:** Designer creates design in Figma, developer implements it in code using Claude

**Key features:**
- Select node in Figma Desktop
- Claude fetches design context (layout, colors, typography, spacing)
- Generates pixel-perfect code matching the design
- Validates implementation against Figma specs

---

### CODE_TO_FIGMA_EXTRACT_ONCE.md
**Direction:** Code → Figma (token-efficient approach)
**Purpose:** Align existing code to Figma design system through one-time extraction
**Use case:** Ongoing maintenance, stable design systems, small codebases

**Key features:**
- One-time extraction of Figma design system to `DESIGN_SYSTEM.md`
- Manual gap identification (visual comparison, code review)
- Targeted alignment prompts referencing local doc
- Low token usage (15,000-45,000/month)
- Periodic refresh when Figma updates

**When to use:**
- Design system stable (changes <1x per quarter)
- Small to medium codebase (<30 files)
- Team knows what needs fixing
- Token-conscious

---

### CODE_TO_FIGMA_HYBRID_AUDIT.md
**Direction:** Code → Figma (comprehensive audit approach)
**Purpose:** Align existing code to Figma design system through automated audits
**Use case:** Initial migrations, large codebases, drift detection

**Key features:**
- Extraction + automated audit comparing code vs. Figma
- Prioritized gap reports (Critical/High/Medium/Low)
- Batch or incremental fixes
- Periodic health checks for drift detection
- Higher token usage (30,000-70,000 initial, 10,000-25,000 maintenance)

**When to use:**
- First-time migration from prototype to design system
- Large codebase (30+ files) with unknown gaps
- Need comprehensive gap analysis
- Quarterly health checks

---

## Document Relationships

### Cross-References
All three documents reference each other:
- **FIGMA_WORKFLOW.md** is the reverse direction (Figma → Code)
- **Extract-Once** and **Hybrid Audit** link to each other for workflow switching
- Both Code → Figma workflows reference Extract-Once Phase 1 for extraction steps

**IMPORTANT:** When updating one document, check if cross-references need updating in others.

### Design Spec
Full design specification: `../docs/superpowers/specs/2026-04-07-code-to-figma-workflows-design.md`

This spec defines:
- Document structure (10 common sections + workflow-specific sections)
- Technical implementation details
- Validation processes
- Troubleshooting guidance
- Token usage estimates
- Success criteria

**When making significant changes to workflow docs, verify they still match the spec.**

---

## Maintenance Guidance

### When to Update These Documents

**Quarterly review:**
- User feedback from teams using the workflows
- New troubleshooting scenarios discovered
- Token estimate adjustments (as Claude models evolve)
- New example sessions from real usage

**When Figma MCP updates:**
- Test all workflows still work with new MCP version
- Update prompts if MCP API changes
- Add new features if MCP adds capabilities
- Update tool names if renamed

**When Claude Code features change:**
- Update prompt formats if syntax changes
- Adjust token estimates for new models
- Add new validation techniques
- Update prerequisite setup instructions

### What to Check When Updating

**Content consistency:**
- [ ] Common sections (Prerequisites, Core Concepts, etc.) are identical across Extract-Once and Hybrid Audit
- [ ] Cross-references between documents use correct paths
- [ ] Example prompts are copy-paste ready (no placeholders)
- [ ] Token estimates are current and realistic
- [ ] All code examples are complete and tested

**Cross-document sync:**
- [ ] If Prerequisites change, update both Code → Figma docs
- [ ] If Core Concepts change, update both Code → Figma docs
- [ ] If extraction process changes, update both docs (Extract-Once Phase 1 is referenced by Hybrid)
- [ ] If Figma MCP setup changes, update all three docs

**Link integrity:**
- [ ] Internal links work (e.g., `#phase-1-one-time-extraction`)
- [ ] Cross-document links work (e.g., `CODE_TO_FIGMA_EXTRACT_ONCE.md`)
- [ ] Links to design spec work (`../docs/superpowers/specs/...`)

---

## Design Decisions

### Why Two Code → Figma Workflows?

**Extract-Once (token-efficient):**
- Optimizes for ongoing maintenance
- Minimizes token costs by referencing local `DESIGN_SYSTEM.md`
- Manual gap identification (developer-driven)
- Best for stable design systems

**Hybrid Audit (comprehensive):**
- Optimizes for initial migrations
- Automated gap detection and prioritization
- Provides comprehensive reports for planning
- Best for large unknowns

**Users can switch between workflows:**
- Start with Hybrid for initial migration (get comprehensive analysis)
- Switch to Extract-Once for maintenance (reduce token costs)
- Return to Hybrid quarterly for health checks

### Why Separate from FIGMA_WORKFLOW.md?

- **Different directions:** Figma → Code vs. Code → Figma
- **Different use cases:** Implementing new designs vs. aligning existing code
- **Different workflows:** Design-first vs. code-first
- **Different outputs:** New code matching design vs. refactored code using tokens

Keeping them separate makes it easier for users to find the right workflow for their situation.

---

## Token Usage Notes

**Estimates may need updating as:**
- Claude models improve efficiency
- Figma MCP optimizes data transfer
- Claude Code CLI improves caching

**Current estimates (as of 2026-04-07):**
- Extraction: 5,000-15,000 tokens
- Full audit (small codebase): 15,000-25,000 tokens
- Full audit (medium): 25,000-40,000 tokens
- Full audit (large): 40,000-70,000 tokens
- Alignment task: 1,000-3,000 tokens
- Validation: 500-2,000 tokens

**When updating estimates:**
- Update all three locations: Extract-Once, Hybrid Audit, and design spec
- Include reasoning in commit message
- Test with real workflows to verify

---

## Common Update Scenarios

### Scenario 1: Figma MCP API Changes

**Files to update:**
- All three workflow docs (Prerequisites section)
- Design spec (if API fundamentally changes)

**What to check:**
- MCP server installation instructions
- Example prompts (if syntax changes)
- Tool capabilities (if new features added)

**Testing:**
- Verify extraction still works
- Verify audit still works
- Verify Figma → Code implementation still works

---

### Scenario 2: User Reports Gap in Troubleshooting

**Files to update:**
- Extract-Once (Troubleshooting section)
- Hybrid Audit (Troubleshooting section)

**What to add:**
- Issue symptoms
- Root causes
- Step-by-step solutions
- Example prompts for fixing

**Keep in sync:**
- Both Code → Figma docs should have identical Troubleshooting sections

---

### Scenario 3: New Code → Figma Pattern Discovered

**Example:** "Users find it helpful to create CSS tokens file separately from styles.css"

**Files to update:**
- Extract-Once (Phase 2: Alignment)
- Hybrid Audit (Phase 3: Batch Fixes)
- Design spec (Technical Implementation section)

**What to add:**
- New example prompt
- Expected output
- When to use this pattern vs. existing patterns

---

## Related Files

**In this directory:**
- `FIGMA_WORKFLOW.md` - Figma → Code workflow
- `CODE_TO_FIGMA_EXTRACT_ONCE.md` - Code → Figma (token-efficient)
- `CODE_TO_FIGMA_HYBRID_AUDIT.md` - Code → Figma (comprehensive audit)

**Design specification:**
- `../docs/superpowers/specs/2026-04-07-code-to-figma-workflows-design.md`

**Example outputs** (when created):
- `DESIGN_SYSTEM.md` - Extracted design system (lives in project root)
- `docs/audits/design-system-audit-YYYY-MM-DD.md` - Audit reports (archived)

---

## Quick Edits Checklist

When making quick updates:

1. **Read the design spec first** - ensure changes align with original requirements
2. **Update both Code → Figma docs** if editing common sections
3. **Test example prompts** - verify they're still copy-paste ready
4. **Check cross-references** - ensure links still work
5. **Update token estimates** if workflow steps change significantly
6. **Commit with clear message** - explain what changed and why

---

## Future Enhancements to Consider

- Add "Example Projects" section with links to demo repos
- Create visual flowcharts for each workflow (Mermaid diagrams)
- Add troubleshooting decision tree
- Include video walkthrough links (if created)
- Add integration guides (Storybook, Chromatic, etc.)
- Create comparison table (when to use which workflow)

---

**Last Updated:** 2026-04-07
**Maintained By:** Claude Code sessions with user approval
**Questions?** Check design spec first, then ask user for clarification
