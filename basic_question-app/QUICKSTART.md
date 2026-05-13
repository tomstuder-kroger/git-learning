# Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- npm

## Setup (First Time Only)

1. **Install dependencies**
   ```bash
   # From root directory
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

2. **Initialize the database**
   ```bash
   cd backend
   npm run init-db
   cd ..
   ```

## Running the Application

Open TWO terminal windows:

### Terminal 1 - Backend Server
```bash
cd backend
npm start
```
Server will run on `http://localhost:5000`

**Run Servers (VS Code & Terminal)**

- **VS Code Run and Debug:** open the Run and Debug view, select `Run Both Servers`, and click the green Run button to start both frontend and backend in integrated terminals.
- **VS Code Tasks:** open Command Palette → `Tasks: Run Task` → choose `Run Backend`, `Run Frontend`, or `Run Both` to run one or both servers in separate terminals.
- **Manual (two terminals):**

```bash
# Terminal 1 - backend
cd backend
npm start

# Terminal 2 - frontend
cd frontend
npm start
```

The VS Code task and launch configurations live in `.vscode/tasks.json` and `.vscode/launch.json`.

### Terminal 2 - Frontend React App
```bash
cd frontend
npm start
```
App will open automatically at `http://localhost:3000`

## Using the App

1. **Home Screen**: Choose from 4 icebreaker categories
2. **Question View**:
   - Click ❤️ Favorite to save questions you like
   - Click "Next Question" to see another random question
   - Questions won't repeat until you've seen them all
3. **Favorites**: Click "Favorites" in the nav bar to see saved questions

## Categories

- 🔵 **Would you rather?** - Fun hypothetical scenarios
- 🟢 **You or me?** - Team comparison questions
- 🟠 **Random Facts** - Get to know each other
- 🟣 **Food for Thought** - Deep reflective questions

## Troubleshooting

**Port already in use?**
- Backend: Change PORT in `backend/server.js`
- Frontend: Create `.env` file in frontend with `PORT=3001`

**Database not found?**
- Run `cd backend && npm run init-db`

**Can't connect to backend?**
- Make sure backend is running on port 5000
- Check CORS settings if issues persist

## Tech Stack
- Frontend: React + React Router + Bootstrap
- Backend: Node.js + Express
- Database: SQLite (via sql.js)
