import { ReactNode } from 'react';

import { Mod } from '../../../mod/poe';
import {
  SingleValue,
  RollableValue,
  MinMaxValue,
  AugmentableValue,
} from '../../../util/value';
import { ExclusifyUnion } from '../../../util/types';

export type Item = AbstractItem & ItemProperties;

export interface AbstractItem {
  base: {
    name: string;
  };
  // only required for rare and unique items
  name?: string;
  rarity: Rarity;
  requirements?: {
    [key: string]: AugmentableValue<RollableValue> | undefined;
    level?: AugmentableValue<RollableValue>;
    dexterity?: AugmentableValue<RollableValue>;
    intelligence?: AugmentableValue<RollableValue>;
    strength?: AugmentableValue<RollableValue>;
  };
  // stats for default view
  craftedStats?: ReactNode[];
  enchantStats?: ReactNode[];
  explicitStats?: ReactNode[];
  implicitStats?: ReactNode[];
  utilityStats?: ReactNode[];
  // in case only stats are given and the item is magic we need to know
  // the name of the prefix/suffix mod
  prefix?: string;
  suffix?: string;
  elder?: boolean;
  shaper?: boolean;
  corrupted?: boolean;
}

export enum Rarity {
  normal,
  magic,
  rare,
  unique,
}

export type ItemProperties = ExclusifyUnion<
  ShieldProperties | ArmourProperties | WeaponProperties | NoProperties
>;

export interface AbstractProperties {
  quality?: number;
}

export interface ArmourProperties extends AbstractProperties {
  armour?: AugmentableValue<RollableValue>;
  energy_shield?: AugmentableValue<RollableValue>;
  evasion?: AugmentableValue<RollableValue>;
}
export function isArmourProperties(
  props: ItemProperties,
): props is ArmourProperties {
  return ['armour', 'energy_shield', 'evasion'].some(prop => prop in props);
}

export interface ShieldProperties extends ArmourProperties {
  // in percent
  block: AugmentableValue<RollableValue>;
}
export function isShieldProperties(
  props: ItemProperties,
): props is ShieldProperties {
  return 'block' in props;
}

export interface WeaponProperties extends AbstractProperties {
  physical_damage?: AugmentableValue<MinMaxValue>;
  cold_damage?: MinMaxValue;
  fire_damage?: MinMaxValue;
  lightning_damage?: MinMaxValue;
  chaos_damage?: MinMaxValue;
  // attacks per 100s
  aps?: AugmentableValue<RollableValue>;
  /**
   * value: 0-10000
   *        10000 => 100%
   *        1000 => 10%
   *        100 => 1%
   *        10 => 0.1%
   *        1 => 1%
   */
  crit?: AugmentableValue<RollableValue>;
  range?: AugmentableValue<RollableValue>;
}
export function isWeaponProperties(
  props: ItemProperties,
): props is WeaponProperties {
  return [
    'physical_damage',
    'cold_damage',
    'fire_damage',
    'lightning_damage',
    'chaos_damage',
    'aps',
    'crit',
    'range',
  ].some(prop => prop in props);
}

export type NoProperties = AbstractProperties;

export type Affix = ReactNode | Mod;
export type Affixes = Affix[];
