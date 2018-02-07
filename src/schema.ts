export type TagProps = {
  primary: number;
  id: string;
};

export type ModTypeProps = {
  primary: number;
};

export type SpawnWeightProps = {
  value: number;
  tag: TagProps;
};

export type StatProps = {
  primary: number;
  id: string;
};

export type ModProps = {
  primary: number;
  id: string;
  level: number;
  domain: number;
  name: string;
  correct_group: string;
  generation_type: number;
  stat1_min: number;
  stat1_max: number;
  stat2_min: number;
  stat2_max: number;
  stat3_min: number;
  stat3_max: number;
  stat4_min: number;
  stat4_max: number;
  stat5_min: number;
  stat5_max: number;
  mod_type: ModTypeProps;
  spawn_weights: SpawnWeightProps[];
  stats: StatProps[];
  tags: TagProps[];
};

export type WeaponTypeProps = {
  critical: number;
  speed: number;
  damage_min: number;
  damage_max: number;
  range_max: number;
};

export type AttributeRequirementProps = {
  req_str: number;
  req_dex: number;
  req_int: number;
};

export type ArmourProps = {
  armour: number;
  evasion: number;
  energy_shield: number;
};

export type ItemClassProps = {
  primary: number;
  name: string;
};

export type BaseItemTypeProps = {
  primary: number;
  name: string;
  width: number;
  height: number;
  drop_level: number;
  inherits_from: string;
  weapon_type?: WeaponTypeProps;
  component_attribute_requirement?: AttributeRequirementProps;
  component_armour?: ArmourProps;
  implicit_mods: ModProps[];
  item_class: ItemClassProps;
  tags: TagProps[];
};

export type CraftingBenchOptionsProps = {
  primary: number;
  master_level: number;
  name: string;
  crafting_bench_custom_action: number;
  sockets: number;
  socket_colours: string;
  links: number;
  item_quantity: number;
  npc_master_key: number;
  mods_key?: number;
  npc_master: {
    row: number;
    npc: {
      name: string;
      short_name: string;
    };
  };
  costs: {
    amount: number;
    base_item_type: BaseItemTypeProps;
  }[];
  mod?: ModProps;
  item_classes: ItemClassProps[];
};

export type WorldAreaProps = {
  primary: number;
  id: string;
  name: string;
  area_level: number;
  tags: TagProps[];
  area_type_tags: TagProps[];
  mods: ModProps[];
};

export type AtlasNodeProps = {
  primary: number;
  x: number;
  y: number;
  adjacent: number[];
  world_area: WorldAreaProps;
};
