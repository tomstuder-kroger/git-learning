# Git Learning Task System - Design Specification

**Date:** 2026-05-13
**Author:** Product Development Technical Trainer
**Status:** Approved
**Version:** 1.0

## Executive Summary

A guided bash script system that walks users through a comprehensive Git learning journey with integrated learning materials and hands-on practice. The system creates real git artifacts (branches, commits, PRs) while teaching Git fundamentals and safe practices for working with AI code assistants like Claude.

## Problem Statement

Product developers working with Claude Code need to refresh their Git and GitHub skills to prevent version control issues such as:
- Overwriting code by pushing directly to main
- Not understanding how to inspect changes before committing
- Lack of code review processes
- Difficulty recovering from mistakes
- Unsafe practices when working with AI-generated code

The existing `git-learning-complete.md` provides excellent content but lacks an interactive, guided execution system to ensure hands-on practice and progress tracking.

## Goals

### Primary Goals
1. Provide step-by-step guided learning combining theory and practice
2. Create real git artifacts (branches, commits, PRs) during exercises
3. Track progress in markdown file and git history
4. Build muscle memory for safe Git workflows
5. Prepare users to work safely with Claude Code

### Secondary Goals
1. Support resume functionality if interrupted
2. Provide helpful error messages and recovery options
3. Enable team visibility of learning progress
4. Work on any Unix-like system with minimal dependencies

## Non-Goals

- Replace comprehensive Git documentation or courses
- Support Windows native cmd/PowerShell (Git Bash only)
- Provide automated testing of git commands
- Create a web-based interface
- Support multiple users on same repository simultaneously

## User Requirements

### Must Have
- Guided walkthrough of both learning materials (videos/reading) and hands-on exercises
- Manual markdown file updates by user (builds awareness)
- Real branch creation per exercise
- Real commit tracking after each session
- Real PR creation for Phase 3+ exercises
- Resume capability if session is interrupted
- Progress visibility via command-line tool

### Should Have
- Context-sensitive help during exercises
- Graceful error handling with recovery options
- Time tracking and estimates
- GitHub CLI integration for PR creation
- Branch cleanup utilities

### Could Have
- Apple Reminders integration export
- Team progress sharing features
- Exercise validation checks
- Automated link opening in browser

### Won't Have
- Automatic markdown updates (user must do manually)
- GUI interface
- Multi-language support
- Cloud sync of progress
- Integration with LMS systems

## System Architecture

### File Structure

```
git-learning/
├── git-learning-complete.md        # Progress tracker (user updates manually)
├── git-trainer.sh                   # Main entry point
├── setup.sh                         # One-time setup
├── commit-progress.sh               # Helper to commit markdown updates
├── show-progress.sh                 # Display progress report
├── .git-trainer-state.json         # Auto-generated state (gitignored)
├── .gitignore                       # Ignore state file
├── docs/
│   └── superpowers/
│       └── specs/
│           └── [this file]
├── phases/
│   ├── phase0.sh                   # Foundation (20 mins)
│   ├── phase1.sh                   # Inspection (60 mins, 4 sessions)
│   ├── phase2.sh                   # Branching (50 mins, 3 sessions)
│   ├── phase3.sh                   # Pull Requests (70 mins, 4 sessions)
│   └── phase4.sh                   # Claude + Git (45 mins, 3 sessions)
├── lib/
│   ├── helpers.sh                  # UI and utility functions
│   └── git-helpers.sh              # Git-specific helpers
└── exercises/
    └── [created during practice]   # Temporary exercise repos
```

### Component Design

#### Main Entry Point (`git-trainer.sh`)

**Responsibilities:**
- Display main menu with progress overview
- Route to appropriate phase script
- Handle resume functionality
- Provide access to utilities (progress view, cleanup)

**Key Functions:**
- `show_main_menu()` - Display phases and current progress
- `detect_resume()` - Check for interrupted sessions
- `route_to_phase()` - Launch selected phase script
- `show_utilities_menu()` - Access helper scripts

#### Phase Scripts (`phases/phase*.sh`)

**Responsibilities:**
- Execute all sessions within a phase
- Present learning materials with links
- Guide hands-on exercises step-by-step
- Prompt for markdown updates
- Commit progress with appropriate messages

