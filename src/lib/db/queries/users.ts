import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(queryName: string): Promise<any> {
  const [result] = await db
    .select()
    .from(users)
    .where(eq(users.name, queryName));
  return result;
}

export async function resetUser(): Promise<void> {
  await db.delete(users)

}

export async function getRegisteredUsers(): Promise<any> {
  const result = await db
    .select({
      users: users.name
    })
    .from(users);
  return result;
}

