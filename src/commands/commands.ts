export type CommandsRegistry = Record<string, CommandHandler>
export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export async function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler
): Promise<void> {
  registry[cmdName] = handler;
}

export async function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
): Promise<void> {
  if (cmdName in registry) {
    const handler = registry[cmdName]
    await handler(cmdName, ...args)
  } else {
    throw new Error(`Unknown command: ${cmdName}`);
  }

}

