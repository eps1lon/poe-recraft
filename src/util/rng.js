// @flow
import _ from 'lodash';

export function random(min: number, max: number) {
  return _.random(min, max);
}

export function choose<T>(pool: T[], getWeight: T => number): ?T {
  const sum_spawnweight = pool.reduce((sum, item) => sum + getWeight(item), 0);

  let min_spawnweight = 0;

  // roll a number between 0 and the sum of all weights
  const hit = random(min_spawnweight, sum_spawnweight);

  // the chosen option is the one where hit
  // in [sum_of_prev_weights, sum_of_prev_weights  + own_spawnweigh]
  const item = pool.find(other => {
    min_spawnweight += getWeight(other);

    return hit <= min_spawnweight;
  });

  return item;
}
