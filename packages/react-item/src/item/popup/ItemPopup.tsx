import ItemPopupIntl from './ItemPopupIntl';
import { Messages as ApiPopupMessages } from './ApiPopup';
import withIntlProvider from './withIntlProvider';
import { PropsType } from '../../util/types';

export { Rarity } from './ItemPopupIntl';
// poe.baseitemtypes.{id}.name
// poe.baseitemtypes.{id}.inflection?
// poe.mods.{id}.name
export type Messages = Record<
  | 'poe.api.Quality'
  | 'poe.api.Armour'
  | 'poe.api.Energy Shield'
  | 'poe.api.Evasion'
  | 'poe.api.Evasion'
  | 'poe.api.Block'
  | 'poe.api.Physical Damage'
  | 'poe.api.Elemental Damage'
  | 'poe.api.Chaos Damage'
  | 'poe.api.Weapon Range'
  | 'poe.api.Critical Strike Chance'
  | 'poe.api.Attacks per Second'
  | 'poe.api.Level'
  | 'poe.api.Dex'
  | 'poe.api.Int'
  | 'poe.api.Str',
  string
> &
  ApiPopupMessages;

export type Props = PropsType<typeof ItemPopupIntl>;

const ItemPopup = withIntlProvider<Props, Messages>(ItemPopupIntl);
export default ItemPopup;
