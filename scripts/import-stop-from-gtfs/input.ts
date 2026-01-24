import readline from "readline/promises";

export async function ask(question: string) {
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

export async function pressAnyKeyToContinue(
  message: string = "\nPress any key to continue...",
) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<void>((resolve) => {
    process.stdin.setRawMode(true);
    process.stdin.resume();

    process.stdin.once("data", (d) => {
      process.stdin.setRawMode(false);
      process.stdout.clearLine(0);
      if (d[0] === 13) process.stdout.moveCursor(0, -1);
      rl.close();
      resolve();
    });
    console.log(message);
  });
}
