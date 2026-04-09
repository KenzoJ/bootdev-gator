import { XMLParser } from "fast-xml-parser";

export async function fetchFeed(feedURL: string) {
  let headers = new Headers({
    "Accept": "application/json",
    "User-Agent": "gator"
  })
  const rawXML = await fetch(feedURL, {
    method: 'GET',
    headers: headers
  });
  if (!rawXML.ok) {
    throw new Error("Fetch error");
  }
  let notrawXML = await rawXML.text()
  const parser = new XMLParser();
  let response = parser.parse(notrawXML);
  if (!response.rss.channel) {
    throw new Error("Channel field does not exist")
  }
  const r = response.rss;
  if (!r.channel.title || !r.channel.link || !r.channel.description) {
    throw new Error("Missing title/link/description")
  }
  const { title, link, description } = r.channel

  let rawItems: any[];
  if (!r.channel.item) {
    rawItems = []
  } else {
    if (Array.isArray(r.channel.item)) {
      rawItems = r.channel.item;
    } else {
      rawItems = [r.channel.item];
    }
  }
  const items = []
  for (const item of rawItems) {
    if (!item.title || !item.link || !item.description || !item.pubDate) {
      continue;
    }
    items.push(item)
  }

  const result: RSSFeed = {
    channel: {
      title: title,
      link: link,
      description: description,
      item: items,
    }
  }

  return result;
}

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};
