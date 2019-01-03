import { createTables } from '../../../__fixtures__/util';
import BestiaryAspectMods from '../BestiaryAspectMods';

const { items, mods } = createTables();

it('ignores internal spawnweights', () => {
  const item = items.fromName('Iron Greaves');
  const generator = BestiaryAspectMods.build(mods.all());

  const bestiaryMods = generator.modsFor(item, ['domain_full']);

  expect(bestiaryMods.length).toBeGreaterThan(0);
  expect(
    bestiaryMods.map(({ mod, ...details }) => ({
      mod: mod.props.id,
      ...details,
    })),
  ).toMatchSnapshot();
});
