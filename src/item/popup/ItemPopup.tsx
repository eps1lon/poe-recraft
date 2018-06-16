// ts needs this for declarations otherwise "using private name React.*"
// ts is only emitting this import for declaration files and stripping it
// for regular files
// tslint:disable-next-line: no-unused-variable
import * as React from 'react';

import ItemPopupIntl from './ItemPopupIntl';
import { Messages as ApiPopupMessages } from './ApiPopup';
import withIntlProvider from './withIntlProvider';

export { Rarity } from './ItemPopupIntl';
export interface Messages extends ApiPopupMessages {
  // poe.baseitemtypes.{id}.name
  // poe.baseitemtypes.{id}.inflection?
  // poe.mods.{id}.name
  'poe.api.Quality': string;
  'poe.api.Armour': string;
  'poe.api.Energy Shield': string;
  'poe.api.Evasion': string;
  'poe.api.Block': string;
  'poe.api.Physical Damage': string;
  'poe.api.Elemental Damage': string;
  'poe.api.Chaos Damage': string;
  'poe.api.Weapon Range': string;
  'poe.api.Critical Strike Chance': string;
  'poe.api.Attacks per Second': string;
  'poe.api.Level': string;
  'poe.api.Dex': string;
  'poe.api.Int': string;
  'poe.api.Str': string;
}
export type Props = PropsType<typeof ItemPopupIntl>;

const ItemPopup = withIntlProvider<Props, Messages>(ItemPopupIntl);
export default ItemPopup;
