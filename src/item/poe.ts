export interface BaseItemProps {
  name: string;
}

export enum Rarity {
  normal,
  magic,
  rare,
  unique,
}

export interface ModProps {
  id: string;
  generation_type: number;
  name?: string;
}

export interface ItemProps {
  base: BaseItemProps;
  name?: string;
  rarity: Rarity;
  implicits?: ModProps[];
  explicits?: ModProps[];
}

// TODO move to poe-mods
export function isPrefix(mod: { generation_type: number }) {
  return mod.generation_type === 1;
}

export function isSuffix(mod: { generation_type: number }) {
  return mod.generation_type === 2;
}
