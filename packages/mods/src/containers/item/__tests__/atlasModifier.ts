import atlasModifier, {
  fromFlags,
  AtlasModifierTag,
  AtlasModifier,
  elderTag,
  shaperTag,
  tagsWithModifier,
} from '../atlasModifier';
import MetaData from '../../../util/MetaData';

it('extracts the atlas modifier from tags', () => {
  expect(atlasModifier({ tags: [] })).toEqual(AtlasModifier.NONE);

  expect(atlasModifier({ tags: ['shaper_item'] })).toEqual(
    AtlasModifier.SHAPER,
  );

  expect(atlasModifier({ tags: ['elder_item'] })).toEqual(AtlasModifier.ELDER);
});

it('extracts the atlas modifier from a flags object', () => {
  expect(fromFlags({})).toEqual(AtlasModifier.NONE);
  expect(fromFlags({ elder: true })).toEqual(AtlasModifier.ELDER);
  expect(fromFlags({ elder: true, shaper: false })).toEqual(
    AtlasModifier.ELDER,
  );
  expect(fromFlags({ shaper: true, elder: false })).toEqual(
    AtlasModifier.SHAPER,
  );
  expect(() => fromFlags({ elder: true, shaper: true })).toThrow(
    'Item can only be shaper or elder item not both.',
  );
});

it('throws if both are set', () => {
  expect(() =>
    atlasModifier({
      tags: ['elder_item', 'shaper_item'],
    }),
  ).toThrow('Item can only be shaper or elder item not both.');
});

it('determines item specific tags from meta data', () => {
  expect(elderTag(MetaData.build('AbstractAmulet'))).toEqual(
    AtlasModifierTag.amulet_elder,
  );

  expect(shaperTag(MetaData.build('AbstractAmulet'))).toEqual(
    AtlasModifierTag.amulet_shaper,
  );

  expect(elderTag(MetaData.build('AbstractTwoHandAxe'))).toEqual(
    AtlasModifierTag['2h_axe_elder'],
  );
  expect(elderTag(MetaData.build('AbstractTwoHandMace'))).toEqual(
    AtlasModifierTag['2h_mace_elder'],
  );
  expect(elderTag(MetaData.build('AbstractTwoHandSword'))).toEqual(
    AtlasModifierTag['2h_sword_elder'],
  );
  expect(elderTag(MetaData.build('AbstractOneHandAxe'))).toEqual(
    AtlasModifierTag.axe_elder,
  );
  expect(elderTag(MetaData.build('AbstractBelt'))).toEqual(
    AtlasModifierTag.belt_elder,
  );
  expect(elderTag(MetaData.build('AbstractBodyArmour'))).toEqual(
    AtlasModifierTag.body_armour_elder,
  );
  expect(elderTag(MetaData.build('AbstractBoots'))).toEqual(
    AtlasModifierTag.boots_elder,
  );
  expect(elderTag(MetaData.build('AbstractBow'))).toEqual(
    AtlasModifierTag.bow_elder,
  );
  expect(elderTag(MetaData.build('AbstractClaw'))).toEqual(
    AtlasModifierTag.claw_elder,
  );
  expect(elderTag(MetaData.build('AbstractDagger'))).toEqual(
    AtlasModifierTag.dagger_elder,
  );
  expect(elderTag(MetaData.build('AbstractGloves'))).toEqual(
    AtlasModifierTag.gloves_elder,
  );
  expect(elderTag(MetaData.build('AbstractHelmet'))).toEqual(
    AtlasModifierTag.helmet_elder,
  );
  expect(elderTag(MetaData.build('AbstractOneHandMace'))).toEqual(
    AtlasModifierTag.mace_elder,
  );
  expect(elderTag(MetaData.build('AbstractQuiver'))).toEqual(
    AtlasModifierTag.quiver_elder,
  );
  expect(elderTag(MetaData.build('AbstractRing'))).toEqual(
    AtlasModifierTag.ring_elder,
  );
  expect(elderTag(MetaData.build('AbstractShield'))).toEqual(
    AtlasModifierTag.shield_elder,
  );
  expect(elderTag(MetaData.build('AbstractStaff'))).toEqual(
    AtlasModifierTag.staff_elder,
  );
  expect(elderTag(MetaData.build('AbstractOneHandSword'))).toEqual(
    AtlasModifierTag.sword_elder,
  );
  expect(elderTag(MetaData.build('AbstractWand'))).toEqual(
    AtlasModifierTag.wand_elder,
  );

  expect(() => elderTag(MetaData.build('AbstractMap'))).toThrow(
    'this item cannot have the elder tag',
  );
  expect(() => shaperTag(MetaData.build('AbstractMap'))).toThrow(
    'this item cannot have the shaper tag',
  );
});

it('can modify existing tags', () => {
  const default_tag = 'default';
  const shield_tag = 'shield';
  const shield_meta = MetaData.build('AbstractShield');

  expect(
    tagsWithModifier(
      { tags: [default_tag, shield_tag] },
      shield_meta,
      AtlasModifier.NONE,
    ),
  ).toEqual([default_tag, shield_tag]);

  expect(
    tagsWithModifier(
      {
        tags: [
          default_tag,
          shield_tag,
          AtlasModifierTag[AtlasModifierTag.elder_item],
          AtlasModifierTag[AtlasModifierTag.shield_elder],
        ],
      },
      shield_meta,
      AtlasModifier.NONE,
    ),
  ).toEqual([default_tag, shield_tag]);

  expect(
    tagsWithModifier(
      {
        tags: [
          default_tag,
          shield_tag,
          AtlasModifierTag[AtlasModifierTag.elder_item],
          AtlasModifierTag[AtlasModifierTag.shield_elder],
        ],
      },
      shield_meta,
      AtlasModifier.ELDER,
    ),
  ).toEqual([default_tag, shield_tag, 'elder_item', 'shield_elder']);

  expect(
    tagsWithModifier(
      {
        tags: [
          default_tag,
          shield_tag,
          AtlasModifierTag[AtlasModifierTag.elder_item],
          AtlasModifierTag[AtlasModifierTag.shield_elder],
        ],
      },
      shield_meta,
      AtlasModifier.SHAPER,
    ),
  ).toEqual([
    default_tag,
    shield_tag,
    AtlasModifierTag[AtlasModifierTag.shaper_item],
    AtlasModifierTag[AtlasModifierTag.shield_shaper],
  ]);
});
