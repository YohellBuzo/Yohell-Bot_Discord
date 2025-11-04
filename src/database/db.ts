import Database from 'better-sqlite3';

const db = new Database('claim_logs.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character TEXT,
    userId TEXT,
    date TEXT,
    imageURL TEXT
  )
`).run();

export default db;