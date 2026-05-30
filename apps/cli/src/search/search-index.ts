import { basename } from "node:path";

import { readSourceIndex, type SourceIndexEntry } from "../indexing/source-index.js";

export type SearchResult = {
  entry: SourceIndexEntry;
  score: number;
  matchedTerm: string;
};

function normalize(value: string) {
  return value.toLowerCase();
}

const relatedTermsByQuery = new Map<string, string[]>([
  ["usestate", ["mountState", "updateState", "dispatchSetState", "basicStateReducer"]],
  ["useeffect", ["mountEffect", "updateEffect", "mountEffectImpl", "updateEffectImpl", "pushSimpleEffect"]],
  ["createroot", ["createContainer", "updateContainer", "ReactDOMRoot"]],
]);

export function expandQuery(query: string) {
  const relatedTerms = relatedTermsByQuery.get(normalize(query)) ?? [];

  return [query, ...relatedTerms];
}

export function detectSearchQuery(input: string) {
  const knownQueries = [
    "useState",
    "useEffect",
    "createRoot",
    "scheduleUpdateOnFiber",
    "mountState",
    "mountEffect",
  ];
  const normalizedInput = normalize(input);
  const matchedQuery = knownQueries.find((query) => normalizedInput.includes(normalize(query)));

  return matchedQuery ?? input;
}

function countMatches(text: string, query: string) {
  if (query.length === 0) {
    return 0;
  }

  const matchPattern = new RegExp(`\\b${escapeRegExp(query)}\\b`, "gi");

  return text.match(matchPattern)?.length ?? 0;
}

function stripKnownExtensions(fileName: string) {
  return fileName.replace(/\.(mdx?|tsx?|jsx?)$/, "");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function scoreFileName(filePath: string, query: string) {
  const normalizedQuery = normalize(query);
  const fileName = normalize(stripKnownExtensions(basename(filePath)));

  if (fileName === normalizedQuery) {
    return 120;
  }

  if (fileName.startsWith(normalizedQuery)) {
    return 25;
  }

  return countMatches(filePath, query) * 10;
}

function scoreDefinitions(text: string, query: string) {
  const escapedQuery = escapeRegExp(query);
  const definitionPatterns = [
    new RegExp(`export\\s+function\\s+${escapedQuery}\\b`),
    new RegExp(`function\\s+${escapedQuery}\\b`),
    new RegExp(`const\\s+${escapedQuery}\\b`),
  ];

  if (definitionPatterns[0].test(text)) {
    return 120;
  }

  if (definitionPatterns[1].test(text)) {
    return 90;
  }

  if (definitionPatterns[2].test(text)) {
    return 60;
  }

  return 0;
}

function scoreEntryForTerm(entry: SourceIndexEntry, query: string, includeFileNameScore: boolean) {
  const fileNameScore = includeFileNameScore ? scoreFileName(entry.filePath, query) : 0;
  const definitionScore = scoreDefinitions(entry.text, query);
  const textScore = countMatches(entry.text, query);

  return fileNameScore + definitionScore + textScore;
}

function scoreEntry(entry: SourceIndexEntry, queryTerms: string[]) {
  return queryTerms.reduce(
    (bestResult, queryTerm, index) => {
      if (index > 0 && entry.sourceType !== "react-source") {
        return bestResult;
      }

      const termScore = scoreEntryForTerm(entry, queryTerm, index === 0);
      const relatedTermWeight = Math.max(0.45, 0.75 - (index - 1) * 0.05);
      const weightedScore = index === 0 ? termScore : Math.round(termScore * relatedTermWeight);

      if (weightedScore > bestResult.score) {
        return {
          score: weightedScore,
          matchedTerm: queryTerm,
        };
      }

      return bestResult;
    },
    {
      score: 0,
      matchedTerm: queryTerms[0] ?? "",
    },
  );
}

export function createSnippet(text: string, query: string) {
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

export function selectVisibleResults(results: SearchResult[]) {
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

export function searchSourceIndex(query: string) {
  const index = readSourceIndex();
  const queryTerms = expandQuery(query);
  const results: SearchResult[] = index.entries
    .map((entry) => {
      const score = scoreEntry(entry, queryTerms);

      return {
        entry,
        score: score.score,
        matchedTerm: score.matchedTerm,
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return {
    queryTerms,
    results,
    visibleResults: selectVisibleResults(results),
  };
}
