
# Git Learning Progress Tracker - Complete System
**Start Date:** [Add today's date]  
**Target Completion:** 10 weeks  
**Total Estimated Time:** 305 minutes (5 hours 5 minutes)

---

## 📊 Overall Progress

| Phase | Status | Time Spent | Time Estimate | % Complete |
|-------|--------|-----------|----------------|-----------|
| Phase 0: Git Foundations | ⬜ Not Started | 0 mins | 60 mins | 0% |
| Phase 1: Safety Setup | ⬜ Not Started | 0 mins | 20 mins | 0% |
| Phase 2: Inspection | ⬜ Not Started | 0 mins | 60 mins | 0% |
| Phase 3: Branching | ⬜ Not Started | 0 mins | 50 mins | 0% |
| Phase 4: Pull Requests | ⬜ Not Started | 0 mins | 70 mins | 0% |
| Phase 5: Claude + Git | ⬜ Not Started | 0 mins | 45 mins | 0% |
| **TOTAL** | | **0 mins** | **305 mins** | **0%** |

## 🌱 Phase 0: Git Foundations - The Basics
**Timeline:** Week 0 (Before starting) | **Total Time:** 60 minutes | **Status:** ⬜ Not Started

**Why:** Understanding Git fundamentals is essential before learning advanced workflows. This phase covers the core concepts you'll use every day.

### Session 0.1: What is Git and Why Use It?
- **Time Estimate:** 15 minutes
- **Status:** ⬜ Not Started
- **Date Started:** 
- **Date Completed:** 
- **Notes:** 

**Learning Objectives:**
- [ ] Understand what version control is
- [ ] Know why Git is useful
- [ ] Understand the difference between Git and GitHub
- [ ] Know the basic Git workflow

**Resources:**
- 📖 [Pro Git Chapter 1: Getting Started](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control) (15 mins)
- 📖 [GitHub's Git Handbook](https://guides.github.com/introduction/git-handbook/) (10 mins)
- 🎥 [What is Git?](https://www.youtube.com/watch?v=2ReR1YJrNOM) (8 mins)

**Key Concepts:**
- **Version Control:** Track changes to your code over time
- **Git:** The version control system (runs on your computer)
- **GitHub:** Cloud service to host Git repositories (like Google Drive for code)
- **Repository (repo):** A project folder tracked by Git

### Session 0.2: Installing and Configuring Git
- **Time Estimate:** 15 minutes
- **Status:** ⬜ Not Started
- **Date Started:** 
- **Date Completed:** 
- **Notes:** 

**Learning Objectives:**
- [ ] Install Git on your computer
- [ ] Configure your name and email
- [ ] Verify Git is working
- [ ] Understand basic Git configuration

**Resources:**
- 📖 [Pro Git: Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (10 mins)
- 📖 [Pro Git: First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) (10 mins)
- 📖 [Atlassian: Install Git](https://www.atlassian.com/git/tutorials/install-git) (10 mins)

**Installation:**

**Mac:**
```bash
# Check if already installed
git --version

# Install via Homebrew (if not installed)
brew install git
```

**Windows:**
Download from [git-scm.com](https://git-scm.com/download/win)

**Configuration:**
```bash
# Set your name (shows up in commits)
git config --global user.name "Your Name"

# Set your email (must match GitHub email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### Session 0.3: Your First Repository
- **Time Estimate:** 20 minutes
- **Status:** ⬜ Not Started
- **Date Started:** 
- **Date Completed:** 
- **Notes:** 

**Learning Objectives:**
- [ ] Create a new Git repository
- [ ] Understand the .git folder
- [ ] Know the three states: working, staging, committed
- [ ] Make your first commit

**Resources:**
- 📖 [Pro Git Chapter 2.1: Getting a Git Repository](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository) (10 mins)
- 📖 [Pro Git Chapter 2.2: Recording Changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) (20 mins)
- 🎥 [Git Tutorial: init, add, commit](https://www.youtube.com/watch?v=HVsySz-h9r4) (15 mins)

**Hands-On Exercise 0.3:**

**Create a test repository:**
```bash
# Create a new folder
mkdir my-first-repo
cd my-first-repo

# Initialize Git (creates .git folder)
git init

# Check status
git status
```

**Create your first file:**
```bash
# Create a file
echo "# My First Git Project" > README.md

# Check status (file is "untracked")
git status
```

**Stage the file:**
```bash
# Add file to staging area
git add README.md

# Check status (file is "staged")
git status
```

**Commit the file:**
```bash
# Commit with a message
git commit -m "Initial commit: add README"

# Check status (working tree clean)
git status

# View commit history
git log
```

**The Three States:**
1. **Working Directory:** Where you edit files
2. **Staging Area (Index):** Files ready to be committed
3. **Repository (.git):** Permanent snapshot of your code

### Session 0.4: Connecting to GitHub and Pushing
- **Time Estimate:** 10 minutes
- **Status:** ⬜ Not Started
- **Date Started:** 
- **Date Completed:** 
- **Notes:** 

**Learning Objectives:**
- [ ] Create a GitHub account (if needed)
- [ ] Create a repository on GitHub
- [ ] Connect local repo to GitHub
- [ ] Push your first code to GitHub
- [ ] Understand remote vs local

**Resources:**
- 📖 [Pro Git Chapter 2.5: Working with Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) (15 mins)
- 📖 [GitHub Quickstart](https://docs.github.com/en/get-started/quickstart) (15 mins)
- 🎥 [Git and GitHub for Beginners](https://www.youtube.com/watch?v=RGOj5yH7evk) (First 15 mins)

**Hands-On Exercise 0.4:**

**Create GitHub repository:**
1. Go to [github.com](https://github.com)
2. Click "+" → "New repository"
3. Name: `my-first-repo`
4. **Do NOT** initialize with README (we already have one)
5. Click "Create repository"

**Connect local to GitHub:**
```bash
# Add GitHub as remote (copy URL from GitHub)
git remote add origin https://github.com/YOUR-USERNAME/my-first-repo.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main
```

**Verify on GitHub:**
- Refresh your GitHub repo page
- You should see your README.md file

**Key Concepts:**
- **Remote:** A version of your repo hosted elsewhere (GitHub)
- **Origin:** Default name for the main remote
- **Push:** Send your commits to GitHub
- **Pull:** Get changes from GitHub

**Common Issue: Branch Name**
```bash
# If you're on 'master' instead of 'main'
git branch -M main
git push -u origin main
```

### Phase 1 Summary
- **Total Time Spent:** 0 mins
- **Total Time Estimate:** 60 mins
- **Status:** ⬜ Not Started
- **Completion Date:** 

**You've learned:**
- ✅ What Git is and why it's useful
- ✅ How to install and configure Git
- ✅ How to create a repository
- ✅ The three states: working, staging, committed
- ✅ How to make commits
- ✅ How to connect to GitHub and push code

**You're ready for Phase 1!**



## 🛡️ Phase 1: Safety Setup
**Timeline:** Week 0 (Immediate) | **Total Time:** 20 minutes | **Status:** ⬜ Not Started

### Task 1: Protect Main Branch
- **Time Estimate:** 5 minutes
- **Status:** ⬜ Not Started
- **Date Started:** 
- **Date Completed:** 
- **Notes:** 

**What to do:**
1. Go to your repo on GitHub
2. Settings → Branches
3. Add rule for `main` branch
4. Check "Require a pull request before merging"
5. Save

**Resource:** [GitHub Docs: Protecting Branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)

### Task 2: Team Agreement Discussion
- **Time Estimate:** 15 minutes
- **Status:** ⬜ Not Started
- **Date Started:** 
- **Date Completed:** 
- **Notes:** 

**What to do:**
1. Schedule 15-min meeting with team (3 people)
2. Discuss and agree on:
   - Never push directly to main
   - Always create a branch first
   - All changes go through PRs
   - At least one teammate reviews before merge
   - Claude-generated code must be reviewed before commit

### Phase 1 Summary
- **Total Time Spent:** 0 mins
- **Total Time Estimate:** 20 mins
- **Status:** ⬜ Not Started
- **Completion Date:** 

## 🔍 Phase 2: Inspection (Learning to See What Changed)
**Timeline:** Weeks 2-3 | **Total Time:** 60 minutes | **Status:** ⬜ Not Started

**Why:** Claude overwrites happen because you don't inspect changes before committing.

### Session 2.1: What Changed? (git status & git diff)
- **Time Estimate:** 15 minutes
- **Status:** ⬜ Not Started
- **Date Started:** | **Date Completed:** | **Time Spent:** 
- **Notes:** 

**Learning Objectives:**
- [ ] Understand what `git status` shows
- [ ] Understand what `git diff` shows
- [ ] Know when to use each command
- [ ] Be able to review Claude's changes before committing

**Resources:**
- 📖 [Atlassian: Inspecting a Repository](https://www.atlassian.com/git/tutorials/inspecting-a-repository) (15 mins)
- 🎥 [Git Diff Explained](https://www.youtube.com/watch?v=rd3UjJDdWE4) (8 mins)

**Key Commands:**
```bash
git status          # See what files changed
git diff            # See EXACTLY what changed
git diff file.js    # See changes in specific file
Hands-On Exercise 1.1: What Changed?

Time: 15 minutes
  
Objective: Learn to see what changed before committing

Setup:

```bash
 
mkdir git-learning-test
cd git-learning-test
git init
Steps:

Create initial file:
```bash

 
echo "This is the original content" > file.txt
git add file.txt
git commit -m "initial commit"
Modify the file (simulate Claude):
```bash

 
echo "This is the modified content" > file.txt
Check status:
```bash

 
git status
Expected: file.txt shown as modified, NOT staged

See exact changes:
```bash

 
git diff file.txt
Expected: Red line (removed), Green line (added)

Decide: Keep or discard?

```bash
 
# Keep:
git add file.txt
git commit -m "update file.txt"

# OR Discard:
git checkout file.txt
cat file.txt  # Should show original

Verify:
```bash
 
git log --oneline
Reflection Questions:

What's the difference between git status and git diff?
How would you use this to catch Claude's mistakes?
What would you do if git diff showed something unexpected?
### Session 2.2: Staging - The Approval Gate
Time Estimate: 15 minutes
Status: ⬜ Not Started
Date Started: | Date Completed: | Time Spent: 
Notes:
Learning Objectives:

Understand the staging area (index)
Know how to stage specific files
Know how to review staged changes
Be able to commit only approved changes
Resources:

📖 Pro Git 2.2: Recording Changes (20 mins)
🎥 Git Add & Commit Explained (10 mins)
Key Commands:

```bash
 
git add file.js              # Stage specific file
git add .                    # Stage all changes
git diff --staged            # See what WILL be committed
git reset file.js            # Unstage a file
Hands-On Exercise 1.2: Staging

Time: 15 minutes
  
Objective: Learn to approve SOME changes and reject OTHERS

Setup:

```bash

 
cd git-learning-test  # Use same repo from 1.1
Steps:

Create 3 files:
```bash

 
echo "file 1 original" > file1.txt
echo "file 2 original" > file2.txt
echo "file 3 original" > file3.txt
git add .
git commit -m "create three files"
Modify all 3 files:
```bash

 
echo "file 1 modified" > file1.txt
echo "file 2 modified" > file2.txt
echo "file 3 modified" > file3.txt
Check status:
```bash

 
git status
Expected: All 3 files modified, none staged

Review each file:
```bash

 
git diff file1.txt
git diff file2.txt
git diff file3.txt
Stage only file1 and file3 (you want these):
```bash

 
git add file1.txt
git add file3.txt
See what WILL be committed:
```bash

 
git diff --staged
Expected: Only file1 and file3 shown

Commit only approved files:
```bash

 
git commit -m "update files 1 and 3"
Verify file2 is still modified but NOT committed:

```bash

 
git status
git diff file2.txt
Discard file2:
```bash

 
git checkout file2.txt
git status
Reflection Questions:

Why is the staging area useful?
How would you use this with Claude's code?
What if Claude modified 5 files but you only want 3 changes?
### Session 2.3: Undoing Mistakes - Your Safety Net
Time Estimate: 15 minutes
Status: ⬜ Not Started
Date Started: | Date Completed: | Time Spent: 
Notes:
Learning Objectives:

Know how to undo uncommitted changes
Know how to undo a commit
Know how to undo a pushed commit
Understand when to use each method
Resources:

📖 Atlassian: Undoing Changes (20 mins)
🎥 Git Reset Explained (12 mins)
Key Commands:

```bash
 
git checkout file.js         # Undo changes to specific file
git reset --soft HEAD~1      # Undo last commit, keep changes
git reset --hard HEAD~1      # Undo last commit, discard changes
git revert HEAD              # Undo pushed commit safely
Hands-On Exercise 1.3: Undoing Mistakes

Time: 15 minutes
  
Objective: Learn to undo commits safely

### Setup:

```bash

 
cd git-learning-test  # Use same repo
Steps:

### Create and commit:
```bash

 
echo "version 1" > version.txt
git add version.txt
git commit -m "version 1"
Modify and commit again:
```bash

 
echo "version 2" > version.txt
git add version.txt
git commit -m "version 2"
Modify and commit third time:
```bash

 
echo "version 3" > version.txt
git add version.txt
git commit -m "version 3"

### See commit history:
```bash

 
git log --oneline -5
Undo last commit but keep changes:

```bash
 
git reset --soft HEAD~1
git status
cat version.txt  # Should show "version 3"
Re-commit with better message:
```bash

 
git commit -m "update to version 3 with better message"
Undo a commit AND discard changes:
```bash

 
echo "version 4" > version.txt
git add version.txt
git commit -m "version 4"
git reset --hard HEAD~1
cat version.txt  # Should show "version 3"
Undo a pushed commit safely:
```bash

 
echo "bad code" > version.txt
git add version.txt
git commit -m "bad commit"
git revert HEAD
cat version.txt  # Should show previous version
git log --oneline -3
Reflection Questions:

What's the difference between reset and revert?
When would you use each one?
How would you recover if Claude overwrote your code?
### Session 2.4: Your Daily Workflow - Putting It Together
Time Estimate: 15 minutes
Status: ⬜ Not Started
Date Started: | Date Completed: | Time Spent: 
Notes:
Learning Objectives:

Understand your new daily workflow
Know the inspection ritual
Be able to apply this to real projects
Feel confident before committing
Your New Daily Workflow:

```bash

 
# 1. Start your day
git status
git pull origin main

# 2. Create a branch
git checkout -b feature/my-feature

# 3. Make changes (with Claude or manually)
# ... work work work ...

# 4. BEFORE committing (CRITICAL STEP)
git status              # What changed?
git diff                # Review each change
git diff file-name.js   # Review specific file

# 5. Approve what you want
git add file1.js file2.js
git diff --staged       # Final review

# 6. Commit
git commit -m "descriptive message"

# 7. Push to YOUR branch
git push origin feature/my-feature
Hands-On Exercise 1.4: Your Daily Workflow

Time: 15 minutes
  
Objective: Apply Phase 1 to a real project

Setup:

```bash

 
cd your-project  # Use a real project
Steps:

Start your day:
```bash

 
git status
git pull origin main
Create a feature branch:
```bash

 
git checkout -b feature/exercise-1-4
Make some changes:
```bash

 
echo "new feature" > new-feature.txt
BEFORE committing, inspect:
```bash

 
git status
git diff
git diff new-feature.txt
Decide: approve or reject:
```bash

 
# If you like it:
git add new-feature.txt
git diff --staged
git commit -m "add new feature"
Push to your branch:
```bash

 
git push origin feature/exercise-1-4
Review what you committed:
```bash

 
git log --oneline -3
git show HEAD
Reflection Questions:

How does this workflow prevent Claude overwrites?
What's the most important step in this workflow?
How would you explain this to your team?
### Phase 1 Summary
Total Time Spent: 0 mins
Total Time Estimate: 60 mins
Status: ⬜ Not Started
Completion Date:
Phase 1 Checklist:

All 4 sessions completed
All hands-on exercises done
Can explain the workflow to someone else
Ready to move to Phase 3
## 🌿 Phase 3: Branching (Isolation = Safety)
**Timeline:** Weeks 3-4 | **Total Time:** 50 minutes | **Status:** ⬜ Not Started

Why: Branching prevents overwrites by isolating your work.

### Session 3.1: Branch Basics - Understanding Branches
- **Time Estimate:** 20 minutes
- **Status:** ⬜ Not Started
- **Date Started:** | Date Completed: | Time Spent: 
- **Notes:**
**Learning Objectives:**

Understand what a branch is
Know how to create a branch
Know how to switch between branches
Understand branch isolation
**Resources:**

📖 Pro Git 3.1: Branches in a Nutshell (20 mins)
🎥 Git Branching Explained (10 mins)
**Key Concept:**

A branch is a separate line of work. Changes in one branch don't affect another.

```plaintext

 
main (production code)
  ├── feature/user-auth (your work)
  ├── feature/payment (teammate's work)
  └── bugfix/login-crash (another teammate's work)
**Key Commands:**

```bash

 
git branch -a                    # See all branches
git branch feature/my-feature    # Create a branch
git checkout feature/my-feature  # Switch to branch
git switch feature/my-feature    # Switch (newer syntax)
git checkout -b feature/new      # Create and switch
git branch -d feature/my-feature # Delete a branch
Hands-On Exercise 2.1: Branch Basics

Time: 20 minutes
  
Objective: Understand branch isolation

Setup:

```bash

 
mkdir git-branching-test
cd git-branching-test
git init
Steps:

Create initial content on main:
```bash

 
echo "main branch content" > main.txt
git add main.txt
git commit -m "initial commit on main"
Create a feature branch:
```bash

 
git branch feature/my-feature
See all branches:
```bash

 
git branch
# Output:
#   feature/my-feature
# * main  (asterisk = current)
Switch to feature branch:
```bash

 
git checkout feature/my-feature
# OR
git switch feature/my-feature
Verify you're on feature branch:
```bash

 
git branch
# Output:
# * feature/my-feature
#   main
Create content in feature branch:
```bash

 
echo "feature branch content" > feature.txt
git add feature.txt
git commit -m "add feature"
List files on feature branch:
```bash

 
ls
# Output: feature.txt, main.txt
Switch back to main:
```bash

 
git checkout main
List files on main:
```bash

 
ls
# Output: main.txt
# (feature.txt is NOT here!)
See branch structure:
```bash

 
git log --oneline --graph --all
Switch back to feature:
```bash

 
git checkout feature/my-feature
ls
# feature.txt IS here
Delete the feature branch:
```bash

 
git checkout main
git branch -d feature/my-feature
git branch
Reflection Questions:

How does branching prevent overwrites?
Why is isolation important?
How would you use this with your team?
### Session 3.2: Branch Naming Convention - Consistency
- **Time Estimate:** 10 minutes
- **Status:** ⬜ Not Started
- **Date Started:** | Date Completed: | Time Spent: 
- **Notes:**
**Learning Objectives:**

Know your team's branch naming convention
Be able to create branches with proper names
Understand why naming matters
Branch Naming Pattern:

```plaintext

 
feature/description-of-feature
bugfix/description-of-bug
hotfix/critical-issue
Examples:

```plaintext

 
feature/user-authentication
feature/payment-integration
feature/JIRA-123-user-auth
bugfix/login-page-crash
bugfix/database-connection-error
hotfix/critical-security-issue
Rules:

Lowercase
Use hyphens (not spaces or underscores)
Descriptive (not feature/stuff)
Related to Jira ticket if possible
Hands-On Exercise 2.2: Branch Naming Convention

Time: 10 minutes
  
Objective: Practice proper branch naming

Setup:

```bash

 
cd git-branching-test  # Use same repo from 2.1
Steps:

Create branches with proper naming:
```bash

 
git branch feature/user-authentication
git branch bugfix/login-page-crash
git branch hotfix/critical-security-issue
See all branches:
```bash

 
git branch
Create improper branches:
```bash

 
git branch feature/stuff  # Too vague
git branch fix_bug        # Wrong format
See all branches:
```bash

 
git branch
Delete improper branches:
```bash

 
git branch -d feature/stuff
git branch -d fix_bug
Verify proper branches remain:
```bash

 
git branch
Reflection Questions:

Why is naming convention important?
How would you communicate this to your team?
What naming convention does your team prefer?
### Session 3.3: Your Branching Workflow - Putting It Together
- **Time Estimate:** 20 minutes
- **Status:** ⬜ Not Started
- **Date Started:** | Date Completed: | Time Spent: 
- **Notes:**
**Learning Objectives:**

Understand the complete branching workflow
Know when to create a branch
Know how to work in a branch
Know how to push a branch
Your New Branching Workflow:

```bash

 
# 1. Make sure you're on main and it's up-to-date
git checkout main
git pull origin main

# 2. Create a branch for your work
git checkout -b feature/my-feature

# 3. Make changes (with Claude or manually)
# ... work work work ...

# 4. Inspect before committing (from Phase 1)
git status
git diff
git diff file-name.js

# 5. Stage and commit
git add file1.js file2.js
git commit -m "add user authentication"

# 6. Push to YOUR branch (NOT main)
git push origin feature/my-feature

# 7. Later: Create a PR to merge into main (Phase 3)
Hands-On Exercise 2.3: Your Branching Workflow

Time: 20 minutes
  
Objective: Apply branching to a real project

Setup:

```bash

 
cd your-project  # Use a real project
Steps:

Make sure you're on main and it's up-to-date:
```bash

 
git checkout main
git pull origin main
Create a branch for your work:
```bash

 
git checkout -b feature/exercise-2-3
Make changes (create or modify files):
```bash

 
echo "new feature" > new-file.txt
Inspect before committing (from Phase 1):
```bash

 
git status
git diff
Stage and commit:
```bash

 
git add new-file.txt
git commit -m "add new feature"
Push to your branch (NOT main):
```bash

 
git push origin feature/exercise-2-3
Verify on GitHub:
Go to your repo on GitHub
You should see your branch in the branch list
You should see your commit
See the branch structure:
```bash

 
git log --oneline --graph --all
Reflection Questions:

Why do you create a branch BEFORE making changes?
What happens if you push to main instead of your branch?
How does this prevent Claude overwrites?
### Phase 2 Summary
Total Time Spent: 0 mins
Total Time Estimate: 50 mins
- **Status:** ⬜ Not Started
Completion Date:
Phase 2 Checklist:

All 3 sessions completed
All hands-on exercises done
Can create and use branches confidently
Ready to move to Phase 3
## 🔀 Phase 4: Pull Requests (The Safety Net)
**Timeline:** Weeks 5-6 | **Total Time:** 70 minutes | **Status:** ⬜ Not Started

Why: Pull Requests are how you ask teammates to review your code before merging to main.

### Session 4.1: Understanding Pull Requests - What is a PR?
- **Time Estimate:** 20 minutes
- **Status:** ⬜ Not Started
- **Date Started:** | Date Completed: | Time Spent: 
- **Notes:**
**Learning Objectives:**

Understand what a PR is
Know why PRs matter
Know the PR anatomy
Understand the review process
**Resources:**

📖 GitHub Docs: About Pull Requests (15 mins)
🎥 GitHub Pull Requests Explained (12 mins)
What is a PR?

A PR says: "I've made changes in my branch. Please review them before I merge to main."

PR Anatomy:

```plaintext

 
Title: "Add user authentication"

Description:
- What does this PR do?
- Why?
- How to test?

Files Changed:
- src/auth.js (new file)
- src/login.html (modified)

Reviewers: @teammate1, @teammate2

- **Status:** ✅ Approved
Why PRs Matter:

Catches Claude mistakes before merge
Creates a record of changes
Allows discussion about code
Prevents overwrites
Easy to rollback if needed
Hands-On Exercise 3.1: Understanding Pull Requests

Time: 20 minutes
  
Objective: Learn what a PR is and why it matters

Steps:

Find a public repo on GitHub
Go to GitHub.com
Search for a popular repo (e.g., "awesome-python")
Look at Pull Requests
Click "Pull requests" tab
Find a merged PR
Review the PR
Read the title and description
Click "Files changed"
Look at the code changes
See reviewer comments
Understand the PR anatomy
Title: What does this PR do?
Description: Why? How to test?
Files Changed: What files were modified?
Reviewers: Who reviewed it?
- **Status:** Was it approved?
Answer these questions:
What was the purpose of this PR?
Who reviewed it?
What files were changed?
Were there any comments or concerns?
How would a PR have helped your situation?
Reflection Questions:

How would a PR have caught the Claude overwrite?
What would you include in a PR description?
How would this help your team?
### Session 4.2: Creating a Pull Request - Making Your First PR
- **Time Estimate:** 20 minutes
- **Status:** ⬜ Not Started
- **Date Started:** | Date Completed: | Time Spent: 
- **Notes:**
**Learning Objectives:**

Know how to create a PR on GitHub
Know how to write a good PR description
Know how to request reviewers
Be able to create your first PR
**Resources:**

📖 GitHub Docs: Creating a Pull Request (15 mins)
How to Create a PR:

Push your branch to GitHub
```plaintext

 
git push origin feature/my-feature
Go to your repo on GitHub.com
You'll see a banner: "Compare & pull request" → Click it
Fill in the PR details:
```plaintext

 
Title: "Add user authentication"

Description:
Adds login and logout functionality for user management.

Related Jira: JIRA-123

How to test:
1. Go to /login
2. Enter test credentials
3. Should redirect to dashboard
Add reviewers (your teammates)
Click "Create pull request"
PR Description Template:

markdown

 
## What does this PR do?
Brief description of changes

## Why?
Why was this change needed?

## Related Jira Ticket
JIRA-123

## How to test it?
Steps to verify the changes work

## Screenshots (if applicable)
Add screenshots of UI changes
Hands-On Exercise 3.2: Creating a Pull Request

Time: 20 minutes
  
Objective: Create your first PR

Setup:

```bash

 
cd your-project
Steps:

Create and push a feature branch:
```bash

 
git checkout main
git pull origin main
git checkout -b feature/exercise-3-2

# Make some changes
echo "new feature" > feature.txt

git add feature.txt
git commit -m "add new feature"
git push origin feature/exercise-3-2
Go to GitHub
Go to your repo
You should see a banner: "Compare & pull request"
Click "Compare & pull request"
Fill in the PR details:
```plaintext

 
Title: "Add new feature for exercise 3.2"

Description:
## What does this PR do?
Adds a new feature file for learning purposes.

## Why?
This is an exercise to learn how to create PRs.

## How to test it?
1. Check that feature.txt exists
2. Verify it contains "new feature"

## Related Jira Ticket
None (learning exercise)
Add reviewers
Add at least one teammate as reviewer
Click "Create pull request"
Wait for review
Don't merge yet
Wait for teammate to review
See the PR on GitHub
Go to "Pull requests" tab
Click on your PR
See the files changed
See the description
Reflection Questions:

What makes a good PR description?
Why would you add reviewers?
What would you want a reviewer to check?
### Session 4.3: Reviewing a Pull Request - Being a Reviewer
Time Estimate: 20 minutes
Status: ⬜ Not Started
Date Started: | Date Completed: | Time Spent: 
Notes:
Learning Objectives:

Know how to review a PR
Know what to look for in a review
Know how to comment on code
Know how to approve or request changes
Resources:

📖 GitHub Docs: Reviewing Changes in Pull Requests (15 mins)
How to Review a PR:

Go to "Pull requests" tab on GitHub
Click on a PR
Click "Files changed"
Review code line-by-line
Hover over a line to comment
Click "Review changes" at top-right
Choose:
✅ "Approve" (looks good)
💬 "Comment" (have questions)
❌ "Request changes" (needs fixes)
Reviewer Checklist:

Code does what the PR description says
No obvious bugs
No accidental overwrites of other work
Code is readable
No debugging code left in (console.logs, etc.)
Follows team style/conventions
Example Review Comment:

```plaintext

 
On line 42 in auth.js:

❌ This overwrites the password validation from JIRA-120.
   Did you mean to remove it?

Suggestion:
Keep the validation from JIRA-120 and add your new logic.
Hands-On Exercise 3.3: Reviewing a Pull Request

Time: 20 minutes
  
Objective: Review a teammate's PR

Setup:

```bash

 
# Wait for a teammate to create a PR
# OR create a second PR yourself to practice reviewing
Steps:

Find a PR to review
Go to "Pull requests" tab
Click on a PR that needs review
Read the PR description
What does it do?
Why was it created?
How should you test it?
Click "Files changed"
Review the code
Read through each change
Look for obvious bugs
Check if it does what the description says
Look for accidental overwrites
Add a comment
Hover over a line of code
Click the comment icon
Add a comment (e.g., "Looks good!" or "Did you mean to change this?")
Click "Review changes"
Choose an action
✅ "Approve" (looks good)
💬 "Comment" (have questions)
❌ "Request changes" (needs fixes)
Submit your review
Reflection Questions:

What would you look for when reviewing Claude's code?
How would you catch an overwrite?
What makes a helpful review comment?
### Session 4.4: Merging a Pull Request - Finalizing Changes
Time Estimate: 10 minutes
Status: ⬜ Not Started
Date Started: | Date Completed: | Time Spent: 
Notes:
Learning Objectives:

Know how to merge a PR
Know when to merge
Know how to clean up after merge
Understand merge strategies
Resources:

📖 GitHub Docs: Merging a Pull Request (10 mins)
How to Merge a PR:

Via GitHub (Easiest):

PR is approved
Click "Merge pull request" button
Choose merge strategy (usually "Create a merge commit")
Click "Confirm merge"
Delete the branch (optional but recommended)
Via CLI:

```bash

 
# Switch to main
git checkout main

# Pull latest
git pull origin main

# Merge the branch
git merge feature/my-feature

# Push to main
git push origin main

# Delete the branch
git branch -d feature/my-feature
git push origin --delete feature/my-feature
When to Merge:

✅ PR is approved by at least one reviewer
✅ All tests pass (if applicable)
✅ No conflicts with main
✅ You've reviewed the changes one more time
Hands-On Exercise 3.4: Merging a Pull Request

Time: 10 minutes
  
Objective: Merge a PR

Setup:

```bash

 
# Use a PR that's been approved
Steps:

Go to the PR on GitHub
Verify it's approved
Should show "✅ All checks passed"
Should show "✅ Approved by [reviewer]"
Click "Merge pull request"
Choose merge strategy
Usually "Create a merge commit"
Click "Confirm merge"
Delete the branch
GitHub will offer to delete the branch
Click "Delete branch"
Verify on your local machine:
```bash

 
git checkout main
git pull origin main

# You should see the changes from the PR
See the merge in history:
```bash

 
git log --oneline --graph -10
# Should show the merge commit
Reflection Questions:

Why would you delete a branch after merging?
What's the difference between merge strategies?
How would you handle a merge conflict?
### Phase 3 Summary
Total Time Spent: 0 mins
Total Time Estimate: 70 mins
Status: ⬜ Not Started
Completion Date:
Phase 3 Checklist:

All 4 sessions completed
All hands-on exercises done
Can create and review PRs confidently
Ready to move to Phase 4
## 🤖 Phase 5: Claude + Git Safety
**Timeline:** Weeks 7-8 | **Total Time:** 45 minutes | **Status:** ⬜ Not Started

Why: This is where you apply everything you've learned to safely work with Claude.

### Session 5.1: Inspecting Claude's Changes - Catching Mistakes
- **Time Estimate:** 15 minutes
- **Status:** ⬜ Not Started
- **Date Started:** | Date Completed: | Time Spent: 
- **Notes:**
**Learning Objectives:**

Know how to inspect Claude's changes
Know what to do if Claude changes something unexpected
Know how to approve or reject Claude's work
Feel confident before committing Claude's code
Your Workflow When Claude Helps:

```bash

 
# 1. Claude modifies file.js
# (You see it in VS Code)

# 2. BEFORE committing, inspect
git status
# Output: modified: file.js

git diff file.js
# Output: Shows EXACTLY what Claude changed
# Red lines = removed
# Green lines = added

# 3. Review line-by-line
# Ask yourself: "Is this what I wanted?"

# 4. If NO:
git checkout file.js  # Undo Claude's changes

# 5. If YES:
git add file.js
git commit -m "update file.js with Claude's changes"
Hands-On Exercise 4.1: Inspecting Claude's Changes

Time: 15 minutes
  
Objective: Catch Claude mistakes before committing

Setup:

```bash

 
cd your-project
git checkout -b feature/exercise-4-1
Steps:

Ask Claude to modify a file:
```plaintext

 
Prompt: "Claude, help me add a function to calculate the sum of two numbers 
in src/math.js. Do NOT commit or push. Explain what you changed."
Claude modifies the file
You see the change in VS Code
BEFORE committing, inspect:
```bash

 
git status
# Should show src/math.js as modified

git diff src/math.js
# Shows EXACTLY what Claude changed
Review line-by-line
Is this what you wanted?
Does it follow your style?
Are there any bugs?
Ask Claude to explain:
```plaintext

 
Prompt: "Claude, explain what you changed in src/math.js"
Decide: approve or reject
If you like it:

```bash

 
git add src/math.js
git diff --staged
# Final review

git commit -m "add sum function with Claude's help"
If you don't like it:

```bash

 
git checkout src/math.js
# Changes are undone
Push to your branch:
```bash

 
git push origin feature/exercise-4-1
Reflection Questions:

How would this have prevented the overwrite you experienced?
What would you do if Claude changed something unexpected?
How would you explain this to Claude?
### Session 5.2: Asking Claude Safely - Prompting for Git Safety
- **Time Estimate:** 15 minutes
- **Status:** ⬜ Not Started
- **Date Started:** | Date Completed: | Time Spent: 
- **Notes:**
**Learning Objectives:**

Know how to prompt Claude safely
Know what Claude should NOT do
Know how to structure prompts
Be able to work with Claude confidently
How to Prompt Claude Safely:

❌ DON'T:
```plaintext

 
"Claude, fix this bug and push it to main"
"Claude, commit and merge these changes"
"Claude, run these git commands"
✅ DO:
```plaintext

 
"Claude, help me fix this bug in file.js"
(Claude modifies file.js)

Then YOU:
git diff file.js
(Review the changes)

Then ask Claude:
"Claude, explain what you changed in file.js"
(Claude explains)

Then YOU:
git add file.js
git commit -m "fix bug with Claude's help"
Better Prompt Template:

```plaintext

 
You are helping with code changes in a Git repository.

Rules:
1. Make changes to the code
2. DO NOT run any Git commands
3. DO NOT commit or push
4. Explain what you changed
5. Wait for human approval

Task: [Describe what you want Claude to do]
Example Prompts:

```plaintext

 
❌ Bad:
"Claude, implement the login feature from JIRA-123"

✅ Good:
"Claude, help me implement the login feature from JIRA-123.
Make changes to src/auth.js and src/login.html.
Do NOT commit or push.
Explain what you changed when done."
```plaintext

 
❌ Bad:
"Claude, fix the bug and push it"

✅ Good:
"Claude, help me fix the database connection bug in src/db.js.
Show me what you change.
Do NOT commit or push.
I'll review and commit it myself."
Hands-On Exercise 4.2: Asking Claude Safely

Time: 15 minutes
  
Objective: Learn to prompt Claude safely

Setup:

```bash

 
cd your-project
git checkout -b feature/exercise-4-2
Steps:

Create a safe prompt:
```plaintext

 
You are helping with code changes in a Git repository.

Rules:
1. Make changes to the code
2. DO NOT run any Git commands
3. DO NOT commit or push
4. Explain what you changed
5. Wait for human approval

Task: Help me implement a login form in src/login.html.
Make it simple with username and password fields.
Send the prompt to Claude
Claude makes changes
Claude explains what it changed
Inspect the changes:
```bash

 
git status
git diff src/login.html
Review and approve:
```bash

 
git add src/login.html
git commit -m "add login form with Claude's help"
Create a PR:
```bash

 
git push origin feature/exercise-4-2
# Go to GitHub and create a PR
Have teammate review
Teammate reviews the Claude-generated code
Teammate approves or requests changes
Merge after approval
Reflection Questions:

Why shouldn't Claude run Git commands?
What's the advantage of reviewing before committing?
How would you explain this to Claude?
### Session 5.3: Emergency Recovery - If Something Goes Wrong
- **Time Estimate:** 15 minutes
- **Status:** ⬜ Not Started
- **Date Started:** | Date Completed: | Time Spent: 
- **Notes:**
**Learning Objectives:**

Know how to recover from Claude mistakes
Know how to undo bad commits
Know how to restore overwritten code
Feel confident you can fix anything
If Claude Overwrites Code:

Step 1: See What Happened
```bash

 
git log --oneline -5
# Find the commit that overwrote your work

git show commit-hash
# See what changed in that commit

git diff commit-hash~1 commit-hash
# See the exact changes
Step 2: Undo It
```bash

 
# Option A: Revert the commit
git revert commit-hash
git push origin branch-name

# Option B: Restore a specific file
git checkout commit-hash~1 -- file-name.js
git add file-name.js
git commit -m "restore file-name.js to previous version"
git push origin branch-name
Step 3: Prevent It Again
Review Claude's changes with git diff before committing
Create a PR so teammate reviews before merge
Protect main branch (Phase 0)
Hands-On Exercise 4.3: Emergency Recovery

Time: 15 minutes
  
Objective: Recover from Claude mistakes

Setup:

```bash

 
cd your-project
git checkout -b feature/exercise-4-3
Steps:

Create a scenario where Claude "overwrites" code:
```bash

 
# Create initial file
echo "important function" > important.js
git add important.js
git commit -m "add important function"

# Simulate Claude overwriting it
echo "claude overwrote this" > important.js
git add important.js
git commit -m "update important.js"
Realize the mistake:
```bash

 
git log --oneline -5
# Find the bad commit
See what happened:
```bash

 
git show HEAD
# See the bad commit

git diff HEAD~1 HEAD
# See the exact changes
Undo it:
```bash

 
git revert HEAD
# Creates a new commit that undoes the bad one
Verify it's fixed:

```bash
 
cat important.js
# Should show "important function" again

git log --oneline -5
# Should show the revert commit

Push the fix:
```bash

 git push origin feature/exercise-4-3

Create a PR to explain what happened:
```plaintext

 
Title: "Revert accidental overwrite of important.js"

Description:
Claude accidentally overwrote important.js.
This PR reverts that change.

The issue was: [explain what happened]
The fix: [explain how you fixed it]
Reflection Questions:

How would you explain what happened to your team?
What would you do differently next time?
How would you prevent this in the future?
### Phase 4 Summary
Total Time Spent: 0 mins
Total Time Estimate: 45 mins
- **Status:** ⬜ Not Started
Completion Date:
Phase 4 Checklist:

All 3 sessions completed
All hands-on exercises done
Can work with Claude safely
Can recover from mistakes
Ready to use in real projects
🎓 Overall Completion
Final Summary
Total Time Spent: 0 mins
Total Time Estimate: 245 mins (4 hours 5 minutes)
Overall Status: ⬜ Not Started
Overall Completion Date:
Completion Checklist
Phase 0: Foundation (20 mins)
Phase 1: Inspection (60 mins)
Phase 2: Branching (50 mins)
Phase 3: Pull Requests (70 mins)
Phase 4: Claude + Git (45 mins)
All hands-on exercises completed
Can explain workflow to team
Ready to use in production
Reflection
When you complete this training, write your thoughts here:

What was most helpful?

What was most challenging?

How will you use this in your work?

What would you teach your team?

📝 Commit Your Progress
Track your progress by committing this file after each phase:

```bash

 
git add git-learning-complete.md
git commit -m "Phase 0 complete: Foundation setup"
git push origin main
View your learning history:

```bash

 
git log --oneline -- git-learning-complete.md
📚 Resources Summary
Documentation:

Atlassian Git Tutorials
Pro Git Book (Free Online)
GitHub Docs
Videos:

Traversy Media: Git & GitHub Crash Course
Git Diff Explained
Git Branching Explained
GitHub Pull Requests Explained
Tools:

Git Cheat Sheet
GitHub Desktop
VS Code Git Extension
🤝 Sharing Your Progress
You can share this file with:

Your manager
Your project collaborator
Your team
Just send them the link to this file in your repo:

```plaintext

 
https://github.com/[your-repo]/blob/main/git-learning-complete.md
They can see:

Your progress over time
What you've learned
Your commit history
How you're improving
📱 APPLE REMINDERS -  These Into Reminders App
WEEK 0 (Immediate)

Monday 9:00 AM - Phase 0: Protect main branch (5 mins)
Tuesday 9:00 AM - Phase 0: Team agreement discussion (15 mins)
WEEK 1

Monday 9:00 AM - Phase 1 Session 1: What Changed? (15 mins)
Wednesday 9:00 AM - Phase 1 Session 1: Hands-On Exercise (15 mins)
Friday 9:00 AM - Phase 1 Session 2: Staging (15 mins)
WEEK 2

Monday 9:00 AM - Phase 1 Session 2: Hands-On Exercise (15 mins)
Wednesday 9:00 AM - Phase 1 Session 3: Undoing Mistakes (15 mins)
Friday 9:00 AM - Phase 1 Session 3: Hands-On Exercise (15 mins)
WEEK 3

Monday 9:00 AM - Phase 1 Session 4: Daily Workflow (15 mins)
Wednesday 9:00 AM - Phase 1 Session 4: Hands-On Exercise (15 mins)
Friday 9:00 AM - Phase 1 Complete - Review & Reflect
WEEK 4

Monday 9:00 AM - Phase 2 Session 1: Branch Basics (20 mins)
Wednesday 9:00 AM - Phase 2 Session 1: Hands-On Exercise (20 mins)
Friday 9:00 AM - Phase 2 Session 2: Branch Naming (10 mins)
WEEK 5

Monday 9:00 AM - Phase 2 Session 3: Branching Workflow (20 mins)
Wednesday 9:00 AM - Phase 2 Session 3: Hands-On Exercise (20 mins)
Friday 9:00 AM - Phase 2 Complete - Review & Reflect
WEEK 6

Monday 9:00 AM - Phase 3 Session 1: Understanding PRs (20 mins)
Wednesday 9:00 AM - Phase 3 Session 1: Hands-On Exercise (15 mins)
Friday 9:00 AM - Phase 3 Session 2: Creating a PR (20 mins)
WEEK 7

Monday 9:00 AM - Phase 3 Session 2: Hands-On Exercise (20 mins)
Wednesday 9:00 AM - Phase 3 Session 3: Reviewing a PR (20 mins)
Friday 9:00 AM - Phase 3 Session 3: Hands-On Exercise (15 mins)
WEEK 8

Monday 9:00 AM - Phase 3 Session 4: Merging a PR (10 mins)
Wednesday 9:00 AM - Phase 3 Session 4: Hands-On Exercise (10 mins)
Friday 9:00 AM - Phase 3 Complete - Review & Reflect
WEEK 9

Monday 9:00 AM - Phase 4 Session 1: Inspecting Claude's Changes (15 mins)
Wednesday 9:00 AM - Phase 4 Session 1: Hands-On Exercise (15 mins)
Friday 9:00 AM - Phase 4 Session 2: Asking Claude Safely (15 mins)
WEEK 10

Monday 9:00 AM - Phase 4 Session 2: Hands-On Exercise (15 mins)
Wednesday 9:00 AM - Phase 4 Session 3: Emergency Recovery (15 mins)
Friday 9:00 AM - Phase 4 Session 3: Hands-On Exercise (15 mins)
WEEK 11

Monday 9:00 AM - Phase 4 Complete - Review & Reflect
Wednesday 9:00 AM - FINAL: Review All Phases
Friday 9:00 AM - FINAL: Commit Your Progress & Share
✅ QUICK REFERENCE CHECKLISTS
Before Every Commit
Run: git status
Run: git diff
Review changes line-by-line
Ask: "Is this what I wanted?"
Stage approved changes: git add file.js
Review staged: git diff --staged
Commit: git commit -m "message"
Before Every Push
Am I on the right branch? (git branch)
Are these my changes? (git log -1)
Am I pushing to the right branch? (NOT main)
Have I committed all changes? (git status)
Push: git push origin branch-name
Before Every Merge
PR is approved by at least one reviewer
All tests pass
No conflicts with main
I've reviewed the changes one more time
Merge on GitHub or via CLI
When Claude Helps
Claude makes changes
YOU inspect: git diff
YOU review line-by-line
YOU decide: approve or reject
YOU commit (not Claude)
YOU create PR
TEAMMATE reviews
YOU merge
🆘 EMERGENCY COMMANDS
"I committed something I didn't mean to"
```bash

 
git reset --soft HEAD~1
# Undo commit, keep changes
"I pushed something bad"
```bash

 
git revert HEAD
# Create new commit that undoes it
"Claude overwrote my code"
```bash

 
git log --oneline -5
git diff HEAD~1 HEAD
git revert HEAD
"I need to see what changed"
```bash

 
git diff file.js
git diff commit-hash~1 commit-hash
"I want to discard changes"
```bash

 
git checkout file.js
# Undo changes to specific file
🎯 YOUR WORKFLOW NOTES
Current Problem (Before This Training)
You push to main before branching
No code review process
No rollback capability
Claude overwrites happen without detection
You ask Claude to "fix what it did" without understanding what happened
Your New Workflow (After This Training)
Step 1: Branch First

```bash

 
git checkout main
git pull origin main
git checkout -b feature/my-feature
Step 2: Make Changes (with Claude or manually)

```bash

 
# Claude helps here
# You see changes in VS Code
Step 3: Inspect Before Committing

```bash

 
git status              # What changed?
git diff                # Exactly what changed?
git diff file.js        # Specific file changes?
Step 4: Approve or Reject

```bash

 
# If you like it:
git add file.js
git diff --staged       # Final review
git commit -m "descriptive message"

# If you don't like it:
git checkout file.js    # Undo Claude's changes
Step 5: Push to Your Branch (NOT main)

```bash

 
git push origin feature/my-feature
Step 6: Create a PR

Go to GitHub
Click "Compare & pull request"
Fill in description
Add reviewers
Wait for approval
Step 7: Merge After Review

Teammate reviews
Teammate approves
You merge to main
Delete feature branch
Why This Works
Issue	Before	After
Overwrites	Claude changes main directly	Claude changes feature branch, reviewed before merge
Visibility	No idea what changed	git diff shows exactly what changed
Recovery	Ask Claude to fix it	git revert undoes the commit
Documentation	No record	PR shows what changed, why, and who approved
Team Safety	Anyone can push to main	Main is protected, requires PR review
🔐 SAFETY RULES
Rule 1: Never Push Directly to Main
```bash

 
# ❌ DON'T:
git push origin main

# ✅ DO:
git checkout -b feature/my-feature
# ... make changes ...
git push origin feature/my-feature
# Create PR on GitHub
Rule 2: Always Inspect Before Committing
```bash

 
# ❌ DON'T:
git add .
git commit -m "update"

# ✅ DO:
git status
git diff
git diff file.js
# Review each change
git add file1.js file2.js
git diff --staged
git commit -m "descriptive message"
Rule 3: Claude Never Runs Git Commands
```bash

 
# ❌ DON'T:
"Claude, fix this and commit and push"

# ✅ DO:
"Claude, help me fix this. Do NOT commit or push."
# Claude makes changes
git diff
# You review
git add file.js
git commit -m "fix with Claude's help"
Rule 4: All Code Goes Through PR
```bash

 
# ❌ DON'T:
# Merge directly to main

# ✅ DO:
# Create PR
# Wait for teammate review
# Merge after approval
Rule 5: Protect Main Branch
Go to GitHub repo settings
Branches → Add rule for main
Require pull request before merging
Require at least 1 approval
📊 PROGRESS TRACKING
How to Track Your Progress:

Update this file after each session:
Change status from ⬜ to ✅
Add date completed
Add time spent
Add notes
Commit after each phase:
```plaintext

 
git add git-learning-complete.md
git commit -m "Phase 1 complete: Inspection"
git push origin main
View your learning history:
```bash

 
git log --oneline -- git-learning-complete.md
Share with manager/collaborator:
Send link to this file in your repo
They can see your progress over time
They can see your commit history
🎓 LEARNING OUTCOMES
After completing this training, you will:

✅ Understand what Git is and why it matters
  
✅ Know how to inspect changes before committing
  
✅ Know how to use branches to isolate work
  
✅ Know how to create and review pull requests
  
✅ Know how to safely work with Claude
  
✅ Know how to recover from mistakes
  
✅ Know how to prevent overwrites
  
✅ Know how to work as a team with Git
  
✅ Know how to protect your code
  
✅ Know how to document changes  

🚀 NEXT STEPS
This Week (Week 0):

 this file to your repo: git-learning-complete.md
Commit it: git add git-learning-complete.md && git commit -m "Add Git learning tracker"
Protect main branch (Phase 0, Task 1)
Team agreement discussion (Phase 0, Task 2)
Set up Apple Reminders
Week 1-2 (Phase 1):

Complete all 4 sessions
Do all hands-on exercises
Practice the inspection workflow
Week 3-4 (Phase 2):

Learn branching
Create branches for all your work
Never work on main directly
Week 5-6 (Phase 3):

Learn pull requests
Create PRs for all changes
Review teammates' PRs
Week 7-8 (Phase 4):

Apply everything to Claude
Safely work with AI-generated code
Know how to recover from mistakes
Week 9-11:

Review all phases
Reflect on learning
Share progress with team
Start using in production
Last Updated: [Add date when you update]
  
Next Review: [Add date for next review]

You've got this! Start with Phase 0 this week. 🚀

```plaintext

# THAT'S IT. ONE COMPLETE FILE.

**Save as:** `git-learning-complete.md`

** everything above** (from the first `#` to the last line) into ONE markdown file.

**Then:**
1. Save to your repo
2. Commit it
3. Done

