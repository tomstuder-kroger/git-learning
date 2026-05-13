# Discovery Template Sections - Detailed Guide

## Section 1: Discovery Summary

### Purpose
Provides essential metadata about the discovery. This section acts as a quick reference and ensures organizational alignment from the start.

### What to Include
- **Discovery Name**: Clear, concise, descriptive (3-5 words)
- **Discovery Status**: Not Started / In Progress / Ready for Viability Call / Approved / In Solution Design
- **Product Manager**: Lead PM for this discovery
- **Designer**: Lead design resource (if applicable)
- **Engineering Lead**: Tech lead or architect who will validate feasibility
- **Business Stakeholder**: Executive sponsor or business owner
- **Jira Link**: Link to Jira epic or initiative (if available)
- **OKR Alignment**: Which OKR does this discovery support?
- **Due Date**: Target for completing discovery

### Why It Matters
This section ensures that:
- Clear ownership and accountability exist
- Strategic alignment is explicit (not assumed)
- Right stakeholders are engaged early
- Timeline and status are transparent

### Common Mistakes

**❌ Generic names**
- "Q3 Project"
- "Improvement Initiative"
- "Feature Work"

**❌ Missing stakeholders**
- Only PM listed, missing design/engineering/business input
- No business stakeholder or executive sponsor
- Unclear who makes the viability decision

**❌ Vague OKR alignment**
- "Support strategic goals"
- No specific OKR referenced
- "Nice to have, no specific OKR"

**✓ Strong examples**
- "Reduce Checkout Abandonment by 15%"
- "Enable Single-Sign-On for Enterprise Customers"
- "Automate Warehouse Intake Process"

### Example - Good

```markdown
## Discovery Summary

- **Discovery Name**: Reduce Checkout Abandonment Rate
- **Discovery Status**: In Progress
- **Product Manager**: Sarah Chen
- **Designer**: Marcus Rodriguez
- **Engineering Lead**: Priya Patel
- **Business Stakeholder**: VP of Revenue
- **Jira Link**: https://jira.company.com/browse/PROD-1234
- **OKR Alignment**: Q3 OKR: Increase GMV by 12%
- **Target Completion**: May 15, 2026
```

### Example - Needs Improvement

```markdown
## Discovery Summary

- **Discovery Name**: Project X
- **Discovery Status**: In Progress
- **Product Manager**: John
- **OKR Alignment**: General improvement goal
- (Missing: Designer, Engineering Lead, Business Stakeholder, Jira Link)
```

### Coaching Questions
- What makes this discovery unique or valuable?
- Who absolutely needs to approve this work?
- How does this connect to our annual strategy?
- When does this need to be decided by?

---

## Section 2: Business Problem

### Purpose
Articulate the problem you're solving in specific, observable, and evidence-backed terms. This is the foundation of everything that follows.

### What to Include
- **Problem Statement**: Concise, specific description of the problem
- **Who Experiences It**: Specific user roles, teams, or customer segments
- **When/How Often**: Under what scenarios? How frequently does it occur?
- **Business Impact**: What's the cost of not solving this? (time, money, risk, quality)
- **Concrete Examples**: Specific stories or scenarios showing the problem
- **Evidence**: Research, data, or feedback backing up the problem

### Why It Matters
A clear business problem ensures:
- Team aligns on what they're solving (not the solution)
- Scope stays focused and doesn't creep
- Success criteria are clear
- Viability decision is informed by real need, not opinions

### Common Mistakes

**❌ Vague problems**
- "Improve user experience"
- "Make the system faster"
- "Better reporting capabilities"

**❌ No evidence**
- "We think users want..."
- "Everyone says the current process is broken"
- "It's been a pain point for a while"

**❌ Missing concrete examples**
- "Users struggle with the workflow"
- (No specific scenario showing the struggle)

