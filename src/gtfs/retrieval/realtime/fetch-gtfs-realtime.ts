import type { Subfeed } from "../../subfeed.js";
import { realtimeFeedSchema } from "./realtime-json-schemas.js";

const urls = {
  suburban: "https://vtar.trainquery.com/gtfs-realtime-suburban.json",
  regional: "https://vtar.trainquery.com/gtfs-realtime-regional.json",
};

export async function fetchGtfsRealtimeRaw(relayKey: string, feed: Subfeed) {
  const res = await fetch(urls[feed], {
    headers: { "relay-key": relayKey },
  });

  if (!res.ok) throw new Error(`Got ${res.status} error when fetching GTFS-R.`);

  return await res.json();
}

export async function fetchGtfsRealtime(relayKey: string, feed: Subfeed) {
  return realtimeFeedSchema.parse(await fetchGtfsRealtimeRaw(relayKey, feed));
}
