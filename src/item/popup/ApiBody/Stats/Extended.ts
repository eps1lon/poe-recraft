export default interface Extended {
  hashes: { [key in ModGroup]?: Hash[] };
  mods: { [key in ModGroup]?: Mod[] };
};

export interface Mod {
  magnitudes: Stat[];
  name: string;
  tier?: string;
}
export interface Stat {
  hash: StatId;
  min: number;
  max: number;
}

export type Hash = [StatId, ModIndex[]];

export type StatId = string;
/**
 * an index if Extended['mods']
 */
export type ModIndex = number;
export type ModGroup = 'explicit' | 'implicit';

export const isPrefix = (mod: Mod): boolean => String(mod.tier).startsWith('P');
export const isSuffix = (mod: Mod): boolean => String(mod.tier).startsWith('S');