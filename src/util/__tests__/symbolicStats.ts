import {
  buildRandomStats,
  deterministicValueForMatcher
} from '../symbolicStats';

describe('deterministicValueForMatcher', () => {
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

    expect(deterministicValueForMatcher([-9, -5])).toEqual(
      deterministicValueForMatcher([-9, -5])
    );

    expect(deterministicValueForMatcher(['#', '#'])).toEqual(
      deterministicValueForMatcher(['#', '#'])
    );
  });
});

describe('buildRandomStats', () => {
  it('can build stats with random value', () => {
    const random_stats_for_translations = buildRandomStats({
      stats: ['exact', 'any', 'open', 'open_left', 'open_right', 'interval'],
      translations: [
        {
          text: '',
          formatters: [],
          matchers: [5, '#', ['#', '#'], ['#', -5], [1, '#'], [10, 11]]
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
    expect(random_stats[5].value).toBeGreaterThanOrEqual(10);
    expect(random_stats[5].value).toBeLessThanOrEqual(11);
  });

  it('returns null if no_description is set', () => {
    expect(
      buildRandomStats({ no_description: true, stats: [], translations: [] })
    ).toEqual(null);
  });
});
