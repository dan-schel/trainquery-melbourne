import { Corequery } from "corequery";

async function main() {
  const trainquery = new Corequery(() => ({
    port: 3000,
  }));

  await trainquery.start();
}

main();
