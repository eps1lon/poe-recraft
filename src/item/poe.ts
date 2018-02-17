import { Type as ModType, Mod } from '../mod/poe';

// use intersection here instead of extends to be able to test Properties
// with only e.g. ArmourProperties
export type Item = AbstractItem &
  (ArmourProperties | WeaponProperties | NoProperties);

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

export interface AbstractProperties {
  quality?: number;
}

export interface ArmourProperties extends AbstractProperties {
  kind: 'armour';
  armour?: AugmentableValue<SingleValue>;
  energy_shield?: AugmentableValue<SingleValue>;
  evasion?: AugmentableValue<SingleValue>;
}

export interface ShieldProperties extends ArmourProperties {
  // in percent
  block: AugmentableValue<SingleValue>;
}

export interface WeaponProperties extends AbstractProperties {
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

export interface NoProperties extends AbstractProperties {
  kind?: 'none';
}

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
  augmented?: boolean;
}
