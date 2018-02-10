import atlasModifier, {
  Tag,
  AtlasModifier,
  elderTag,
  shaperTag,
  tagProps,
  tagsWithModifier,
} from '../atlasModifier';
import MetaData from '../../../util/MetaData';

it('extracts the atlas modifier from tags', () => {
  expect(atlasModifier({ tags: [] })).toEqual(AtlasModifier.NONE);

  expect(
    atlasModifier({ tags: [{ id: 'shaper_item', primary: 246 }] }),
  ).toEqual(AtlasModifier.SHAPER);

  expect(atlasModifier({ tags: [{ id: 'elder_item', primary: 247 }] })).toEqual(
    AtlasModifier.ELDER,
  );
});

it('throws if both are set', () => {
  expect(() =>
    atlasModifier({
      tags: [
        { id: 'elder_item', primary: 247 },
        { id: 'shaper_item', primary: 246 },
      ],
    }),
  ).toThrow('Item can only be shaper or elder item not both.');
});

it('determines item specific tags from meta data', () => {
  expect(elderTag(MetaData.build('AbstractAmulet'))).toEqual(
    tagProps(Tag.amulet_elder),
  );

  expect(shaperTag(MetaData.build('AbstractAmulet'))).toEqual(
    tagProps(Tag.amulet_shaper),
  );

  expect(elderTag(MetaData.build('AbstractTwoHandAxe'))).toEqual(
    tagProps(Tag['2h_axe_elder']),
  );
  expect(elderTag(MetaData.build('AbstractTwoHandMace'))).toEqual(
    tagProps(Tag['2h_mace_elder']),
  );
  expect(elderTag(MetaData.build('AbstractTwoHandSword'))).toEqual(
    tagProps(Tag['2h_sword_elder']),
  );
  expect(elderTag(MetaData.build('AbstractOneHandAxe'))).toEqual(
    tagProps(Tag.axe_elder),
  );
  expect(elderTag(MetaData.build('AbstractBelt'))).toEqual(
    tagProps(Tag.belt_elder),
  );
  expect(elderTag(MetaData.build('AbstractBodyArmour'))).toEqual(
    tagProps(Tag.body_armour_elder),
  );
  expect(elderTag(MetaData.build('AbstractBoots'))).toEqual(
    tagProps(Tag.boots_elder),
  );
  expect(elderTag(MetaData.build('AbstractBow'))).toEqual(
    tagProps(Tag.bow_elder),
  );
  expect(elderTag(MetaData.build('AbstractClaw'))).toEqual(
    tagProps(Tag.claw_elder),
  );
  expect(elderTag(MetaData.build('AbstractDagger'))).toEqual(
    tagProps(Tag.dagger_elder),
  );
  expect(elderTag(MetaData.build('AbstractGloves'))).toEqual(
    tagProps(Tag.gloves_elder),
  );
  expect(elderTag(MetaData.build('AbstractHelmet'))).toEqual(
    tagProps(Tag.helmet_elder),
  );
  expect(elderTag(MetaData.build('AbstractOneHandMace'))).toEqual(
    tagProps(Tag.mace_elder),
  );
  expect(elderTag(MetaData.build('AbstractQuiver'))).toEqual(
    tagProps(Tag.quiver_elder),
  );
  expect(elderTag(MetaData.build('AbstractRing'))).toEqual(
    tagProps(Tag.ring_elder),
  );
  expect(elderTag(MetaData.build('AbstractShield'))).toEqual(
    tagProps(Tag.shield_elder),
  );
  expect(elderTag(MetaData.build('AbstractStaff'))).toEqual(
    tagProps(Tag.staff_elder),
  );
  expect(elderTag(MetaData.build('AbstractOneHandSword'))).toEqual(
    tagProps(Tag.sword_elder),
  );
  expect(elderTag(MetaData.build('AbstractWand'))).toEqual(
    tagProps(Tag.wand_elder),
  );

  expect(() => elderTag(MetaData.build('AbstractMap'))).toThrow(
    'this item cannot have the elder tag',
  );
  expect(() => shaperTag(MetaData.build('AbstractMap'))).toThrow(
    'this item cannot have the shaper tag',
  );
});

it('can modify existing tags', () => {
  const default_tag = {
    primary: 0,
    id: 'default',
  };
  const shield_tag = {
    primary: 1,
    id: 'shield',
  };
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
          tagProps(Tag.elder_item),
          tagProps(Tag.shield_elder),
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
          tagProps(Tag.elder_item),
          tagProps(Tag.shield_elder),
        ],
      },
      shield_meta,
      AtlasModifier.ELDER,
    ),
  ).toEqual([
    default_tag,
    shield_tag,
    tagProps(Tag.elder_item),
    tagProps(Tag.shield_elder),
  ]);

  expect(
    tagsWithModifier(
      {
        tags: [
          default_tag,
          shield_tag,
          tagProps(Tag.elder_item),
          tagProps(Tag.shield_elder),
        ],
      },
      shield_meta,
      AtlasModifier.SHAPER,
    ),
  ).toEqual([
    default_tag,
    shield_tag,
    tagProps(Tag.shaper_item),
    tagProps(Tag.shield_shaper),
  ]);
});
