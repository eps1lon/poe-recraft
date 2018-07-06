export type WithSpawnchance<T extends Object> = T & {
  spawnchance?: number;
  relative_weight?: number;
};
/**
 * given a list with objects that have a weight calculate the spawnchance in %
 * adds a `relative_weight` property that describes the relation between the weight
 * and the max weight
 */
export function withSpawnchance<T extends { spawnweight?: number }>(
  items: T[]
): Array<WithSpawnchance<T>> {
  let max_weight = Number.NEGATIVE_INFINITY;
  const spawnweight_sum = items.reduce((sum, { spawnweight }) => {
    if (spawnweight !== undefined) {
      if (spawnweight > max_weight) {
        max_weight = spawnweight;
      }
      return sum + spawnweight;
    } else {
      return sum;
    }
  }, 0);

  return items.map(item => {
    const { spawnweight } = item;
    if (spawnweight === undefined) {
      return item as WithSpawnchance<T>;
    } else {
      return Object.assign({}, item, {
        spawnchance: spawnweight / spawnweight_sum,
        relative_weight: spawnweight / max_weight
      });
    }
  });
}
