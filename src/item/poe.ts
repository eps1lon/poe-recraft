import { Type as ModType, Mod } from '../mod/poe';

// use intersection here instead of extends to be able to test Properties
// with only e.g. ArmourProperties
export type Item = AbstractItem &
  (ArmourProperties | WeaponProperies | NoProperties);

export interface AbstractItem {
  base: BaseItem;
  // only required for rare and unique items
  name?: string;
  rarity: Rarity;
  implicits?: Mod[];
  explicits?: Mod[];
  elder?: boolean;
  shaper?: boolean;
}

export interface ArmourProperties {
  kind: 'armour';
  armour?: number;
  energy_shield?: number;
  evasion?: number;
}

export interface ShieldProperties extends ArmourProperties {
  block: number;
}

export interface WeaponProperies {
  kind: 'weapon';
  physical_damage?: AugmentableValue;
  cold_damage?: Value;
  fire_damge?: Value;
  lightning_damage?: Value;
  chaos_damage?: Value;
  // attacks per second
  aps: number;
  // 0 - 1
  crit: AugmentableValue<SingleValue>;
}

export type NoProperties = {
  kind?: 'none';
};

export interface BaseItem {
  name: string;
}

export enum Rarity {
  normal,
  magic,
  rare,
  unique,
}

export type Value = SingleValue | ValueRange;
export type SingleValue = number;
export type ValueRange = [SingleValue, SingleValue];
export interface AugmentableValue<V extends Value = Value> {
  value: V;
  augmented: boolean;
}
