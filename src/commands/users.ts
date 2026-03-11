import { setUser } from "src/config";

export function handlerLogin(cmdName: string, ...args: string[]): void {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }

  setUser(args[0]);
  console.log(`${args[0]} is set as a user`)

}

