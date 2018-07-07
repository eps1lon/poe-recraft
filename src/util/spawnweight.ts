export type WithSpawnchance<T extends object> = T & {
  spawnchance?: number;
  relative_weight?: number;
};
export interface WitSpawnchanceOptions<T> {
  filter: (item: T) => boolean;
}
/**
 * given a list with objects that have a weight calculate the spawnchance in %
 * adds a `relative_weight` property that describes the relation between the weight
 * and the max weight
 */
export function withSpawnchance<T extends { spawnweight?: number }>(
  items: T[],
  options: Partial<WitSpawnchanceOptions<T>> = {}
): Array<WithSpawnchance<T>> {
  const { filter = filterNone } = options;

  let max_weight = Number.NEGATIVE_INFINITY;
  const spawnweight_sum = items
    .filter(filter)
    .reduce((sum, { spawnweight }) => {
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
    } else if (!filter(item)) {
      return Object.assign({}, item, {
        spawnchance: 0,
        relative_weight: 0
      });
    } else {
      return Object.assign({}, item, {
        spawnchance: spawnweight / spawnweight_sum,
        relative_weight: spawnweight / max_weight
      });
    }
  });
}

/**
 * a callback for Array.prototype.filter that does not filter any item
 */
function filterNone() {
  return true;
}
