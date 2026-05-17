export function isSubsequence(subseq: number[], seq: number[]): boolean {
  if (subseq.length === 0) return true;

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
