import { ReactNode } from 'react';

import { Mod } from '../mod/poe';
import { SingleValue, Value, AugmentableValue } from '../util/value';

// use intersection here instead of extends to be able to test Properties
// with only e.g. ArmourProperties
export type Item = AbstractItem & Properties;

export interface AbstractItem {
  base: BaseItem;
  // only required for rare and unique items
  name?: string;
  rarity: Rarity;
  requirements?: Requirements;
  implicits?: Affixes;
  explicits?: Affixes;
  // in case only stats are given and the item is magic we need to know
  // the name of the prefix/suffix mod
  prefix?: string;
  suffix?: string;
  elder?: boolean;
  shaper?: boolean;
}

export type Properties =
  | ShieldProperties
  | ArmourProperties
  | WeaponProperties
  | NoProperties;

export interface AbstractProperties {
  quality?: number;
}

export interface ArmourProperties extends AbstractProperties {
  armour?: AugmentableValue<SingleValue>;
  energy_shield?: AugmentableValue<SingleValue>;
  evasion?: AugmentableValue<SingleValue>;
}

export interface ShieldProperties extends ArmourProperties {
  // in percent
  block: AugmentableValue<SingleValue>;
}

export interface WeaponProperties extends AbstractProperties {
  physical_damage?: AugmentableValue;
  cold_damage?: Value;
  fire_damage?: Value;
  lightning_damage?: Value;
  chaos_damage?: Value;
  // time between attacks in ms
  attack_time?: AugmentableValue<SingleValue>;
  /**
   * value: 0-10000
   *        10000 => 100%
   *        1000 => 10%
   *        100 => 1%
   *        10 => 0.1%
   *        1 => 1%
   */
  crit?: AugmentableValue<SingleValue>;
}

export type NoProperties = AbstractProperties;

export interface BaseItem {
  name: string;
}

export enum Rarity {
  normal,
  magic,
  rare,
  unique,
}

export interface Requirements {
  [key: string]: AugmentableValue<SingleValue> | undefined;
  level?: AugmentableValue<SingleValue>;
  dexterity?: AugmentableValue<SingleValue>;
  inteliligence?: AugmentableValue<SingleValue>;
  strength?: AugmentableValue<SingleValue>;
}

export type Affix = ReactNode | Mod;
export type Affixes = Affix[];
