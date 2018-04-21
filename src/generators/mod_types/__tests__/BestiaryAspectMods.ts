import { createTables } from '../../../__fixtures__/util';
import BestiaryAspectMods from '../BestiaryAspectMods';

const { items, mods } = createTables();

it('ignores internal spawnweights', () => {
  const item = items.fromName('Iron Greaves');
  const generator = BestiaryAspectMods.build(mods.all());

  expect(generator.modsFor(item).length).toBeGreaterThan(0);
  expect(
    generator
      .modsFor(item, ['domain_full'])
      .map(({ mod, ...details }) => ({ mod: mod.props.id, ...details })),
  ).toMatchSnapshot();
});
