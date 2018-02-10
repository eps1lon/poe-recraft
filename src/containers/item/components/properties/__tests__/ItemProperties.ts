import { createTables } from '../../../../../__fixtures__/util';

const tables = createTables();

const { items } = tables;

it('shouldnt have any if there is no property builder', () => {
  const amulet = items.fromName('Agate Amulet');

  expect(amulet.properties.any()).toBe(false);
  expect(amulet.properties.list()).toEqual({});
});

it('should have some for armour', () => {
  const boots = items.fromName('Iron Greaves');

  expect(boots.properties.any()).toBe(true);
  expect(boots.properties.list()).not.toEqual({});
});

it.skip('should have some for weapons', () => {
  const weapon = items.fromName('Skinning Knife');

  expect(weapon.properties.any()).toBe(true);
  expect(weapon.properties.list()).not.toEqual({});
});
