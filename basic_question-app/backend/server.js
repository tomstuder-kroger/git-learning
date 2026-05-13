import express from 'express';
import cors from 'cors';
import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'icebreaker.db');
let db;

// Initialize database
async function initDb() {
  const SQL = await initSqlJs();

  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
    console.log('Database loaded from file');
  } else {
    console.log('Database file not found. Please run: npm run init-db');
    process.exit(1);
  }
}

// Helper function to save database
function saveDb() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

// API Routes

// Get all categories
app.get('/api/categories', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT DISTINCT category, COUNT(*) as count
      FROM questions
      GROUP BY category
    `);

    const categories = [];
    while (stmt.step()) {
      const row = stmt.getAsObject();
      categories.push(row);
    }
    stmt.free();

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get random question from a category (excluding already seen questions in session)
app.post('/api/questions/random', (req, res) => {
  try {
    const { category, seenIds = [] } = req.body;

    let stmt;
    let question = null;

    // First try to get unseen questions
    if (seenIds.length > 0) {
      const placeholders = seenIds.map(() => '?').join(',');
      stmt = db.prepare(`
        SELECT q.*,
               EXISTS(SELECT 1 FROM favorites f WHERE f.question_id = q.id) as is_favorited
        FROM questions q
        WHERE q.category = ? AND q.id NOT IN (${placeholders})
        ORDER BY RANDOM()
        LIMIT 1
      `);
      stmt.bind([category, ...seenIds]);
    } else {
      stmt = db.prepare(`
        SELECT q.*,
               EXISTS(SELECT 1 FROM favorites f WHERE f.question_id = q.id) as is_favorited
        FROM questions q
        WHERE q.category = ?
        ORDER BY RANDOM()
        LIMIT 1
      `);
      stmt.bind([category]);
    }

    if (stmt.step()) {
      question = stmt.getAsObject();
    }
    stmt.free();

    // If all questions seen, reset and get a random one
    if (!question) {
      const resetStmt = db.prepare(`
        SELECT q.*,
               EXISTS(SELECT 1 FROM favorites f WHERE f.question_id = q.id) as is_favorited
        FROM questions q
        WHERE q.category = ?
        ORDER BY RANDOM()
        LIMIT 1
      `);
      resetStmt.bind([category]);

      if (resetStmt.step()) {
        question = resetStmt.getAsObject();
      }
      resetStmt.free();

      return res.json({ question, reset: true });
    }

    res.json({ question, reset: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle favorite
app.post('/api/favorites/toggle', (req, res) => {
  try {
    const { questionId } = req.body;

    // Check if already favorited
    const checkStmt = db.prepare('SELECT * FROM favorites WHERE question_id = ?');
    checkStmt.bind([questionId]);

    const exists = checkStmt.step();
    checkStmt.free();

    if (exists) {
      // Remove from favorites
      db.run('DELETE FROM favorites WHERE question_id = ?', [questionId]);
      saveDb();
      res.json({ favorited: false });
    } else {
      // Add to favorites
      db.run('INSERT INTO favorites (question_id) VALUES (?)', [questionId]);
      saveDb();
      res.json({ favorited: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all favorites
app.get('/api/favorites', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT q.*, f.created_at as favorited_at
      FROM favorites f
      JOIN questions q ON f.question_id = q.id
      ORDER BY f.created_at DESC
    `);

    const favorites = [];
    while (stmt.step()) {
      const row = stmt.getAsObject();
      favorites.push(row);
    }
    stmt.free();

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
