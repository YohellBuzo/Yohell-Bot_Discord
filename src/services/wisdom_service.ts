import { Wisdom } from "../classes/wisdom_class";
import { db } from "../database/db";

export async function getAllWisdoms(): Promise<Wisdom[]> {
  const result = await db.query("SELECT * FROM wisdom");

  if (!result.rows || result.rows.length === 0) {
    return [];
  }

  return Wisdom.createFromJSON(result.rows);
}

export async function insertWisdom(
  title: string,
  paragraph: string,
  userid: string
): Promise<Wisdom> {
  const query = `INSERT INTO wisdom (title, paragraph, userId) 
     VALUES ($1, $2, $3) RETURNING title, paragraph, userId`;

  const result = await db.query(query, [title, paragraph, userid]);
  return Wisdom.createFromObject((await result).rows[0]);
}

export async function getWisdomByTitle(title: string): Promise<Wisdom> {
  const query = `SELECT id, title, paragraph, userId, created_at FROM wisdom WHERE title = $1`;

  const result = await db.query(query, [title]);
  return Wisdom.createFromObject((await result).rows[0]);
}

export async function getWisdomByUser(userId: string): Promise<Wisdom[]> {
  const query = `SELECT * FROM wisdom WHERE userid = $1 ORDER BY id`;
  const result = await db.query(query, [userId]);

  if (!result.rows || result.rows.length === 0) {
    return [];
  }

  return Wisdom.createFromJSON(result.rows);
}

export async function getLastWisdom(): Promise<Wisdom> {
  const query = `SELECT title FROM wisdom ORDER BY id DESC LIMIT 1`;

  const result = db.query(query);
  return Wisdom.createFromObject((await result).rows[0]);
}
