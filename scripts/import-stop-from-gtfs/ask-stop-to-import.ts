import chalk from "chalk";
import readline from "readline/promises";
import type { StopsCsvTreeNode } from "../../src/gtfs/schedule/higher-order/stops-csv-tree.js";
import { itsOk, parseIntNull } from "@dan-schel/js-utils";

export async function askStopToImport(
  unseenStops: StopsCsvTreeNode[],
): Promise<StopsCsvTreeNode | null> {
  const what = unseenStops.length === 1 ? "stop" : "stops";
  console.log(chalk.white.bold(`\nFound ${unseenStops.length} new ${what}:`));
  unseenStops.forEach((stop, index) => {
    const stopIdStr = chalk.cyan(`(${stop.stop_id})`);
    console.log(`  ${index + 1}. ${stop.stop_name} ${stopIdStr}`);
  });

  if (unseenStops.length === 1) {
    return await askSingleStop(itsOk(unseenStops[0]));
  } else {
    return await askMultipleStops(unseenStops);
  }
}

async function askSingleStop(
  stop: StopsCsvTreeNode,
): Promise<StopsCsvTreeNode | null> {
  const answer = await ask("\nContinue? (Y/n) ");
  const normalizedAnswer = answer.trim().toLowerCase();

  if (normalizedAnswer === "" || normalizedAnswer === "y") {
    return stop;
  } else {
    return null;
  }
}

async function askMultipleStops(
  stops: StopsCsvTreeNode[],
): Promise<StopsCsvTreeNode | null> {
  while (true) {
    const answer = await ask(`\nWhich stop should be imported? `);
    const choice = parseIntNull(answer.trim());

    if (choice == null || choice < 1 || choice > stops.length) {
      console.log(chalk.red(`Expecting a number from 1-${stops.length}.`));
      continue;
    }

    return itsOk(stops[choice - 1]);
  }
}

async function ask(question: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    return await rl.question(question);
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError") {
      console.log("\nAborted.");
      process.exit(1);
    } else {
      throw e;
    }
  } finally {
    rl.close();
  }
}
