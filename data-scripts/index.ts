import { createSeedClient } from "./db";
import { resolveScripts, seedScripts } from "./registry";
import type { SeedScript } from "./types";

type Key = {
  name?: string;
  sequence: string;
  ctrl?: boolean;
};

function formatScript(script: SeedScript) {
  return `${script.group.padEnd(10)} ${script.id.padEnd(42)} ${script.label}`;
}

function renderSelector(cursor: number, selected: Set<string>) {
  process.stdout.write("\x1Bc");
  console.log("Select data scripts to run\n");
  console.log("Space: select/unselect  Enter: run  arrows/j/k: move  a: toggle all  q: quit\n");
  seedScripts.forEach((script, index) => {
    const pointer = index === cursor ? ">" : " ";
    const checked = selected.has(script.id) ? "x" : " ";
    console.log(`${pointer} [${checked}] ${formatScript(script)}`);
  });
}

function readKey(): Promise<Key> {
  return new Promise((resolve) => {
    process.stdin.once("keypress", (sequence: string, key: Key) => {
      resolve(key ?? { sequence });
    });
  });
}

async function selectScripts() {
  if (!process.stdin.isTTY) {
    throw new Error("Interactive data-seed requires a TTY. Use data-seed:all in CI.");
  }

  const readline = await import("readline");
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  let cursor = 0;
  const selected = new Set<string>();

  try {
    while (true) {
      renderSelector(cursor, selected);
      const key = await readKey();

      if (key.ctrl && key.name === "c") {
        process.stdout.write("\n");
        process.exit(130);
      }

      if (key.name === "q") return [];
      if (key.name === "return") return [...selected];
      if (key.name === "down" || key.name === "j") {
        cursor = Math.min(seedScripts.length - 1, cursor + 1);
      } else if (key.name === "up" || key.name === "k") {
        cursor = Math.max(0, cursor - 1);
      } else if (key.name === "space") {
        const id = seedScripts[cursor]?.id;
        if (selected.has(id)) selected.delete(id);
        else selected.add(id);
      } else if (key.name === "a") {
        if (selected.size === seedScripts.length) selected.clear();
        else seedScripts.forEach((script) => selected.add(script.id));
      }
    }
  } finally {
    process.stdin.setRawMode(false);
  }
}

async function runScripts(scripts: SeedScript[]) {
  if (!scripts.length) {
    console.log("No data scripts selected.");
    return;
  }

  const db = createSeedClient();
  try {
    for (const script of scripts) {
      console.log(`\nRunning ${script.id} - ${script.label}`);
      await script.run({ prisma: db.prisma });
    }
    console.log(`\nCompleted ${scripts.length} data script(s).`);
  } finally {
    await db.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const all = args.includes("--all");
  const explicitIds = args.filter((arg) => !arg.startsWith("-"));
  const selectedIds = all
    ? seedScripts.map((script) => script.id)
    : explicitIds.length
      ? explicitIds
      : await selectScripts();

  await runScripts(resolveScripts(selectedIds));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
