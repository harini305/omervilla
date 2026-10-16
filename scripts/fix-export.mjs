// Next 16's static export writes each page's prefetch data as
//   out/<page>/__next.<segment>/__PAGE__.txt
// but the browser requests it as
//   out/<page>/__next.<segment>.__PAGE__.txt
// Copy each file to the requested name so client navigation never hits a 404
// on a static host.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) {
      for (const file of fs.readdirSync(full)) {
        const src = path.join(full, file);
        if (!fs.statSync(src).isFile()) continue;
        const dest = path.join(dir, `${entry.name}.${file}`);
        if (!fs.existsSync(dest)) {
          fs.copyFileSync(src, dest);
          copied++;
        }
      }
    }
    if (entry.name !== "_next" && entry.name !== "media") walk(full);
  }
}

if (!fs.existsSync(OUT)) {
  console.error("fix-export: no out/ directory; run next build first");
  process.exit(1);
}
walk(OUT);
console.log(`fix-export: wrote ${copied} prefetch file(s)`);
