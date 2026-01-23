# Config Linting

- All stops in the GTFS data are present (and vice versa).
- All lines in the GTFS data are mapped to a line (and vice versa).
- All stopping patterns in the GTFS data can be matched to a route.
- No routes exist which are never used in any stopping patterns.
- Stop IDs haven't been removed compared to master.
- `src/stops/stops.ts` are sorted alphabetically.
- All active tags are used.
