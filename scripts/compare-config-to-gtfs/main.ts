async function main() {
  const checkMode = process.argv.includes("--check");

  console.log("Downloading/parsing GTFS data...");

  console.log("✅ Done!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
