// @flow
type Application = {
  classification: Array<string | string[]>,
  type: 'flat' | 'inc' | 'more',
};

const applications: { [string]: Application } = {
  accuracy_rating: {
    classification: [],
    type: 'flat',
  },
  'accuracy_rating_+%': {
    classification: [],
    type: 'inc',
  },
  additional_all_attributes: {
    classification: [],
    type: 'flat',
  },
  'additional_block_%': {
    classification: [],
    type: 'flat',
  },
  'additional_block_chance_against_projectiles_%': {
    classification: [],
    type: 'flat',
  },
  additional_dexterity: {
    classification: [],
    type: 'flat',
  },
  additional_intelligence: {
    classification: [],
    type: 'flat',
  },
  'additional_maximum_all_resistances_%': {
    classification: [],
    type: 'flat',
  },
  'additional_physical_damage_reduction_%_during_flask_effect': {
    classification: [],
    type: 'flat',
  },
  additional_strength: {
    classification: [],
    type: 'flat',
  },
  arrow_base_number_of_targets_to_pierce: {
    classification: [],
    type: 'flat',
  },
  'attack_and_cast_speed_+%': {
    classification: [],
    type: 'inc',
  },
  'attack_and_cast_speed_+%_during_flask_effect': {
    classification: [],
    type: 'flat',
  },
  'attack_damage_+%': {
    classification: [],
    type: 'inc',
  },
  attack_maximum_added_chaos_damage: {
    classification: [],
    type: 'flat',
  },
  attack_maximum_added_cold_damage: {
    classification: [],
    type: 'flat',
  },
  attack_maximum_added_fire_damage: {
    classification: [],
    type: 'flat',
  },
  attack_maximum_added_lightning_damage: {
    classification: [],
    type: 'flat',
  },
  attack_maximum_added_physical_damage: {
    classification: [],
    type: 'flat',
  },
  attack_minimum_added_chaos_damage: {
    classification: [],
    type: 'flat',
  },
  attack_minimum_added_cold_damage: {
    classification: [],
    type: 'flat',
  },
  attack_minimum_added_fire_damage: {
    classification: [],
    type: 'flat',
  },
  attack_minimum_added_lightning_damage: {
    classification: [],
    type: 'flat',
  },
  attack_minimum_added_physical_damage: {
    classification: [],
    type: 'flat',
  },
  attack_projectiles_return: {
    classification: [],
    type: 'flat',
  },
  'attack_speed_+%': {
    classification: [],
    type: 'inc',
  },
  'avoid_all_elemental_status_%': {
    classification: [],
    type: 'flat',
  },
  'avoid_cold_damage_%': {
    classification: [],
    type: 'flat',
  },
  'avoid_fire_damage_%': {
    classification: [],
    type: 'flat',
  },
  'avoid_knockback_%': {
    classification: [],
    type: 'flat',
  },
  'avoid_lightning_damage_%': {
    classification: [],
    type: 'flat',
  },
  'base_additional_physical_damage_reduction_%': {
    classification: [],
    type: 'flat',
  },
  'base_avoid_chill_%': {
    classification: [],
    type: 'flat',
  },
  'base_avoid_freeze_%': {
    classification: [],
    type: 'flat',
  },
  'base_avoid_ignite_%': {
    classification: [],
    type: 'flat',
  },
  'base_avoid_shock_%': {
    classification: [],
    type: 'flat',
  },
  'base_avoid_stun_%': {
    classification: [],
    type: 'flat',
  },
  'base_bleed_duration_+%': {
    classification: [],
    type: 'inc',
  },
  'base_cast_speed_+%': {
    classification: [],
    type: 'inc',
  },
  'base_chance_to_dodge_%': {
    classification: [],
    type: 'flat',
  },
  'base_chance_to_dodge_spells_%': {
    classification: [],
    type: 'flat',
  },
  'base_chance_to_freeze_%': {
    classification: [],
    type: 'flat',
  },
  'base_chance_to_ignite_%': {
    classification: [],
    type: 'flat',
  },
  'base_chance_to_shock_%': {
    classification: [],
    type: 'flat',
  },
  'base_chaos_damage_resistance_%': {
    classification: [],
    type: 'flat',
  },
  'base_cold_damage_resistance_%': {
    classification: [],
    type: 'flat',
  },
  'base_critical_strike_multiplier_+': {
    classification: [],
    type: 'flat',
  },
  'base_curse_duration_+%': {
    classification: [],
    type: 'inc',
  },
  'base_damage_removed_from_mana_before_life_%': {
    classification: [],
    type: 'flat',
  },
  'base_energy_shield_regeneration_rate_per_minute_%': {
    classification: [],
    type: 'flat',
  },
  base_evasion_rating: {
    classification: [],
    type: 'flat',
  },
  'base_fire_damage_resistance_%': {
    classification: [],
    type: 'flat',
  },
  'base_item_found_quantity_+%': {
    classification: [],
    type: 'inc',
  },
  'base_item_found_rarity_+%': {
    classification: [],
    type: 'inc',
  },
  base_life_gain_per_target: {
    classification: [],
    type: 'flat',
  },
  base_life_gained_on_enemy_death: {
    classification: [],
    type: 'flat',
  },
  base_life_leech_from_chaos_damage_permyriad: {
    classification: [],
    type: 'flat',
  },
  base_life_leech_from_cold_damage_permyriad: {
    classification: [],
    type: 'flat',
  },
  base_life_leech_from_fire_damage_permyriad: {
    classification: [],
    type: 'flat',
  },
  base_life_leech_from_lightning_damage_permyriad: {
    classification: [],
    type: 'flat',
  },
  base_life_regeneration_rate_per_minute: {
    classification: [],
    type: 'flat',
  },
  'base_lightning_damage_resistance_%': {
    classification: [],
    type: 'flat',
  },
  base_mana_gained_on_enemy_death: {
    classification: [],
    type: 'flat',
  },
  'base_mana_reservation_+%': {
    classification: [],
    type: 'inc',
  },
  base_maximum_energy_shield: {
    classification: [],
    type: 'flat',
  },
  base_maximum_life: {
    classification: [],
    type: 'flat',
  },
  base_maximum_mana: {
    classification: [],
    type: 'flat',
  },
  'base_movement_velocity_+%': {
    classification: [],
    type: 'inc',
  },
  base_number_of_additional_arrows: {
    classification: [],
    type: 'flat',
  },
  base_number_of_essence_spirits_allowed: {
    classification: [],
    type: 'flat',
  },
  base_number_of_skeletons_allowed: {
    classification: [],
    type: 'flat',
  },
  base_number_of_spectres_allowed: {
    classification: [],
    type: 'flat',
  },
  base_number_of_zombies_allowed: {
    classification: [],
    type: 'flat',
  },
  'base_physical_damage_%_to_convert_to_cold': {
    classification: [],
    type: 'flat',
  },
  'base_physical_damage_%_to_convert_to_fire': {
    classification: [],
    type: 'flat',
  },
  'base_physical_damage_%_to_convert_to_lightning': {
    classification: [],
    type: 'flat',
  },
  base_physical_damage_reduction_rating: {
    classification: [],
    type: 'flat',
  },
  'base_poison_damage_+%': {
    classification: [],
    type: 'inc',
  },
  'base_poison_duration_+%': {
    classification: [],
    type: 'inc',
  },
  'base_projectile_speed_+%': {
    classification: [],
    type: 'inc',
  },
  'base_reduce_enemy_cold_resistance_%': {
    classification: [],
    type: 'flat',
  },
  'base_reduce_enemy_fire_resistance_%': {
    classification: [],
    type: 'flat',
  },
  'base_reduce_enemy_lightning_resistance_%': {
    classification: [],
    type: 'flat',
  },
  'base_resist_all_elements_%': {
    classification: [],
    type: 'flat',
  },
  'base_skill_area_of_effect_+%': {
    classification: [],
    type: 'inc',
  },
  'base_spell_block_%': {
    classification: [],
    type: 'flat',
  },
  'base_stun_duration_+%': {
    classification: [],
    type: 'inc',
  },
  'base_stun_recovery_+%': {
    classification: [],
    type: 'inc',
  },
  'base_stun_threshold_reduction_+%': {
    classification: [],
    type: 'inc',
  },
  'bleeding_damage_+%': {
    classification: [],
    type: 'inc',
  },
  'block_while_dual_wielding_%': {
    classification: [],
    type: 'flat',
  },
  'burn_damage_+%': {
    classification: [],
    type: 'inc',
  },
  can_catch_corrupted_fish: {
    classification: [],
    type: 'flat',
  },
  cannot_be_knocked_back: {
    classification: [],
    type: 'flat',
  },
  cannot_be_poisoned: {
    classification: [],
    type: 'flat',
  },
  cannot_have_life_leeched_from: {
    classification: [],
    type: 'flat',
  },
  'chaos_damage_+%': {
    classification: [],
    type: 'inc',
  },
  'chaos_damage_taken_over_time_+%': {
    classification: [],
    type: 'inc',
  },
  'chaos_resistance_+_while_using_flask': {
    classification: [],
    type: 'flat',
  },
  'charges_gained_+%': {
    classification: [],
    type: 'inc',
  },
  'chill_duration_+%': {
    classification: [],
    type: 'inc',
  },
  'cold_and_lightning_damage_resistance_%': {
    classification: [],
    type: 'flat',
  },
  'cold_damage_+%': {
    classification: [],
    type: 'inc',
  },
  'critical_strike_chance_+%': {
    classification: [],
    type: 'inc',
  },
  curse_on_hit_level_elemental_weakness: {
    classification: [],
    type: 'flat',
  },
  curse_on_hit_level_temporal_chains: {
    classification: [],
    type: 'flat',
  },
  curse_on_hit_level_vulnerability: {
    classification: [],
    type: 'flat',
  },
  'damage_+%': {
    classification: [],
    type: 'inc',
  },
  'damage_+%_during_flask_effect': {
    classification: [],
    type: 'flat',
  },
  'damage_over_time_+%': {
    classification: [],
    type: 'inc',
  },
  'damage_taken_goes_to_mana_%': {
    classification: [],
    type: 'flat',
  },
  deal_1000_chaos_damage_per_second_for_10_seconds_on_hit: {
    classification: [],
    type: 'flat',
  },
  'degen_effect_+%': {
    classification: [],
    type: 'inc',
  },
  dummy_stat_display_nothing: {
    classification: [],
    type: 'flat',
  },
  'elemental_damage_+%': {
    classification: [],
    type: 'inc',
  },
  'elemental_damage_with_attack_skills_+%': {
    classification: [],
    type: 'inc',
  },
  'elemental_penetration_%_during_flask_effect': {
    classification: [],
    type: 'flat',
  },
  'energy_shield_delay_-%': {
    classification: [],
    type: 'flat',
  },
  'essence_buff_elemental_damage_taken_+%': {
    classification: [],
    type: 'inc',
  },
  essence_buff_ground_fire_damage_to_deal_per_second: {
    classification: [],
    type: 'flat',
  },
  essence_buff_ground_fire_duration_ms: {
    classification: [],
    type: 'flat',
  },
  essence_display_drop_burning_ground_while_moving_fire_damage_per_second: {
    classification: [],
    type: 'flat',
  },
  'essence_display_elemental_damage_taken_while_not_moving_+%': {
    classification: [],
    type: 'inc',
  },
  'evasion_rating_+%': {
    classification: [],
    type: 'inc',
  },
  'fire_and_cold_damage_resistance_%': {
    classification: [],
    type: 'flat',
  },
  'fire_and_lightning_damage_resistance_%': {
    classification: [],
    type: 'flat',
  },
  'fire_damage_+%': {
    classification: [],
    type: 'inc',
  },
  'fish_quantity_+%': {
    classification: [],
    type: 'inc',
  },
  'fish_rarity_+%': {
    classification: [],
    type: 'inc',
  },
  fishing_hook_type: {
    classification: [],
    type: 'flat',
  },
  'fishing_line_strength_+%': {
    classification: [],
    type: 'inc',
  },
  fishing_lure_type: {
    classification: [],
    type: 'flat',
  },
  'fishing_pool_consumption_+%': {
    classification: [],
    type: 'inc',
  },
  'fishing_range_+%': {
    classification: [],
    type: 'inc',
  },
  'flask_charges_used_+%': {
    classification: [],
    type: 'inc',
  },
  'flask_duration_+%': {
    classification: [],
    type: 'inc',
  },
  'flask_life_recovery_rate_+%': {
    classification: [],
    type: 'inc',
  },
  'flask_mana_recovery_rate_+%': {
    classification: [],
    type: 'inc',
  },
  'fortify_effect_on_self_+%': {
    classification: [],
    type: 'inc',
  },
  'freeze_duration_+%': {
    classification: [],
    type: 'inc',
  },
  'gain_flask_charge_when_crit_%': {
    classification: [],
    type: 'flat',
  },
  gain_flask_charge_when_crit_amount: {
    classification: [],
    type: 'flat',
  },
  'gain_onslaught_for_3_seconds_%_chance_when_hit': {
    classification: [],
    type: 'flat',
  },
  'global_hit_causes_monster_flee_%': {
    classification: [],
    type: 'flat',
  },
  'global_reduce_enemy_block_%': {
    classification: [],
    type: 'flat',
  },
  'ignite_duration_+%': {
    classification: [],
    type: 'inc',
  },
  item_generation_can_have_multiple_crafted_mods: {
    classification: [],
    type: 'flat',
  },
  item_generation_cannot_change_prefixes: {
    classification: [],
    type: 'flat',
  },
  item_generation_cannot_change_suffixes: {
    classification: [],
    type: 'flat',
  },
  item_generation_cannot_roll_attack_affixes: {
    classification: [],
    type: 'flat',
  },
  item_generation_cannot_roll_caster_affixes: {
    classification: [],
    type: 'flat',
  },
  item_generation_local_maximum_mod_required_level_override: {
    classification: [],
    type: 'flat',
  },
  'item_rarity_+%_while_using_flask': {
    classification: [],
    type: 'flat',
  },
  'kill_enemy_on_hit_if_under_10%_life': {
    classification: [],
    type: 'flat',
  },
  life_gained_on_block: {
    classification: [],
    type: 'flat',
  },
  life_leech_from_physical_attack_damage_permyriad: {
    classification: [],
    type: 'flat',
  },
  'life_leech_speed_+%': {
    classification: [],
    type: 'inc',
  },
  'life_regeneration_rate_per_minute_%': {
    classification: [],
    type: 'flat',
  },
  'light_radius_+%': {
    classification: [],
    type: 'inc',
  },
  'lightning_damage_+%': {
    classification: [],
    type: 'inc',
  },
  local_accuracy_rating: {
    classification: [],
    type: 'flat',
  },
  'local_accuracy_rating_+%': {
    classification: [],
    type: 'inc',
  },
  'local_additional_block_chance_%': {
    classification: [],
    type: 'flat',
  },
  local_always_hit: {
    classification: [],
    type: 'flat',
  },
  'local_armour_and_energy_shield_+%': {
    classification: [],
    type: 'inc',
  },
  'local_armour_and_evasion_+%': {
    classification: ['local', ['armour', 'evasion']],
    type: 'inc',
  },
  'local_armour_and_evasion_and_energy_shield_+%': {
    classification: ['local', ['armour', 'evasion', 'energy_shield']],
    type: 'inc',
  },
  'local_attack_speed_+%': {
    classification: [],
    type: 'inc',
  },
  'local_attribute_requirements_+%': {
    classification: [],
    type: 'inc',
  },
  local_base_evasion_rating: {
    classification: ['local', 'evasion'],
    type: 'flat',
  },
  local_base_physical_damage_reduction_rating: {
    classification: ['local', 'armour'],
    type: 'flat',
  },
  'local_chance_to_bleed_on_hit_%': {
    classification: [],
    type: 'flat',
  },
  'local_chance_to_bleed_on_hit_25%': {
    classification: [],
    type: 'flat',
  },
  'local_critical_strike_chance_+%': {
    classification: [],
    type: 'inc',
  },
  'local_display_fire_burst_on_hit_%': {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_anger_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_clarity_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_conductivity_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_critical_weakness_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_determination_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_discipline_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_elemental_weakness_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_flammability_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_frostbite_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_grace_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_haste_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_hatred_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_projectile_weakness_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_purity_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_purity_of_cold_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_purity_of_fire_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_purity_of_lightning_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_temporal_chains_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_vitality_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_vulnerability_level: {
    classification: [],
    type: 'flat',
  },
  local_display_grants_skill_wrath_level: {
    classification: [],
    type: 'flat',
  },
  'local_display_socketed_gems_additional_critical_strike_chance_%': {
    classification: [],
    type: 'flat',
  },
  'local_display_socketed_gems_attack_and_cast_speed_+%_final': {
    classification: [],
    type: 'more',
  },
  'local_display_socketed_gems_damage_over_time_+%_final': {
    classification: [],
    type: 'more',
  },
  'local_display_socketed_gems_elemental_damage_+%_final': {
    classification: [],
    type: 'more',
  },
  local_display_socketed_gems_get_added_fire_damage_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_additional_accuracy_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_blood_magic_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_cast_on_crit_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_cast_when_stunned_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_elemental_proliferation_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_faster_cast_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_fork_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_increased_area_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_increased_critical_damage_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_life_leech_level: {
    classification: [],
    type: 'flat',
  },
  'local_display_socketed_gems_get_mana_multplier_%': {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_melee_splash_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_multistrike_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_stun_level: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_get_weapon_elemental_damage_level: {
    classification: [],
    type: 'flat',
  },
  'local_display_socketed_gems_have_%_chance_to_ignite_with_fire_damage': {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_maximum_added_fire_damage: {
    classification: [],
    type: 'flat',
  },
  local_display_socketed_gems_minimum_added_fire_damage: {
    classification: [],
    type: 'flat',
  },
  'local_display_socketed_gems_physical_damage_%_to_add_as_lightning': {
    classification: [],
    type: 'flat',
  },
  'local_display_socketed_non_curse_aura_gems_effect_+%': {
    classification: [],
    type: 'inc',
  },
  local_energy_shield: {
    classification: [],
    type: 'flat',
  },
  'local_energy_shield_+%': {
    classification: [],
    type: 'inc',
  },
  'local_evasion_and_energy_shield_+%': {
    classification: ['local', ['evasion', 'energy_shield']],
    type: 'inc',
  },
  'local_evasion_rating_+%': {
    classification: ['local', 'evasion'],
    type: 'inc',
  },
  local_item_drops_on_death_if_equipped_by_animate_armour: {
    classification: [],
    type: 'flat',
  },
  local_life_gain_per_target: {
    classification: [],
    type: 'flat',
  },
  local_life_leech_from_physical_damage_permyriad: {
    classification: [],
    type: 'flat',
  },
  local_mana_leech_from_physical_damage_permyriad: {
    classification: [],
    type: 'flat',
  },
  local_maximum_added_chaos_damage: {
    classification: [],
    type: 'flat',
  },
  local_maximum_added_cold_damage: {
    classification: [],
    type: 'flat',
  },
  local_maximum_added_fire_damage: {
    classification: [],
    type: 'flat',
  },
  local_maximum_added_lightning_damage: {
    classification: [],
    type: 'flat',
  },
  local_maximum_added_physical_damage: {
    classification: [],
    type: 'flat',
  },
  local_minimum_added_chaos_damage: {
    classification: [],
    type: 'flat',
  },
  local_minimum_added_cold_damage: {
    classification: [],
    type: 'flat',
  },
  local_minimum_added_fire_damage: {
    classification: [],
    type: 'flat',
  },
  local_minimum_added_lightning_damage: {
    classification: [],
    type: 'flat',
  },
  local_minimum_added_physical_damage: {
    classification: [],
    type: 'flat',
  },
  'local_physical_damage_+%': {
    classification: [],
    type: 'inc',
  },
  'local_physical_damage_reduction_rating_+%': {
    classification: ['local', 'armour'],
    type: 'inc',
  },
  'local_poison_on_hit_%': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_aura_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_bow_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_chaos_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_cold_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_fire_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_lightning_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_melee_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_minion_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_spell_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_support_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_support_gem_quality_+': {
    classification: [],
    type: 'flat',
  },
  'local_socketed_vaal_gem_level_+': {
    classification: [],
    type: 'flat',
  },
  'local_stun_threshold_reduction_+%': {
    classification: [],
    type: 'inc',
  },
  'local_weapon_range_+': {
    classification: [],
    type: 'flat',
  },
  'mana_%_gained_on_block': {
    classification: [],
    type: 'flat',
  },
  mana_gain_per_target: {
    classification: [],
    type: 'flat',
  },
  mana_gained_on_block: {
    classification: [],
    type: 'flat',
  },
  mana_leech_from_physical_attack_damage_permyriad: {
    classification: [],
    type: 'flat',
  },
  'mana_regeneration_rate_+%': {
    classification: [],
    type: 'inc',
  },
  'map_item_drop_quantity_+%': {
    classification: [],
    type: 'inc',
  },
  map_num_extra_invasion_bosses: {
    classification: [],
    type: 'flat',
  },
  map_set_league_category: {
    classification: [],
    type: 'flat',
  },
  max_endurance_charges: {
    classification: [],
    type: 'flat',
  },
  max_frenzy_charges: {
    classification: [],
    type: 'flat',
  },
  max_power_charges: {
    classification: [],
    type: 'flat',
  },
  maximum_added_cold_damage_per_frenzy_charge: {
    classification: [],
    type: 'flat',
  },
  maximum_added_fire_damage_if_blocked_recently: {
    classification: [],
    type: 'flat',
  },
  'maximum_energy_shield_+%': {
    classification: [],
    type: 'inc',
  },
  maximum_physical_damage_to_return_on_block: {
    classification: [],
    type: 'flat',
  },
  'mine_damage_+%': {
    classification: [],
    type: 'inc',
  },
  'mine_laying_speed_+%': {
    classification: [],
    type: 'inc',
  },
  minimum_added_cold_damage_per_frenzy_charge: {
    classification: [],
    type: 'flat',
  },
  minimum_added_fire_damage_if_blocked_recently: {
    classification: [],
    type: 'flat',
  },
  minimum_physical_damage_to_return_on_block: {
    classification: [],
    type: 'flat',
  },
  'minion_damage_+%': {
    classification: [],
    type: 'inc',
  },
  'minion_maximum_life_+%': {
    classification: [],
    type: 'inc',
  },
  'minion_movement_speed_+%': {
    classification: [],
    type: 'inc',
  },
  'monster_base_block_%': {
    classification: [],
    type: 'flat',
  },
  'movement_speed_+%_during_flask_effect': {
    classification: [],
    type: 'flat',
  },
  'movement_speed_+%_while_on_burning_chilled_shocked_ground': {
    classification: [],
    type: 'flat',
  },
  nearby_enemies_chilled_on_block: {
    classification: [],
    type: 'flat',
  },
  number_of_additional_curses_allowed: {
    classification: [],
    type: 'flat',
  },
  number_of_additional_traps_allowed: {
    classification: [],
    type: 'flat',
  },
  number_of_skeletons_allowed_per_2_old: {
    classification: [],
    type: 'flat',
  },
  old_do_not_use_base_life_leech_from_cold_damage_permyriad: {
    classification: [],
    type: 'flat',
  },
  old_do_not_use_base_life_leech_from_fire_damage_permyriad: {
    classification: [],
    type: 'flat',
  },
  old_do_not_use_base_life_leech_from_lightning_damage_permyriad: {
    classification: [],
    type: 'flat',
  },
  'old_do_not_use_life_leech_from_physical_damage_%': {
    classification: [],
    type: 'flat',
  },
  'old_do_not_use_local_life_leech_from_physical_damage_%': {
    classification: [],
    type: 'flat',
  },
  'old_do_not_use_local_mana_leech_from_physical_damage_%': {
    classification: [],
    type: 'flat',
  },
  'old_do_not_use_mana_leech_from_physical_damage_%': {
    classification: [],
    type: 'flat',
  },
  'physical_attack_damage_taken_+': {
    classification: [],
    type: 'flat',
  },
  'physical_damage_%_to_add_as_fire': {
    classification: [],
    type: 'flat',
  },
  'physical_damage_+%': {
    classification: [],
    type: 'inc',
  },
  'physical_damage_reduction_rating_+%': {
    classification: [],
    type: 'inc',
  },
  'physical_damage_taken_%_as_cold': {
    classification: [],
    type: 'flat',
  },
  'physical_damage_taken_%_as_fire': {
    classification: [],
    type: 'flat',
  },
  physical_damage_to_return_to_melee_attacker: {
    classification: [],
    type: 'flat',
  },
  'power_charge_on_block_%_chance': {
    classification: [],
    type: 'flat',
  },
  'power_frenzy_or_endurance_charge_on_kill_%': {
    classification: [],
    type: 'flat',
  },
  projectile_base_number_of_targets_to_pierce: {
    classification: [],
    type: 'flat',
  },
  quiver_projectiles_pierce_1_additional_target: {
    classification: [],
    type: 'flat',
  },
  quiver_projectiles_pierce_2_additional_targets: {
    classification: [],
    type: 'flat',
  },
  'recover_10%_of_maximum_mana_on_skill_use_%': {
    classification: [],
    type: 'flat',
  },
  'reflect_damage_taken_+%': {
    classification: [],
    type: 'inc',
  },
  'shock_duration_+%': {
    classification: [],
    type: 'inc',
  },
  'skill_effect_duration_+%': {
    classification: [],
    type: 'inc',
  },
  'skill_mana_cost_+': {
    classification: [],
    type: 'flat',
  },
  'spell_critical_strike_chance_+%': {
    classification: [],
    type: 'inc',
  },
  'spell_damage_+%': {
    classification: [],
    type: 'inc',
  },
  spell_maximum_added_cold_damage: {
    classification: [],
    type: 'flat',
  },
  spell_maximum_added_fire_damage: {
    classification: [],
    type: 'flat',
  },
  spell_maximum_added_lightning_damage: {
    classification: [],
    type: 'flat',
  },
  spell_minimum_added_cold_damage: {
    classification: [],
    type: 'flat',
  },
  spell_minimum_added_fire_damage: {
    classification: [],
    type: 'flat',
  },
  spell_minimum_added_lightning_damage: {
    classification: [],
    type: 'flat',
  },
  'trap_damage_+%': {
    classification: [],
    type: 'inc',
  },
  'trap_throwing_speed_+%': {
    classification: [],
    type: 'inc',
  },
  'unique_facebreaker_unarmed_physical_damage_+%_final': {
    classification: [],
    type: 'more',
  },
};

export default applications;
