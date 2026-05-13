# Product Discovery Template Generator Skill

A comprehensive skill that helps product teams create high-quality Product Discovery documents through guided PM coaching, quality assessment, and structured template generation.

## What This Skill Does

This skill acts as an expert Product Manager coach that:

✅ **Guides discovery creation** - Asks probing questions to help teams think through product problems systematically
✅ **Coaches teams** - Teaches product discovery principles while creating discoveries
✅ **Assesses quality** - Evaluates discoveries against best practices and provides actionable feedback
✅ **Generates documents** - Creates structured, complete discovery documents ready for viability calls
✅ **Supports iteration** - Helps teams refine and improve discoveries as understanding deepens

## How to Use

### Start a New Discovery

```
"I need to create a discovery for our new checkout flow"
"Start a discovery to improve our reporting system"
"Create a product discovery for [capability name]"
```

The skill will:
1. Ask clarifying questions about your problem
2. Gather essential information (problem statement, expected outcomes, stakeholders)
3. Ask probing follow-up questions
4. Generate a complete discovery document with your input
5. Suggest next steps

### Structure Existing Notes

```
"I have notes from interviews, help me structure a discovery"
"I have discovery content in [file path], help me organize it"
```

The skill will:
1. Read your existing content
2. Map it to discovery template sections
3. Identify what's strong and what needs work
4. Help you fill in gaps
5. Generate a complete discovery document

### Review an Existing Discovery

```
"Review my discovery at [file path] and assess if it's ready"
"Is this discovery ready for the viability call?"
"Give me feedback on my discovery"
```

The skill will:
1. Read your discovery
2. Assess each section against quality criteria
3. Highlight what's strong and what needs work
4. Suggest specific improvements
5. Tell you if it's ready for viability call

### Get Help on a Specific Section

```
"Help me define success metrics"
"My problem statement is too vague, help me strengthen it"
"What should be in the measurement plan?"
```

The skill will:
1. Load reference materials on that section
2. Ask targeted questions to help you think it through
3. Provide examples and best practices
4. Help you refine that section
5. Update your discovery document

## What Gets Generated

A markdown file in your current directory containing:

- **All template sections**: Business Problem, Expected Outcomes, Stakeholders, Use Cases, Current Process, Future State, Measurement Plan, Risks
- **Filled sections**: Information you provided during discovery conversation
- **Structured placeholders**: Guidance on sections not yet completed
- **Quality indicators**: ✓ COMPLETE, ⚠ NEEDS DETAIL, ❌ TODO
- **Inline guidance**: Tips for completing each section
- **Examples**: Real-world examples for sections you're working on

### Example Output

A file named `checkout-improvement-discovery.md` with:

```markdown
# Product Discovery: Improve Checkout Flow

## Business Problem
<!-- ✓ COMPLETE: Clear problem statement with examples -->

The mobile checkout has a 65% abandonment rate...

## Expected Outcomes
<!-- ⚠ NEEDS DETAIL: Add baseline numbers to metrics -->

Reduce abandonment from 65% to...

## Stakeholders
<!-- ✓ COMPLETE: All key stakeholders identified -->

...

## Next Steps

The following sections need work:
1. Measurement Plan - define how you'll track success
2. Risks - identify potential obstacles
3. Open Questions - document unknowns

For detailed guidance on each section, see the references/ folder.
```

## When to Use

### Perfect For:

- ✅ Starting a new product discovery (feature, product, system improvement)
- ✅ Complex decisions requiring stakeholder alignment
- ✅ Understanding a problem deeply before committing to solution
- ✅ Creating organizational alignment across teams
- ✅ Teaching teams product discovery best practices

### Maybe Not Needed For:

- ❌ Trivial bug fixes ("fix typo in error message")
- ❌ Obvious improvements ("make button bigger")
- ❌ Simple technical tasks with clear requirements
- ❌ Tasks where requirements are already fully defined

## Discovery Best Practices

### Start Broad, Then Narrow

Begin with open-ended questions ("What problem are you solving?") then narrow to specifics ("Who exactly? By how much?").

### Don't Accept Vague Statements

**Vague:** "Improve user experience"
**Clear:** "Reduce checkout time from 8 minutes to 2 minutes for 70% of users"

### Back Claims with Evidence

Every claim should be supported by:
- User research and interviews
- Data and analytics
- Business metrics
- Stakeholder feedback

### Involve All Perspectives

Include:
- **Users/Operators** - experience the problem
- **Business Stakeholders** - understand business impact
- **Technical Leaders** - validate feasibility
- **Impacted Teams** - understand downstream effects

