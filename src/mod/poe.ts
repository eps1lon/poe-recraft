import { Stat } from '../stat/poe';
import { Value } from '../util/value';

export enum Group {
  implicit,
  explicit,
  enchantment,
  crafted,
}

export enum Type {
  prefix,
  suffix,
  unique,
}

export const isPrefix = (mod: Mod) => mod.type === Type.prefix;
export const isSuffix = (mod: Mod) => mod.type === Type.suffix;

export interface Mod {
  id: string;
  type?: Type;
  name?: string;
  stats?: Stat[];
}
