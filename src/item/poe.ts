import { Type as ModType, Props as ModProps } from '../mod/poe';

export interface BaseItemProps {
  name: string;
}

export enum Rarity {
  normal,
  magic,
  rare,
  unique,
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
