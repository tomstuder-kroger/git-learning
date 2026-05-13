# Icebreaker MVP App

A team icebreaker application with 4 categories of questions to facilitate engaging team meetings.

## Features

- 🤔 **Would you rather?** - Fun hypothetical scenarios
- 👥 **You or me?** - Guess who is more likely
- 💡 **Random Facts** - Share interesting facts
- 🧠 **Food for Thought** - Deep, meaningful questions

- ❤️ Favorite questions and save them permanently
- 🔄 Random question order with session tracking
- 📱 Responsive Bootstrap UI with consistent color theming
- 💾 SQLite database backend

## Tech Stack

- **Frontend**: React with React Router & Bootstrap 5
- **Backend**: Node.js + Express
- **Database**: SQLite with better-sqlite3

## Installation

### 1. Install all dependencies

From the root directory:

```bash
npm run install-all
```

Or manually:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Initialize the database

```bash
cd backend
npm run init-db
```

This will create `icebreaker.db` with 40 questions (10 per category).

## Running the Application

### Option 1: Run both servers concurrently (Recommended)

From the root directory:

```bash
npm run dev
```

This starts:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

### Option 2: Run servers separately

**Terminal 1 - Backend:**
```bash
npm run server
# or
cd backend && node server.js
```

**Terminal 2 - Frontend:**
```bash
npm run client
# or
cd frontend && npm start
```

## Usage

1. Open `http://localhost:3000` in your browser
2. Choose a category from the home screen
3. Click "Favorite" to save questions you like
4. Click "Next Question" to see another random question
5. Use the navigation bar to go home or view your favorites

## Project Structure

```
icebreaker-app/
├── backend/
│   ├── server.js           # Express API server
│   ├── initDatabase.js     # Database initialization script
│   ├── icebreaker.db       # SQLite database (created after init)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavigationBar.js
│   │   │   ├── Home.js
│   │   │   ├── CategoryView.js
│   │   │   └── Favorites.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── package.json
└── README.md
```

## API Endpoints

- `GET /api/categories` - Get all categories
- `POST /api/questions/random` - Get random question from category
- `POST /api/favorites/toggle` - Toggle favorite status
- `GET /api/favorites` - Get all favorited questions

## Color Scheme

- 🔵 **Would you rather?** - Blue (#007bff)
- 🟢 **You or me?** - Green (#28a745)
- 🟠 **Random Facts** - Orange (#ffc107)
- 🟣 **Food for Thought** - Purple (#6f42c1)

## Future Enhancements

- Multi-user support with authentication
- Admin panel to add/edit questions
- Export favorites as PDF
- Timer mode for quick icebreakers
- Team voting/responses feature
