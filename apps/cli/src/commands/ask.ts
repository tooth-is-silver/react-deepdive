import { createSnippet, detectSearchQuery, searchSourceIndex, type SearchResult } from "../search/search-index.js";

function formatEvidence(result: SearchResult, index: number) {
  const { entry } = result;

  console.log(`${index + 1}. ${entry.sourceType}`);
  console.log(`   ${entry.filePath}:${entry.startLine}-${entry.endLine}`);
  console.log(`   matched: ${result.matchedTerm}`);
  console.log(`   ${createSnippet(entry.text, result.matchedTerm)}`);
  console.log("");
}

function printAnswerDraft(question: string, searchQuery: string, evidence: SearchResult[]) {
  const docs = evidence.filter((result) => result.entry.sourceType === "react-docs");
  const sources = evidence.filter((result) => result.entry.sourceType === "react-source");

  console.log("Answer draft");
  console.log("");
  console.log(`- Question: ${question}`);
  console.log(`- Search query: ${searchQuery}`);
  console.log(`- Evidence: ${docs.length} docs, ${sources.length} source chunks`);
  console.log("");
  console.log("What to read first:");

  [...docs.slice(0, 2), ...sources.slice(0, 3)].forEach((result, index) => {
    const { entry } = result;

    console.log(`${index + 1}. ${entry.filePath}:${entry.startLine}-${entry.endLine}`);
  });

  console.log("");
  console.log("Grounded response shape:");
  console.log("- Start from the official docs result to define the public API behavior.");
  console.log("- Use the React source results to explain where the public API delegates internally.");
  console.log("- Separate direct source facts from interpretation.");
  console.log("- Mention the local React source version from `react-dive status` when writing the final answer.");
}

export function runAskCommand(args: string[]) {
  const question = args.join(" ").trim();

  if (question.length === 0) {
    console.log("Usage: react-dive ask <question>");
    return;
  }

  const searchQuery = detectSearchQuery(question);
  const { queryTerms, visibleResults } = searchSourceIndex(searchQuery);

  console.log(`Ask: ${question}`);
  console.log(`- detected query: ${searchQuery}`);
  if (queryTerms.length > 1) {
    console.log(`- related terms: ${queryTerms.slice(1).join(", ")}`);
  }
  console.log("");

  if (visibleResults.length === 0) {
    console.log("No evidence found. Try a more specific React API or internal symbol.");
    return;
  }

  console.log("Evidence");
  console.log("");
  visibleResults.forEach(formatEvidence);

  printAnswerDraft(question, searchQuery, visibleResults);
}
