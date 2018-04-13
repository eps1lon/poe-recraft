import { createTables } from '../../../__fixtures__/util';
import MasterSignatureMods from '../MasterSignatureMods';
import { Mod } from '../../../mods';

const { items, mods } = createTables();
const generator = MasterSignatureMods.build(mods.all());
const snapshot = ({ mod }: { mod: Mod }) => mod.props.id;

const item_class_samples = {
  helmets: 'Hunter Hood',
  boots: 'Iron Greaves',
  gloves: 'Iron Gauntlets',
  amulets: 'Amber Amulet',
  rings: 'Iron Ring',
  belts: 'Rustic Sash',
  shields: 'Painted Tower Shield',
  spririt_shields: 'Bone Spirit Shield',
  wands: 'Tornado Wand',
  bows: 'Short Bow',
  daggers: 'Skinning Knife',
  staves: 'Woodful Staff',
  one_hand_melee_weapon: 'Arming Axe',
  two_hand_melee_weapon: 'Bastard Sword',
};

for (const [item_class, item_name] of Object.entries(item_class_samples)) {
  it(`recognizes some mods can only spawn on '${item_class}'`, () => {
    const item = items.fromName(item_name);

    expect(
      generator.modsFor(item, ['domain_full']).map(snapshot),
    ).toMatchSnapshot();
  });
}
