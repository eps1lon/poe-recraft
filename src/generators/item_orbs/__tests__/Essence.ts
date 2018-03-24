import { createTables, byEssenceName } from '../../../__fixtures__/util';
import Alchemy from '../Alchemy';
import Essence from '../Essence';

const { essences, items, mods } = createTables();

it('should build', () => {
  expect(
    essences.from(byEssenceName('Muttering Essence of Fear')),
  ).toBeInstanceOf(Essence);
});

describe('applicability', () => {
  const boots = items.fromName('Iron Greaves');
  const flask = items.fromName('Divine Life Flask');

  it('does not apply to items for which it finds no mods', () => {
    const essence = essences.from(byEssenceName('Muttering Essence of Fear'));
    expect(essence.applicableTo(flask)).toEqual({
      wrong_rarity: false,
      wrong_itemclass: true,
      corrupted: false,
      mirrored: false,
    });
  });

  it('applies to white items', () => {
    const essence = essences.from(byEssenceName('Muttering Essence of Fear'));
    expect(essence.applicableTo(boots)).toEqual({
      wrong_rarity: false,
      wrong_itemclass: false,
      corrupted: false,
      mirrored: false,
    });
  });

  it('applies to rare item if it can reforge', () => {
    const low_tier = essences.from(byEssenceName('Muttering Essence of Fear'));
    const high_tier = essences.from(byEssenceName('Deafening Essence of Fear'));

    expect(low_tier.applicableTo(boots.rarity.set('rare'))).toEqual({
      wrong_rarity: true,
      wrong_itemclass: false,
      corrupted: false,
      mirrored: false,
    });
    expect(high_tier.applicableTo(boots.rarity.set('rare'))).toEqual({
      wrong_rarity: false,
      wrong_itemclass: false,
      corrupted: false,
      mirrored: false,
    });
  });

  it('applies not to rare even if it can reforge?', () => {
    const essence = essences.from(byEssenceName('Deafening Essence of Fear'));

    expect(essence.applicableTo(boots.rarity.set('magic'))).toEqual({
      wrong_rarity: true,
      wrong_itemclass: false,
      corrupted: false,
      mirrored: false,
    });
  });
});

describe('application', () => {
  // passing no alch mods causes essences to only apply guarenteed
  const spite = Essence.build(
    essences.find(byEssenceName('Deafening Essence of Spite'))!,
    [],
  );

  [
    'Hubris Circlet',
    'Fishscale Gauntlets',
    'Wool Shoes',
    'Vaal Regalia',
    'Goathide Buckler',
    'Leather Belt',
    'Coral Ring',
    'Gold Amulet',
    'Iron Greaves',
    'Serrated Arrow Quiver',
    'Vaal Rapier',
    'Corsair Sword',
    'Siege Axe',
    'Driftwood Club',
    'Golden Kris',
    'Gemini Claw',
    'Vaal Sceptre',
    'Woodful Staff',
    'Reaver Sword',
    'Vaal Axe',
    'Coronal Maul',
    'Harbinger Bow',
    'Profane Wand',
  ].forEach(item_name => {
    it(`can apply to ${item_name}`, () => {
      const item = items.fromName(item_name);
      const crafted = spite.applyTo(item, { force: true });

      expect(crafted).not.toBe(item);
      expect(crafted.rarity.isRare()).toBe(true);
      expect(crafted.affixes.mods.length).toBeGreaterThan(
        item.affixes.mods.length,
      );
    });
  });

  it('adds one guarenteed mod and fills up like an alch', () => {
    const essence = essences.from(byEssenceName('Screaming Essence of Fear'));
    const boots = items.fromName('Iron Greaves');

    // random testing to enure that the essence mod really is guarenteed
    for (let tries = 1; tries <= 10; ++tries) {
      // Pre
      expect(boots.affixes.mods).toHaveLength(0);

      const crafted = essence.applyTo(boots);
      // Post
      expect(crafted.affixes.mods.length).toBeGreaterThanOrEqual(4);
      expect(
        crafted.affixes.mods.find(mod => mod.props.id === 'MinionLifeEssence5'),
      ).toBeDefined();
    }
  });

  it('can reforge if it is a high tier essence', () => {
    const alch = Alchemy.build(mods.all());
    const essence = essences.from(byEssenceName('Shrieking Essence of Fear'));
    const boots = items.fromName('Iron Greaves');

    // random testing to enure that the essence mod really is guarenteed
    for (let tries = 1; tries <= 10; ++tries) {
      const crafted = alch.applyTo(boots);
      const prev_ids = crafted.affixes.mods.map(mod => mod.props.id);
      // Pre
      expect(crafted.affixes.mods.length).toBeGreaterThanOrEqual(4);

      const reforged = essence.applyTo(crafted);
      const post_ids = reforged.affixes.mods.map(mod => mod.props.id);
      // Post
      expect(reforged).not.toBe(crafted);
      expect(reforged.affixes.mods.length).toBeGreaterThanOrEqual(4);
      expect(
        reforged.affixes.mods.find(
          mod => mod.props.id === 'MinionLifeEssence6',
        ),
      ).toBeDefined();
      // diff(prev_ids, post_ids)
      // at least one mod has to be in diff which is the essence mod which is
      // not rollable by an alch
      // very unlikely that the rest matches but possible
      expect(
        post_ids.filter(id => prev_ids.indexOf(id) === -1).length,
      ).toBeGreaterThanOrEqual(1);
    }
  });

  it('ignores meta mods', () => {
    const locked_prefixes = mods.fromId(
      'StrMasterItemGenerationCannotChangePrefixes',
    );
    const movement = mods.fromId('MovementVelocity2');
    const life = mods.fromId('IncreasedLife2');
    const armour = mods.fromId('LocalIncreasedPhysicalDamageReductionRating3');
    const boots = items
      .fromName('Iron Greaves')
      .rarity.set('rare')
      .addMod(movement)
      .addMod(life)
      .addMod(armour)
      .addMod(locked_prefixes);
    const essence = essences.from(byEssenceName('Shrieking Essence of Misery'));

    // pre
    expect(boots.hasMod(life)).toBe(true);
    expect(boots.hasMod(movement)).toBe(true);
    expect(boots.hasMod(armour)).toBe(true);
    expect(boots.hasMod(locked_prefixes)).toBe(true);

    const crafted = essence.applyTo(boots);

    // post
    expect(crafted).not.toBe(boots);
    expect(crafted.hasMod(locked_prefixes)).toBe(false);
    // this could still happen randomly
    // so just assure that at least one is missing
    expect(
      crafted.hasMod(life) &&
        crafted.hasMod(movement) &&
        crafted.hasMod(armour),
    ).toBe(false);
    expect(
      crafted.affixes.mods.find(mod => mod.props.id === 'IncreasedMana11'),
    ).toBeDefined();
  });
});
