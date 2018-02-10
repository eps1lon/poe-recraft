import { TagProps } from '../../schema';
import MetaData from '../../util/MetaData';

export enum AtlasModifier {
  NONE,
  ELDER,
  SHAPER,
}

export enum Tag {
  'shaper_item' = 246,
  'elder_item' = 247,
  'boots_shaper' = 248,
  'boots_elder' = 249,
  'sword_shaper' = 250,
  'sword_elder' = 251,
  'gloves_shaper' = 252,
  'gloves_elder' = 253,
  'helmet_shaper' = 254,
  'helmet_elder' = 255,
  'body_armour_shaper' = 256,
  'body_armour_elder' = 257,
  'amulet_shaper' = 258,
  'amulet_elder' = 259,
  'ring_shaper' = 260,
  'ring_elder' = 261,
  'belt_shaper' = 262,
  'belt_elder' = 263,
  'quiver_shaper' = 264,
  'quiver_elder' = 265,
  'shield_shaper' = 266,
  'shield_elder' = 267,
  '2h_sword_shaper' = 268,
  '2h_sword_elder' = 269,
  'axe_shaper' = 270,
  'axe_elder' = 271,
  'mace_shaper' = 272,
  'mace_elder' = 273,
  'claw_shaper' = 274,
  'claw_elder' = 275,
  'bow_shaper' = 276,
  'bow_elder' = 277,
  'dagger_shaper' = 278,
  'dagger_elder' = 279,
  '2h_axe_shaper' = 280,
  '2h_axe_elder' = 281,
  '2h_mace_shaper' = 282,
  '2h_mace_elder' = 283,
  'staff_shaper' = 284,
  'staff_elder' = 285,
  'sceptre_shaper' = 286,
  'sceptre_elder' = 287,
  'wand_shaper' = 288,
  'wand_elder' = 289,
}

export default function atlasModifier(baseitem: {
  tags: TagProps[];
}): AtlasModifier {
  const has_elder_tag =
    baseitem.tags.find(({ primary }) => primary === Tag.elder_item) !==
    undefined;
  const has_shaper_tag =
    baseitem.tags.find(({ primary }) => primary === Tag.shaper_item) !==
    undefined;

  if (has_elder_tag && has_shaper_tag) {
    throw new Error('Item can only be shaper or elder item not both.');
  }

  if (has_elder_tag) {
    return AtlasModifier.ELDER;
  } else if (has_shaper_tag) {
    return AtlasModifier.SHAPER;
  } else {
    return AtlasModifier.NONE;
  }
}

// generates the appropriate tags for {baseitem} with {modifier}
export function tagsWithModifier(
  baseitem: { tags: TagProps[] },
  meta_data: MetaData,
  modifier: AtlasModifier,
): TagProps[] {
  const { tags } = baseitem;
  const with_none = tags.filter(
    tag =>
      !tag.id.endsWith('_shaper') &&
      !tag.id.endsWith('_elder') &&
      tag.primary !== Tag.elder_item &&
      tag.primary !== Tag.shaper_item,
  );

  switch (modifier) {
    case AtlasModifier.NONE:
      return with_none;
    case AtlasModifier.ELDER:
      return with_none.concat(tagProps(Tag.elder_item), elderTag(meta_data));
    case AtlasModifier.SHAPER:
      return with_none.concat(tagProps(Tag.shaper_item), shaperTag(meta_data));
  }
}

// {baseitem} specific elder tag
export function elderTag(meta_data: MetaData): TagProps {
  try {
    return suffixedTag('elder', meta_data);
  } catch (err) {
    throw new Error(`this item cannot have the elder tag (${err.message})`);
  }
}

// {baseitem} specific shaperTag tag
export function shaperTag(meta_data: MetaData): TagProps {
  try {
    return suffixedTag('shaper', meta_data);
  } catch (err) {
    throw new Error(`this item cannot have the shaper tag (${err.message})`);
  }
}

export function tagProps(tag: Tag): TagProps {
  return {
    primary: tag,
    id: Tag[tag],
  };
}

function suffixedTag(suffix: string, meta_data: MetaData): TagProps {
  const tag_prefix = tagIdentifier(meta_data);
  const tag: Tag | undefined =
    Tag[`${tag_prefix}_${suffix}` as keyof typeof Tag];

  if (tag !== undefined) {
    return tagProps(tag);
  } else {
    throw new Error(`${tag_prefix} not set in Tag with '${suffix}' as suffix`);
  }
}

function tagIdentifier(meta_data: MetaData): string {
  if (meta_data.isA('AbstractTwoHandAxe')) {
    return '2h_axe';
  } else if (meta_data.isA('AbstractTwoHandMace')) {
    return '2h_mace';
  } else if (meta_data.isA('AbstractTwoHandSword')) {
    return '2h_sword';
  } else if (meta_data.isA('AbstractAmulet')) {
    return 'amulet';
  } else if (meta_data.isA('AbstractOneHandAxe')) {
    return 'axe';
  } else if (meta_data.isA('AbstractBelt')) {
    return 'belt';
  } else if (meta_data.isA('AbstractBodyArmour')) {
    return 'body_armour';
  } else if (meta_data.isA('AbstractBoots')) {
    return 'boots';
  } else if (meta_data.isA('AbstractBow')) {
    return 'bow';
  } else if (meta_data.isA('AbstractClaw')) {
    return 'claw';
  } else if (meta_data.isA('AbstractDagger')) {
    return 'dagger';
  } else if (meta_data.isA('AbstractGloves')) {
    return 'gloves';
  } else if (meta_data.isA('AbstractHelmet')) {
    return 'helmet';
  } else if (meta_data.isA('AbstractOneHandMace')) {
    return 'mace';
  } else if (meta_data.isA('AbstractQuiver')) {
    return 'quiver';
  } else if (meta_data.isA('AbstractRing')) {
    return 'ring';
  } else if (meta_data.isA('AbstractSceptre')) {
    return 'sceptre';
  } else if (meta_data.isA('AbstractShield')) {
    return 'shield';
  } else if (meta_data.isA('AbstractStaff')) {
    return 'staff';
  } else if (meta_data.isA('AbstractOneHandSword')) {
    return 'sword';
  } else if (meta_data.isA('AbstractWand')) {
    return 'wand';
  }

  throw new Error();
}
