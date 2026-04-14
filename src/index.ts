import { CommandsRegistry, registerCommand, runCommand } from './commands/commands.js';
import { handlerGetUsers, handlerLogin, handlerRegister, handlerResetUsers } from './commands/users.js';
import { handlerAggregator } from "./commands/aggregate.js"
import { handlerFeed } from "./commands/feed.js"
import { argv } from 'node:process';
import process from 'node:process';

async function main() {
  const args = argv.slice(2);
  if (args.length === 0) {
    console.log("Not enough arguments")
    process.exit(1)
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  const registry: CommandsRegistry = {}
  registerCommand(registry, "login", handlerLogin)
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerResetUsers);
  registerCommand(registry, "users", handlerGetUsers)
  registerCommand(registry, "agg", handlerAggregator)
  registerCommand(registry, "addfeed", handlerFeed)

  try {
    await runCommand(registry, cmdName, ...cmdArgs)
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error ${cmdName}: ${err.message}`)
    } else {
      console.error(`Error ${cmdName}: ${err}`)
    }
    process.exit(1)
  }
  process.exit(0)
}

main();
