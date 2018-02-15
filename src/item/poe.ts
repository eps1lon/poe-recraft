export interface BaseItemProps {
  name: string;
}

export enum Rarity {
  normal,
  magic,
  rare,
  unique,
}

export enum ModType {
  prefix,
  suffix,
  unique,
}

export const isPrefix = (mod: ModProps) => mod.type === ModType.prefix;
export const isSuffix = (mod: ModProps) => mod.type === ModType.suffix;

export interface ModProps {
  id: string;
  type?: ModType;
  name?: string;
}

export interface ItemProps {
  base: BaseItemProps;
  name?: string;
  rarity: Rarity;
  implicits?: ModProps[];
  explicits?: ModProps[];
  elder?: boolean;
  shaper?: boolean;
}
