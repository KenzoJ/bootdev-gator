import { setUser } from "src/config";
import { getUser, createUser } from "src/lib/db/queries/users.js"

//looks up user in database, if found, sets as current user in config
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

//new user added to database, sets as current in config (only if new user)
export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
  console.log("handlerRegister...")
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }
  const newName = args[0]
  //check if user already created
  if (await getUser(newName)) {
    throw new Error(`${newName} already exists`)
  }
  await createUser(args[0]);
  setUser(newName)
  //setUser(args[0]);
  console.log(`${args[0]} is created as a user`)
  console.log(`${args[0]} is set as a user in the config`)
}


