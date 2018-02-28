import { Tag } from '../../schema';
import MetaData from '../../util/MetaData';

export enum AtlasModifier {
  NONE = '',
  ELDER = 'elder_item',
  SHAPER = 'shaper_item',
}

export enum AtlasModifierTag {
  'shaper_item',
  'elder_item',
  'boots_shaper',
  'boots_elder',
  'sword_shaper',
  'sword_elder',
  'gloves_shaper',
  'gloves_elder',
  'helmet_shaper',
  'helmet_elder',
  'body_armour_shaper',
  'body_armour_elder',
  'amulet_shaper',
  'amulet_elder',
  'ring_shaper',
  'ring_elder',
  'belt_shaper',
  'belt_elder',
  'quiver_shaper',
  'quiver_elder',
  'shield_shaper',
  'shield_elder',
  '2h_sword_shaper',
  '2h_sword_elder',
  'axe_shaper',
  'axe_elder',
  'mace_shaper',
  'mace_elder',
  'claw_shaper',
  'claw_elder',
  'bow_shaper',
  'bow_elder',
  'dagger_shaper',
  'dagger_elder',
  '2h_axe_shaper',
  '2h_axe_elder',
  '2h_mace_shaper',
  '2h_mace_elder',
  'staff_shaper',
  'staff_elder',
  'sceptre_shaper',
  'sceptre_elder',
  'wand_shaper',
  'wand_elder',
}

export default function atlasModifier(baseitem: {
  tags: Tag[];
}): AtlasModifier {
  const has_elder_tag =
    baseitem.tags.find(
      tag => tag === AtlasModifierTag[AtlasModifierTag.elder_item],
    ) !== undefined;
  const has_shaper_tag =
    baseitem.tags.find(
      tag => tag === AtlasModifierTag[AtlasModifierTag.shaper_item],
    ) !== undefined;

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
  baseitem: { tags: Tag[] },
  meta_data: MetaData,
  modifier: AtlasModifier,
): Tag[] {
  const { tags } = baseitem;
  const with_none = tags.filter(
    tag =>
      !tag.endsWith('_shaper') &&
      !tag.endsWith('_elder') &&
      tag !== AtlasModifierTag[AtlasModifierTag.elder_item] &&
      tag !== AtlasModifierTag[AtlasModifierTag.shaper_item],
  );

  switch (modifier) {
    case AtlasModifier.NONE:
      return with_none;
    case AtlasModifier.ELDER:
      return with_none.concat(
        AtlasModifierTag[AtlasModifierTag.elder_item],
        AtlasModifierTag[elderTag(meta_data)],
      );
    case AtlasModifier.SHAPER:
      return with_none.concat(
        AtlasModifierTag[AtlasModifierTag.shaper_item],
        AtlasModifierTag[shaperTag(meta_data)],
      );
  }
}

// {baseitem} specific elder tag
export function elderTag(meta_data: MetaData): AtlasModifierTag {
  try {
    return suffixedTag('elder', meta_data);
  } catch (err) {
    throw new Error(`this item cannot have the elder tag (${err.message})`);
  }
}

// {baseitem} specific shaperTag tag
export function shaperTag(meta_data: MetaData): AtlasModifierTag {
  try {
    return suffixedTag('shaper', meta_data);
  } catch (err) {
    throw new Error(`this item cannot have the shaper tag (${err.message})`);
  }
}

function suffixedTag(suffix: string, meta_data: MetaData): AtlasModifierTag {
  const tag_prefix = tagIdentifier(meta_data);
  const tag: AtlasModifierTag | undefined =
    AtlasModifierTag[
      `${tag_prefix}_${suffix}` as keyof typeof AtlasModifierTag
    ];

  if (tag !== undefined) {
    return tag;
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
