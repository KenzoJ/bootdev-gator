import { setUser, readConfig } from './config.js';

function main() {
  setUser("CJ")
  const tempConfig = readConfig();
  console.log(tempConfig);
}

main();
