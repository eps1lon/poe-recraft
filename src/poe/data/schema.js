// @flow

export type TagProps = {
  primary: number,
  id: string
};

export type ModTypeProps = {
  primary: number
};

export type SpawnWeightProps = {
  value: number,
  tag: TagProps
};

export type StatProps = {
  primary: number,
  id: string,
  text: string
};

export type ModProps = {
  primary: number,
  id: string,
  level: number,
  domain: number,
  name: string,
  correct_group: string,
  stat1_min: number,
  stat1_max: number,
  stat2_min: number,
  stat2_max: number,
  stat3_min: number,
  stat3_max: number,
  stat4_min: number,
  stat4_max: number,
  stat5_min: number,
  stat5_max: number,
  mod_type: ModTypeProps,
  spawn_weights: SpawnWeightProps[],
  stats: StatProps[],
  tags: TagProps[]
};

export type WeaponTypeProps = {
  critical: number,
  speed: number,
  damage_min: number,
  damage_max: number,
  range_max: number
};

export type AttributeRequirementProps = {
  req_str: number,
  req_dex: number,
  req_int: number
};

export type ArmourProps = {
  armour: number,
  evasion: number,
  energy_shield: number
};

export type ItemClassProps = {
  primary: number,
  name: string
};

export type BaseItemTypeProps = {
  primary: number,
  name: string,
  width: number,
  height: number,
  drop_level: number,
  inherits_from: string,
  weapon_type: ?WeaponTypeProps,
  component_attribute_requirement: ?AttributeRequirementProps,
  component_armour: ?ArmourProps,
  implicit_mods: ModProps[],
  item_class: ItemClassProps,
  tags: TagProps[]
};
