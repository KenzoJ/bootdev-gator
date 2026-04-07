import { setUser } from "src/config";
import { createUser, getUser, resetUser } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }
  const loginName = args[0]
  if (await getUser(loginName)) {
    setUser(args[0]);
    console.log(`${args[0]} is login as a user, adding to config`)
  } else {
    throw new Error(`${args[0]} is not registered`)

  }
}

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }
  const newName = args[0]
  //check if user already created
  if (await getUser(newName)) {
    throw new Error(`${newName} already registered`)
  }
  await createUser(args[0]);
  setUser(newName)
  //setUser(args[0]);
  console.log(`${args[0]} is created as a user`)
  console.log(`${args[0]} is set as a user in the config`)
}

export async function handlerResetUsers(cmdName: string): Promise<void> {
  await resetUser()
  console.log("reset success!")
}
