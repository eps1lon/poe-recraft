import Item from '../Item';
import { isZero, anyCmp } from '../util/AugmentableValue';

/**
 * the api response as defined by the offical GGG api. It's not possible to
 * deserialize this format for various reason:
 * a) fields content is already translated and therefore needs an i18n package for
 *    deserialization
 * b) only stats are provided. Extracting mods from stats is ambigious.
 */
export interface GGGApiItemJson {
  name?: string;
  typeLine: string;
  identified: boolean;
  category?: { [key: string]: string[] }; // TODO
  frameType: FrameType;
  elder?: boolean;
  shaper?: boolean;
  corrupted?: boolean;
  mirrored?: boolean;
  utilityMods?: string[];
  implicitMods?: string[];
  explicitMods?: string[];
  craftedMods?: string[];
  enchantMods?: string[];
  properties?: LineContent[];
  requirements?: LineContent[];
}

export interface I18n {
  messages: { [key: string]: string };
  name(item: Item): string | undefined;
  typeLine(item: Item): string;
  formatMessage(message: string, args?: { [key: string]: any }): string;
  formatStats(stats: Stat[], item: Item): string[];
  formatValue(
    value: number | [number, number],
    options: Partial<{ message: string }>,
  ): string;
}

export interface Stat {
  id: string;
  value: number | [number, number];
}

export interface LineContent {
  name: string;
  values: Array<[string, number]>;
  displayMode: number;
  type?: number;
}

// const DEFAULT_DAMAGE_RANGE_STRING = '{RANGE1} to {RANGE2';
// const DEFAULT_RANGE_STRING = '{min}–{max}';
const DEFAULT_ROLLABLE_MESSAGE = '({min}–{max})';
// everything below is not displayed
const MIN_ATTRIBUTE_REQUIREMENTS = 14;

export function serialize(item: Item, i18n: I18n): GGGApiItemJson {
  const name = i18n.name(item);
  const typeLine = i18n.typeLine(item);
  const category = createCategory(item);
  const frameType = createFrameType(item);
  const elder = item.isElderItem();
  const shaper = item.isSHaperItem();
  const { corrupted, mirrored } = item.props;
  const requirements = createRequirements(item, i18n);
  const properties = createProperties(item);

  return {
    name,
    typeLine,
    identified: true,
    category,
    frameType,
    elder,
    shaper,
    corrupted,
    mirrored,
    properties,
    requirements,
  };
}

function createCategory(item: Item): GGGApiItemJson['category'] {
  // TODO
  // return { accessories: ['ring'] };
  return undefined;
}

function createFrameType(item: Item): GGGApiItemJson['frameType'] {
  if (item.rarity.isNormal()) {
    return FrameType.normal;
  } else if (item.rarity.isMagic()) {
    return FrameType.magic;
  } else if (item.rarity.isRare()) {
    return FrameType.rare;
  } else if (item.rarity.isUnique()) {
    return FrameType.unique;
  } else {
    throw new Error("Can't determine frameType");
  }
}

function createRequirements(
  item: Item,
  i18n: I18n,
): GGGApiItemJson['requirements'] {
  const { dex, int, level, str } = item.requirements.list();
  const requirements: GGGApiItemJson['requirements'] = [];

  if (!isZero(level)) {
    requirements.push({
      name: i18n.messages['poe.api.Level'] || 'Level',
      values: [
        [
          i18n.formatValue(level.value, {
            message:
              i18n.messages['poe.api.({min}–{max})'] ||
              DEFAULT_ROLLABLE_MESSAGE,
          }),
          +level.augmented,
        ],
      ],
      displayMode: 0,
    });
  }

  [
    { augmentable: dex, message: 'Dex' },
    { augmentable: int, message: 'Int' },
    { augmentable: str, message: 'Str' },
  ].forEach(({ augmentable, message }) => {
    if (anyCmp(augmentable, n => n >= MIN_ATTRIBUTE_REQUIREMENTS)) {
      requirements.push({
        name: i18n.messages[`poe.api.${message}`] || message,
        values: [
          [
            i18n.formatValue(augmentable.value, {
              message:
                i18n.messages['poe.api.({min}–{max})'] ||
                DEFAULT_ROLLABLE_MESSAGE,
            }),
            +augmentable.augmented,
          ],
        ],
        displayMode: 1,
      });
    }
  });

  return requirements;
}

function createProperties(item: Item): GGGApiItemJson['properties'] {
  // TODO no implemented
  return undefined;
}

enum FrameType {
  normal = 0,
  magic = 1,
  rare = 2,
  unique = 3,
  gem = 4,
}
