#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type SourceManifest = {
  react: {
    repo: string;
    ref: string;
    commit: string;
  };
  reactDev: {
    repo: string;
    ref: string;
    commit: string;
  };
};

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const sourceManifestPath = resolve(projectRoot, "data/manifests/source.json");

function readSourceManifest(): SourceManifest {
  return JSON.parse(readFileSync(sourceManifestPath, "utf8")) as SourceManifest;
}

function printStatus() {
  const manifest = readSourceManifest();

  console.log("React Deepdive");
  console.log("");
  console.log("React source:");
  console.log(`- repo: ${manifest.react.repo}`);
  console.log(`- ref: ${manifest.react.ref}`);
  console.log(`- commit: ${manifest.react.commit}`);
  console.log("");
  console.log("Docs source:");
  console.log(`- repo: ${manifest.reactDev.repo}`);
  console.log(`- ref: ${manifest.reactDev.ref}`);
  console.log(`- commit: ${manifest.reactDev.commit}`);
}

const [, , command] = process.argv;

switch (command) {
  case "status":
    printStatus();
    break;
  default:
    console.log("Usage: react-dive <command>");
    console.log("");
    console.log("Commands:");
    console.log("  status  Show CLI status");
}
