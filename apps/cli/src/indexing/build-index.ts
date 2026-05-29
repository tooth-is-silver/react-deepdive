import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";

import { fromProjectRoot } from "../lib/project-paths.js";
import { ignoredPathParts, indexTargets, linesPerChunk, type IndexSourceType } from "./config.js";

type SourceIndexEntry = {
  id: string;
  sourceType: IndexSourceType;
  filePath: string;
  startLine: number;
  endLine: number;
  text: string;
};

type SourceIndex = {
  generatedAt: string;
  linesPerChunk: number;
  targets: string[];
  entries: SourceIndexEntry[];
};

function shouldIgnorePath(path: string) {
  return path.split(sep).some((part) => ignoredPathParts.has(part));
}

function collectFiles(rootDir: string, includeExtensions: string[]) {
  const files: string[] = [];
  const stack = [fromProjectRoot(rootDir)];

  while (stack.length > 0) {
    const currentPath = stack.pop();

    if (!currentPath || shouldIgnorePath(currentPath)) {
      continue;
    }

    const stat = statSync(currentPath);

    if (stat.isDirectory()) {
      for (const child of readdirSync(currentPath)) {
        stack.push(resolve(currentPath, child));
      }
      continue;
    }

    if (stat.isFile() && includeExtensions.includes(extname(currentPath))) {
      files.push(currentPath);
    }
  }

  return files.sort();
}

function chunkFile(filePath: string, sourceType: IndexSourceType): SourceIndexEntry[] {
  const text = readFileSync(filePath, "utf8");
  const lines = text.split(/\r?\n/);
  const relativePath = relative(fromProjectRoot(), filePath);
  const entries: SourceIndexEntry[] = [];

  for (let startIndex = 0; startIndex < lines.length; startIndex += linesPerChunk) {
    const chunkLines = lines.slice(startIndex, startIndex + linesPerChunk);
    const chunkText = chunkLines.join("\n").trim();

    if (chunkText.length === 0) {
      continue;
    }

    const startLine = startIndex + 1;
    const endLine = startIndex + chunkLines.length;

    entries.push({
      id: `${relativePath}:${startLine}-${endLine}`,
      sourceType,
      filePath: relativePath,
      startLine,
      endLine,
      text: chunkText,
    });
  }

  return entries;
}

export function buildSourceIndex() {
  const entries = indexTargets.flatMap((target) =>
    collectFiles(target.rootDir, target.includeExtensions).flatMap((filePath) =>
      chunkFile(filePath, target.sourceType),
    ),
  );
  const index: SourceIndex = {
    generatedAt: new Date().toISOString(),
    linesPerChunk,
    targets: indexTargets.map((target) => target.rootDir),
    entries,
  };
  const outputPath = fromProjectRoot("data/indexes/source-index.json");

  mkdirSync(fromProjectRoot("data/indexes"), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(index, null, 2)}\n`);

  return {
    outputPath,
    entryCount: entries.length,
    fileCount: new Set(entries.map((entry) => entry.filePath)).size,
  };
}
