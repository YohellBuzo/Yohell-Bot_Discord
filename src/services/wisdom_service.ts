import { Wisdom } from "../classes/wisdom_class";
import { db } from "../database/db";

export async function getAllWisdoms(): Promise<Wisdom[]> {
  const result = await db.query("SELECT * FROM wisdom");

  if (!result.rows || result.rows.length === 0) {
    return [];
  }

  return Wisdom.createFromJSON(result.rows);
}
