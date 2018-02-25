// test utilities
import { Matcher, Description } from '../types/StatDescription';
import { Stat } from '../format/stats';

export function deterministicValueForMatcher(matcher: Matcher): number {
  if (Array.isArray(matcher)) {
    const [min, max] = matcher;
    if (min === '#' && max === '#') {
      return 0;
    } else if (min === '#' && max !== '#') {
      return max;
    } else if (min !== '#' && max === '#') {
      return min;
    } else if (min !== '#' && max !== '#') {
      return ~((max - min) / 2);
    } else {
      throw new Error('ts never');
    }
  } else if (matcher === '#') {
    return 0;
  } else {
    return matcher;
  }
}

// builds random stats matching every single translation of the description
export function buildRandomStats(description: Description) {
  if (description.no_description) {
    return null;
  }

  return description.translations.map(({ matchers }) => {
    return description.stats.map((stat_id, i) => {
      return {
        id: stat_id,
        // division by 60 can produce nasty rounding errors
        value: randomNumberForMatcher(matchers[i])
      } as Stat;
    });
  });
}

function randomNumberForMatcher(
  matcher: Matcher,
  step: number = 1,
  precision: number = 0
): number {
  if (Array.isArray(matcher)) {
    const [min, max] = matcher;
    if (min === '#' && max === '#') {
      return randomNumberForMatcher('#', step, precision);
    } else if (min === '#' && max !== '#') {
      return randomNumber({ precision, max });
    } else if (min !== '#' && max === '#') {
      return randomNumber({ precision, min });
    } else if (min !== '#' && max !== '#') {
      return randomNumber({ precision, min, max, step });
    } else {
      throw new Error('ts never');
    }
  } else if (matcher === '#') {
    return randomNumber({ precision, max: -1, step });
  } else {
    return matcher;
  }
}

interface Domain {
  min: number;
  max: number;
  precision: number;
  step: number;
}

function randomNumber(domain: Partial<Domain> = {}): number {
  const { min = 1 << 31, max = 2 ** 31 - 1, precision = 0, step = 1 } = domain;
  const range = Math.abs(max - min);

  const rand = Math.random();
  const n = +(rand * range + min);

  return +(n - +(n % step).toFixed(precision)).toFixed(precision);
}
