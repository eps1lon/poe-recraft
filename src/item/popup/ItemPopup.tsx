// ts needs this for declarations otherwise "using private name React.*"
// ts is only emitting this import for declaration files and stripping it
// for regular files
// tslint:disable-next-line: asd
import * as React from 'react';

import ItemPopupIntl from './ItemPopupIntl';
import { Messages as ApiPopupMessages } from './ApiPopup';
import withIntlProvider from './withIntlProvider';

export { Rarity } from './ItemPopupIntl';
export interface Messages extends ApiPopupMessages {
  // poe.baseitemtypes.{id}.name
  // poe.baseitemtypes.{id}.inflection?
  // poe.mods.{id}.name
  'poe.popup.quality': string;
  'poe.popup.armour': string;
  'poe.popup.energy_shield': string;
  'poe.popup.evasion': string;
  'poe.popup.block': string;
  'poe.popup.physical_damage': string;
  'poe.popup.elemental_damage': string;
  'poe.popup.chaos_damage': string;
  'poe.popup.range': string;
  'poe.popup.crit': string;
  'poe.popup.aps': string;
  'poe.popup.requirements.level': string;
  'poe.popup.requirements.dex': string;
  'poe.popup.requirements.int': string;
  'poe.popup.requirements.str': string;
}
export type Props = PropsType<typeof ItemPopupIntl>;

const ItemPopup = withIntlProvider<Props, Messages>(ItemPopupIntl);
export default ItemPopup;
