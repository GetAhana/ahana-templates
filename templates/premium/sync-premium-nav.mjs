/**
 * @deprecated Use sync-premium-design.mjs — premium nav is generated in sync-premium-pages.mjs.
 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const syncScript = path.join(__dirname, "sync-premium-design.mjs");

console.log("sync-premium-nav.mjs: delegating to sync-premium-design.mjs");
const result = spawnSync(process.execPath, [syncScript], { stdio: "inherit", cwd: __dirname });
process.exit(result.status ?? 1);
