#!/usr/bin/env node

import { printHelp } from "./commands/help.js";
import { printStatus } from "./commands/status.js";

const [, , command] = process.argv;

switch (command) {
  case "status":
    printStatus();
    break;
  case "index":
  case "search":
    console.log(`"${command}" command is not implemented yet.`);
    break;
  default:
    printHelp();
}
