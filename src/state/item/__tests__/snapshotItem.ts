// tslint:disable:no-var-requires
import { createItems, createMods } from 'poe-mods';
import snapshotItem from '../snapshotItem';

const messages = {
  baseitemtypes: require('poe-i18n/locale-data/en/BaseItemTypes.json')
};
const descriptions = {
  stat_descriptions: require('poe-i18n/locale-data/en/stat_descriptions.json')
};
const items = createItems(require('poe-mods/data/items.json'));
const mods = createMods(require('poe-mods/data/mods.json'));

it('matches weapons', () => {
  const weapon = items
    .fromName('Platinum Kris')
    .rarity.set('rare')
    .addMod(mods.fromId('LocalIncreasedPhysicalDamagePercent7'))
    .addMod(mods.fromId('LocalIncreasedAttackSpeed6'))
    .addMod(mods.fromId('LocalAddedChaosDamage1'))
    .setProperty('corrupted', true);
  expect(snapshotItem(weapon, descriptions, messages)).toMatchSnapshot(
    'weapon'
  );
});
