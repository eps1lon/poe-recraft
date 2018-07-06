import { createSelector } from 'reselect';

import { State as PoeState } from './reducers';
import * as generators from './generators';
import { EssenceProps, ModProps } from './schema';
import { isRequested } from '../redux-api-middleware-reducer';

export { generators };

interface State {
  poe: PoeState;
}

export function apiEndpoint(endpoint: string): (state: State) => string {
  return (state: State) => `./${endpoint}`;
}

export const getMods: (state: State) => ModProps[] = createSelector(
  (state: State) => state.poe.mods.data,
  (mods: { [key: string]: ModProps }) => Object.values(mods)
);

export const getEssences = createSelector(
  (state: State) => state.poe.mods.data,
  (state: State) => state.poe.essences.data,
  (mods, essences) =>
    essences.map(essence => {
      return {
        ...essence,
        // mods[undefined] = undefined
        // easier to force ts here
        // display
        display_wand_mod: mods[essence.display_wand_mods_key!],
        display_bow_mod: mods[essence.display_bow_mods_key!],
        display_amulet_mod: mods[essence.display_amulet_mods_key!],
        display_ring_mod: mods[essence.display_ring_mods_key!],
        display_belt_mod: mods[essence.display_belt_mods_key!],
        display_gloves_mod: mods[essence.display_gloves_mods_key!],
        display_boots_mod: mods[essence.display_boots_mods_key!],
        display_body_armour_mod: mods[essence.display_body_armour_mods_key!],
        display_helmet_mod: mods[essence.display_helmet_mods_key!],
        display_shield_mod: mods[essence.display_shield_mods_key!],
        display_weapon_mod: mods[essence.display_weapon_mods_key!],
        display_melee_weapon_mod: mods[essence.display_melee_weapon_mods_key!],
        display_1_hand_weapon_mod:
          mods[essence.display_1_hand_weapon_mods_key!],
        display_2_hand_weapon_mod:
          mods[essence.display_2_hand_weapon_mods_key!],
        display_2_hand_melee_weapon_mod:
          mods[essence.display_2_hand_melee_weapon_mods_key!],
        display_armour_mod: mods[essence.display_armour_mods_key!],
        display_ranged_mod: mods[essence.display_ranged_mods_key!],
        display_item_mod: mods[essence.display_item_mods_key!],
        display_jewellry_mod: mods[essence.display_jewellry_mods_key!],
        // applied
        quiver_mod: mods[essence.quiver_mods_key!],
        helmet_mod: mods[essence.helmet_mods_key!],
        body_armour_mod: mods[essence.body_armour_mods_key!],
        boots_mod: mods[essence.boots_mods_key!],
        gloves_mod: mods[essence.gloves_mods_key!],
        bow_mod: mods[essence.bow_mods_key!],
        staff_mod: mods[essence.staff_mods_key!],
        two_hand_sword_mod: mods[essence.two_hand_sword_mods_key!],
        two_hand_axe_mod: mods[essence.two_hand_axe_mods_key!],
        two_hand_mace_mod: mods[essence.two_hand_mace_mods_key!],
        claw_mod: mods[essence.claw_mods_key!],
        dagger_mod: mods[essence.dagger_mods_key!],
        one_hand_sword_mod: mods[essence.one_hand_sword_mods_key!],
        one_hand_thrusting_sword_mod:
          mods[essence.one_hand_thrusting_sword_mods_key!],
        one_hand_axe_mod: mods[essence.one_hand_axe_mods_key!],
        one_hand_mace_mod: mods[essence.one_hand_mace_mods_key!],
        sceptre_mod: mods[essence.sceptre_mods_key!],
        belt_mod: mods[essence.belt_mods_key!],
        amulet_mod: mods[essence.amulet_mods_key!],
        ring_mod: mods[essence.ring_mods_key!],
        shield_mod: mods[essence.shield_mods_key!]
      };
    })
);

export const isBenchsLoading = (state: State) =>
  isRequested(state.poe.benchoptions);
export const isItemsLoading = (state: State) => isRequested(state.poe.items);
export const isModsLoading = (state: State) => isRequested(state.poe.mods);
