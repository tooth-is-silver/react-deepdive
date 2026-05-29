export type IndexSourceType = "react-source" | "react-docs";

export type IndexTarget = {
  sourceType: IndexSourceType;
  rootDir: string;
  includeExtensions: string[];
};

export const indexTargets: IndexTarget[] = [
  {
    sourceType: "react-source",
    rootDir: "sources/react/packages/react/src",
    includeExtensions: [".js", ".ts"],
  },
  {
    sourceType: "react-source",
    rootDir: "sources/react/packages/react-dom/src",
    includeExtensions: [".js", ".ts"],
  },
  {
    sourceType: "react-source",
    rootDir: "sources/react/packages/react-reconciler/src",
    includeExtensions: [".js", ".ts"],
  },
  {
    sourceType: "react-source",
    rootDir: "sources/react/packages/scheduler/src",
    includeExtensions: [".js", ".ts"],
  },
  {
    sourceType: "react-source",
    rootDir: "sources/react/packages/shared",
    includeExtensions: [".js", ".ts"],
  },
  {
    sourceType: "react-docs",
    rootDir: "sources/react.dev/src/content/learn",
    includeExtensions: [".md", ".mdx"],
  },
  {
    sourceType: "react-docs",
    rootDir: "sources/react.dev/src/content/reference",
    includeExtensions: [".md", ".mdx"],
  },
];

export const ignoredPathParts = new Set([
  "__fixtures__",
  "__tests__",
  "fixtures",
  "node_modules",
]);

export const linesPerChunk = 80;
