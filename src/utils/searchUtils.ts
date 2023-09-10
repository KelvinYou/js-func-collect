import { WORD_REPLACEMENT } from "../constants/utils";

export function calculateSimilarityWithReplacements(s1: string, s2: string): number {
  const replacements: Record<string, string> = WORD_REPLACEMENT;

  s1 = applyReplacements(s1, replacements);
  s2 = applyReplacements(s2, replacements);

  return calculateSimilarity(s1, s2);
}

function applyReplacements(input: string, replacements: Record<string, string>): string {
  return input.replace(/./g, (char) => replacements[char] || char);
}

export const calculateSimilarity = (s1: string, s2: string): number => {
  const [longer, shorter] = s1.length >= s2.length ? [s1, s2] : [s2, s1];
  const longerLength: number = longer.length;

  if (longerLength === 0) {
    return 1.0;
  }

  return (longerLength - calculateEditDistance(longer.toLowerCase(), shorter.toLowerCase())) / longerLength;

}

const calculateEditDistance = (s1: string, s2: string): number => {
  const s1Length = s1.length;
  const s2Length = s2.length;

  if (s1Length === 0) {
    return s2Length;
  }
  if (s2Length === 0) {
    return s1Length;
  }

  const matrix: number[][] = Array.from({ length: s1Length + 1 }, () => Array(s2Length + 1));

  for (let i = 0; i <= s1Length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= s2Length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= s1Length; i++) {
    for (let j = 1; j <= s2Length; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[s1Length][s2Length];
}