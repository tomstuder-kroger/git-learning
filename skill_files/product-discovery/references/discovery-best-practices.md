# Product Discovery Best Practices

This guide covers fundamental principles and patterns for effective product discovery.

---

## Core Philosophy

### Fall in Love with the Problem, Not the Solution

The biggest mistake in product discovery is jumping to solutions before understanding the problem deeply.

**Anti-Pattern:**
```
"We need to build a dashboard"
"We need to hire more people"
"We need to switch to a new system"
```

**Why this fails:**
- You might build the wrong thing
- You miss the real root cause
- You design for a symptom, not the problem
- You waste resources on a solution that doesn't match the need

**Better Approach:**
```
"What problem do we actually need to solve?"
"Who is experiencing this problem?"
"What's the impact if we don't solve it?"
"What have they tried? What works? What doesn't?"
```

**Example - Transformation:**

**Bad Start:**
"We need a real-time dashboard to improve reporting"

**After Deeper Discovery:**
"Category managers need real-time visibility to margin data so they can make pricing decisions without waiting 4 days for close process to complete. Current system doesn't support real-time calculation because discounts are applied offline."

The first statement is a solution. The second is a problem that can be solved multiple ways.

---

### Validate Early, Validate Often

Don't wait until launch to validate your understanding. Test assumptions continuously.

**When to Validate:**
- Early: Before committing to solution design
- Continuously: As you discover new information
- Mid-project: As design and engineering proceed
- Pre-launch: Final validation before going live

**Validation Methods:**
- **User Research**: Interviews, observations, surveys
- **Data Analysis**: Metrics, logs, usage patterns
- **Prototyping**: Low-fidelity mockups to test understanding
- **Stakeholder Feedback**: Business input, executive perspective
- **Technical Exploration**: Feasibility spikes, proof-of-concepts

