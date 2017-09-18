// @flow
export type TagProps = {
  primary: number,
  id: string,
};

export type ModTypeProps = {
  primary: number,
};

export type SpawnWeightProps = {
  value: number,
  tag: TagProps,
};

export type StatProps = {
  primary: number,
  id: string,
  text: string,
};

export type ModProps = {
  primary: number,
  id: string,
  level: number,
  domain: number,
  name: string,
  correct_group: string,
  generation_type: number,
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
  tags: TagProps[],
};

export type WeaponTypeProps = {
  critical: number,
  speed: number,
  damage_min: number,
  damage_max: number,
  range_max: number,
};

export type AttributeRequirementProps = {
  req_str: number,
  req_dex: number,
  req_int: number,
};

export type ArmourProps = {
  armour: number,
  evasion: number,
  energy_shield: number,
};

export type ItemClassProps = {
  primary: number,
  name: string,
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
  tags: TagProps[],
};

export type MetaDataProps = {
  extends: string,
  inheritance: string[],
  tags: TagProps[],
  // generic fascades
  [string]: {
    [string]: string[],
  },
  // specific fascade
  AttributeRequirements?: {
    dexterity_requirement: string[],
    intelligence_requirement: string[],
    strength_requirement: string[],
  },
  Base?: {
    tag?: string[],
    x_size?: string[],
    y_size?: string[],
  },
  Quality?: {
    max_quality: string[],
  },
  Sockets?: {
    socket_info: string[],
  },
  Usable?: {
    action: string[],
    use_type: string[],
  },
  Weapon?: {
    accuracy_rating?: string[],
    critical_chance?: string[],
    minimum_attack_distance?: string[],
    maximum_attack_distance?: string[],
    minimum_damage?: string[],
    maximum_damage?: string[],
    weapon_speed?: string[],
    weapon_class?: string[],
  },
};

export type MetaDataMap = {
  [string]: MetaDataProps,
};

export type GroupLocalization = {
  [string]: string,
};

export type CraftingBenchOptionsProps = {
  primary: number,
  order: number,
  master_level: number,
  name: string,
  crafting_bench_custom_action: number,
  sockets: number,
  socket_colours: string,
  links: number,
  item_quantity: number,
  unknown1: string,
  npc_master_key: number,
  mods_key: ?number,
  npc_master: {
    row: number,
    npc: {
      name: string,
      short_name: string,
    },
  },
  costs: {
    amount: number,
    base_item_type: BaseItemTypeProps,
  }[],
  mod: ?ModProps,
  item_classes: ItemClassProps[],
};
