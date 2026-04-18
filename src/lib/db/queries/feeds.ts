import { db } from "..";
import { users, feeds, feedFollows } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db
    .insert(feeds)
    .values({
      name,
      url,
      userId,
    })
    .returning();
  return result;
}

export async function getAllFeeds() {
  const result = await db.select({
    name: feeds.name,
    url: feeds.url,
    username: users.name
  })
    .from(feeds)
    .innerJoin(users, eq(feeds.userId, users.id))
  return result;
}

export async function createFeedFollow(userId: string, feedId: string) {
  const [newFeedFollow] = await db.insert(feedFollows).values({
    userId,
    feedId,
  })
    .returning();
  return newFeedFollow;
}

export async function getFeedFollowsForUser(userId: string) {
  const result = await db.select({
    id: feedFollows.id,
    createdAt: feedFollows.createdAt,
    updatedAt: feedFollows.updatedAt,
    feedName: feeds.name,
    userName: users.name,
  })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(users.id, userId))
  return result;
}


export async function getFeedId(url: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url))
  return result;
}