**Red Flag - No Validation:**
- "We know users want this" (haven't asked)
- "The team agrees" (haven't actually talked to team)
- "It's obvious" (haven't validated)

**Green Flag - Validation Present:**
- "We interviewed 8 category managers, 7 mentioned this problem"
- "Analytics show 45% of users drop off at this step"
- "Support tickets show 50+ monthly requests for this"
- "Technical spike confirmed we can integrate with the legacy system"

---

### Back Decisions with Evidence

Every claim in your discovery should be backed by evidence, not opinion.

**Weak Evidence:**
- "I think users want..."
- "We believe this would help..."
- "It seems like this is important..."

**Strong Evidence:**
- "In interviews with 10 users, 8 mentioned..."
- "Data shows 45% of transactions fail at this step..."
- "The support team fields 100+ tickets/month about..."
- "Financial audit identified this as a risk..."

**Evidence Sources:**
- User research (interviews, observations, surveys)
- Analytics data (usage patterns, drop-off rates, error rates)
- Business metrics (revenue, cost, quality)
- Support feedback (tickets, calls, complaints)
- Domain expertise (deep knowledge from team members)
- Competitive analysis (what competitors do and why)
- Market research (industry trends, customer needs)

---

## Discovery vs. Solution Design

These are different phases. Don't confuse them.

### Discovery Phase

**Focus:**
- What problem are we solving?
- Who experiences it?
- Why is it important now?
- How big is the opportunity?

**Outcomes:**
- Clear problem definition
- Validated understanding of user needs
- Measurable business outcomes
- Viability decision (go/no-go)

**Questions to Answer:**
- Is this a real problem?
- Is it worth solving?
- Do we understand it deeply?
- Are stakeholders aligned?
- Should we proceed to solution design?

**Deliverable:**
- Product Discovery document with clear problem, evidence, and expected outcomes

**Duration:**
- Depends on complexity
- Simple: 1-2 weeks
- Medium: 2-4 weeks
- Complex: 4+ weeks

### Solution Design Phase

**Focus:**
- How should we solve this problem?
- What should we build?
- How does it work?
- What's the technical approach?

**Outcomes:**
- Design specifications
- Technical architecture
- Development roadmap
- Implementation plan

**Questions to Answer:**
- What are the design options?
- Which is best for our users and business?
- How technically feasible is this?
- What's the implementation plan?
- How will we measure success?

**Deliverable:**
- Design specification, technical architecture, development roadmap

**Duration:**
- Depends on complexity
- Simple: 1-2 weeks
- Medium: 2-4 weeks
- Complex: 4+ weeks

### Key Distinction

**In Discovery, you ask "Should we build this?"**

**In Design, you ask "How do we build this?"**

**If you skip discovery and jump to design, you risk:**
- Building the wrong solution
- Building an overcomplicated solution
- Missing the actual problem
- Wasting resources
- Low adoption (it doesn't match the need)

---

## When to Proceed to Solution Design

### You're Ready When:

✅ **Problem is clearly understood**
- Problem statement is specific, not generic
- Evidence supports the problem (research, data, feedback)
- Team agrees on what the problem is

✅ **Outcomes are defined**
- Success metrics are clear and measurable
- Baselines and targets are realistic
- Business value is quantified
- Team agrees on what success looks like

✅ **Scope is clear**
- Use cases are prioritized (must-have vs. nice-to-have)
- User needs are understood
- Constraints are identified

✅ **Team is aligned**
- PM, design, engineering, and business stakeholder agree on problem and approach
- Viability decision has been made (go/no-go)
- Stakeholders are committed to next phase

✅ **Risks are identified**
- Major risks documented
- Mitigation plans in place
- Team is prepared for obstacles

### Red Flags - You're NOT Ready:

❌ **Problem is still vague**
- "Improve user experience" (which users? how?)
- "Make it faster" (faster than what? by how much?)
- "Better reporting" (better in what way?)

❌ **No evidence backing claims**
- "Users want..." (haven't asked)
- "This is important" (no data supporting)
- "Team agrees" (haven't actually asked everyone)

❌ **Team is not aligned**
- Different people describe the problem differently
- Stakeholders haven't engaged in discovery
- No clear viability decision

❌ **Scope is unclear**
- Use cases are mixed up with solutions
- Requirements keep changing
- No clear "must-have vs. nice-to-have"

❌ **Risks not addressed**
- Haven't identified major obstacles
- No mitigation plans
- Not prepared for problems

---

## Common Discovery Mistakes

### 1. Jumping to Solutions Too Fast

**Mistake:**
"We need to build a dashboard to improve reporting"

**Why it's a mistake:**
- You haven't understood the real problem yet
- There might be a simpler solution
- Dashboard might not actually solve the problem

**Better Approach:**
- First: Understand why current reporting doesn't work
- Second: What would better look like?
- Third: What are different ways to achieve that?
- Fourth: Which approach is best?

### 2. Only Talking to One Type of Stakeholder

**Mistake:**
- Only talking to users (miss business constraints)
- Only talking to business (miss user reality)
- Only talking to engineering (miss user needs)

**Better Approach:**
- Include users/operators (experience the problem)
- Include business stakeholders (understand constraints, business value)
- Include technical leaders (understand feasibility)
- Include adjacent teams (understand downstream impact)

### 3. Not Quantifying Impact

**Mistake:**
"Users are frustrated with reporting"

**Why it's a mistake:**
- Hard to justify investment
- Hard to measure if you've solved it
- No baseline to compare against

**Better Approach:**
- Quantify impact: "Reporting takes 8 hours/month of PM time"
- Quantify baseline: "Current accuracy is 87%"
- Quantify target: "Goal is >95% accuracy"
- Quantify business value: "$2M in potential mis-pricing risk"

### 4. Assuming You Know the Problem Without Asking

**Mistake:**
- "We know what users want"
- "It's obvious what the problem is"
- "Everyone agrees this is broken"

**Why it's a mistake:**
- Your assumptions might be wrong
- What you think is the problem might be a symptom
- You might miss the actual root cause

**Better Approach:**
- Ask users what frustrates them
- Observe them working
- Look at data for patterns
- Validate assumptions with evidence

### 5. Skipping Stakeholder Alignment

**Mistake:**
- Discovery done by PM alone
- Business stakeholder doesn't engage
- Engineering doesn't see discovery until design phase

**Why it's a mistake:**
- Stakeholders don't buy in to problem
- Hidden constraints come up later
- Team isn't aligned on what to build

**Better Approach:**
- Include stakeholders early in discovery
- Get input from everyone who matters
- Make it collaborative, not hand-off

### 6. Not Documenting Assumptions

**Mistake:**
- Assumptions stay in people's heads
- Different people assume different things
- Assumptions never get validated

**Better Approach:**
- Explicitly list what you're assuming
- Plan how to validate each assumption
- Update discovery as assumptions are tested

### 7. Making Everything a "Must-Have"

**Mistake:**
- "We need all these features"
- Scope keeps growing
- Nothing gets prioritized

**Why it's a mistake:**
- Scope bloat increases risk and timeline
- Real priorities get lost
- What's essential gets mixed with nice-to-have

**Better Approach:**
- Define 2-3 must-have use cases for launch
- Rest are should-have or nice-to-have
- Build incrementally, validate market fit first

---

## Discovery Best Practices

### Practice 1: Start with Users

**What:** Understand actual user needs and pain points before anything else.

**How:**
- Conduct user interviews or observations
- Ask open-ended questions about their current workflow
- Watch them work if possible
- Ask about workarounds and frustrations

**Why:**
- You discover needs you wouldn't have assumed
- You understand priority (what really matters vs. nice-to-have)
- You build empathy for the user experience

**Example:**
Instead of "Do you want a dashboard?" ask "Walk me through how you currently check margin data. What do you have to do? What's frustrating about it? What have you tried instead?"

### Practice 2: Understand Business Constraints

**What:** Know what's important to the business (not just users).

**How:**
- Interview business stakeholders about goals and constraints
- Understand budget, timeline, and regulatory requirements
- Identify business risks and opportunities
- Understand competitive context

**Why:**
- You build solutions that fit business reality
- You identify constraints early
- You make better trade-offs in design

**Example:**
"Users want real-time data, but can we integrate with legacy system? What's the timeline? Do we have budget? What are regulatory requirements?"

### Practice 3: Validate Feasibility Early

**What:** Understand technical constraints and opportunities before committing to design.

**How:**
- Talk to technical leads early
- Do technical spikes for risky/unknown areas
- Identify dependencies and integration points
- Understand capacity and timeline

**Why:**
- You avoid designing solutions that can't be built
- You identify technical risks early
- You plan for integration complexity

**Example:**
"Can we get real-time discount data from the legacy system? Would it take a spike to figure out?"

### Practice 4: Document Everything

**What:** Write down your findings, assumptions, and decisions as you go.

**How:**
- Document your discovery in a structured template
- Record interviews and key findings
- Update discovery as you learn more
- Share updates with team regularly

**Why:**
- Team stays aligned on learnings
- Nothing gets lost or forgotten
- You create accountability
- Easy to onboard new team members

### Practice 5: Get Feedback Continuously

**What:** Share your findings and get input from stakeholders throughout discovery.

**How:**
- Share findings with team weekly
- Ask stakeholders for feedback on direction
- Adjust discovery based on feedback
- Make it collaborative

**Why:**
- You catch misalignment early
- Stakeholders stay engaged
- You avoid big surprises late
- Better decisions made collaboratively

### Practice 6: Measure, Don't Guess

**What:** Use data to understand the problem, not opinions.

**How:**
- Look at usage analytics
- Analyze support tickets and error logs
- Interview actual users
- Review business metrics

**Why:**
- You see patterns that people don't mention
- You prioritize based on actual impact
- You have baseline to measure improvement

**Example:**
Instead of "Users struggle with margin reporting" → "Analytics show 45% of margin reports have errors, reconciliation takes 8 hours/month, and users spend 20% of time on workarounds"

### Practice 7: Design for the 80%, Plan for the 20%

**What:** Focus primary design on main use cases, but acknowledge edge cases.

**How:**
- Identify 2-3 primary use cases (80% of usage)
- Design for those first
- Document edge cases
- Plan how to handle them (might be phase 2)

**Why:**
- You avoid bloat from edge cases
- You get core experience right
- You can iterate after launch
- Faster to ship value

---

## The Discovery Playbook

### Week 1: Understand the Landscape

**Goal:** Gather initial information about the problem

**Activities:**
- [ ] Interviews with 3-5 key users/operators
- [ ] Interviews with business stakeholders
- [ ] Analysis of current process/data
- [ ] Technical feasibility check with engineering
- [ ] Competitive analysis if relevant

**Deliverable:**
- Initial problem hypothesis
- Key questions to answer
- List of risks and unknowns

### Week 2: Validate and Deep Dive

**Goal:** Validate hypothesis and fill knowledge gaps

**Activities:**
- [ ] Interviews with additional users (8-10 total)
- [ ] Data analysis (logs, metrics, errors)
- [ ] Technical spike if needed
- [ ] Stakeholder alignment conversations
- [ ] Requirements prioritization

**Deliverable:**
- Updated problem statement with evidence
- Prioritized use cases
- Identified risks and constraints

### Week 3: Synthesize and Plan

**Goal:** Pull together learnings and plan next steps

**Activities:**
- [ ] Synthesis meeting with core team
- [ ] Draft expected outcomes and success metrics
- [ ] Identify major risks and mitigation
- [ ] Plan discovery communication
- [ ] Prepare for viability call

**Deliverable:**
- Complete discovery document
- Ready for stakeholder viability call
- Aligned on next steps

### Week 4: Viability Call and Planning

**Goal:** Get approval and plan solution design

**Activities:**
- [ ] Viability call with stakeholders (go/no-go)
- [ ] If go: Plan solution design phase
- [ ] If no-go: Document learnings, plan follow-up
- [ ] Share discovery with broader team
- [ ] Kick off next phase

**Deliverable:**
- Viability decision documented
- Solution design roadmap (if approved)
- Team ready to proceed

---

## Stakeholder Involvement

### How to Involve Users/Operators

**Do:**
- ✓ Ask open-ended questions about current workflow
- ✓ Observe them working
- ✓ Ask about pain points and workarounds
- ✓ Validate your understanding with them
- ✓ Include them in design thinking

**Don't:**
- ✗ Ask yes/no questions
- ✗ Lead them toward your solution
- ✗ Ignore what they say
- ✗ Only talk to one type of user
- ✗ Skip operator perspective for customer-facing products

### How to Involve Business Stakeholders

**Do:**
- ✓ Explain the problem and business case
- ✓ Get their input on business value and constraints
- ✓ Align on success metrics
- ✓ Include them in viability decision
- ✓ Keep them updated on findings

**Don't:**
- ✗ Surprise them at viability call
- ✗ Ignore business constraints
- ✗ Skip their input on priorities
- ✗ Assume you know their constraints
- ✗ Proceed without their buy-in

### How to Involve Engineering

**Do:**
- ✓ Ask about technical feasibility early
- ✓ Get input on architecture implications
- ✓ Plan technical spikes for unknowns
- ✓ Include them in risk identification
- ✓ Get their buy-in before design phase

**Don't:**
- ✗ Skip engineering until design is done
- ✗ Assume something is technically easy/hard without asking
- ✗ Ignore technical constraints
- ✗ Make decisions without their input
- ✗ Spring surprises in design phase

---

## Summary

Great discoveries:

✅ **Fall in love with the problem, not the solution**
- Deeply understand what you're solving
- Validate assumptions with evidence
- Design for the real need, not a guessed solution

✅ **Involve all perspectives**
- Include users, business, engineering, operations
- Get buy-in early through collaboration
- Different perspectives improve decision-making

✅ **Back decisions with evidence**
- Use data, not opinions
- Interview users, don't assume
- Validate constantly

✅ **Document thoroughly**
- Write down findings as you go
- Update as you learn
- Share with team regularly

✅ **Define success upfront**
- Clear outcomes before design
- Measurable metrics with baselines and targets
- Align stakeholders on what matters

✅ **Plan for obstacles**
- Identify risks early
- Have mitigation strategies
- Be prepared for what can go wrong

✅ **Know when to move on**
- Clear signal to transition to design
- Viability decision made
- Stakeholders aligned
- Ready to execute
