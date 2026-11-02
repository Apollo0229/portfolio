// The static export writes prefetch segments as nested folders
// (frontend/__next.$d$role/__PAGE__.txt) while the client router requests the
// flattened name (frontend/__next.$d$role.__PAGE__.txt). Static hosts such as
// GitHub Pages cannot rewrite one to the other, so emit the flattened copies.
import { copyFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";

async function flatten(dir, prefix, target) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = `${prefix}.${entry.name}`;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await flatten(path, name, target);
    else await copyFile(path, join(target, name));
  }
}

async function walk(dir) {
  let count = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      await flatten(path, entry.name, dir);
      count++;
    } else {
      count += await walk(path);
    }
  }
  return count;
}

const count = await walk(OUT);
console.log(`flatten-segments: flattened ${count} segment folder(s)`);
