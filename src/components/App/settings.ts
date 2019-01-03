// basic settings for the app
// supported locales by poe-i18n
export const SUPPORTED_LOCALES = [
  'en',
  'ru',
  'th',
  'pt',
  'zh-cn', // simplified chinese
  'zh-tw', // traditional chinese
  'de',
  'es',
  'fr'
];

// version of the game client for which data is provided in public/data
export const GAME_VERSION = 'steam@3.5.1';

// available itemclasses grouped by community convention
export const ITEMCLASSES_GROUPED = [
  {
    name: 'weapons',
    human: 'Weapons',
    classes: [
      'Claw',
      'Dagger',
      'Sceptre',
      'Bow',
      'Wand',
      'Staff',
      'One Hand Axe',
      'Two Hand Axe',
      'One Hand Mace',
      'Two Hand Mace',
      'One Hand Sword',
      'Thrusting One Hand Sword',
      'Two Hand Sword'
    ]
  },
  {
    name: 'armours',
    human: 'Armour',
    classes: ['Body Armour', 'Boots', 'Gloves', 'Helmet', 'Shield']
  },
  {
    name: 'equipment',
    human: 'Accessories',
    classes: ['Amulet', 'Ring', 'Belt', 'Jewel', 'AbyssJewel', 'Quiver']
  }
];
