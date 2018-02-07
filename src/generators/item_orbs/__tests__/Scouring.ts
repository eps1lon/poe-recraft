import { createTables } from '../../../__fixtures__/util';
import Scouring from '../Scouring';

const { items, mods } = createTables();

const greaves = items.fromPrimary(1650);

it('should not work on uniques or normal items', () => {
  const scour = new Scouring();

  expect(greaves.rarity.toString()).toBe('normal');

  expect(scour.applicableTo(greaves)).toEqual({
    corrupted: false,
    mirrored: false,
    unique: false,
    normal: true,
  });
  expect(scour.applyTo(greaves)).toBe(greaves);

  const unique = greaves.rarity.set('unique');
  expect(scour.applicableTo(unique)).toEqual({
    corrupted: false,
    mirrored: false,
    unique: true,
    normal: false,
  });
  expect(scour.applyTo(unique)).toBe(unique);

  expect(scour.applicableTo(greaves.rarity.set('magic'))).toEqual({
    corrupted: false,
    mirrored: false,
    unique: false,
    normal: false,
  });

  expect(scour.applicableTo(greaves.rarity.set('rare'))).toEqual({
    corrupted: false,
    mirrored: false,
    unique: false,
    normal: false,
  });
});

it('should remove mods and downgrade to normal', () => {
  const scour = new Scouring();

  const movement = mods.fromPrimary(1503);
  const life = mods.fromPrimary(198);

  // pre
  const magic_greaves = greaves.rarity.set('magic').addMod(movement);

  expect(magic_greaves.rarity.toString()).toBe('magic');
  expect(magic_greaves.mods).toHaveLength(1);

  // to test
  const scoured_magic = scour.applyTo(magic_greaves);

  // post
  expect(scoured_magic).not.toBe(magic_greaves);
  expect(scoured_magic.rarity.toString()).toBe('normal');
  expect(scoured_magic.mods).toHaveLength(0);

  // pre
  const rare_greaves = greaves.rarity
    .set('rare')
    .addMod(movement)
    .addMod(life);

  expect(rare_greaves.rarity.toString()).toBe('rare');
  expect(rare_greaves.mods).toHaveLength(2);

  // to test
  const scoured_rare = scour.applyTo(rare_greaves);

  // post
  expect(scoured_rare).not.toBe(rare_greaves);
  expect(scoured_rare.rarity.toString()).toBe('normal');
  expect(scoured_rare.mods).toHaveLength(0);
});
