import datas from '../../__fixtures__/english';
import { StatLocaleData } from '../../types/StatDescription';
import extractStats from '../extractStats';
import formatStats from '../stats';

it('should reverse formatStats', () => {
  const formatted_stats = formatStats(
    [
      { id: 'attack_minimum_added_physical_damage', value: 1 },
      { id: 'attack_maximum_added_physical_damage', value: 56 }
    ],
    { datas }
  );

  expect(extractStats(formatted_stats[0], { datas })).toEqual([
    { id: 'attack_minimum_added_physical_damage', value: 1 },
    { id: 'attack_maximum_added_physical_damage', value: 56 }
  ]);
});
