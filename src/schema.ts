export type Tag = string;

export interface ModTypeProps {
  primary: number;
}

export interface SpawnWeightProps {
  value: number;
  tag: Tag;
}

export interface StatProps {
  id: string;
}

export interface ModProps {
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
  tags: Tag[];
}

export interface WeaponTypeProps {
  critical: number;
  speed: number;
  // phys
  damage_min: number;
  damage_max: number;
  range_max: number;
}

export interface AttributeRequirementProps {
  req_str: number;
  req_dex: number;
  req_int: number;
}

export interface ArmourProps {
  armour: number;
  evasion: number;
  energy_shield: number;
}

export interface ShieldTypeProps {
  block: number;
}

export interface BaseItemTypeProps {
  id: string;
  name: string;
  width: number;
  height: number;
  drop_level: number;
  inherits_from: string;
  weapon_type?: WeaponTypeProps;
  component_attribute_requirement?: AttributeRequirementProps;
  component_armour?: ArmourProps;
  shield_type?: ShieldTypeProps;
  implicit_mods: ModProps[];
  item_class: string;
  tags: Tag[];
}

export interface CraftingBenchOptionsProps {
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
  costs: Array<{
    amount: number;
    base_item_type: BaseItemTypeProps;
  }>;
  mod?: ModProps;
  item_classes: string[];
}

export interface WorldAreaProps {
  id: string;
  name: string;
  area_level: number;
  tags: Tag[];
  area_type_tags: Tag[];
  mods: ModProps[];
}

export interface AtlasNodeProps {
  primary: number;
  x: number;
  y: number;
  adjacent: number[];
  world_area: WorldAreaProps;
}

export interface EssenceProps {
  tier: number;
  base_item_type: BaseItemTypeProps;
  essence_type: {
    id: string;
    essence_type: number;
    is_corrupted_essence: boolean;
  };
  is_screaming: boolean;
  item_level_restriction: number;
  quiver_mods_key: string;
  amulet1_mods_key: string;
  amulet2_mods_key: string;
  ring_mods_key: string;
  belt1_mods_key: string;
  belt2_mods_key: string;
  belt3_mods_key: string;
  gloves1_mods_key: string;
  boots1_mods_key: string;
  body_armour1_mods_key: string;
  helmet1_mods_key: string;
  shield1_mods_key: string;
  shield2_mods_key: string;
  boots3_mods_key: string;
  ranged_mods_key: string;
  helmet2_mods_key: string;
  body_armour2_mods_key: string;
  boots2_mods_key: string;
  gloves2_mods_key: string;
  bow_mods_key: string;
  wand_mods_key: string;
  '2_hand_mods_key1': string;
  '2_hand_mods_key2': string;
  '2_hand_mods_key3': string;
  '2_hand_mods_key4': string;
  '2_hand_mods_key5': string;
  '1_hand_mods_key1': string;
  '1_hand_mods_key2': string;
  '1_hand_mods_key3': string;
  '1_hand_mods_key4': string;
  '1_hand_mods_key5': string;
  '1_hand_mods_key6': string;
  '1_hand_mods_key7': string;
  '1_hand_mods_key8': string;
  mods_key1: string;
  mods_key2: string;
  mods_key13: string;
  mods_key14: string;
  mods_key15: string;
  mods_key41: string;
  mods_key43: string;
}
