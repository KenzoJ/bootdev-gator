import { readConfig } from "src/config";
import { createFeed, getAllFeeds, getFeedFollowsForUser, createFeedFollow, getFeedId } from "src/lib/db/queries/feeds";
import { getUser, getUserId } from "src/lib/db/queries/users";
import { Feed, feedFollows, User } from "src/lib/db/schema";

export async function handlerFeed(
  cmdName: string,
  ...args: string[]
): Promise<void> {

  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} "<name of url>" "<url>"`);
  }
  const loggedIn = readConfig().currentUserName
  const user = await getUser(loggedIn)

  // console.log(`user: ${JSON.stringify(user)}`)
  if (!user) {
    throw new Error(`User not found`);
  }

  const feed = await createFeed(args[0], args[1], user.id)
  if (!feed) {
    throw new Error(`Feed create error`)
  }
  console.log("Feed created successfully:");
  const resultOfFeedFollow = await createFeedFollow(user.id, feed.id);
  console.log(resultOfFeedFollow)
  printFeed(feed, user)
  //console.log(`What's this feed: ${feed}`)


}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}

export async function handlerFeeds(): Promise<void> {
  const feeds = await getAllFeeds()
  if (feeds.length === 0) {
    console.log(`no feeds added`)
  } else {
    for (let i = 0; i < feeds.length; i++) {
      console.log(`feed #${i}`)
      console.log(feeds[i])
    }

  }
}

export async function handlerFollow(...args: string[]): Promise<void> {
  const url = args[1];
  const loggedIn = readConfig().currentUserName
  const currUser = await getUserId(loggedIn)
  if (!currUser) {
    throw new Error("user needs to login")
  }
  const currFeed = await getFeedId(url);
  if (!currFeed) {
    throw new Error("no feed to follow")
  }
  const feedFollow = await createFeedFollow(currUser.id, currFeed.id);
  console.log(feedFollow)

}

export async function handlerFollowing(): Promise<void> {
  const loggedIn = readConfig().currentUserName
  const currUser = await getUserId(loggedIn)
  if (!currUser) {
    throw new Error("user needs to login")
  }
  //console.log(currUser.id)
  const feedFollow = await getFeedFollowsForUser(currUser.id);
  for (let i = 0; i < feedFollow.length; i++) {
    console.log(`* Feed Follow Id:            ${feedFollow[i].id}`);
    console.log(`* Created:       ${feedFollow[i].createdAt}`);
    console.log(`* Updated:       ${feedFollow[i].updatedAt}`);
    console.log(`* Feed Name:          ${feedFollow[i].feedName}`);
    console.log(`* userName:           ${feedFollow[i].userName}`);
  }
}


