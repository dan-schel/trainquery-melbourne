import { realtimeFeedSchema } from "./realtime-json-schemas.js";

const gtfsRealtimeUrl = "https://vtar.trainquery.com/gtfs-realtime.json";

export async function fetchGtfsRealtimeRaw(relayKey: string) {
  const res = await fetch(gtfsRealtimeUrl, {
    headers: { "relay-key": relayKey },
  });

  if (!res.ok) throw new Error(`Got ${res.status} error when fetching GTFS-R.`);

  return await res.json();
}

export async function fetchGtfsRealtime(relayKey: string) {
  return realtimeFeedSchema.parse(await fetchGtfsRealtimeRaw(relayKey));
}
