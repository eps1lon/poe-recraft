import { matches } from './translate/match';
import printf from './translate/printf';
import {
  Description,
  StatLocaleData,
  Translation
} from './types/StatDescription';

export type Stat = {
  id: string;
  value: number;
};
type Options = {};
export type TranslatedStats = string[];

export default function formatStats(
  stats: Stat[],
  locale_data: StatLocaleData
): TranslatedStats {
  // translated lines
  const lines: string[] = [];
  // array of stat_ids for which hash lookup failed
  const untranslated: Map<string, Stat> = new Map(
    stats.map((stat: Stat) => [stat.id, stat] as [string, Stat])
  );

  lines.push(...formatWithFinder(untranslated, id => locale_data[id]));

  lines.push(
    ...formatWithFinder(untranslated, id => findDescription(id, locale_data))
  );

  if (untranslated.size > 0) {
    throw new Error(
      'no descriptions found for ' + Array.from(untranslated.keys()).join(',')
    );
  }

  return lines;
}

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
        throw new Error(`matching translation not found for ${stat.id}`);
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
  const required_stats = stats.map(stat_id => {
    const stat = provided.get(stat_id);

    if (stat === undefined) {
      throw new Error(
        `stat '${stat_id}' required for translation not provided`
      );
    }

    return stat;
  });

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

  return translations.find(translation => matches(translation.matchers, args));
}
