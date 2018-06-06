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

export type ItemClassId =
  | 'LifeFlask'
  | 'ManaFlask'
  | 'HybridFlask'
  | 'Currency'
  | 'Amulet'
  | 'Ring'
  | 'Claw'
  | 'Dagger'
  | 'Wand'
  | 'One Hand Sword'
  | 'Thrusting One Hand Sword'
  | 'One Hand Axe'
  | 'One Hand Mace'
  | 'Bow'
  | 'Staff'
  | 'Two Hand Sword'
  | 'Two Hand Axe'
  | 'Two Hand Mace'
  | 'Active Skill Gem'
  | 'Support Skill Gem'
  | 'Quiver'
  | 'Belt'
  | 'Gloves'
  | 'Boots'
  | 'Body Armour'
  | 'Helmet'
  | 'Shield'
  | 'SmallRelic'
  | 'MediumRelic'
  | 'LargeRelic'
  | 'StackableCurrency'
  | 'QuestItem'
  | 'Sceptre'
  | 'UtilityFlask'
  | 'UtilityFlaskCritical'
  | 'Map'
  | 'Unarmed'
  | 'FishingRod'
  | 'MapFragment'
  | 'HideoutDoodad'
  | 'Microtransaction'
  | 'Jewel'
  | 'DivinationCard'
  | 'LabyrinthItem'
  | 'LabyrinthTrinket'
  | 'LabyrinthMapItem'
  | 'MiscMapItem'
  | 'Leaguestone'
  | 'PantheonSoul'
  | 'UniqueFragment'
  | 'AbyssJewel'
  | 'IncursionItem';

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
}
