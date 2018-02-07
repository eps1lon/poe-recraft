// @flow
import { createTables } from '../../../../__fixtures__/util';

const tables = createTables();
const { items } = tables;

it('should have no more than 4 on boots, gloves, helmets', () => {
  expect(items.fromPrimary(1544).sockets.max()).toBe(4); // Bone Helmet
  expect(items.fromPrimary(1708).sockets.max()).toBe(4); // Iron Gauntlets
  expect(items.fromPrimary(1650).sockets.max()).toBe(4); // Iron Greaves
  expect(items.fromPrimary(1312).sockets.max()).toBe(4); // Fishing Rod
});

it('should have no more than 3 on shields and 1H', () => {
  expect(items.fromPrimary(1099).sockets.max()).toBe(3); // Rusted Sword
  expect(items.fromPrimary(1092).sockets.max()).toBe(3); // Siege Axe
  expect(items.fromPrimary(1135).sockets.max()).toBe(3); // Estoc
  expect(items.fromPrimary(1412).sockets.max()).toBe(3); // War Buckler
  expect(items.fromPrimary(1005).sockets.max()).toBe(3); // Driftwood Wand
});

it('should have no sockets on jewelry', () => {
  expect(items.fromPrimary(1335).sockets.max()).toBe(0); // Amber Amulet
});

it('should have no more than 6 on armour and 2H', () => {
  expect(items.fromPrimary(1545).sockets.max()).toBe(6); // Plate West
  expect(items.fromPrimary(1004).sockets.max()).toBe(6); // Key Blade
  expect(items.fromPrimary(1244).sockets.max()).toBe(6); // Judgement Staff
});

it('should check level restrictions', () => {
  const staff = items.fromPrimary(1244);

  expect(staff.setProperty('item_level', 1).sockets.max()).toBe(2);
  expect(staff.setProperty('item_level', 2).sockets.max()).toBe(3);
  expect(staff.setProperty('item_level', 25).sockets.max()).toBe(4);
  expect(staff.setProperty('item_level', 35).sockets.max()).toBe(5);
  expect(staff.setProperty('item_level', 67).sockets.max()).toBe(6);
});

it('should check tags', () => {
  expect(items.fromPrimary(1224).sockets.max()).toBe(3); // Gnarled Staff
  expect(items.fromPrimary(1328).sockets.max()).toBe(1); // Unset
  expect(items.fromPrimary(1347).sockets.max()).toBe(1); // Black Maw Talisman
});

it('should have not have any currently', () => {
  expect(items.fromPrimary(1244).sockets.any()).toBe(false);
});
