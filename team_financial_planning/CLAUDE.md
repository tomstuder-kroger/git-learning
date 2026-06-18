# Team Financial Planning App — Project Context

## What We're Building

An app to support leadership development through fiscal responsibility, scenario planning, and collaboration on Team and Portfolio budgets and forecasts.

The starting point is the implementation guide in `financial-dashboard.md`, which outlines a Design Team Financial Dashboard with the following feature areas:

- Executive Summary Dashboard (key metrics, status indicators)
- Financial Health Tab (budget vs. actual, burn rate, variance)
- Capacity & Velocity Tab (sprint velocity, utilization, bottleneck analysis)
- Revenue Impact Tab (project ROI, design contribution to revenue)
- Scenario Planning Tab (base/optimistic/pessimistic modeling, sensitivity analysis)
- Budget Builder Tab (headcount, tools, freelance, training, equipment)
- Settings & Data Tab (import/export, reports, data management)

**Proposed tech stack:** React + Recharts + Tailwind CSS, deployed to Vercel.

---

## Status

**Session date:** 2026-06-10

We reviewed the implementation guide and assessed viability. The guide is technically thorough, but before planning begins, the following questions need to be answered to confirm scope, purpose, and fit.

---

## Open Questions — Answer These Before Planning

### Your Role and Context

1. **Are you currently a team lead/manager responsible for a design team budget, or are you preparing to move into that role?**
   This affects whether the app is a learning/development tool or an operational tool used day-to-day.
   - Answer: ___

2. **Does your organization already have financial tooling (e.g., Adaptive Planning, Anaplan, shared Finance spreadsheets)?**
   If so, how would this dashboard relate — personal lens on existing data, or the source of truth?
   - Answer: ___

### Scope and Scale

3. **The implementation guide covers a single Design team. You mentioned "Team and Portfolio" — do you need to track multiple teams or business units?**
   That would be a significantly larger scope than what's currently described.
   - Answer: ___

4. **The Capacity & Velocity tab uses story points and sprint data. Is your team running Agile/Scrum? Do you have a project tracking tool (Jira, Linear, etc.) where this data already lives?**
   - Answer: ___

### Collaboration

5. **Who else would use this dashboard — just you, your team, finance partners, or your own leadership?**
   The current design has no authentication or multi-user sync. Is that a concern?
   - Answer: ___

6. **The Revenue Impact tab calculates design's contribution to revenue. Do you have an existing methodology or stakeholder agreement on how to measure that?**
   Without a baseline, this section may be the hardest to make credible.
   - Answer: ___

### Your Primary Goal

7. **When you say "improve leadership through fiscal responsibility" — is the primary value in the act of building and maintaining this (developing financial fluency), or in having a polished artifact to present to leadership and stakeholders?**
   These two purposes lead to very different app designs.
   - Answer: ___

---

## Next Steps (After Answering Questions)

1. Review answers above to confirm or revise scope
2. Run `/plan` to create an implementation plan
3. Determine data sources and whether integrations are needed
4. Confirm single-user vs. multi-user requirements
5. Begin phased build
