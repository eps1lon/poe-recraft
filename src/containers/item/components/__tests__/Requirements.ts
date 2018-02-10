import { createTables } from '../../../../__fixtures__/util';

const tables = createTables();
const { items, mods } = tables;

it('should consider its mods for its required level', () => {
  const greaves = items.fromName('Plated Greaves').rarity.set('rare');

  expect(greaves.requirements.level()).toBe(23);
  // 17 modrequirements.level
  expect(greaves.addMod(mods.fromId('Strength3')).requirements.level()).toBe(
    23,
  );
  // 26 mod
  expect(greaves.addMod(mods.fromId('Strength4')).requirements.level()).toBe(
    26,
  );
});

it('should have attr requirements', () => {
  const greaves = items.fromName('Plated Greaves');

  expect(greaves.requirements.list()).toEqual({
    level: 23,
    str: 44,
    dex: 0,
    int: 0,
  });
});

it('should have requirements if any are greater than zero', () => {
  expect(items.fromName('Cursed Crypt Map').requirements.any()).toBe(false);

  expect(items.fromName('Plated Greaves').requirements.any()).toBe(true);
});
