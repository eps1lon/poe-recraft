import {
  buildRandomStats,
  deterministicValueForMatcher
} from '../symbolicStats';

it('creates deterministic values', () => {
  expect(deterministicValueForMatcher('#')).toEqual(
    deterministicValueForMatcher('#')
  );

  expect(deterministicValueForMatcher([5, '#'])).toEqual(
    deterministicValueForMatcher([5, '#'])
  );

  expect(deterministicValueForMatcher(['#', -5])).toEqual(
    deterministicValueForMatcher(['#', -5])
  );

  expect(deterministicValueForMatcher(['#', '#'])).toEqual(
    deterministicValueForMatcher(['#', '#'])
  );
});

it('can build stats with random value', () => {
  const random_stats_for_translations = buildRandomStats({
    stats: ['exact', 'any', 'open', 'open_left', 'open_right'],
    translations: [
      {
        text: '',
        formatters: [],
        matchers: [5, '#', ['#', '#'], ['#', -5], [1, '#']]
      }
    ]
  });

  expect(random_stats_for_translations).not.toBe(null);
  const [random_stats] = random_stats_for_translations!;
  expect(random_stats[0].value).toEqual(5);
  expect(random_stats[1].value).not.toBeNaN();
  expect(random_stats[2].value).not.toBeNaN();
  expect(random_stats[3].value).toBeLessThanOrEqual(-5);
  expect(random_stats[4].value).toBeGreaterThanOrEqual(1);
});
