import { readFileSync } from "node:fs";

import { fromProjectRoot } from "../lib/project-paths.js";

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

const sourceManifestPath = fromProjectRoot("data/manifests/source.json");

function readSourceManifest(): SourceManifest {
  return JSON.parse(readFileSync(sourceManifestPath, "utf8")) as SourceManifest;
}

export function printStatus() {
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
