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

function findReadingStep(steps: ReadingStep[], label: string) {
  return steps.find((step) => step.label === label);
}

function formatCitation(step: ReadingStep | undefined) {
  if (!step) {
    return "no evidence found";
  }

  const { entry } = step.result;

  return `${entry.filePath}:${entry.startLine}-${entry.endLine}`;
}

function printInterviewAnswerTemplate(searchQuery: string, readingSteps: ReadingStep[]) {
  const officialDocs = findReadingStep(readingSteps, "Official docs");
  const publicApiEntry = findReadingStep(readingSteps, "Public API entry");
  const internalImplementation = findReadingStep(readingSteps, "Internal implementation");

  console.log("");
  console.log("Interview answer template:");
  console.log("");
  console.log("1. Short answer");
  console.log(
    `   ${searchQuery}는 공식 문서 기준으로 먼저 public API 역할을 설명하고, 그 다음 소스 기준 내부 위임 흐름을 설명합니다.`,
  );
  console.log(`   Evidence: ${formatCitation(officialDocs)}`);
  console.log("");
  console.log("2. Public API behavior");
  console.log("   - 사용자 관점에서 이 API가 무엇을 해결하는지 설명합니다.");
  console.log("   - 공식 문서의 표현을 우선 기준으로 삼습니다.");
  console.log(`   Evidence: ${formatCitation(officialDocs)}`);
  console.log("");
  console.log("3. Source flow");
  console.log("   - public API entry에서 시작합니다.");
  console.log(`   - Entry evidence: ${formatCitation(publicApiEntry)}`);
  console.log("   - 내부 구현 지점으로 이어지는 흐름을 설명합니다.");
  console.log(`   - Internal evidence: ${formatCitation(internalImplementation)}`);
  console.log("");
  console.log("4. Interview wording");
  console.log(
    `   "${searchQuery}는 public API에서는 사용자-facing 동작을 제공하고, 소스에서는 public entry에서 내부 구현 지점으로 이어집니다. 답변할 때는 먼저 공식 문서 기준의 역할을 말한 뒤, 소스에서 확인되는 entry와 내부 구현 위치를 근거로 흐름을 설명하겠습니다."`,
  );
  console.log("");
  console.log("5. Boundary");
  console.log("   - 공식 문서 내용은 public contract로 말합니다.");
  console.log("   - 소스 흐름 설명은 현재 로컬 React 소스 버전 기준이라고 밝힙니다.");
  console.log("   - 근거에 없는 세부 동작은 추론이라고 분리합니다.");
}

function printAnswerDraft(question: string, searchQuery: string, evidence: SearchResult[]) {
  const { docs, sources } = splitEvidence(evidence);
  const readingSteps = createReadingSteps(searchQuery, docs, sources);

  console.log("Answer draft");
  console.log("");
  console.log(`- Question: ${question}`);
  console.log(`- Search query: ${searchQuery}`);
  console.log(`- Evidence: ${docs.length} docs, ${sources.length} source chunks`);
  console.log("");
  console.log("What to read first:");

  readingSteps.forEach(printReadingStep);
  printInterviewAnswerTemplate(searchQuery, readingSteps);
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
