// djb2 hash for deterministic seed counts
function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function seedCount(key: string, min: number, max: number): number {
  return min + (djb2(key) % (max - min + 1));
}
