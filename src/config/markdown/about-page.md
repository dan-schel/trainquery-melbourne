# About TrainQuery

TrainQuery is an unofficial guide to help you navigate Melbourne's train network. You can search for any suburban or regional train station to view upcoming departures, and adjust the departure time or filter to further refine the results.

## Can you trust this site?

**Probably...?**

At the moment, this site pulls its timetables from the Department of Transport and Planning's [GTFS data feed](https://opendata.transport.vic.gov.au/dataset/gtfs-schedule). It also pulls live departure times from [the realtime feed](https://opendata.transport.vic.gov.au/dataset/gtfs-realtime), allowing it to show when trains are running late. For other types of disruptions, it queries Victoria's [public transport timetable API](https://www.vic.gov.au/public-transport-timetable-api) and will display the provided diruption messages on the affected services.

The GTFS feed is the same data you'll see used on many other sites that provide train timetables in Melbourne (such as Google Maps) so in theory this site should be just as trustworthy as them. Unfortunately, the GTFS feed itself is far from perfect, and it's not uncommon to see anomalies such as services missing from the feed, the same train appearing twice in the City Loop, or replacement buses being confused for train services. The disruption messages provided by the timetable API also have their issues, such as providing overly broad messages about bus replacements that don't start for weeks, or proudly announcing the opening of a new car park as a "disruption".

To combat this, TrainQuery does some processing on all the raw data it consumes. It has to, otherwise every train would literally always have a little red alert on it for something! While the processing mostly does a really good job, there might be times that it gets things wrong. Hopefully that's relatively rare, but something to keep in mind regardless. This is a passion project, not an official source of information.

## Why bother?

My initial motivation for starting this project was a few gripes I have with the PTV App, especially around the way it handles regional train stations and its search feature. For example, if you search "Richmond" you'll get two options. You'll need to choose "Richmond Station" if you want the suburban departures, and "Richmond Railway Station" for the regional departures. The order of results is also quite annoying. At the time of writing, searching "Geelong" lists Geelong Railway Station in 7th, below a tram stop and 3 bus stops in Footscray! Unfortunately it's like that for most regional stations.

If search was the only issue, it'd be fine, but speaking of Geelong, tapping into it shows 8 different routes with no indication which ones are buses, and many list their next two departures as the same service. There's even a route titled "Towards Geelong"! And it isn't just regional trains, suburban trains get to partake in some general weirdness too! Did you know Pakenham/Cranbourne trains run express through Burnley?

Anyway, I thought I'd try my hand at solving some of these problems and making something of my own. If I'm honest, the main reason I'm doing this is because it's all just a bit of fun, and an excuse to practice my web dev skills and learn a few new things!

Thanks for checking it out!
