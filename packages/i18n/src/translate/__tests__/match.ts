import { Match, matches, matchesSingle } from '../match';

it('matches wildcar values', () => {
  expect(matchesSingle(5, '#')).toBe(Match.subset);
  expect(matchesSingle(-5, '#')).toBe(Match.subset);
  expect(matchesSingle(0, '#')).toBe(Match.subset);
});

it('matches exact values', () => {
  expect(matchesSingle(0, 5)).toBe(Match.none);
  expect(matchesSingle(5, 0)).toBe(Match.none);
  expect(matchesSingle(3, 5)).toBe(Match.none);

  expect(matchesSingle(5, 5)).toBe(Match.exact);
  expect(matchesSingle(-4, -4)).toBe(Match.exact);
  expect(matchesSingle(0, 0)).toBe(Match.exact);
});

it('matches ranges', () => {
  expect(matchesSingle(-1, [0, 5])).toBe(Match.none);
  expect(matchesSingle(8, [0, 5])).toBe(Match.none);
  expect(matchesSingle(5, [0, 5])).toBe(Match.subset);
  expect(matchesSingle(0, [0, 5])).toBe(Match.subset);

  expect(matchesSingle(0, [5, '#'])).toBe(Match.none);
  expect(matchesSingle(7, [5, '#'])).toBe(Match.subset);

  expect(matchesSingle(-1, [0, '#'])).toBe(Match.none);
  // gets expanded to [inf, inf]
  expect(matchesSingle(Number.POSITIVE_INFINITY, [0, '#'])).toBe(Match.subset);
  // whereas # gets expanded to [-inf, inf]
  expect(matchesSingle('#', [0, '#'])).toBe(Match.superset);
  expect(matchesSingle(0, [0, '#'])).toBe(Match.subset);
  expect(matchesSingle(3, [0, '#'])).toBe(Match.subset);

  expect(matchesSingle(-1, ['#', 5])).toBe(Match.subset);
  expect(matchesSingle(6, ['#', 5])).toBe(Match.none);
});

it('returns none if not enough args are proved', () => {
  expect(matches([2], [[0, 2], [1, 3]])).toEqual([Match.subset, Match.none]);
  expect(matches([2], [[0, 2], '#'])).toEqual([Match.subset, Match.none]);
});

it('matches with AND', () => {
  expect(matches([2, 0], [[0, 2], [1, 3]])).toEqual([Match.subset, Match.none]);
  expect(matches([2, 2], [[0, 2], [1, 3]])).toEqual([
    Match.subset,
    Match.subset
  ]);

  expect(matches([2, Number.POSITIVE_INFINITY], [[0, '#'], [5, '#']])).toEqual([
    Match.subset,
    Match.subset
  ]);
});

it('should match intervals', () => {
  expect(matchesSingle([1, 3], [1, 3])).toBe(Match.exact);

  expect(matchesSingle([2, 3], [1, 3])).toBe(Match.subset);
  expect(matchesSingle([2, 3], [1, 4])).toBe(Match.subset);

  expect(matchesSingle([1, 3], [2, 3])).toBe(Match.superset);
  expect(matchesSingle([1, '#'], [2, 4])).toBe(Match.superset);

  expect(matchesSingle([1, '#'], [0, 3])).toBe(Match.partial_upper);
  expect(matchesSingle([1, '#'], [0, 1])).toBe(Match.partial_upper);

  expect(matchesSingle([0, 4], [1, 5])).toBe(Match.partial_lower);
  expect(matchesSingle([4, 5], [5, 7])).toBe(Match.partial_lower);

  expect(matchesSingle([0, 4], [8, 13])).toBe(Match.none);
  expect(matchesSingle([5, 7], [0, 1])).toBe(Match.none);
});
