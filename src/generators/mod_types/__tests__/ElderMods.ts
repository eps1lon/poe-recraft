import { createTables } from '../../../__fixtures__/util';
import ElderMods from '../ElderMods';

const { items, mods } = createTables();

it('treats the given item as if it were an Elder item', () => {
  const item = items.fromName('Iron Greaves');
  const generator = ElderMods.build(mods.all());

  expect(generator.modsFor(item, ['domain_full']).length).toBeGreaterThan(0);
  expect(generator.modsFor(item, ['domain_full'])).toEqual(
    generator.modsFor(item.asElderItem(), ['domain_full']),
  );
});
