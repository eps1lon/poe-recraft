import { createTables } from '../../../__fixtures__/util';
import ShapedMods from '../ShapedMods';

const { items, mods } = createTables();

it('treats the given item as if it were a Shaped item', () => {
  const item = items.fromName('Iron Greaves');
  const generator = ShapedMods.build(mods.all());

  expect(generator.modsFor(item, ['domain_full']).length).toBeGreaterThan(0);
  expect(generator.modsFor(item, ['domain_full'])).toEqual(
    generator.modsFor(item.asElderItem(), ['domain_full']),
  );
});
