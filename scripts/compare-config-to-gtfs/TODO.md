# Config Linting

This goes further than the linting CoreQuery does, as this script compares the config against the current GTFS data available from the relay server.

Things to check:

- All stops in the GTFS data are present (and vice versa).
- All lines in the GTFS data are mapped to a line (and vice versa).
- All stopping patterns in the GTFS data can be matched to a route.
- No routes exist which are never used in any stopping patterns.
- Stop IDs haven't been removed compared to master.
- `src/stops/stops.ts` are sorted alphabetically.
- All active tags are used.
- Abilty to check "corridors" to ensure all lines list the same stops between two stations.
- Check that if a stop isn't marked "always express" on the line diagram, that some service actually stops there (and vice versa).
