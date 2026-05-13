import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'icebreaker.db');

async function initializeDatabase() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      question TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (question_id) REFERENCES questions(id),
      UNIQUE(question_id)
    );
  `);

  // Seed data - 10 questions per category
  const questions = [
    // Would you rather? (Blue theme)
    { category: 'Would you rather?', question: 'Would you rather have the ability to work from anywhere in the world or have a 4-day work week?' },
    { category: 'Would you rather?', question: 'Would you rather always have to speak your mind or never speak again at meetings?' },
    { category: 'Would you rather?', question: 'Would you rather be able to read minds during negotiations or predict the future of project outcomes?' },
    { category: 'Would you rather?', question: 'Would you rather give up coffee/tea for a year or give up your favorite lunch spot?' },
    { category: 'Would you rather?', question: 'Would you rather have unlimited vacation days but no bonus, or limited vacation but double your bonus?' },
    { category: 'Would you rather?', question: 'Would you rather lead a project with a tight deadline or manage a team with conflicting personalities?' },
    { category: 'Would you rather?', question: 'Would you rather have perfect work-life balance with average pay or amazing compensation with long hours?' },
    { category: 'Would you rather?', question: 'Would you rather present to a room of 100 people or have a one-on-one with the CEO?' },
    { category: 'Would you rather?', question: 'Would you rather be known for your creativity or your reliability at work?' },
    { category: 'Would you rather?', question: 'Would you rather master a new skill every year or perfect one skill for your entire career?' },
    { category: 'Would you rather?', question: 'Would you rather work on a groundbreaking project that might fail or a safe project that\'s guaranteed to succeed?' },
    { category: 'Would you rather?', question: 'Would you rather have a job you love with a difficult commute or a boring job that\'s a 5-minute walk?' },
    { category: 'Would you rather?', question: 'Would you rather attend all meetings via video call or always have to attend in person?' },
    { category: 'Would you rather?', question: 'Would you rather be the funniest person in the office or the smartest?' },
    { category: 'Would you rather?', question: 'Would you rather delete all your emails or delete all your Slack messages?' },
    { category: 'Would you rather?', question: 'Would you rather work with someone who talks too much or someone who never talks?' },
    { category: 'Would you rather?', question: 'Would you rather have a personal assistant for work tasks or unlimited access to online courses?' },
    { category: 'Would you rather?', question: 'Would you rather collaborate with a team of 20 or work independently on your own projects?' },
    { category: 'Would you rather?', question: 'Would you rather have your dream job title with average responsibilities or a generic title doing your dream work?' },
    { category: 'Would you rather?', question: 'Would you rather receive constructive criticism publicly or never receive any feedback at all?' },
    { category: 'Would you rather?', question: 'Would you rather automate your entire job or make it completely manual but more creative?' },
    { category: 'Would you rather?', question: 'Would you rather have a standing desk with no chair or a comfortable chair with no desk?' },
    { category: 'Would you rather?', question: 'Would you rather mentor 5 junior colleagues or be mentored by 5 senior experts?' },
    { category: 'Would you rather?', question: 'Would you rather work in complete silence or with constant background music?' },
    { category: 'Would you rather?', question: 'Would you rather solve one huge problem or many small problems throughout the day?' },
    { category: 'Would you rather?', question: 'Would you rather have your salary public knowledge or your search history?' },
    { category: 'Would you rather?', question: 'Would you rather start work at 6 AM and finish at 2 PM or start at 12 PM and finish at 8 PM?' },
    { category: 'Would you rather?', question: 'Would you rather have a photographic memory for code or perfect debugging intuition?' },
    { category: 'Would you rather?', question: 'Would you rather give a presentation every day for a week or write documentation for a month?' },
    { category: 'Would you rather?', question: 'Would you rather work on legacy code that needs refactoring or start a greenfield project from scratch?' },

    // You or me? (Green theme)
    { category: 'You or me?', question: 'Who is more likely to arrive early to every meeting?' },
    { category: 'You or me?', question: 'Who is more likely to have the most organized workspace?' },
    { category: 'You or me?', question: 'Who is more likely to volunteer for a challenging project?' },
    { category: 'You or me?', question: 'Who is more likely to remember everyone\'s birthday?' },
    { category: 'You or me?', question: 'Who is more likely to suggest a team outing?' },
    { category: 'You or me?', question: 'Who is more likely to send a message after work hours?' },
    { category: 'You or me?', question: 'Who is more likely to be the first to try new technology?' },
    { category: 'You or me?', question: 'Who is more likely to bring snacks to share with the team?' },
    { category: 'You or me?', question: 'Who is more likely to start a side project outside of work?' },
    { category: 'You or me?', question: 'Who is more likely to give the most helpful code review comments?' },

    // Random Facts (Orange theme)
    { category: 'Random Facts', question: 'Share a skill you have that most people don\'t know about.' },
    { category: 'Random Facts', question: 'What\'s the most interesting place you\'ve ever worked from?' },
    { category: 'Random Facts', question: 'What was your first job, and what did you learn from it?' },
    { category: 'Random Facts', question: 'What\'s a book, podcast, or article that changed how you think about work?' },
    { category: 'Random Facts', question: 'What\'s the best piece of professional advice you\'ve ever received?' },
    { category: 'Random Facts', question: 'If you could have dinner with any professional figure (alive or dead), who would it be?' },
    { category: 'Random Facts', question: 'What\'s a personal achievement you\'re proud of from the last year?' },
    { category: 'Random Facts', question: 'What\'s your go-to productivity hack or tool?' },
    { category: 'Random Facts', question: 'What\'s one thing on your bucket list you\'re determined to accomplish?' },
    { category: 'Random Facts', question: 'If you could instantly become an expert in one subject, what would it be?' },

    // Food for Thought (Purple theme)
    { category: 'Food for Thought', question: 'What does success mean to you in your current role?' },
    { category: 'Food for Thought', question: 'How do you recharge after a particularly challenging week?' },
    { category: 'Food for Thought', question: 'What\'s one professional habit you\'re trying to build or break?' },
    { category: 'Food for Thought', question: 'If you could change one thing about how our industry works, what would it be?' },
    { category: 'Food for Thought', question: 'What motivates you to do your best work?' },
    { category: 'Food for Thought', question: 'How has your definition of career growth changed over time?' },
    { category: 'Food for Thought', question: 'What\'s a mistake you made that taught you the most valuable lesson?' },
    { category: 'Food for Thought', question: 'If you had unlimited resources, what problem would you try to solve?' },
    { category: 'Food for Thought', question: 'What does "work-life balance" look like for you?' },
    { category: 'Food for Thought', question: 'What legacy do you want to leave in your professional life?' }
  ];

  // Insert questions
  const stmt = db.prepare('INSERT INTO questions (category, question) VALUES (?, ?)');
  for (const q of questions) {
    stmt.run([q.category, q.question]);
  }
  stmt.free();

  // Save database to file
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);

  console.log('Database initialized successfully!');
  console.log(`Inserted ${questions.length} questions across 4 categories.`);
  console.log(`  - Would you rather?: 30 questions`);
  console.log(`  - You or me?: 10 questions`);
  console.log(`  - Random Facts: 10 questions`);
  console.log(`  - Food for Thought: 10 questions`);
  console.log(`Database saved to: ${dbPath}`);

  db.close();
}

initializeDatabase().catch(console.error);
