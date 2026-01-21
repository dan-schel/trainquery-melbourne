import { Corequery } from "corequery";
import { env } from "./env.js";
import { parseIntThrow } from "@dan-schel/js-utils";

async function main() {
  const trainquery = new Corequery(() => ({
    port: parseIntThrow(env.PORT ?? "3000"),
    assets: {
      appName: "TrainQuery v4 (Beta)",
      shortAppName: "TQ4 (Beta)",
      description: "Navigate Melbourne's train network with TrainQuery.",
      version: env.COMMIT_HASH ?? "dev",

      faviconSvgPath: "assets/favicon.svg",
      appleTouchIconPngPath: "assets/apple-touch-icon.png",
      pwa192PngPath: "assets/pwa-192x192.png",
      pwa512PngPath: "assets/pwa-512x512.png",
      pwaMaskable192PngPath: "assets/pwa-maskable-192x192.png",
      pwaMaskable512PngPath: "assets/pwa-maskable-512x512.png",
    },

    // <TODO>
    // TODO: Everything below here.
    stops: [],
    lines: [],
    terminology: {
      stop: "station",
      line: "line",
      stopPosition: "platform",
    },
    landingPage: {
      primaryMarkdown: "",
    },
    footer: {
      footerMessageMarkdown: "",
    },
    aboutPage: {
      primaryMarkdown: "",
      dataSources: [],
    },
    linesPage: {
      sections: [],
    },
    // </TODO>
  }));

  await trainquery.start();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