### Define Success Upfront

Before design, define:
- What problem are you solving?
- How will you measure success?
- What's the baseline and target?
- How does this align to strategy?

## Available References

The skill has access to detailed reference materials:

### templates-sections.md
Deep dive on each discovery section with examples, common mistakes, and coaching questions.

### coaching-questions.md
Comprehensive question bank organized by section to help teams think deeply about discovery.

### quality-criteria.md
Assessment rubric (Insufficient → Needs Work → Good → Excellent) for evaluating discovery quality.

### discovery-best-practices.md
Product discovery principles, patterns, and best practices from industry.

## Example Discoveries

The skill includes three real-world examples:

### example-discovery-saas.md
Complete discovery for reducing checkout abandonment in an e-commerce platform. Shows:
- Evidence-backed problem statement
- Measurable business outcomes ($2.5M impact)
- Detailed use cases and requirements
- Comprehensive measurement plan
- Risk mitigation strategies

### example-discovery-internal.md
Complete discovery for automating warehouse intake process. Shows:
- Internal tool discovery (different from customer products)
- Operational cost savings quantification
- Process automation opportunity
- Phased implementation planning

### example-discovery-minimal.md
Minimal discovery for adding dark mode toggle. Shows:
- When less discovery is appropriate
- Appropriate rigor for low-risk changes
- How to keep discovery proportional to scope

## Tips for Success

### 1. Be Specific
- "Improve X" → "Reduce X from Y to Z by doing..."
- "Users want this" → "In interviews, 8 of 10 users mentioned..."
- "It's obvious" → "Here's the data showing..."

### 2. Include Evidence
- User research findings
- Analytics data
- Business metrics
- Stakeholder input
- Competitive analysis

### 3. Collaborate Early
- Include stakeholders in discovery, not just handoff
- Get buy-in as you go
- Catch misalignment early

### 4. Define Outcomes Clearly
- What will be different?
- How will you measure it?
- What's realistic?
- How does it align to strategy?

### 5. Plan for Obstacles
- What could go wrong?
- What don't you know?
- What assumptions are you making?
- How will you validate them?

## Discovery Document Checklist

A discovery is ready for viability call when:

- [ ] Problem is clearly defined and specific
- [ ] Problem is backed by evidence (research, data, feedback)
- [ ] Expected outcomes are measurable with targets
- [ ] Team and stakeholders are aligned
- [ ] Key use cases are prioritized
- [ ] Current state and future state are clear
- [ ] Success metrics are defined
- [ ] Major risks are identified with mitigation plans
- [ ] Team is ready to move to solution design
- [ ] Business case is clear

## Common Workflows

### New Discovery from Scratch

```
User: "Create a discovery for reducing report generation time"
       ↓
Skill: Asks about problem, who's affected, business impact
       ↓
User: Provides information through conversation
       ↓
Skill: Generates complete discovery with gathered information
       ↓
Skill: Suggests next steps (interview teams, technical validation)
```

### Review and Improve Existing Discovery

```
User: "Review my discovery for the checkout redesign"
       ↓
Skill: Reads discovery, assesses against quality criteria
       ↓
Skill: Provides feedback on strengths and gaps
       ↓
User: Asks to improve specific sections
       ↓
Skill: Guides improvement, updates discovery
       ↓
Skill: Confirms readiness for viability call
```

### Structured Conversation

```
User: "Help me define success metrics"
       ↓
Skill: Asks about business goals, current baseline, targets
       ↓
User: Provides information
       ↓
Skill: Helps refine metrics, updates discovery
       ↓
Skill: Validates against best practices
```

## Questions?

This skill is designed to be used conversationally. Ask it:

- "What should be in this section?"
- "Is this problem statement specific enough?"
- "Am I ready for a viability call?"
- "How do I measure success for this discovery?"
- "What am I missing?"

The skill will provide guidance, ask probing questions, and help you create a stronger discovery.

## Key Resources

- **SKILL.md** - Complete skill instructions and workflow
- **references/template-sections.md** - Detailed guide to each discovery section
- **references/coaching-questions.md** - Question bank by section
- **references/quality-criteria.md** - Assessment rubric and feedback framework
- **references/discovery-best-practices.md** - Product discovery principles
- **examples/** - Real-world example discoveries showing different contexts and quality levels

---

**Remember**: A thorough discovery upfront prevents wasted effort on solutions that don't match the real problem. Invest the time to deeply understand what you're solving before committing to how to build it.
