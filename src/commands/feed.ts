import { readConfig } from "src/config";
import { createFeed } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";
import { Feed, User } from "src/lib/db/schema";

export async function handlerFeed(
  cmdName: string,
  ...args: string[]
): Promise<void> {

  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} "<name of url>" "<url>"`);
  }
  const loggedIn = readConfig().currentUserName
  const user = await getUser(loggedIn)
  if (!user) {
    throw new Error(`User not found`);
  }

  const feed = await createFeed(args[0], args[1], user.id)

  if (!feed) {
    console.log("Feed created successfully:");
    printFeed(feed, user)
  } else {
    throw new Error(`Feed create error`)
  }

}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);

}
