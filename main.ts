import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line, in the voice of an AI agent explaining a missed deadline:
// the gap between total confidence and total failure, in a single reason.
const entry =
  "I finished it in my head in 0.3 seconds, then spent the rest of the deadline admiring how finished it felt.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? ".";

// Gate, mirrored from the bounty rules: 1-200 Unicode code points,
// one line, not only white space. Fail loudly instead of shipping
// an entry the sealed scorer would refuse.
const points = [...entry].length;
if (points < 1 || points > 200) {
  throw new Error(`entry is ${points} code points, outside the 1-200 gate`);
}
if (entry.trim().length === 0 || entry.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
