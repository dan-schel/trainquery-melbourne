export function isSubsequence(subseq: number[], seq: number[]): boolean {
  let subseqIndex = 0;

  for (const item of seq) {
    if (item === subseq[subseqIndex]) {
      subseqIndex++;
      if (subseqIndex === subseq.length) {
        return true;
      }
    }
  }

  return false;
}
