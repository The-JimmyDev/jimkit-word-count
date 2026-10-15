/** What a piece of text adds up to. The tool counts as you type; the server route uses the same function. */
export interface Counts { words: number; characters: number; lines: number; minutes: number }

export function count(text: string): Counts {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return { words, characters: [...text].length, lines: text ? text.split(/\r\n|\r|\n/).length : 0, minutes: Math.max(words ? 1 : 0, Math.round(words / 200)) };
}
