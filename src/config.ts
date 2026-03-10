import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName: string;
}


export function setUser(newUser: string) {
  const tempConfig = readConfig();

  const newConfig: Config = {
    dbUrl: tempConfig.dbUrl,
    currentUserName: newUser
  }
  writeConfig(newConfig);
}

export function readConfig(): Config {
  const tempObject = fs.readFileSync(getConfigFilePath(), { encoding: "utf-8" });
  const newObject = validateConfig(JSON.parse(tempObject));
  return {
    dbUrl: newObject.dbUrl,
    currentUserName: newObject.currentUserName ?? "",
  }
}

function getConfigFilePath(): string {
  return path.join(os.homedir(), '.gatorconfig.json')
}

function writeConfig(cfg: Config) {
  const rawConfig = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  }
  fs.writeFileSync(getConfigFilePath(), JSON.stringify(rawConfig))

}

function validateConfig(rawConfig: any): Config {
  if (rawConfig.db_url && typeof rawConfig.db_url === 'string') {
    return {
      dbUrl: rawConfig.db_url,
      currentUserName: rawConfig.current_user_name ?? "",
    }
  } else {
    throw new Error("db_url is required")

  }

}

