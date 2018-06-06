import { createTables } from '../../../__fixtures__/util';
import IncursionTempleMods from '../IncursionTempleMods';
import { Item } from '../../../containers/';

const { items, mods } = createTables();

const generator = IncursionTempleMods.build(mods.all());

test('spawnweight is equal for every mod', () => {
  const item = items.fromName('Iron Greaves');
  const mod = generator.mods[0];
  expect(generator.spawnweightFor(mod, item)).toEqual(1000);
});

it('has only mods for the itemclasses described in snapshots', () => {
  // admittedly the rarity is mainly to improve test coverage
  const flask = items.fromName('Divine Life Flask').rarity.set('magic');
  expect(generator.modsFor(flask)).toHaveLength(0);
});

describe('snapshots', () => {
  const snapshotTest = (message: string, item: Item) => {
    it(`matches snapshots of ${message}`, () => {
      const details = generator.modsFor(item, ['domain_full']);
      // short snapshot
      expect(details.map(({ mod }) => mod.props.id)).toMatchSnapshot();
      // exhaustive snapshot
      expect(
        details.map(({ mod, ...rest }) => ({
          mod: mod.props.id,
          ...rest,
        })),
      ).toMatchSnapshot();
    });
  };

  snapshotTest('helmets', items.fromName('Hubris Circlet'));
  snapshotTest('boots', items.fromName('Iron Greaves'));
  snapshotTest('gloves', items.fromName('Fishscale Gauntlets'));
  snapshotTest('body armour', items.fromName('Crypt Armour'));
  snapshotTest('shield', items.fromName('Rawhide Tower Shield'));
  snapshotTest('daggers', items.fromName('Platinum Kris'));
  snapshotTest('1h poisoners', items.fromName('Vaal Rapier'));
  snapshotTest('1h bleed', items.fromName('Siege Axe'));
  snapshotTest('sceptres', items.fromName('Opal Sceptre'));
  snapshotTest('2h bleed', items.fromName('Solar Maul'));
  snapshotTest('2h poisoner', items.fromName('Tiger Sword'));
  snapshotTest('bows', items.fromName('Maraketh Bow'));
  snapshotTest('staves', items.fromName('Woodful Staff'));
  snapshotTest('amulets', items.fromName('Amber Amulet'));
  snapshotTest('rings', items.fromName('Sapphire Ring'));
  snapshotTest('belts', items.fromName('Studded Belt'));
});
