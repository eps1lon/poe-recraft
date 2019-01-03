import { createTables } from '../../../../__fixtures__/util';

const tables = createTables();
const { items, mods } = tables;

const ofBrute = mods.fromId('Strength1');
const sturdy = mods.fromId('LocalBaseArmourAndEvasionRating5');

it('should generate the name lines like ingame', () => {
  const normal = items.fromName('Iron Greaves');

  expect(normal.name.lines()).toEqual(['Iron Greaves']);

  const magic = normal.rarity.set('magic');

  expect(magic.name.lines()).toEqual(['Iron Greaves']);
  expect(magic.addMod(ofBrute).name.lines()).toEqual([
    'Iron Greaves of the Brute',
  ]);
  expect(
    magic
      .addMod(ofBrute)
      .addMod(sturdy)
      .name.lines(),
  ).toEqual(['Sturdy Iron Greaves of the Brute']);

  const rare = normal.rarity.set('rare');

  expect(rare.name.lines()).toEqual(['Random Name', 'Iron Greaves']);

  const unique = normal.rarity.set('unique');

  expect(unique.name.lines()).toEqual(['TODO unique name?', 'Iron Greaves']);
});

it('should always have a name', () => {
  expect(items.fromName('Iron Greaves').name.any()).toBe(true);
});

it('should prefix the baseitem name for normal items with quality', () => {
  const item = items.fromName('Iron Greaves');
  // pre
  expect(item.name.lines()).toEqual(['Iron Greaves']);
  // post
  expect(item.properties.setQuality(5).name.lines()).toEqual([
    'Superior Iron Greaves',
  ]);
});
