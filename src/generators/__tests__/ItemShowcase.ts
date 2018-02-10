import { createTables } from '../../__fixtures__/util';

import ItemShowcase from '../ItemShowcase';

const { craftingbenchoptions, items, mods } = createTables();

it('should build', () => {
  const showcase = new ItemShowcase(mods.all(), craftingbenchoptions.all());

  expect(showcase).toBeInstanceOf(ItemShowcase);
  expect(showcase.mods.length).toBeGreaterThan(0);
});

it('should not do anything, just showcase', () => {
  const showcase = new ItemShowcase(mods.all(), craftingbenchoptions.all());
  const greaves = items.fromName('Iron Greaves');

  expect(showcase.applyTo(greaves)).toBe(greaves);
  expect(showcase.modsFor(greaves).length).toBeGreaterThan(0);
});

it('should use special rarity', () => {
  const showcase = new ItemShowcase(mods.all(), craftingbenchoptions.all());

  const life = mods.fromId('IncreasedLife0');
  const greaves = items.fromName('Iron Greaves').addMod(life);

  // although this item is white and already has a prefix the showcase
  // considers this item to be rare
  expect(
    showcase
      .modsFor(greaves)
      .filter(({ mod }) => mod.isPrefix() && !mod.isMasterMod())
      .map(({ mod }) => mod.props.id),
  ).toMatchSnapshot();
});
