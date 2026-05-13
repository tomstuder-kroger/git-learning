# Design Review Skill Guide

## Overview

The **design-review** skill provides comprehensive UI/UX design reviews and QA/bug testing for web applications, prototypes, and design concepts. It delivers structured, principle-based feedback with actionable recommendations prioritized by severity.

## Capabilities

### 1. Design & UX Review
Evaluates visual design, user experience, and interface quality through five evaluation lenses:

- **Clarity**: Purpose, copy, labels, cognitive load
- **Visual Hierarchy**: Layout, action priority, typography, spacing
- **Interaction & Heuristics**: Discoverability, feedback, error handling, user control
- **Accessibility**: WCAG AA compliance, color contrast, touch targets, keyboard navigation
- **Craft & Consistency**: Design system alignment, visual coherence, polish

### 2. QA & Bug Testing
Performs systematic functional testing following a 4-phase workflow:

**Phase 1: Test Planning**
- Understand application and critical user flows
- Define test scope and create test cases
- Document test plan before execution

**Phase 2: Test Execution**
- Functional testing (positive scenarios)
- Negative testing (error scenarios, invalid inputs)
- Edge cases & boundary value testing
- Business rules validation
- Race conditions & timing issues
- Usability testing
- Performance testing
- Security testing
- Completeness verification

**Phase 3: Verification**
- Completeness checks (all flows tested, all scenarios covered)
- Quality checks (reproduction steps clear, severity correct)
- Output validation (developer-ready bug reports)

**Phase 4: Reporting**
- Standardized bug reports with reproduction steps
- Priority classification (P0/P1/P2/P3)
- Console error documentation
- Fix recommendations

### 3. Strategic Product Assessment
Evaluates product risks using Marty Cagan's 4 Big Risks framework:

- **Value Risk**: Will users choose to use it?
- **Usability Risk**: Can users figure out how to use it?
- **Feasibility Risk**: Can we build it with available resources?
- **Business Viability Risk**: Does it work for our business?

## What Can Be Reviewed

- Text-based concepts (feature descriptions, user flows, wireframe specs)
- Screenshots of designs or interfaces
- Figma files/URLs (with Figma MCP)
- Live webpages
- Code implementations (component files)
- Pull requests with UI changes
- Working apps/prototypes for QA testing

## How to Use

### Basic Usage

**Design Review:**
```
/design-review the prototype in this directory
```

**QA Testing:**
```
/design-review QA test this app
```

**Combined Review:**
```
/design-review review design and test for bugs
```

**Specific Modes:**
```
/design-review accessibility check only
/design-review design system check
/design-review concept review [feature description]
```

### Workflow

1. **Identify what to review**: Code, design, concept, or working app
2. **Gather context**: Platform, users, stage, design system
3. **Apply evaluation lenses**: 5 design lenses or 10+ QA testing criteria
4. **Prioritize issues**: P0 (blocker) → P1 (critical) → P2 (normal) → P3 (minor)
5. **Generate report**: Structured markdown report with actionable recommendations

## QA Testing Categories

The skill tests across **13 comprehensive categories**:

1. **Functional Testing** - Core features, user flows, CRUD operations
2. **Negative Testing** - Invalid inputs, unauthorized access, error scenarios
3. **Navigation & Routing** - Links, routes, broken paths, redirects
4. **Data Validation** - Input validation, error messages, required fields
5. **Edge Cases & Boundary Values** - Min/max, empty inputs, special characters, very long text
6. **Business Rules** - Logic enforcement, constraints, calculations, workflows
7. **State Management** - State consistency, persistence, session handling
8. **Race Conditions** - Rapid clicks, concurrent actions, async timing
9. **Usability** - Clarity, intuitive navigation, visual feedback, consistency
10. **Cross-Browser Compatibility** - Chrome, Firefox, Safari, responsive design
11. **Performance** - Load time, bundle size, memory leaks, re-renders
12. **Security** - XSS, SQL injection, exposed secrets, HTTPS, authorization
13. **Completeness** - All features implemented, no placeholders, all states covered

## Output Reports

### Design Review Report Includes:
- Overall verdict and quality assessment
- Issues organized by priority (P0/P1/P2/P3)
- Each issue includes: Problem, Fix, Impact
- Accessibility checklist (WCAG AA)
- 4 Big Risks assessment (optional)
- Strengths and next steps
- References to standards/guidelines

### QA Testing Report Includes:
- Test plan (scope, test cases, testing types)
- Bug summary by priority
- Bugs with numbered reproduction steps
- Expected vs actual behavior
- Code location (file:line)
- Console errors documentation
- QA testing checklist results
- Verification checklist
- Fix priority recommendations
- Testing notes and limitations

## Quality Standards

### ✅ Good Bug Report
```
**Missing form validation on email field** - [Data Validation]
- **Steps to Reproduce**:
  1. Navigate to /signup
  2. Enter "notanemail" in email field
  3. Click "Sign Up" button
- **Expected**: Form shows error "Please enter a valid email"
- **Actual**: Form submits with invalid email, causes 500 error
- **Fix**: Add email validation in SignupForm.js:45
- **Location**: src/components/SignupForm.js:45
```

