import { matchesSingle, matches } from '../match';

it('matches wildcar values', () => {
  expect(matchesSingle('#', 5)).toBe(true);
  expect(matchesSingle('#', -5)).toBe(true);
  expect(matchesSingle('#', 0)).toBe(true);
});

it('matches exact values', () => {
  expect(matchesSingle(5, 0)).toBe(false);
  expect(matchesSingle(0, 5)).toBe(false);
  expect(matchesSingle(5, 3)).toBe(false);

  expect(matchesSingle(5, 5)).toBe(true);
  expect(matchesSingle(-4, -4)).toBe(true);
  expect(matchesSingle(0, 0)).toBe(true);
});

it('matches ranges', () => {
  expect(matchesSingle([0, 5], -1)).toBe(false);
  expect(matchesSingle([0, 5], 8)).toBe(false);
  expect(matchesSingle([0, 5], 5)).toBe(true);
  expect(matchesSingle([0, 5], 0)).toBe(true);

  expect(matchesSingle([5, '#'], 0)).toBe(false);
  expect(matchesSingle([5, '#'], 7)).toBe(true);

  expect(matchesSingle([0, '#'], -1)).toBe(false);
  expect(matchesSingle([0, '#'], Number.POSITIVE_INFINITY)).toBe(true);
  expect(matchesSingle([0, '#'], 0)).toBe(true);
  expect(matchesSingle([0, '#'], 3)).toBe(true);

  expect(matchesSingle(['#', 5], -1)).toBe(true);
  expect(matchesSingle(['#', 5], 6)).toBe(false);
});

it('returns false if not enough args are proved', () => {
  expect(matches([[0, 2], [1, 3]], [2])).toBe(false);
  expect(matches([[0, 2], '#'], [2])).toBe(false);
});

it('matches with AND', () => {
  expect(matches([[0, 2], [1, 3]], [2, 0])).toBe(false);
  expect(matches([[0, 2], [1, 3]], [2, 2])).toBe(true);

  expect(matches([[0, '#'], [5, '#']], [2, Number.POSITIVE_INFINITY]));
});
