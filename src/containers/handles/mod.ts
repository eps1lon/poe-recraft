import { Mod } from 'poe-mods';
import { Dispatch } from 'redux';

import { addMod, removeMod } from 'actions/item';

export type ModHandles = {
  onAddMod: (mod: Mod) => any;
  onRemoveMod: (mod: Mod) => any;
};
export const modHandles = (dispatch: Dispatch) => {
  return {
    onAddMod: (mod: Mod) => dispatch(addMod(mod)),
    onRemoveMod: (mod: Mod) => dispatch(removeMod(mod))
  };
};

export default modHandles;