**Structure (each phase):**
```bash
# Metadata
PHASE_NUM=X
PHASE_NAME="Name"
SESSIONS=(session_id:name:learning_mins:practice_mins ...)

# Session functions
session_X_Y() {
  print_session_header
  show_learning_objectives
  create_exercise_branch
  present_learning_materials
  run_hands_on_exercise
  show_reflection_questions
  complete_session
}

# Main menu
main() {
  show_phase_menu
  # Route to selected session
}
```

#### Helper Libraries

**`lib/helpers.sh`** - Core utilities:
- Display functions (headers, sections, colors)
- User interaction (prompts, choices, validation)
- Progress tracking (read/write state)
- Time tracking (timers, duration formatting)
- Validation (git repo, clean state, branches)

**`lib/git-helpers.sh`** - Git operations:
- Branch management (create, switch, delete, list)
- Commit helpers (standard messages, show, undo)
- PR helpers (web and CLI creation)
- Status helpers (colorized output, diff display)
- Markdown parsing (read completion checkboxes)

#### State Management (`.git-trainer-state.json`)

**Format:**
```json
{
  "version": "1.0.0",
  "current_phase": 1,
  "current_session": "1.2",
  "current_step": 3,
  "last_activity": "ISO8601 timestamp",
  "total_time_minutes": 45,
  "completed_sessions": ["phase-0-task-1", ...],
  "session_times": {"phase-0-task-1": 5, ...},
  "branches_created": ["exercise/phase-0-task-1", ...],
  "prs_created": [],
  "interrupted_session": {
    "phase": 1,
    "session": "1.2",
    "step": 3,
    "total_steps": 7,
    "timestamp": "ISO8601"
  }
}
```

**Management:**
- Created by `setup.sh`
- Updated after each step/session
- Read on startup to enable resume
- Never committed (in `.gitignore`)

## User Workflows

### First-Time Setup

1. Clone/navigate to git-learning repository
2. Run `./setup.sh`
3. Setup wizard checks prerequisites
4. Creates directory structure
5. Initializes state file
6. Offers to launch main menu

### Typical Learning Session

1. Run `./git-trainer.sh`
2. System shows progress and suggests next session
3. User selects phase/session to start
4. System creates exercise branch
5. **Learning materials phase:**
   - Display objectives
   - Show reading/video links
   - Options: [o]pen links, mark as [r]ead, [s]kip, [Enter] when done
   - Wait for user confirmation
6. **Hands-on exercise phase:**
   - Step-by-step guided commands
   - Wait for user completion at each step
   - Validation prompts ("Did you see X?")
   - Context help available (`[?]` option)
7. **Reflection phase:**
   - Display reflection questions
   - User thinks through answers
   - Press Enter to continue
8. **Completion phase:**
   - Prompt user to update markdown file manually
   - Offer to commit progress
   - Option to push branch and create PR (Phase 3+)
   - Continue to next session or return to menu

### Resume Interrupted Session

1. Run `./git-trainer.sh`
2. System detects interrupted session from state file
3. Shows: "Last session: Phase X, Session Y.Z (incomplete)"
4. Options: [r]esume from last step, [s]tart over, [m]ain menu
5. If resume: jump to exact step where interrupted
6. Continue as normal session

### View Progress

1. Run `./show-progress.sh` (or from main menu)
2. Display:
   - Overall progress bar and percentage
   - Per-phase progress bars
   - Current session and next up
   - Stats: branches created, commits, PRs
   - Time spent vs estimated

### Commit Progress

1. After updating markdown file
2. Run `./commit-progress.sh "Session description"`
3. Script:
   - Detects changes in markdown
   - Creates commit on current exercise branch
   - Uses standard message format
   - Confirms success
4. Offers to push or continue

### Create Pull Request (Phase 3+)

1. After completing PR-related exercise
2. Script offers PR creation options
3. User selects web or CLI method
4. **Web method:**
   - Opens GitHub PR creation page in browser
   - Pre-filled title and description
   - User completes in browser
5. **CLI method (`gh`):**
   - Shows preview of PR title and description
   - Confirms with user
   - Creates PR via GitHub CLI
   - Returns PR URL
6. Records PR in state file

## Branch Strategy

### Naming Convention

```
exercise/phase-{phase_num}-{session_id}
exercise/phase-{phase_num}-{session_id}-practice
```

**Examples:**
- `exercise/phase-0-task-1` (Protect main branch)
- `exercise/phase-1-session-1-1` (What Changed - Learning)
- `exercise/phase-1-session-1-1-practice` (What Changed - Practice)
- `exercise/phase-3-session-2` (Creating a PR)

