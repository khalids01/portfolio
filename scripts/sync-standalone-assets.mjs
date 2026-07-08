import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const standaloneDir = path.join(projectRoot, ".next", "standalone");

const copies = [
  {
    from: path.join(projectRoot, ".next", "static"),
    to: path.join(standaloneDir, ".next", "static"),
  },
  {
    from: path.join(projectRoot, "public"),
    to: path.join(standaloneDir, "public"),
  },
];

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

async function assertExists(filePath, message) {
  if (await pathExists(filePath)) {
    return;
  }

  throw new Error(message);
}

function relative(filePath) {
  return path.relative(projectRoot, filePath) || ".";
}

await assertExists(
  standaloneDir,
  "Missing .next/standalone. Run `npm run build` before starting the standalone server.",
);

for (const { from, to } of copies) {
  await assertExists(
    from,
    `Missing ${relative(from)}. Run \`npm run build\` before starting the standalone server.`,
  );

  await rm(to, { recursive: true, force: true });
  await mkdir(path.dirname(to), { recursive: true });
  await cp(from, to, { recursive: true });

  console.log(`[standalone-assets] ${relative(from)} -> ${relative(to)}`);
}
