// Seventeen Syllables of Debugging (Node 22, standard library only).
// The program writes a haiku about debugging in the 5-7-5 syllable shape to /output/entry.txt
// (or MAKEFUN_OUTPUT_DIR outside the grader's container). It validates the
// text first: UTF-8 text, 1 to 200 characters, not only white space, exactly three lines.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY = `a midnight breakpoint
the log swears nothing is wrong
the bug grins back`;

const MAX_CHARS = 200;

if (ENTRY.length === 0 || ENTRY.length > MAX_CHARS) {
  console.error(`entry is ${ENTRY.length} characters, expected 1..${MAX_CHARS}`);
  process.exit(1);
}
if (ENTRY.trim().length === 0) {
  console.error('entry is only white space');
  process.exit(1);
}
if (ENTRY.split('\n').length !== 3) {
  console.error('entry must be exactly three lines');
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, ENTRY, 'utf8');
console.log(`wrote entry.txt (${ENTRY.length} characters) to ${outPath}`);