### Branch Lifecycle

1. **Creation:** At start of session via `create_exercise_branch()`
2. **Usage:** All session work happens on this branch
3. **Commit:** Markdown updates committed to branch
4. **Push:** Optional push to origin for backup/PR
5. **PR:** Create PR for Phase 3+ exercises
6. **Cleanup:** After session complete, can be deleted via cleanup utility

### Branch Isolation

- Each session gets its own branch
- Prevents mixing exercises
- Teaches proper branch workflow
- Allows experimentation without fear
- Can be recreated if needed

## Progress Tracking

### Three-Layer Tracking

**1. Markdown File (git-learning-complete.md)**
- Source of truth for detailed progress
- User manually updates checkboxes, dates, notes
- Committed to exercise branches
- Human-readable progress record

**2. Git History**
- Branches show exercise structure
- Commits show progression through material
- PRs (Phase 3+) show review practice
- Permanent artifact of learning journey

**3. State File (.git-trainer-state.json)**
- Enables resume functionality
- Tracks current position in curriculum
- Records time spent per session
- Not committed (local only)

### Progress Metrics

- **Completion:** Sessions marked complete in state
- **Time:** Minutes spent per session and total
- **Artifacts:** Branches created, commits made, PRs opened
- **Current:** Phase, session, and step position
- **Percentage:** Overall and per-phase completion

## Session Structure

### Standard Session Flow

Each session follows this pattern:

**1. Introduction (1 min)**
- Session header with title
- Learning objectives checklist
- Time estimates
- Branch creation

**2. Learning Materials (variable)**
- Reading resources with links and time estimates
- Video resources with links and time estimates
- Options to open links, mark as done, or skip
- User drives pace

**3. Hands-On Exercise (variable)**
- Step-by-step guided commands
- Clear instructions for each step
- Expected outcomes described
- Validation prompts
- Context-sensitive help available

**4. Reflection (2-3 min)**
- 2-4 reflection questions
- User thinks through answers
- No required input (builds understanding)

**5. Completion (2-3 min)**
- Summary of what was learned
- Prompt to update markdown
- Offer commit helper
- Option to create PR (if applicable)
- Next session suggestion

### Session Timing

- Learning materials: 8-20 minutes (reading/videos)
- Hands-on exercise: 10-30 minutes (practice)
- Reflection: 2-3 minutes (thinking)
- Completion: 2-3 minutes (updating/committing)

Total session time: 10-50 minutes depending on phase

## Error Handling

### Error Categories

**1. Git Errors**
- Not in a git repository → Guide to init or navigate
- Detached HEAD state → Guide to checkout branch
- Merge conflicts → Guide to resolve or abort
- Remote connection issues → Suggest offline mode

**2. Branch Conflicts**
- Branch already exists → [r]esume, [d]elete and recreate, [c]ancel
- Branch doesn't exist → Auto-create or offer options
- Can't switch branches → Check for uncommitted changes

**3. Uncommitted Changes**
- Detect via `git status`
- Options: [s]tash, [c]ommit now, [d]iscard, [q]uit
- Explain implications of each choice

**4. Missing Dependencies**
- GitHub CLI not found → Fallback to web PR creation
- jq not found → Fallback to grep/sed JSON parsing
- Browser commands not found → Display links manually

**5. User Interruption (Ctrl+C)**
- Trap signal gracefully
- Save current state
- Offer: [r]esume, [s]tart over, [m]ain menu, [q]uit

### Recovery Mechanisms

- **State save:** After every step completion
- **Undo helpers:** Git reset/revert with confirmation
- **Branch recreation:** Delete and start fresh if needed
- **Skip options:** Move forward if stuck
- **Help system:** Context-sensitive guidance

## User Interface Design

### Color Scheme

- **Green (✓):** Success messages, completed items
- **Yellow (⚠):** Warnings, time running over
- **Red (✗):** Errors, required actions
- **Blue (ℹ):** Informational messages
- **Cyan (bold):** Headers and section titles
- **Magenta:** User prompts and choices
- **White:** Standard text

### Display Components

**Headers:**
```
╔════════════════════════════════════════════════════════════╗
║              Title Text Here                               ║
╚════════════════════════════════════════════════════════════╝
```

**Sections:**
```
════════════════════════════════════════════════════════════
📚 SECTION TITLE
════════════════════════════════════════════════════════════
```

