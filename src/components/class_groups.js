// @flow
import type { Props as ItemClassGroupProps } from './item/ItemClassGroup';

const groups: ItemClassGroupProps[] = [
  {
    name: 'weapons',
    human: 'Weapons',
    classes: [
      { name: 'claws', human: 'Claws' },
      { name: 'daggers', human: 'Daggers' },
      { name: 'sceptres', human: 'Sceptres' },
      { name: 'bows', human: 'Bows' },
      { name: 'quivers', human: 'Quivers' },
      { name: 'wands', human: 'Wands' },
      { name: 'staves', human: 'Staves' },
      { name: '1h_axes', human: '1H Axes' },
      { name: '2h_axes', human: '2H Axes' },
      { name: '1h_maces', human: '1H Maces' },
      { name: '2h_maces', human: '2H Maces' },
      { name: '1h_swords', human: '1H Swords' },
      { name: '1h_swords_thrusting', human: '1H Thrusting Swords' },
      { name: '2h_swords', human: '2H Swords' }
    ]
  },
  {
    name: 'armours',
    human: 'Armour',
    classes: [
      { name: 'body_armours', human: 'Body Armours' },
      { name: 'boots', human: 'Boots' },
      { name: 'gloves', human: 'Gloves' },
      { name: 'helmets', human: 'Helmets' },
      { name: 'shields', human: 'Shields' }
    ]
  },
  {
    name: 'equipment',
    human: 'Jewelry',
    classes: [
      { name: 'amulets', human: 'Amulets' },
      { name: 'rings', human: 'Rings' },
      { name: 'belts', human: 'Belts' },
      { name: 'jewels', human: 'Jewels' }
    ]
  },
  {
    name: 'misc',
    human: 'Misc',
    classes: [{ name: 'maps', human: 'Maps' }]
  }
];

export default groups;
