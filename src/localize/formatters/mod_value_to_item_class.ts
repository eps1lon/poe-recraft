import Formatter from './Formatter';

// TODO howto translate?
// used in 'mod_value_to_item_class' in Poorjoy's Asylum
export const item_classes = [
  'Amulets',
  'Rings',
  'Claws',
  'Daggers',
  'Wands',
  'One Hand Swords',
  'One Hand Axes',
  'One Hand Maces',
  'Bows',
  'Staves',
  'Two Hand Swords',
  'Two Hand Maces',
  'Quivers',
  'Belts',
  'Gloves',
  'Boots',
  'Body Armours',
  'Helmets',
  'Shields',
  'Sceptres'
];

const formatter: Formatter = {
  format: n => item_classes[n % item_classes.length],
  inverse: item_class => item_classes.indexOf(item_class),
  regexp: '.+?',
  negates: false
};

export default formatter;
