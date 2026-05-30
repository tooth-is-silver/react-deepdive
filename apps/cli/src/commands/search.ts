import { relative } from "node:path";

import { sourceIndexPath } from "../indexing/source-index.js";
import { projectRoot } from "../lib/project-paths.js";
import { createSnippet, searchSourceIndex } from "../search/search-index.js";

export function runSearchCommand(args: string[]) {
  const query = args.join(" ").trim();

  if (query.length === 0) {
    console.log("Usage: react-dive search <query>");
    return;
  }

  const { queryTerms, results, visibleResults } = searchSourceIndex(query);

  console.log(`Search results for "${query}"`);
  console.log(`- index: ${relative(projectRoot, sourceIndexPath)}`);
  if (queryTerms.length > 1) {
    console.log(`- related terms: ${queryTerms.slice(1).join(", ")}`);
  }
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
    console.log(`   matched: ${result.matchedTerm}`);
    console.log(`   ${createSnippet(entry.text, result.matchedTerm)}`);
    console.log("");
  });
}
