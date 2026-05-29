import { relative } from "node:path";

import { readSourceIndex, sourceIndexPath, type SourceIndexEntry } from "../indexing/source-index.js";
import { projectRoot } from "../lib/project-paths.js";

type SearchResult = {
  entry: SourceIndexEntry;
  score: number;
};

function normalize(value: string) {
  return value.toLowerCase();
}

function countMatches(text: string, query: string) {
  if (query.length === 0) {
    return 0;
  }

  return normalize(text).split(normalize(query)).length - 1;
}

function scoreEntry(entry: SourceIndexEntry, query: string) {
  const fileNameScore = countMatches(entry.filePath, query) * 10;
  const textScore = countMatches(entry.text, query);

  return fileNameScore + textScore;
}

function createSnippet(text: string, query: string) {
  const normalizedText = normalize(text);
  const normalizedQuery = normalize(query);
  const matchIndex = normalizedText.indexOf(normalizedQuery);

  if (matchIndex === -1) {
    return text.slice(0, 220).replace(/\s+/g, " ").trim();
  }

  const start = Math.max(0, matchIndex - 90);
  const end = Math.min(text.length, matchIndex + query.length + 130);
  const prefix = start > 0 ? "... " : "";
  const suffix = end < text.length ? " ..." : "";

  return `${prefix}${text.slice(start, end).replace(/\s+/g, " ").trim()}${suffix}`;
}

function keepBestResultPerFile(results: SearchResult[]) {
  const bestResults = new Map<string, SearchResult>();

  for (const result of results) {
    const currentBest = bestResults.get(result.entry.filePath);

    if (!currentBest || result.score > currentBest.score) {
      bestResults.set(result.entry.filePath, result);
    }
  }

  return Array.from(bestResults.values());
}

function selectVisibleResults(results: SearchResult[]) {
  const bestPerFile = keepBestResultPerFile(results);
  const docsResults = bestPerFile
    .filter((result) => result.entry.sourceType === "react-docs")
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const sourceResults = bestPerFile
    .filter((result) => result.entry.sourceType === "react-source")
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return [...docsResults, ...sourceResults];
}

export function runSearchCommand(args: string[]) {
  const query = args.join(" ").trim();

  if (query.length === 0) {
    console.log("Usage: react-dive search <query>");
    return;
  }

  const index = readSourceIndex();
  const results: SearchResult[] = index.entries
    .map((entry) => ({
      entry,
      score: scoreEntry(entry, query),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);
  const visibleResults = selectVisibleResults(results);

  console.log(`Search results for "${query}"`);
  console.log(`- index: ${relative(projectRoot, sourceIndexPath)}`);
  console.log(`- matches: ${results.length}`);
  console.log(`- shown: ${visibleResults.length}`);
  console.log("");

  if (visibleResults.length === 0) {
    console.log("No matches found.");
    return;
  }

  visibleResults.forEach((result, index) => {
    const { entry, score } = result;

    console.log(`${index + 1}. ${entry.sourceType} score=${score}`);
    console.log(`   ${entry.filePath}:${entry.startLine}-${entry.endLine}`);
    console.log(`   ${createSnippet(entry.text, query)}`);
    console.log("");
  });
}
