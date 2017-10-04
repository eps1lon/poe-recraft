import { Match, matches } from './translate/match';
import printf from './translate/printf';
import {
  Description,
  StatLocaleData,
  Translation
} from './types/StatDescription';

// arg types
export type Stat = {
  id: string;
  value: number;
};

export type OptionalOptions = {
  data?: StatLocaleData;
  fallback?: Fallback | FallbackCallback;
};
// return type
export type TranslatedStats = string[];

export type FallbackCallback = (id: string, stat: Stat) => string | null;

export enum Fallback {
  throw, // throw if no stat was found
  id,
  skip
}
export type Options = {
  data?: StatLocaleData;
  fallback: Fallback | FallbackCallback;
};

const initial_options: Options = {
  data: undefined,
  fallback: Fallback.throw
};

export interface FormatStats {
  (stats: Stat[], options?: OptionalOptions): TranslatedStats;
  options: Options;
  configure(options: OptionalOptions): void;
}

const formatStats: FormatStats = Object.assign(
  (stats: Stat[], options: OptionalOptions = {}): TranslatedStats => {
    const { data, fallback } = Object.assign({}, formatStats.options, options);

    if (data === undefined) {
      throw new Error(
        'locale data not provided. Set it either via passed option or #configure'
      );
    }

    // translated lines
    const lines: string[] = [];
    // array of stat_ids for which hash lookup failed
    const untranslated: Map<string, Stat> = new Map(
      stats.map((stat: Stat) => [stat.id, stat] as [string, Stat])
    );

    lines.push(...formatWithFinder(untranslated, id => data[id]));

    lines.push(
      ...formatWithFinder(untranslated, id => findDescription(id, data))
    );

    lines.push(...formatWithFallback(untranslated, fallback));

    return lines;
  },
  {
    options: initial_options,
    configure: (options: OptionalOptions) => {
      formatStats.options = Object.assign({}, formatStats.options, options);
    }
  }
);

export default formatStats;

/**
 * O(n) lookup if hash lookup fails
 * 
 * @param stat_id 
 * @param locale_data 
 */
function findDescription(stat_id: string, locale_data: StatLocaleData) {
  return Object.values(locale_data).find(({ stats }) =>
    stats.includes(stat_id)
  );
}

const NO_DESCRIPTION = 'NO_DESCRIPTION';

// stats will get mutated
function formatWithFinder(
  stats: Map<string, Stat>,
  find: (stat_id: string) => Description | undefined
): string[] {
  const lines: string[] = [];

  for (const [stat_id, stat] of stats) {
    const description = find(stat_id);

    if (description !== undefined) {
      const translation = translate(description, stats);

      if (translation === undefined) {
        throw new Error(`matching translation not found for '${stat.id}'`);
      } else {
        // mark as translated
        description.stats.forEach(translated_id => stats.delete(translated_id));

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

function translate(
  description: Description,
  provided: Map<string, Stat>
): string | undefined {
  const { stats, no_description, translations } = description;

  if (no_description === true) {
    return NO_DESCRIPTION;
  }

  // intersect the required stat_ids from the desc with the provided
  const required_stats = stats
    .map(stat_id => {
      const stat = provided.get(stat_id);

      // default the value to 0
      if (stat === undefined) {
        return {
          id: stat_id,
          value: 0
        };
      } else {
        return stat;
      }
    })
    .filter((stat: Stat | null): stat is Stat => stat !== null);

  const translation = matchingTranslation(translations, required_stats);

  if (translation === undefined) {
    return undefined;
  } else {
    return printf(
      translation.text,
      required_stats.map(({ value }) => value),
      translation.formatters
    );
  }
}

function matchingTranslation(translations: Translation[], stats: Stat[]) {
  const args = stats.map(({ value }) => value);

  return translations.find(translation => {
    return matches(args, translation.matchers).every(
      match => match === Match.subset || match === Match.exact
    );
  });
}

function formatWithFallback(
  stats: Map<string, Stat>,
  fallback: Fallback | FallbackCallback
): string[] {
  if (fallback === Fallback.throw) {
    if (stats.size > 0) {
      throw new Error(
        'no descriptions found for ' + Array.from(stats.keys()).join(',')
      );
    } else {
      return [];
    }
  } else if (fallback === Fallback.id) {
    return Array.from(stats.keys());
  } else if (fallback === Fallback.skip) {
    return [];
  } else if (typeof fallback === 'function') {
    return Array.from(stats.entries())
      .map(([id, stat]) => fallback(id, stat))
      .filter((line): line is string => typeof line === 'string');
  } else {
    // should ts recognize that this is unreachable code? enums can prob
    // be extended at runtime an therfore somebody could mess with them
    throw new Error(`unrecognized fallback type '${fallback}'`);
  }
}
