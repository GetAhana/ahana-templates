/**
 * @deprecated Use sync-premium-design.mjs — location pages are generated there.
 * Kept for backward compatibility: re-runs the premium design sync.
 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const syncScript = path.join(__dirname, "sync-premium-design.mjs");

console.log("build-locations.mjs: delegating to sync-premium-design.mjs");
const result = spawnSync(process.execPath, [syncScript], { stdio: "inherit", cwd: __dirname });
process.exit(result.status ?? 1);
