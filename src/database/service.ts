import db from "./db";
import { Claim } from "../models/claim";

export class ClaimService {
  private insert = db.prepare(`
    INSERT INTO claims (character, userId, imagenURL, date)
    VALUES (@character, @userId, @imagenURL, @date)
  `);

  private selectAll = db.prepare(`SELECT * FROM claims ORDER BY date DESC`);

  private selectByUserID = db.prepare(`
    SELECT * FROM claims WHERE userId = ? ORDER BY date DESC
  `);

  public save(claim: Claim) {
    this.insert.run(claim);
  }

  public getAll(): Claim[] {
    return this.selectAll.all() as Claim[];
  }

  public getByUser(userId: string): Claim[] {
    return this.selectByUserID.all(userId) as Claim[];
  }
}
