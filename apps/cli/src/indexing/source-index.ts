import { readFileSync } from "node:fs";

import { fromProjectRoot } from "../lib/project-paths.js";

export type SourceIndexEntry = {
  id: string;
  sourceType: "react-source" | "react-docs";
  filePath: string;
  startLine: number;
  endLine: number;
  text: string;
};

export type SourceIndex = {
  generatedAt: string;
  linesPerChunk: number;
  targets: string[];
  entries: SourceIndexEntry[];
};

export const sourceIndexPath = fromProjectRoot("data/indexes/source-index.json");

export function readSourceIndex(): SourceIndex {
  return JSON.parse(readFileSync(sourceIndexPath, "utf8")) as SourceIndex;
}
