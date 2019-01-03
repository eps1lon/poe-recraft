import { choose, random } from '../rng';

interface Item {
  id: string;
  spawnweight: number;
}
const getWeight = (item: Item) => item.spawnweight;

it('should return undefined on an empty pool', () => {
  for (let i = 1; i <= 1000; i += 1) {
    expect(
      choose([{ id: 'only', spawnweight: random(0, 11235) }], getWeight),
    ).toMatchObject({ id: 'only' });
  }
});

it('should return the same with a simgle member', () => {
  for (let i = 1; i <= 1000; i += 1) {
    expect(choose([], getWeight)).toBeUndefined();
  }
});

it('should approximate choosing a random member with its weights', () => {
  const pool: Array<{ id: string; spawnweight: number }> = [
    { id: 'first', spawnweight: 1000 },
    { id: 'second', spawnweight: 8000 },
    { id: 'third', spawnweight: 1000 },
  ];

  const expected: { [key: string]: number } = {
    first: 0.1,
    second: 0.8,
    third: 0.1,
  };

  const hits: { [key: string]: number } = {
    first: 0,
    second: 0,
    third: 0,
  };

  const rolls = 10000;
  const epsilon = 0.05;

  for (let i = 1; i <= rolls; i += 1) {
    const item = choose(pool, getWeight);

    if (item == null) {
      throw new Error('item == null');
    }

    hits[item.id] += 1;
  }

  Object.keys(hits).forEach(hit => {
    expect(Math.abs(expected[hit] - hits[hit] / rolls)).toBeLessThan(epsilon);
  });
});
