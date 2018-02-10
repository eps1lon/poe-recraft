import { createTables } from '../../../../__fixtures__/util';

const tables = createTables();
const { items } = tables;

it('should have no more than 4 on boots, gloves, helmets', () => {
  expect(items.fromName('Bone Helmet').sockets.max()).toBe(4);
  expect(items.fromName('Iron Gauntlets').sockets.max()).toBe(4);
  expect(items.fromName('Iron Greaves').sockets.max()).toBe(4);
  expect(items.fromName('Fishing Rod').sockets.max()).toBe(4);
});

it('should have no more than 3 on shields and 1H', () => {
  expect(items.fromName('Rusted Sword').sockets.max()).toBe(3);
  expect(items.fromName('Siege Axe').sockets.max()).toBe(3);
  expect(items.fromName('Estoc').sockets.max()).toBe(3);
  expect(items.fromName('War Buckler').sockets.max()).toBe(3);
  expect(items.fromName('Driftwood Wand').sockets.max()).toBe(3);
});

it('should have no sockets on jewelry', () => {
  expect(items.fromName('Amber Amulet').sockets.max()).toBe(0);
});

it('should have no more than 6 on armour and 2H', () => {
  expect(items.fromName('Plate Vest').sockets.max()).toBe(6);
  expect(items.fromName('Keyblade').sockets.max()).toBe(6);
  expect(items.fromName('Judgement Staff').sockets.max()).toBe(6);
});

it('should check level restrictions', () => {
  const staff = items.fromName('Judgement Staff');

  expect(staff.setProperty('item_level', 1).sockets.max()).toBe(2);
  expect(staff.setProperty('item_level', 2).sockets.max()).toBe(3);
  expect(staff.setProperty('item_level', 25).sockets.max()).toBe(4);
  expect(staff.setProperty('item_level', 35).sockets.max()).toBe(5);
  expect(staff.setProperty('item_level', 67).sockets.max()).toBe(6);
});

it('should check tags', () => {
  expect(items.fromName('Gnarled Branch').sockets.max()).toBe(3);
  expect(items.fromName('Unset Ring').sockets.max()).toBe(1);
  expect(items.fromName('Black Maw Talisman').sockets.max()).toBe(1);
});

it('should have not have any currently', () => {
  expect(items.fromName('Judgement Staff').sockets.any()).toBe(false);
});
