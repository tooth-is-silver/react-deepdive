import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");

export function fromProjectRoot(...paths: string[]) {
  return resolve(projectRoot, ...paths);
}
