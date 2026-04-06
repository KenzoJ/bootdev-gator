import { db } from "..";
import { users } from "../schema";
import { sql } from 'drizzle-orm';

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name: string): Promise<any> {
  const [result] = await db.select().from(users).where(sql`lower(${users.name}) = ${name}`);
  return result;
}

//where(sql`lower(${users.name}) = 'TRUNCATE users;aaron'`);
