export type TagProps = string;

export interface ModTypeProps {
  primary: number;
}

export interface SpawnWeightProps {
  value: number;
  tag: TagProps;
}

export interface StatProps {
  id: string;
}

export type ModId = string;
export interface ModProps {
  id: ModId;
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
}

export interface WeaponTypeProps {
  critical: number;
  speed: number;
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

export type ItemClassProps = string;

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
  implicit_mods: ModProps[];
  item_class: ItemClassProps;
  tags: TagProps[];
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
  mods_key: number | undefined;
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
  mod: ModProps | undefined;
  item_classes: ItemClassProps[];
}

export interface WorldAreaProps {
  id: string;
  name: string;
  area_level: number;
  tags: TagProps[];
  area_type_tags: TagProps[];
  mods: ModProps[];
}

export interface AtlasNodeProps {
  x: number;
  y: number;
  adjacent: number[];
  world_area: WorldAreaProps;
}

export interface NormalizedEssenceProps {
  primary: number;
  tier: number;
  base_item_type: BaseItemTypeProps;
  essence_type: {
    id: string;
    essence_type: number;
    is_corrupted_essence: boolean;
  };
  item_level_restriction: number;
  quiver_mods_key?: ModId;
  amulet_mods_key?: ModId;
  ring_mods_key?: ModId;
  belt_mods_key?: ModId;
  shield_mods_key?: ModId;
  helmet_mods_key?: ModId;
  body_armour_mods_key?: ModId;
  boots_mods_key?: ModId;
  gloves_mods_key?: ModId;
  bow_mods_key?: ModId;
  wand_mods_key?: ModId;
  staff_mods_key?: ModId;
  two_hand_sword_mods_key?: ModId;
  two_hand_axe_mods_key?: ModId;
  two_hand_mace_mods_key?: ModId;
  claw_mods_key?: ModId;
  dagger_mods_key?: ModId;
  one_hand_sword_mods_key?: ModId;
  one_hand_thrusting_sword_mods_key?: ModId;
  one_hand_axe_mods_key?: ModId;
  one_hand_mace_mods_key?: ModId;
  sceptre_mods_key?: ModId;
  display_wand_mods_key?: ModId;
  display_bow_mods_key?: ModId;
  display_amulet_mods_key?: ModId;
  display_ring_mods_key?: ModId;
  display_belt_mods_key?: ModId;
  display_gloves_mods_key?: ModId;
  display_boots_mods_key?: ModId;
  display_body_armour_mods_key?: ModId;
  display_helmet_mods_key?: ModId;
  display_shield_mods_key?: ModId;
  display_weapon_mods_key?: ModId;
  display_melee_weapon_mods_key?: ModId;
  display_1_hand_weapon_mods_key?: ModId;
  display_2_hand_weapon_mods_key?: ModId;
  display_2_hand_melee_weapon_mods_key?: ModId;
  display_armour_mods_key?: ModId;
  display_ranged_mods_key?: ModId;
  display_item_mods_key?: ModId;
  display_jewellry_mods_key?: ModId;
}

export interface EssenceProps {
  primary: number;
  tier: number;
  base_item_type: BaseItemTypeProps;
  essence_type: {
    id: string;
    essence_type: number;
    is_corrupted_essence: boolean;
  };
  item_level_restriction: number;
  quiver_mod?: ModProps;
  amulet_mod?: ModProps;
  ring_mod?: ModProps;
  belt_mod?: ModProps;
  shield_mod?: ModProps;
  helmet_mod?: ModProps;
  body_armour_mod?: ModProps;
  boots_mod?: ModProps;
  gloves_mod?: ModProps;
  bow_mod?: ModProps;
  wand_mod?: ModProps;
  staff_mod?: ModProps;
  two_hand_sword_mod?: ModProps;
  two_hand_axe_mod?: ModProps;
  two_hand_mace_mod?: ModProps;
  claw_mod?: ModProps;
  dagger_mod?: ModProps;
  one_hand_sword_mod?: ModProps;
  one_hand_thrusting_sword_mod?: ModProps;
  one_hand_axe_mod?: ModProps;
  one_hand_mace_mod?: ModProps;
  sceptre_mod?: ModProps;
  display_wand_mod?: ModProps;
  display_bow_mod?: ModProps;
  display_amulet_mod?: ModProps;
  display_ring_mod?: ModProps;
  display_belt_mod?: ModProps;
  display_gloves_mod?: ModProps;
  display_boots_mod?: ModProps;
  display_body_armour_mod?: ModProps;
  display_helmet_mod?: ModProps;
  display_shield_mod?: ModProps;
  display_weapon_mod?: ModProps;
  display_melee_weapon_mod?: ModProps;
  display_1_hand_weapon_mod?: ModProps;
  display_2_hand_weapon_mod?: ModProps;
  display_2_hand_melee_weapon_mod?: ModProps;
  display_armour_mod?: ModProps;
  display_ranged_mod?: ModProps;
  display_item_mod?: ModProps;
  display_jewellry_mod?: ModProps;
}