**Steps:**
```
────────────────────────────────────────────────────────────
STEP 3 of 7: Step description
────────────────────────────────────────────────────────────
```

**Progress Bars:**
```
Phase 1: Inspection  ████████████░░░░░░░░  60%  36/60 mins
```

**Prompts:**
```
Your choice: _
```

### Interactive Elements

**Multiple Choice:**
```
OPTIONS:
  [o] Open all links in browser
  [r] Mark as read
  [s] Skip for now
  [Enter] I've finished

Your choice: _
```

**Yes/No:**
```
Did you see the red and green lines? [y/n]: _
```

**Validation:**
```
[✓] Done  [?] Help  [s] Skip step

Your choice: _
```

## GitHub Integration

### Pull Request Creation

**Phase 3+ only** - when teaching PR workflows

**Web Method:**
1. Push branch to origin
2. Generate GitHub PR URL with parameters
3. Open URL in browser
4. Pre-filled title and description from template
5. User completes and submits in browser
6. Return to terminal, record PR created

**CLI Method (requires `gh`):**
1. Push branch to origin
2. Generate PR title and description
3. Display preview to user
4. Confirm creation
5. Execute `gh pr create` with parameters
6. Display PR URL
7. Record in state file

### PR Description Template

```markdown
## What I learned
- [Key learning point 1]
- [Key learning point 2]

## Exercise completed
- Phase X, Session Y: [Session Name]
- Updated progress tracker

## Time spent
[X] minutes

## Related
- Part of Git Learning curriculum
- Exercise branch: exercise/phase-X-session-Y
```

### Team Visibility

- PRs visible to team on GitHub
- Can @mention teammates for review practice
- Team can see progress through PR history
- Manager can track completion via closed PRs

## Helper Scripts

### `setup.sh`

**Purpose:** One-time initialization

**Actions:**
1. Check prerequisites (git, bash version)
2. Verify git repository
3. Create directory structure
4. Initialize state file
5. Add state file to .gitignore
6. Set script permissions
7. Optional: launch git-trainer.sh

### `git-trainer.sh`

**Purpose:** Main entry point and menu system

**Features:**
- Display overall progress
- Show phase menu
- Detect and offer resume
- Route to phase scripts
- Access utilities (progress, cleanup)

### `show-progress.sh`

**Purpose:** Visual progress report

**Displays:**
- Overall completion percentage and bar
- Per-phase progress bars with time
- Current position (phase, session)
- Next suggested session
- Statistics (branches, commits, PRs)
- Time spent vs estimated

### `commit-progress.sh`

**Purpose:** Guided progress commit

**Actions:**
1. Check for changes in markdown
2. Verify on exercise branch
3. Stage markdown file
4. Create commit with standard message
5. Confirm success
6. Offer to push or continue

**Usage:**
```bash
./commit-progress.sh "Phase 1 Session 1.1"
```

### Cleanup Utility

**Purpose:** Remove completed exercise branches

**Features:**
- List all exercise branches
- Identify completed sessions
- Confirm before deletion
- Delete selected branches
- Summary of cleanup

## Dependencies & Compatibility

### Required

- **Bash:** 4.0+ (for associative arrays)
- **Git:** 2.0+ (core functionality)
- **Unix tools:** cat, grep, sed, awk, tput

### Optional

- **GitHub CLI (`gh`):** For CLI-based PR creation (fallback to web)
- **Browser opener:** `open` (macOS), `xdg-open` (Linux), `start` (Windows)
- **JSON parser (`jq`):** For state file parsing (fallback to grep/sed)

### Platform Support

- **macOS:** Primary platform (fully supported)
- **Linux:** Fully supported
- **Windows (Git Bash):** Basic support (web PRs only, no color)
- **WSL:** Fully supported

### Graceful Degradation

- Missing `gh` → Use web-based PR creation
- Missing `jq` → Use grep/sed for JSON
- Missing browser opener → Display links for manual copy
- Limited terminal → Disable colors, simple formatting

## Testing Strategy

### Manual Testing Checklist

**Setup:**
- [ ] Fresh repo setup
- [ ] Existing repo with .git
- [ ] Missing dependencies scenarios

**Session Flow:**
- [ ] Complete full session start-to-finish
- [ ] Interrupt and resume
- [ ] Skip steps
- [ ] Request help
- [ ] Invalid inputs

**Branch Operations:**
- [ ] Create exercise branch
- [ ] Branch already exists
- [ ] Switch branches
- [ ] Cleanup branches

