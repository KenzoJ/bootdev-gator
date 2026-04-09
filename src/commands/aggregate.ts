import { fetchFeed } from "src/lib/rss"

export async function handlerAggregator(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  const feedURL: string = "https://www.wagslane.dev/index.xml"
  const response = await fetchFeed(feedURL)
  console.log(JSON.stringify(response, null, 2));


}



