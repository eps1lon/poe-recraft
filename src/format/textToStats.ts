import { inverseFactory } from '../localize/formatters';
import { asRegexp,  matchesTranslation, Stat } from '../translate';
import {
  Description,
  Descriptions,
  StatLocaleDatas,
  Translation
} from '../types/StatDescription';
import NamedGroupsRegexp from '../util/NamedGroupsRegexp';
import { deterministicValueForMatcher } from '../util/symbolicStats';
import { getDescriptions } from './util';

export type Options = {
  datas: StatLocaleDatas;
  start_file: string;
};

/**
 * finds every stat or list of stats that could produce this text with its values
 * 
 * use {textToStatsSingle} if you just want the first match
 * use {textToStatsArray} if you want the generator values as an array
 * 
 * @param text the stat text
 * @param options see type definition
 */
export default function* textToStats(
  text: string,
  options: Partial<Options> = {}
): IterableIterator<Stat[]> {
  const { datas = {}, start_file = 'stat_descriptions' } = options;

  for (const descriptions of getDescriptions(datas, start_file)) {
    for (const description of Object.values(descriptions)) {
      if (description.no_description) {
        continue;
      }

      for (const translation of description.translations) {
        const regexp = asRegexp(translation);

        const match = regexp.match(text);
        if (match !== null) {
          const stats = description.stats.map((stat_id, i) => {
            // arguments are 1-based
            const arg_index = String(i + 1);
            const matched_value = match[arg_index];
            const matcher = translation.matchers[i];
            let value: number = Number.NaN;

            if (matched_value !== undefined) {
              const formatter = translation.formatters.find(
                ({ arg }) => String(arg) === arg_index
              );

              if (formatter === undefined) {
                value = +matched_value;
              } else {
                value = inverseFactory(formatter.id)(matched_value);
                if (Number.isNaN(value)) {
                  // otherwise the return value would be equal to the case
                  // where the value is not contained in the text
                  throw new Error('int parsing returned NaN');
                }
              }
            } else if (typeof matcher === 'number') {
              // value is not contained in the text
              // guess (deterministically) a value for this instance
              // that would have produced that translation
              value = deterministicValueForMatcher(translation.matchers[i]);
            }

            return {
              id: stat_id,
              value
            };
          });

          if (
            matchesTranslation(translation, stats.map(({ value }) => value))
          ) {
            yield stats;
          }
        }
      }
    }
  }
}

/**
 * @see {textToStats} as array
 * 
 * @param text 
 * @param options 
 */
export function textToStatsArray(text: string, options: Partial<Options> = {}) {
  return Array.from(textToStats(text, options));
}

/**
 * only first match of  @see {textToStats} but throws if none was found
 * 
 * @param text 
 * @param options 
 */
export function textToStatsFirst(
  text: string,
  options: Partial<Options> = {}
): Stat[] {
  const { done, value } = textToStats(text, options).next();

  if (done) {
    throw new Error('Could match a single stat');
  }
  return value;
}
