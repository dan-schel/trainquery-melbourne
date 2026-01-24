import type { AboutPageConfig } from "corequery";
import { readMarkdownSync } from "./markdown/read-markdown.js";

export const aboutPage: AboutPageConfig = {
  primaryMarkdown: readMarkdownSync("src/config/markdown/about-page.md"),
  dataSources: [
    {
      name: "GTFS",
      licensingMessage:
        "Source: Licensed from the Department of Transport and Planning under a Creative Commons Attribution 4.0 International Licence.",
      links: [
        {
          label: "Website",
          url: "https://opendata.transport.vic.gov.au/dataset/gtfs-schedule",
        },
      ],
    },
    {
      name: "Victoria's public transport timetable API",
      licensingMessage:
        "Source: Licensed from Public Transport Victoria under a Creative Commons Attribution 4.0 International Licence.",
      links: [
        {
          label: "Website",
          url: "https://www.vic.gov.au/public-transport-timetable-api",
        },
      ],
    },
  ],
};
