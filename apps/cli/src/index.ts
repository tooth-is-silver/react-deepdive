#!/usr/bin/env node

const [, , command] = process.argv;

switch (command) {
  case "status":
    console.log("react-dive is ready.");
    break;
  default:
    console.log("Usage: react-dive <command>");
    console.log("");
    console.log("Commands:");
    console.log("  status  Show CLI status");
}