**❌ Confusing problem with solution**
- "We need to build a dashboard to see real-time data"
- (Solution: dashboard. But what's the problem? Why is real-time data needed?)

**✓ Strong examples**
- "Category managers spend 8 hours/month manually reconciling gross margin because the current system doesn't auto-calculate category-level margins, causing 2-3 day delays in reporting"
- "Support team fields 150+ monthly tickets about order status because order tracking isn't visible in customer self-service portal"
- "Warehouse intake averages 45 min/day due to 3-way data entry (WMS, Excel, email), creating 12% data inconsistency rate"

### Example - Good

```markdown
## Business Problem

**Problem Statement:**
The F&A team cannot confidently report gross margin data to executives because
current system calculations don't properly account for regional category-level
discounts, requiring 8+ hours/month of manual spreadsheet work to validate.

**Who Experiences It:**
- Category Managers (8 people) who prepare monthly reports
- VP of Finance who needs confidence in reported numbers
- Regional CFOs who make pricing decisions based on margin data

**When/How Often:**
- Occurs monthly during reporting close (first 5 days of each month)
- Impacts every category (20+ categories monitored)
- Has caused 2-3 day delays in board reporting 3x in past 6 months

**Business Impact:**
- $2-3M in potential mis-pricing due to unreliable margin data
- 64 hours/month of PM time (8 PMs × 8 hours) spent on reconciliation
- Board report delays create executive uncertainty about financial health

**Concrete Example:**
In March, the system reported Widget Category at 22% margin. After manual
verification, actual margin was 18% due to regional discounts. This discrepancy
nearly led to a $500K pricing decision that would've been wrong.

**Evidence:**
- Financial audit in Q1 identified margin calculation gaps
- Time tracking shows F&A team averages 8.3 hours/month on reconciliation
- 3 instances in past 6 months where reported margin differed >3% from actual
```

### Example - Needs Improvement

```markdown
## Business Problem

**Problem Statement:**
Reporting is hard.

**Who Experiences It:**
Finance people.

**When/How Often:**
Sometimes, when doing reports.

**Business Impact:**
It costs time.

(Missing concrete examples, no evidence, no specific data)
```

### Coaching Questions
- What specific problem are you trying to solve?
- Who is most impacted? Can you name them or their role?
- Walk me through a specific time this problem occurred
- What's the business impact if this stays unsolved?
- How do you know this is a problem? (research, data, feedback?)
- Could you quantify the impact? (time, money, risk, quality?)
- What have people tried as workarounds?

---

## Section 3: Expected Outcomes

### Purpose
Define what success looks like in measurable, business-relevant terms. This becomes your north star for solution design and validation.

### What to Include
- **Primary Business Outcomes**: What will change as a result of solving this problem?
- **Success Metrics**: How will you know the outcomes were achieved?
- **Baseline**: Current state measurement
- **Target**: Desired future state measurement
- **Timeline**: When should outcomes be achieved?
- **Key Result Alignment**: How this connects to OKRs or strategic goals

### Why It Matters
Clear outcomes ensure:
- Team understands what "done" looks like
- Solution design is focused on business value, not just features
- Success can be measured and validated
- Viability decisions are made against clear criteria

### Common Mistakes

**❌ Vague outcomes**
- "Improve margin reporting"
- "Make the system more intuitive"
- "Better customer experience"

**❌ No metrics**
- "Users will be happier"
- "Team will work more efficiently"
- "System will be more reliable"

**❌ No baseline or targets**
- "Reduce reporting time" (from what? to what?)
- "Improve margin accuracy" (by how much?)

**❌ Unrealistic timelines**
- "Achieve all outcomes in Q1" (when discovery won't be done until Q2)

**✓ Strong examples**
- "Reduce F&A manual margin reconciliation from 8 hours/month to <1 hour/month within 3 months of launch"
- "Achieve >95% margin accuracy without manual verification (vs. current 87%) within 6 weeks of launch"
- "Support can resolve 80% of order status inquiries via self-service (vs. current 15%) within 2 months"

### Example - Good

```markdown
## Expected Outcomes

**Primary Business Outcomes:**
1. F&A team can confidently report gross margin without manual verification
2. Margin reporting is ready 3+ days earlier in close process
3. Category managers can make data-driven pricing decisions immediately

**Success Metrics:**

| Metric | Baseline | Target | Timeline |
|--------|----------|--------|----------|
| Monthly manual reconciliation time | 8 hours | <1 hour | 3 months post-launch |
| Margin calculation accuracy | 87% | >95% | 6 weeks post-launch |
| Margin reporting delivery date | Day 5 of close | Day 2 of close | 3 months post-launch |
| Executive confidence in reports (survey) | 68% | >90% | 3 months post-launch |

**OKR Alignment:**
- Supports Q3 OKR: "Improve financial reporting accuracy and speed to enable faster strategic decision-making"
- Contributes to: "Reduce operational overhead in Finance by 20%"
```

### Example - Needs Improvement

```markdown
## Expected Outcomes

- Margin reporting will be better
- Accuracy will improve
- Team will spend less time on reconciliation

(No specific metrics, baselines, or targets)
```

### Coaching Questions
- What will be different if this problem is solved?
- How will you measure that difference?
- What's the current state of that metric? (baseline)
- What should it be? (target)
- By when should this be achieved?
- How will this improve the business? (revenue, cost, risk, strategic?)
- Who cares about this outcome? (stakeholder validation)

---

## Section 4: Discovery Execution

### Purpose
Plan how you'll conduct the discovery - what research, who you'll talk to, and what timeline works.

### What to Include
- **Stakeholders to Interview**: Key users, business owners, support, adjacent teams
- **Research Methods**: Interviews, surveys, data analysis, competitive research, etc.
- **Discovery Timeline**: When research will happen, decision date
- **Current Process Understanding**: How does the current process work?
- **Key Open Questions**: What do you need to understand?

### Why It Matters
A clear discovery plan ensures:
- Right voices are heard
- You'll have sufficient evidence for viability decision
- Timeline is realistic
- Assumptions are tested, not assumed

### Common Mistakes

**❌ No stakeholder input**
- Only PM perspective included
- No user/operator input
- No business stakeholder insight

**❌ Unclear research methods**
- "Will do interviews" (how many? who? with whom?)
- No concrete plan for gathering evidence

**❌ Unrealistic timeline**
- "Discovery done in 1 week" (for complex initiative)
- "No decision deadline set"

**✓ Strong examples**
- Interview 8-10 category managers (60-90 min each), 2 regional CFOs, 3 finance system analysts
- Analyze margin calculation logic with finance system SME (technical spike)
- Review 3 months of manual reconciliation logs for patterns
- Decision target: May 15

### Example - Good

```markdown
## Discovery Execution

**Stakeholders to Interview:**
- 8 Category Managers (who do daily margin analysis)
- 2 Regional CFOs (who use reports for pricing decisions)
- 3 Finance System Analysts (who understand current calculation logic)
- 1 CFO/VP Finance (business stakeholder)
- 2 Support engineers (understand system limitations)

**Research Methods:**
1. User interviews (category managers, CFOs) - 60 min each, 10 total
2. Technical spike with finance system team - 8 hours
3. Analysis of 3-month reconciliation logs
4. Competitive research on other F&A systems
5. Data analysis of error patterns and frequency

**Timeline:**
- Week 1: Schedule and conduct interviews (5 interviews)
- Week 2: Complete remaining interviews + technical spike
- Week 3: Analyze findings, identify patterns, draft discoveries
- May 10: Internal alignment on findings
- May 15: Viability call with stakeholders
- Decision: Go/No-Go for solution design

**Key Open Questions:**
- What's driving the regional discount complexity?
- Are there system limitations preventing margin auto-calculation?
- What data does the system currently track at category level?
- Is there appetite for a new system vs. current system changes?
```

### Coaching Questions
- Who absolutely needs to be part of the discovery? Why?
- How will you understand the current process? (observation, walkthrough, data analysis?)
- What key assumptions do you need to validate?
- What timeline makes sense for this discovery?
- When does the decision need to be made?

---

## Section 5: Use Cases & Business Requirements

### Purpose
Define the specific scenarios and requirements that the solution must address. These become the foundation for design and development.

### What to Include
- **Primary Use Cases**: The 2-3 main scenarios the solution must support
- **Edge Cases**: Unusual but important scenarios
- **Business Requirements**: What the solution must do (not how to build it)
- **Constraints**: Regulatory, technical, organizational limits
- **Priority**: Which use cases are must-have vs. nice-to-have

### Why It Matters
Clear use cases ensure:
- Solution design addresses real scenarios (not edge cases)
- Team understands the scope
- Requirements are tied to user/business needs
- Solutions are testable against real-world usage

### Common Mistakes

**❌ Too vague**
- "Support margin reporting" (doesn't specify the scenario)
- "Improve accuracy" (what aspect? under what conditions?)

**❌ Confusing requirements with solutions**
- "Add a dashboard" (solution, not requirement)
- Should be: "Provide real-time visibility to margin data" (requirement)

**❌ Not prioritized**
- 20+ requirements without priority
- Unclear what's essential vs. nice-to-have

**✓ Strong examples**
- Primary: "Category manager can view current category margin including regional discounts within 5 seconds"
- Primary: "System auto-calculates margin after discount application (no manual math needed)"
- Edge case: "Handle year-end close scenario where late discounts arrive after close"

### Example - Good

```markdown
## Use Cases & Business Requirements

### Primary Use Cases

**Use Case 1: Real-Time Margin Visibility**
- Category Manager opens margin report
- Views current margin for all 20+ categories including regional discount impacts
- Can drill down to understand margin drivers
- Gets results in <5 seconds
- **Priority**: Must-Have
- **Frequency**: Daily (6-10 times/day per category manager)

**Use Case 2: Auto-Calculation of Discounted Margin**
- System receives discount data input (regional, promotional, contract-based)
- System automatically calculates final margin after all discount types
- Category Manager reviews calculated margin (vs. manually calculating)
- **Priority**: Must-Have
- **Frequency**: Weekly during pricing cycles

**Use Case 3: Variance Analysis**
- CFO views month-to-date margin vs. forecast
- Drill down to understand variance drivers (volume, price, cost, discount)
- Export variance analysis for board report
- **Priority**: Should-Have
- **Frequency**: Monthly during close

### Edge Cases

**Edge Case 1: Late Discounts in Close Period**
- Discount received after month-end close has already happened
- System can restate prior period margin with late discount
- Audit trail shows what changed and when
- **Priority**: Nice-to-Have
- **Frequency**: Monthly, 2-3 times

**Edge Case 2: Multi-Currency Margins**
- Support categories with transactions in multiple currencies
- Margin calculated at each currency level and consolidated
- **Priority**: Should-Have (currently limited to USD, but multi-currency planned)
- **Frequency**: 3-4 categories affected now, 20+ planned

### Business Requirements

**Accuracy Requirements**
- Margin calculations must match financial system reconciliation (no variances >$1)
- Baseline discount data must be 100% accurate
- Applied discounts must be traceable to source

**Performance Requirements**
- Margin report loads in <5 seconds
- Drill-down results in <3 seconds
- Monthly variance analysis completes in <5 min

**Data Requirements**
- System must handle 20+ categories
- Support up to 10 regional discount tiers
- 3-year historical data accessible

**Constraints**
- Must integrate with existing financial system (no data migration)
- Cannot change month-end close process (too risky)
- Budget approved: $250K implementation
```

### Coaching Questions
- What's the most important scenario this solution needs to address?
- Walk me through a specific example of someone using the solution
- What happens if the system doesn't support this use case?
- Are there scenarios where the current approach breaks?
- What's changing that makes this use case important now?

---

## Section 6: Envisioned Future State

### Purpose
Show what the user/process will look like after the solution is implemented. Helps team visualize the improvement and validates that the design will actually solve the problem.

### What to Include
- **User Flow/Process Flow**: Step-by-step view of the improved scenario
- **Key Interactions**: How will users interact with the solution?
- **System Integration**: How does this fit into existing systems?
- **What's Improved**: Specific comparison to current state
- **Artifacts**: User flows, swimlane diagrams, mockups, story maps

### Why It Matters
A clear future state ensures:
- Solution is envisioned to actually solve the problem
- Team understands the full context, not just isolated requirements
- Design can be validated against this vision
- Stakeholders can picture the outcome

### Common Mistakes

**❌ No artifacts**
- Just description, hard to visualize
- Unclear how components connect

**❌ Only happy path**
- What about errors? Exceptions? Slow performance?
- Not realistic to actual usage

**❌ Missing system integration**
- Solution in isolation, not in context of other systems
- Unclear how data flows

**✓ Strong examples**
- User flow from problem → diagnosis → action
- Swimlane diagram showing who does what
- Before/After process comparison

### Example - Good

```markdown
## Envisioned Future State

### Current State - Margin Reporting
1. Month closes (day 1)
2. Finance system auto-calculates category margins (basic level)
3. Category Manager exports data, opens Excel
4. Manually applies regional discounts (4+ hours)
5. Manually calculates adjusted margins
6. Spots variance from forecast, digs into drivers (2+ hours)
7. Sends report to CFO by day 5
8. CFO questions accuracy, requests manual validation
9. Finance team re-validates with source data (2+ hours)

**Problems:** 8+ hours/month, 13-18% error rate, 3-4 day delay

### Future State - Margin Reporting
1. Month closes (day 1)
2. Finance system receives regional discount data (auto-feed or batch upload)
3. System auto-calculates category margin including discounts (< 5 min)
4. Category Manager opens margin report, views instant results (< 5 seconds load)
5. System highlights variances from forecast automatically
6. Manager drills down by variance type (volume, discount, cost) with one click
7. Exports report with calculations intact for board (< 2 min)
8. CFO reviews with confidence - margin accuracy is system-guaranteed
9. Board gets report by day 2

**Improvements:** <1 hour/month, <2% error rate, ready day 2

### User Flow - New Margin Reporting

```
[Category Manager]
        |
        ├─> Open Margin Report Dashboard
        |   ├─> View all categories with current margin + variance from forecast
        |   ├─> [Category detail click]
        |   |   ├─> View margin calculation breakdown (price, cost, discount, final)
        |   |   ├─> View variance drivers (volume, price, cost, discount)
        |   |   ├─> [Compare vs. forecast]
        |   |   └─> [Historical trends]
        |   └─> Export margin report (with audit trail)
        |
        └─> Send to CFO
            ├─> CFO reviews with confidence
            └─> Board reporting ready
```

### System Integration

**Data Flows:**
- Financial System → Margin calculator (category-level data)
- Discount source (SAP/manual) → Discount engine → Margin calculator
- Margin calculator → Reporting dashboard
- Dashboard → Export/reporting (BI tool)

**Integration Points:**
- Real-time or daily feed from financial system
- Discount data import (batch or API)
- Read-only access to historical data
- No data in current system changes
```

### Coaching Questions
- What will be different for the user?
- Walk me through the future scenario step-by-step
- How does this solve the original problem?
- What's simpler or faster?
- What new capabilities are possible?
- How does this connect to other systems?

---

## Section 7: Measurement Plan

### Purpose
Define how you'll track whether the expected outcomes were achieved. This ensures accountability and learning.

### What to Include
- **Success Metrics**: The key metrics that indicate success
- **Measurement Approach**: How you'll collect the data
- **Baseline & Target**: Current state and desired future state
- **Timeline**: When outcomes will be measured
- **Ownership**: Who is responsible for measurement

### Why It Matters
A clear measurement plan ensures:
- Success is defined upfront, not after launch
- Team can track progress and impact
- Learning drives future decisions
- ROI can be calculated

### Common Mistakes

**❌ No metrics defined**
- "We'll measure impact later"
- "Success is obvious when we see it"

**❌ Metrics without baseline**
- "Reduce time from 8 hours to X" (what's X?)
- "Improve accuracy to Y" (from what baseline?)

**❌ Difficult to measure**
- "Improve user satisfaction" (how? survey? NPS?)
- "Increase efficiency" (which efficiency? how measured?)

**❌ Not owned**
- No one responsible for collecting data
- "Finance team will track" (but not assigned to specific person)

**✓ Strong examples**
- "Reduce manual reconciliation from 8 hrs/month to <1 hr/month (measured via time tracking)"
- "Achieve >95% margin accuracy (measured via variance testing)"
- "Deliver report by day 2 of close (measured via close calendar)"

### Example - Good

```markdown
## Measurement Plan

### Success Metrics

| Metric | Type | Baseline | Target | Timeline | Measurement Approach | Owner |
|--------|------|----------|--------|----------|----------------------|-------|
| Manual reconciliation time | Efficiency | 8 hrs/month | <1 hr/month | 6 weeks post-launch | Time tracking in Jira | Category Manager Lead |
| Margin accuracy | Quality | 87% | >95% | 8 weeks post-launch | Monthly variance testing vs. manual verification | Finance System Analyst |
| Margin report completion date | Speed | Day 5 of close | Day 2 of close | 6 weeks post-launch | Close calendar tracking | CFO |
| System adoption | Adoption | TBD | 100% of category managers using daily | 4 weeks post-launch | Dashboard usage analytics | Product Manager |
| Executive confidence (survey) | Satisfaction | 68% | >90% | 8 weeks post-launch | Post-launch survey of stakeholders | VP Finance |

### Measurement Approach

**Efficiency (Manual Time)**
- Method: Time tracking - each category manager logs reconciliation time in Jira
- Frequency: Daily during close process
- Baseline: 8.3 hours/month average (from historical time tracking logs)

**Quality (Margin Accuracy)**
- Method: Monthly variance testing - compare system-calculated margins to manual re-verification
- Frequency: First month post-launch, then spot-checking monthly
- Baseline: 87% accuracy from Q1 audit findings

**Speed (Report Completion)**
- Method: Close calendar - track actual delivery date of margin report
- Frequency: Every month-end close
- Baseline: Currently day 5, target day 2

**Adoption (Usage)**
- Method: Dashboard analytics - daily active users, report views per user
- Frequency: Daily metrics, weekly review
- Target: 100% of category managers using by week 4

**Satisfaction**
- Method: Post-launch survey of finance stakeholders (5-10 people)
- Frequency: One-time at 6 weeks post-launch
- Questions: Confidence in data, ease of use, time savings

### Timeline
- Week 1-4 post-launch: Establish baseline collection
- Week 6: Initial assessment of efficiency and adoption
- Week 8: Full measurement against all targets
- Ongoing: Monthly monitoring of key metrics

### Success Criteria
- ✅ Reconciliation time < 1 hr/month
- ✅ Margin accuracy > 95%
- ✅ Report ready by day 2
- ✅ > 80% adoption by week 4
- ✅ Executive confidence survey >90% satisfied

### Post-Launch Review
- If metrics not achieved: Diagnose root cause and plan improvements
- If overachieved: Document what's working and scale to other teams
- Learning: What worked? What didn't? What should we do differently next time?
```

### Coaching Questions
- How will you know if this solution worked?
- What are you trying to achieve? (outcomes)
- How will you measure that?
- What's the current state? (baseline)
- What should it be? (target)
- Who will collect the data?
- When will you measure?
- Who cares about these metrics?

---

## Section 8: Open Questions & Risks

### Purpose
Document assumptions, uncertainties, and risks. This helps the team address unknowns and prepares for obstacles.

### What to Include
- **Open Questions**: What don't you know yet?
- **Assumptions**: What are you assuming (that should be validated)?
- **Risks**: What could go wrong?
- **Mitigation Plans**: How will you address each risk?

### Why It Matters
Acknowledging unknowns ensures:
- Team isn't surprised mid-project
- Risks are addressed proactively
- Assumptions are tested, not ignored
- Solution design accounts for uncertainties

### Common Mistakes

**❌ No risk discussion**
- Assumes everything will go smoothly
- Not prepared for obstacles

**❌ Vague risks**
- "Timeline risk" (what could cause delays? By how much?)
- "Technical risk" (what specifically? How will you validate?)

**❌ No mitigation plans**
- Identified risks but no plan to address them
- Wishful thinking instead of planning

**✓ Strong examples**
- "Risk: Legacy system can't provide real-time discount data. Mitigation: Technical spike in week 1 to confirm API capability"
- "Risk: Finance resistance to new process. Mitigation: Include CFO in design, 2 training sessions before launch"

### Example - Good

```markdown
## Open Questions & Risks

### Open Questions

**System Integration**
- Can the legacy financial system provide real-time discount data via API?
  - Impact: Critical - solution depends on this
  - Plan: Technical spike week 1, 4-hour investigation with system team
  - Decision needed by: May 1

**Volume/Performance**
- What's the expected transaction volume at scale (multi-regional)?
  - Impact: Important for system design
  - Plan: Data analysis with analytics team, week 2
  - Decision needed by: May 8

**Regulatory**
- Are there audit/regulatory requirements for margin calculation methodology?
  - Impact: Could constrain solution approach
  - Plan: Finance compliance review, week 1
  - Decision needed by: May 1

### Assumptions

**Technical Assumptions**
- ✓ System can process discount data in near real-time
- ✓ Historical data can be restatted if late discounts arrive
- Validate: Technical spike (week 1)

**User Assumptions**
- ✓ Category managers will adopt system for daily decision-making
- ✓ Current Excel process can be fully replaced
- Validate: User interviews, design collaboration

**Business Assumptions**
- ✓ CFO will approve >$250K investment
- ✓ ROI of time savings justifies investment
- Validate: CFO alignment discussion in week 1

### Risks

| Risk | Impact | Probability | Mitigation | Owner |
|------|--------|-------------|-----------|-------|
| Legacy system API unavailable | Critical - blocks solution | Medium | Technical spike week 1; identify workaround (ETL/batch) | Eng Lead |
| Finance team resistance to change | High - adoption failure | Medium | Include finance in design; 2 training sessions | PM + VP Finance |
| Regulatory requirements complicate solution | High - design changes | Low | Compliance review week 1 | Finance |
| Multi-regional discount complexity higher than expected | Medium - scope creep | Medium | Scope to USD first; plan phased rollout | PM |
| Delay getting discount source data | Medium - timeline delay | Low | Establish data pipeline requirements early | PM |

### Risk Monitoring
- Weekly risk review in team standup
- Escalate new risks immediately to PM + business stakeholder
- Re-baseline timeline if risks materialize
```

### Coaching Questions
- What don't you know yet?
- What are you assuming that might not be true?
- What could prevent this from succeeding?
- How will you address each risk?
- Who needs to validate assumptions upfront?

---

## Summary

A strong discovery document:
- ✅ Specific problem, not generic
- ✅ Evidence-backed (research, data, feedback)
- ✅ Clear business value quantified
- ✅ Measurable success criteria
- ✅ Realistic assumptions with validation plans
- ✅ Risks identified and mitigated
- ✅ Team and stakeholders aligned

Each section builds on the previous:
1. **Summary** provides context
2. **Problem** explains why this matters
3. **Outcomes** define success
4. **Execution** plans how to discover
5. **Use Cases** specify what to build
6. **Future State** visualizes the solution
7. **Measurement** tracks impact
8. **Risks** prepares for obstacles
