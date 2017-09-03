import t from "flow-runtime";
export const TagProps = t.type("TagProps", t.object(t.property("primary", t.number()), t.property("id", t.string())));

export const ModTypeProps = t.type("ModTypeProps", t.object(t.property("primary", t.number())));

export const SpawnWeightProps = t.type("SpawnWeightProps", t.object(t.property("value", t.number()), t.property("tag", TagProps)));

export const StatProps = t.type("StatProps", t.object(t.property("primary", t.number()), t.property("id", t.string()), t.property("text", t.string())));

export const ModProps = t.type("ModProps", t.object(t.property("primary", t.number()), t.property("id", t.string()), t.property("level", t.number()), t.property("domain", t.number()), t.property("name", t.string()), t.property("correct_group", t.string()), t.property("generation_type", t.number()), t.property("stat1_min", t.number()), t.property("stat1_max", t.number()), t.property("stat2_min", t.number()), t.property("stat2_max", t.number()), t.property("stat3_min", t.number()), t.property("stat3_max", t.number()), t.property("stat4_min", t.number()), t.property("stat4_max", t.number()), t.property("stat5_min", t.number()), t.property("stat5_max", t.number()), t.property("mod_type", ModTypeProps), t.property("spawn_weights", t.array(SpawnWeightProps)), t.property("stats", t.array(StatProps)), t.property("tags", t.array(TagProps))));

export const WeaponTypeProps = t.type("WeaponTypeProps", t.object(t.property("critical", t.number()), t.property("speed", t.number()), t.property("damage_min", t.number()), t.property("damage_max", t.number()), t.property("range_max", t.number())));

export const AttributeRequirementProps = t.type("AttributeRequirementProps", t.object(t.property("req_str", t.number()), t.property("req_dex", t.number()), t.property("req_int", t.number())));

export const ArmourProps = t.type("ArmourProps", t.object(t.property("armour", t.number()), t.property("evasion", t.number()), t.property("energy_shield", t.number())));

export const ItemClassProps = t.type("ItemClassProps", t.object(t.property("primary", t.number()), t.property("name", t.string())));

export const BaseItemTypeProps = t.type("BaseItemTypeProps", t.object(t.property("primary", t.number()), t.property("name", t.string()), t.property("width", t.number()), t.property("height", t.number()), t.property("drop_level", t.number()), t.property("inherits_from", t.string()), t.property("weapon_type", t.nullable(WeaponTypeProps)), t.property("component_attribute_requirement", t.nullable(AttributeRequirementProps)), t.property("component_armour", t.nullable(ArmourProps)), t.property("implicit_mods", t.array(ModProps)), t.property("item_class", ItemClassProps), t.property("tags", t.array(TagProps))));

export const MetaDataProps = t.type("MetaDataProps", t.object(t.property("extends", t.string()), t.property("inheritance", t.string()), t.property("tags", t.array(TagProps)), t.property("AttributeRequirements", t.object(t.property("dexterity_requirement", t.array(t.string())), t.property("intelligence_requirement", t.array(t.string())), t.property("strength_requirement", t.array(t.string()))), true), t.property("Base", t.object(t.property("tag", t.array(t.string()))), true), t.property("Quality", t.object(t.property("max_quality", t.array(t.string()))), true), t.property("Sockets", t.object(t.property("socket_info", t.string()))), t.property("Weapon", t.object(t.property("accuracy_rating", t.array(t.string()), true), t.property("critical_chance", t.array(t.string()), true), t.property("minimum_attack_distance", t.array(t.string()), true), t.property("maximum_attack_distance", t.array(t.string()), true), t.property("minimum_damage", t.array(t.string()), true), t.property("maximum_damage", t.array(t.string()), true), t.property("weapon_speed", t.array(t.string()), true), t.property("weapon_class", t.array(t.string()), true)), true), t.indexer("key", t.string(), t.object(t.indexer("key", t.string(), t.array(t.string()))))));

export const MetaDataMap = t.type("MetaDataMap", t.object(t.indexer("key", t.mixed(), MetaDataProps)));

export const GroupLocalization = t.type("GroupLocalization", t.object(t.indexer("key", t.string(), t.string())));

export const CraftingBenchOptionsProps = t.type("CraftingBenchOptionsProps", t.object(t.property("primary", t.number()), t.property("order", t.number()), t.property("master_level", t.number()), t.property("name", t.string()), t.property("crafting_bench_custom_action", t.number()), t.property("sockets", t.number()), t.property("socket_colours", t.string()), t.property("links", t.number()), t.property("item_quantity", t.number()), t.property("unknown1", t.string()), t.property("npc_master_key", t.number()), t.property("mods_key", t.nullable(t.number())), t.property("npc_master", t.object(t.property("row", t.number()), t.property("npc", t.object(t.property("name", t.string()), t.property("short_name", t.string()))))), t.property("costs", t.array(t.object(t.property("amount", t.number()), t.property("base_item_type", BaseItemTypeProps)))), t.property("mod", t.nullable(ModProps)), t.property("item_classes", t.array(ItemClassProps))));