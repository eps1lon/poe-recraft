import { createTables } from '../../../../__fixtures__/util';

const tables = createTables();
const { items, mods } = tables;

it('should consider its mods for its required level', () => {
  const greaves = items.fromName('Plated Greaves').rarity.set('rare');

  expect(greaves.requirements.level().value).toBe(23);
  // 17 modrequirements.level
  expect(
    greaves.addMod(mods.fromId('Strength3')).requirements.level().value,
  ).toBe(23);
  // 26 mod
  expect(
    greaves.addMod(mods.fromId('Strength4')).requirements.level().value,
  ).toBe(26);
});

it('should have attr requirements', () => {
  const greaves = items.fromName('Plated Greaves');

  expect(greaves.requirements.list()).toMatchObject({
    level: { value: 23, augmented: false },
    str: { value: 44, augmented: false },
    dex: { value: 0, augmented: false },
    int: { value: 0, augmented: false },
  });
});

it('should have requirements if any are greater than zero', () => {
  expect(items.fromName('Cursed Crypt Map').requirements.any()).toBe(false);

  expect(items.fromName('Plated Greaves').requirements.any()).toBe(true);
});

it('is affected by stats', () => {
  const garb = items.fromName('Sacrificial Garb');

  // pre
  expect(garb.requirements.list()).toMatchObject({
    level: { value: 72, augmented: false },
    str: { value: 66, augmented: false },
    dex: { value: 66, augmented: false },
    int: { value: 66, augmented: false },
  });
  // in
  const with_reduced_requirements = garb.addMod(
    mods.fromId('ReducedLocalAttributeRequirements1'),
  );
  // post
  expect(with_reduced_requirements.requirements.list()).toMatchObject({
    level: { value: 72, augmented: false },
    str: { value: 54, augmented: true },
    dex: { value: 54, augmented: true },
    int: { value: 54, augmented: true },
  });
});
