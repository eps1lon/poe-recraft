import { createTables } from '../../../../__fixtures__/util';

const tables = createTables();

const { items } = tables;

it('should upgrade rarity normal->magic-rare', () => {
  const normal = items.fromPrimary(1650);

  const magic = normal.rarity.upgrade();

  expect(magic).not.toBe(normal);
  expect(magic.rarity.toString()).toBe('magic');

  const rare = magic.rarity.upgrade();

  expect(rare).not.toBe(magic);
  expect(rare.rarity.toString()).toBe('rare');

  const also_rare = rare.rarity.upgrade();

  expect(also_rare).toBe(rare);
});

it('should have a string represantation of its rarity', () => {
  const item = items.fromPrimary(1650);

  expect(item.rarity.toString()).toEqual('normal');
  expect(item.rarity.set('magic').rarity.toString()).toEqual('magic');
  expect(item.rarity.set('rare').rarity.toString()).toEqual('rare');
  expect(item.rarity.set('unique').rarity.toString()).toEqual('unique');
  expect(item.rarity.set('showcase').rarity.toString()).toEqual('showcase');
});

it('should always have rarity', () => {
  expect(items.fromPrimary(1650).rarity.any()).toBe(true);
});
