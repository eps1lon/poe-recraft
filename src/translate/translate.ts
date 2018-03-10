import { Description, Translation } from '../types/StatDescription';
import { matchesTranslation } from './match';
import printf from './printf';

export type Stat = {
  id: string;
  value: number | [number, number];
  alias?: string;
};

export const NO_DESCRIPTION = 'NO_DESCRIPTION';
export default function translate(
  description: Description,
  provided: Map<string, Stat>,
  /**
   * @param t 
   * @param count {number} number of params 
   */
  getFormatters: (
    t: Translation,
    count: number
  ) => Translation['formatters'] = t => t.formatters
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
      getFormatters(translation, required_stats.length)
    );
  }
}

function matchingTranslation(translations: Translation[], stats: Stat[]) {
  const args = stats.map(({ value }) => value);

  return translations.find(translation => {
    return matchesTranslation(translation, args);
  });
}
