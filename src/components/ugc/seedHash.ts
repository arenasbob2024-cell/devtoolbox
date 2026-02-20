/**
 * Deterministic hash (djb2) → stable pseudo-random number in [min, max].
 * Used to seed UGC counters so every visitor sees the same baseline.
 */
export function seedCount(key: string, min: number, max: number): number {
  let hash = 5381;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) + hash + key.charCodeAt(i)) & 0xffffffff;
  }
  return min + (Math.abs(hash) % (max - min + 1));
}
