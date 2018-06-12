import { createItems } from 'poe-mods';
import snapshotItem from '../snapshotItem';
const item_props: any = 'poe-mods/data/items';

const messages = {
  baseitemtypes: require('poe-i18n/locale-data/en/BaseItemTypes.json')
};
const descriptions = {
  stat_descriptions: require('poe-i18n/locale-data/en/stat_descriptions.json')
};
const items = createItems(require('poe-mods/data/items.json'));

it('matches weapons', () => {
  const weapon = items.fromName('Platinum Kris');
  expect(snapshotItem(weapon, descriptions, messages)).toMatchSnapshot(
    'weapon'
  );
});
