#!/usr/bin/env node

import { printHelp } from "./commands/help.js";
import { runIndexCommand } from "./commands/index.js";
import { runSearchCommand } from "./commands/search.js";
import { printStatus } from "./commands/status.js";

const [, , command, ...args] = process.argv;

switch (command) {
  case "status":
    printStatus();
    break;
  case "index":
    runIndexCommand();
    break;
  case "search":
    runSearchCommand(args);
    break;
  default:
    printHelp();
}
