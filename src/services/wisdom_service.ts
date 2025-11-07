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
  userid: string,
  code: string
): Promise<Wisdom> {
  const query = `INSERT INTO wisdom (title, paragraph, userId, code) 
     VALUES ($1, $2, $3, $4) RETURNING title, paragraph, userId, code`;

  const result = db.query(query, [title, paragraph, userid, code]);
  return Wisdom.createFromObject((await result).rows[0]);
}
