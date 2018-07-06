import { Mod } from 'poe-mods';
import { Dispatch } from 'redux';

import { item_actions } from 'state/item';

export interface ModHandles {
  onAddMod: (mod: Mod) => any;
  onRemoveMod: (mod: Mod) => any;
}
export const modHandles = (dispatch: Dispatch) => {
  return {
    onAddMod: (mod: Mod) => dispatch(item_actions.addMod(mod)),
    onRemoveMod: (mod: Mod) => dispatch(item_actions.removeMod(mod))
  };
};

export default modHandles;
