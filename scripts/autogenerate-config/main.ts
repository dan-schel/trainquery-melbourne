import { env } from "./env";

async function main() {
  const checkMode = process.argv.includes("--check");

  console.log(env.RELAY_KEY);
}

main();
