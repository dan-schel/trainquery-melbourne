import fsp from "fs/promises";
import { nonNull } from "@dan-schel/js-utils";
import { assert } from "vitest";

export async function expectedSortedSourceCode(
  path: string,
  sectionRegex: RegExp,
  matchExtractor: (match: RegExpMatchArray) => string,
) {
  const text = await fsp.readFile(path, "utf-8");
  const sections = text
    .split("\n")
    .map((line) => line.match(sectionRegex))
    .filter(nonNull)
    .map(matchExtractor);

  sections.forEach((entry, i) => {
    const previous = sections[i - 1];
    if (previous == null) return;

    assert(
      entry.localeCompare(previous) >= 0,
      `${previous} should be listed after ${entry} in alphabetical order.`,
    );
  });
}
