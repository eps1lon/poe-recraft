export type RarityId = 'normal' | 'magic' | 'rare';
export function isRarityId(s: string): s is RarityId {
  return ['normal', 'magic', 'rare'].includes(s);
}
