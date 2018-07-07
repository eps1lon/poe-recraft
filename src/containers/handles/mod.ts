import { Mod } from 'poe-mods';
import { Dispatch } from 'redux';

import { item_actions } from 'state/actions';

export interface ModHandles {
  onAddMod: (mod: Mod) => void;
  onRemoveMod: (mod: Mod) => void;
}
export const modHandles = (dispatch: Dispatch): ModHandles => {
  return {
    onAddMod: (mod: Mod) => dispatch(item_actions.addMod(mod)),
    onRemoveMod: (mod: Mod) => dispatch(item_actions.removeMod(mod))
  };
};

export default modHandles;
