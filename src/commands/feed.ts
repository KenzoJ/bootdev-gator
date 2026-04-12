export async function handlerFeed(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} "<name of url>" "<url>"`);
  }
  const result = addFeed(args[0], args[1])
  console.log(result)
}

function addFeed(name: string, url: string) {


}


function addFeed(name: string, url: string) {


}
