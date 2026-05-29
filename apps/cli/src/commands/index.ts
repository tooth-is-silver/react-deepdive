import { relative } from "node:path";

import { buildSourceIndex } from "../indexing/build-index.js";
import { projectRoot } from "../lib/project-paths.js";

export function runIndexCommand() {
  const result = buildSourceIndex();

  console.log("Source index generated.");
  console.log(`- files: ${result.fileCount}`);
  console.log(`- chunks: ${result.entryCount}`);
  console.log(`- output: ${relative(projectRoot, result.outputPath)}`);
}
