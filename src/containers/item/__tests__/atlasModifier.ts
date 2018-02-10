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

  expect(elderTag(MetaData.build('AbstractTwoHandSword'))).toEqual(
    tagProps(Tag['2h_sword_elder']),
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
