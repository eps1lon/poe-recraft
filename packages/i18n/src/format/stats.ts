import translate, { NO_DESCRIPTION, Stat } from '../translate';
import { ICUMessageSyntax } from '../types/intl';
import {
  Description,
  Descriptions,
  StatLocaleData,
  StatLocaleDatas,
  Translation,
} from '../types/StatDescription';
import { isZero } from '../types/StatValue';

// arg types
export { Stat } from '../translate';
export const DEFAULT_RANGE_MESSAGE = '({min}–{max})';
export type Options = {
  datas: StatLocaleDatas;
  fallback: Fallback | FallbackCallback;
  start_file: string;
  getFormatters: (
    t: Translation,
    stat: Stat,
    n: number,
  ) => Translation['formatters'];
  /**
   * if a stat value is rollable (i.e. has a min and max value)
   * default: {DEFAULT_RANGE_MESSAGE}
   */
  range_message: ICUMessageSyntax;
};
// return type
export type TranslatedStats = string[];

export type FallbackCallback = (id: string, stat: Stat) => string | null;

export class NoDescriptionFound extends Error {
  constructor(stats: Stat[]) {
    super('no descriptions found for ' + stats.map(({ id }) => id).join(','));
  }
}
export enum Fallback {
  throw, // throw if no stat was found
  id,
  skip,
}

const initial_options: Options = {
  datas: {},
  fallback: Fallback.throw,
  start_file: 'stat_descriptions',
  getFormatters: t => t.formatters,
  range_message: DEFAULT_RANGE_MESSAGE,
};

const formatStats = (
  stats: Stat[],
  options: Partial<Options> = {},
): TranslatedStats => {
  const {
    datas,
    fallback,
    start_file,
    getFormatters,
    range_message,
  } = Object.assign({}, initial_options, options);

  // translated lines
  const lines: string[] = [];
  // array of stat_ids for which hash lookup failed
  const untranslated: Map<string, Stat> = new Map(
    stats.map((stat: Stat) => [stat.id, stat] as [string, Stat]),
  );

  let description_file: StatLocaleData | undefined = datas[start_file];

  while (description_file !== undefined) {
    const data: Descriptions = description_file.data;

    for (const descriptionFinder of createDescriptionFindStrategies(data)) {
      lines.push(
        ...formatWithFinder(untranslated, descriptionFinder, {
          getFormatters,
          range_message,
        }),
      );
    }

    description_file = description_file.meta.include
      ? datas[description_file.meta.include]
      : undefined;
  }

  lines.push(...formatWithFallback(untranslated, fallback));

  return lines;
};

export default formatStats;

/**
 * creates an array of methods that can be used to find a description for a
 * given stat.
 *
 * return value is to be interpreted as a priority queue
 * @param descriptions
 */
export function createDescriptionFindStrategies(
  descriptions: Descriptions,
): Array<(stat: Stat) => Description | undefined> {
  return [
    ({ id }) => descriptions[id],
    ({ id }) =>
      Object.values(descriptions).find(({ stats }) => stats.includes(id)),
  ];
}

// stats will get mutated
interface FormatWithFinderOptions {
  getFormatters: (
    t: Translation,
    stat: Stat,
    n: number,
  ) => Translation['formatters'];
  range_message: ICUMessageSyntax;
}
function formatWithFinder(
  stats: Map<string, Stat>,
  find: (stat: Stat) => Description | undefined,
  options: Partial<FormatWithFinderOptions> = {},
): string[] {
  const {
    getFormatters = (t: Translation) => t.formatters,
    range_message = DEFAULT_RANGE_MESSAGE,
  } = options;
  const lines: string[] = [];
  const translated: Set<string> = new Set();

  for (const [stat_id, stat] of Array.from(stats.entries())) {
    if (translated.has(stat_id)) {
      continue;
    }

    const description = find(stat);

    if (description !== undefined) {
      const translation = translate(
        description,
        stats,
        (t: Translation, n) => getFormatters(t, stat, n),
        range_message,
      );

      if (translation === undefined) {
        const requiredStatsAreZero = requiredStats(description, stats).every(
          ({ value }) => isZero(value),
        );

        if (!requiredStatsAreZero) {
          throw new Error(`matching translation not found for '${stat.id}'`);
        }
      } else {
        // mark as translated
        description.stats.forEach(translated_id => {
          stats.delete(translated_id);
          translated.add(translated_id);
        });

        if (translation === NO_DESCRIPTION) {
          lines.push(`${stat_id} (hidden)`);
        } else {
          lines.push(translation);
        }
      }
    }
  }

  return lines;
}

function requiredStats(
  description: Description,
  provided: Map<string, Stat>,
): Stat[] {
  // intersect the required stat_ids from the desc with the provided
  return description.stats
    .map(stat_id => {
      const stat = provided.get(stat_id);

      // default the value to 0
      if (stat === undefined) {
        return {
          id: stat_id,
          value: 0,
        };
      } else {
        return stat;
      }
    })
    .filter((stat: Stat | null): stat is Stat => stat !== null);
}

function formatWithFallback(
  stats: Map<string, Stat>,
  fallback: Fallback | FallbackCallback,
): string[] {
  const non_zero_stats = Array.from(stats.entries()).filter(
    ([, stat]) => !isZero(stat.value),
  );
  if (non_zero_stats.length === 0) {
    return [];
  }

  if (fallback === Fallback.throw) {
    if (stats.size > 0) {
      throw new NoDescriptionFound(non_zero_stats.map(([, stat]) => stat));
    } else {
      return [];
    }
  } else if (fallback === Fallback.id) {
    return non_zero_stats.map(([key]) => key);
  } else if (fallback === Fallback.skip) {
    return [];
  } else if (typeof fallback === 'function') {
    return non_zero_stats
      .map(([id, stat]) => fallback(id, stat))
      .filter((line): line is string => typeof line === 'string');
  } else {
    // should ts recognize that this is unreachable code? enums can prob
    // be extended at runtime an therfore somebody could mess with them
    throw new Error(`unrecognized fallback type '${fallback}'`);
  }
}