**Error Conditions:**
- [ ] Not in git repo
- [ ] Uncommitted changes
- [ ] Detached HEAD
- [ ] Network issues (PR creation)

**Progress Tracking:**
- [ ] State file updates
- [ ] Progress display accuracy
- [ ] Time tracking
- [ ] Resume from state

### Edge Cases

1. **Multiple interruptions:** Resume works after multiple Ctrl+C
2. **Corrupt state file:** Detect and offer to reset
3. **Manual branch deletion:** Handle gracefully
4. **Markdown not updated:** Detect and prompt
5. **PR creation fails:** Offer retry or skip

## Security & Safety

### Git Safety

- Never force push
- Always create branches (never work on main directly)
- Confirm before destructive operations
- Allow undo for recent actions
- Clear warnings before permanent changes

### File Safety

- State file in .gitignore (never committed)
- No modification of user files outside markdown
- Exercise directories clearly marked
- Cleanup requires confirmation

### Privacy

- No data sent to external services
- State file stays local
- GitHub integration only via user's credentials
- No telemetry or tracking

## Future Enhancements

### Potential Additions (Not in V1)

1. **Automated validation:** Check if commands were run correctly
2. **Replay mode:** Show what was learned previously
3. **Export progress:** Generate shareable progress report
4. **Reminder integration:** Export to Apple Reminders
5. **Team mode:** Multiple users on same repo with namespacing
6. **Achievement badges:** Visual rewards for milestones
7. **Difficulty levels:** Skip basics or add advanced topics
8. **Quiz mode:** Test retention of concepts
9. **Video tutorials:** Embedded video player in terminal
10. **AI assistant:** Claude integration for Q&A during exercises

## Success Metrics

### User Success Indicators

- Completes all 5 phases (245 minutes total)
- Creates real branches, commits, and PRs
- Updates markdown file after each session
- Can explain git workflows to teammates
- Confidently works with Claude Code safely

### System Success Indicators

- 90%+ completion rate for started sessions
- Low error rate in user interactions
- Positive feedback on guidance quality
- Successful PR creation in Phase 3+
- Resume functionality works reliably

## Appendix A: Session Mapping

### Phase 0: Foundation (20 mins)

- Task 1: Protect main branch (5 mins)
- Task 2: Team agreement discussion (15 mins)

### Phase 1: Inspection (60 mins)

- Session 1.1: What Changed? (15 + 15 mins)
- Session 1.2: Staging (15 + 15 mins)
- Session 1.3: Undoing Mistakes (15 + 15 mins)
- Session 1.4: Daily Workflow (15 + 15 mins)

### Phase 2: Branching (50 mins)

- Session 2.1: Branch Basics (10 + 20 mins)
- Session 2.2: Branch Naming (10 mins)
- Session 2.3: Branching Workflow (10 + 20 mins)

### Phase 3: Pull Requests (70 mins)

- Session 3.1: Understanding PRs (15 + 15 mins)
- Session 3.2: Creating a PR (10 + 20 mins)
- Session 3.3: Reviewing a PR (10 + 20 mins)
- Session 3.4: Merging a PR (10 + 10 mins)

### Phase 4: Claude + Git (45 mins)

- Session 4.1: Inspecting Claude's Changes (15 + 15 mins)
- Session 4.2: Asking Claude Safely (15 + 15 mins)
- Session 4.3: Emergency Recovery (15 + 15 mins)

**Total:** 245 minutes (4 hours 5 minutes)

## Appendix B: Commit Message Templates

### Session Completion

```
Complete Phase {X} Session {Y}: {Session Name}

- Completed learning materials
- Finished hands-on exercise
- Updated progress tracker
- Time spent: {X} minutes

Co-Authored-By: Git Learning System <noreply@example.com>
```

### Phase Completion

```
Complete Phase {X}: {Phase Name}

All sessions completed:
- Session {X}.1: {Name}
- Session {X}.2: {Name}
...

Total time: {X} minutes
Ready for Phase {X+1}
```

## Appendix C: State File Schema

See "State Management" section for full JSON structure.

## Sign-Off

This design specification has been reviewed and approved for implementation.

**Next Steps:**
1. Review this spec document
2. Create implementation plan with writing-plans skill
3. Implement core system (git-trainer.sh, helpers)
4. Implement phase scripts (phase0-4)
5. Test on macOS, Linux, and Git Bash
6. Deploy and begin training

---

**End of Design Specification**
