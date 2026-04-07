import { CommandsRegistry, registerCommand, runCommand } from './commands/commands.js';
import { handlerLogin, handlerRegister, handlerResetUsers } from './commands/users.js';
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
  registerCommand(registry, "reset", handlerResetUsers)

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
