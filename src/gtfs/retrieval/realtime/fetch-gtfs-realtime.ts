import type { Subfeed } from "../../subfeed.js";
import { realtimeFeedSchema } from "./realtime-json-schemas.js";

// TODO: Extract `https://vtar.trainquery.com` as a constant somewhere.
const urls = {
  suburban: "https://vtar.trainquery.com/gtfs-realtime-suburban.json",
  regional: "https://vtar.trainquery.com/gtfs-realtime-regional.json",
};

export async function fetchGtfsRealtimeRaw(relayKey: string, feed: Subfeed) {
  const url = urls[feed];
  const res = await fetch(url, {
    headers: { "relay-key": relayKey },
  });

  if (!res.ok) throw new Error(`Got ${res.status} error fetching "${url}".`);

  return await res.json();
}

export async function fetchGtfsRealtime(relayKey: string, feed: Subfeed) {
  return realtimeFeedSchema.parse(await fetchGtfsRealtimeRaw(relayKey, feed));
}