### ❌ Bad Bug Report
```
"Email doesn't work"
```

## Priority Levels

**P0 - Blocker**
- App crashes or completely unusable
- Data loss or corruption
- Critical security vulnerabilities
- Core functionality broken
- Must fix before shipping

**P1 - Critical**
- Major features don't work
- Console errors impacting functionality
- Broken user flows
- Moderate security issues
- Should fix before shipping

**P2 - Normal**
- Minor features broken
- Edge case bugs
- UI glitches not blocking tasks
- Performance issues
- Fix if time allows

**P3 - Minor**
- Cosmetic issues
- Rare edge cases
- Minor optimizations
- Nice-to-have improvements
- Lowest priority

## Dos and Don'ts

### ✅ DO:
- Create a test plan before executing tests
- Test both positive (happy path) and negative (error) scenarios
- Test edge cases, boundary values, and unusual inputs
- Verify business rules are enforced
- Include clear numbered reproduction steps for every bug
- Specify expected vs actual behavior
- Assign correct priority based on impact
- Monitor console for errors throughout testing
- Verify findings meet quality standards before reporting

### ❌ DON'T:
- Skip the test planning phase
- Only test the happy path
- Report bugs without reproduction steps
- Assign incorrect priority (P0 is for blockers only)
- Ignore console errors and warnings
- Skip edge cases and boundary value testing
- Forget to test error handling
- Overlook race conditions and timing issues
- Report vague bugs like "it doesn't work"
- Skip the verification phase

## Special Modes

**Concept Review**: Reviews text-based feature descriptions without visuals

**Strategic Assessment**: Evaluates 4 Big Risks (value, usability, feasibility, viability)

**Quick Check**: Accessibility-only focused review

**Design System Check**: Consistency with design system standards

**QA Mode**: Comprehensive functional and quality assurance testing

## Testing Coverage

### Edge Cases Tested:
- Empty inputs, whitespace only, special characters
- Very long text (1000+ chars), very short text (1 char)
- Boundary values (min, max, off-by-one)
- Null/undefined values, zero values
- Leading/trailing spaces
- Unusual formats (international, special cases)

### Security Tests:
- XSS: `<script>alert('xss')</script>`
- SQL Injection: `'; DROP TABLE users;--`
- HTML Injection: `<img src=x onerror=alert('xss')>`
- Path Traversal: `../../etc/passwd`
- Exposed secrets in code/network

### Performance Tests:
- Initial load time (target: <3s)
- Time to interactive (target: <5s)
- Bundle size (>1MB is concerning)
- Memory leaks over time
- Large dataset handling (100+ items)
- Unnecessary re-renders

## When to Use This Skill

✅ **Use for:**
- Pre-launch quality checks
- Design review before development
- Bug testing prototypes or apps
- Accessibility compliance review
- A/B test evaluation
- Pull request review
- User testing preparation
- Product concept validation

❌ **Don't use for:**
- Code refactoring (use general Claude assistance)
- Feature implementation (use other skills)
- Content writing or copywriting

## Tools & Integration

The skill can:
- Read and analyze code files
- Run applications locally (`npm start`)
- Monitor browser console for errors
- Check network requests
- Search codebases for patterns
- Access Figma designs (with Figma MCP)
- Reference WCAG and design standards

## Output Format

All reports are delivered in clean, formatted Markdown with:
- Clear section headers
- Checkboxes for checklists
- Code blocks for examples
- Priority badges
- Numbered lists for reproduction steps
- Tables for structured data

---

## Example Usage

### Testing an A/B Prototype
```
/design-review QA test the prototype in this directory
```

**Output includes:**
- Test plan covering all 3 variants
- Functional bugs (broken links, non-functional features)
- Edge case testing (empty inputs, special characters)
- Responsive testing across breakpoints
- Console error documentation
- Security checks
- Performance analysis
- Prioritized fix recommendations

### Reviewing a Design Concept
```
/design-review concept review [paste feature description]
```

**Output includes:**
- Clarity assessment (is functionality well-defined?)
- Interaction completeness (all states specified?)
- Accessibility considerations
- Business rules validation
- Questions to resolve
- Concept completeness checklist
- Recommended patterns

---

## Summary

The design-review skill provides **enterprise-grade design review and QA testing** with:

✅ **Systematic 4-phase workflow** (Plan → Execute → Verify → Report)
✅ **13 testing categories** (functional, negative, edge cases, security, performance)
✅ **Accessibility-first** (WCAG AA compliance checks)
✅ **Priority-based** (P0/P1/P2/P3 classification)
✅ **Actionable** (specific fixes with code locations)
✅ **Comprehensive** (design, UX, functionality, security, performance)
✅ **Verified** (quality gates before reporting)

Perfect for: Product teams, designers, developers, QA engineers, and anyone building web applications who needs thorough, professional design and quality assurance reviews.

---

**Skill Location**: `~/.claude/skills/design-review/SKILL.md`
**Last Updated**: 2026-03-06
**Skill Version**: 2.0 (with QA/Bug Testing)
