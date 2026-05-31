import { createSnippet, detectSearchQuery, searchSourceIndex, type SearchResult } from "../search/search-index.js";

function formatEvidence(result: SearchResult, index: number) {
  const { entry } = result;

  console.log(`${index + 1}. ${entry.filePath}:${entry.startLine}-${entry.endLine}`);
  console.log(`   matched: ${result.matchedTerm}`);
  console.log(`   ${createSnippet(entry.text, result.matchedTerm)}`);
  console.log("");
}

function splitEvidence(evidence: SearchResult[]) {
  return {
    docs: evidence.filter((result) => result.entry.sourceType === "react-docs"),
    sources: evidence.filter((result) => result.entry.sourceType === "react-source"),
  };
}

function printEvidenceSection(title: string, evidence: SearchResult[]) {
  console.log(title);
  console.log("");

  if (evidence.length === 0) {
    console.log("- No evidence found.");
    console.log("");
    return;
  }

  evidence.forEach(formatEvidence);
}

type ReadingStep = {
  label: string;
  result: SearchResult;
};

function isSameEvidence(left: SearchResult, right: SearchResult) {
  return (
    left.entry.filePath === right.entry.filePath &&
    left.entry.startLine === right.entry.startLine &&
    left.entry.endLine === right.entry.endLine
  );
}

function addReadingStep(steps: ReadingStep[], label: string, result: SearchResult | undefined) {
  if (!result || steps.some((step) => isSameEvidence(step.result, result))) {
    return;
  }

  steps.push({ label, result });
}

function createReadingSteps(searchQuery: string, docs: SearchResult[], sources: SearchResult[]) {
  const steps: ReadingStep[] = [];
  const normalizedSearchQuery = searchQuery.toLowerCase();
  const publicApiSource = sources.find(
    (result) => result.matchedTerm.toLowerCase() === normalizedSearchQuery,
  );
  const internalSource = sources.find(
    (result) => result.matchedTerm.toLowerCase() !== normalizedSearchQuery,
  );

  addReadingStep(steps, "Official docs", docs[0]);
  addReadingStep(steps, "Public API entry", publicApiSource ?? sources[0]);
  addReadingStep(steps, "Internal implementation", internalSource);
  addReadingStep(steps, "Supporting docs", docs[1]);
  addReadingStep(
    steps,
    "Supporting source",
    sources.find((source) => !steps.some((step) => isSameEvidence(step.result, source))),
  );

  return steps;
}

function printReadingStep(step: ReadingStep, index: number) {
  const { entry } = step.result;

  console.log(`${index + 1}. ${step.label}`);
  console.log(`   ${entry.filePath}:${entry.startLine}-${entry.endLine}`);
  console.log(`   matched: ${step.result.matchedTerm}`);
}

function printAnswerDraft(question: string, searchQuery: string, evidence: SearchResult[]) {
  const { docs, sources } = splitEvidence(evidence);

  console.log("Answer draft");
  console.log("");
  console.log(`- Question: ${question}`);
  console.log(`- Search query: ${searchQuery}`);
  console.log(`- Evidence: ${docs.length} docs, ${sources.length} source chunks`);
  console.log("");
  console.log("What to read first:");

  createReadingSteps(searchQuery, docs, sources).forEach(printReadingStep);

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

  const { docs, sources } = splitEvidence(visibleResults);

  printEvidenceSection("Docs evidence", docs);
  printEvidenceSection("Source evidence", sources);

  printAnswerDraft(question, searchQuery, visibleResults);
}
