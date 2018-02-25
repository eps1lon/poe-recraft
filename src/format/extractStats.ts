import { inverseFactory } from '../localize/formatters';
import asRegexp from '../translate/asRegexp';
import { matchesTranslation } from '../translate/match';
import {
  Description,
  Descriptions,
  StatLocaleData,
  StatLocaleDatas,
  Translation
} from '../types/StatDescription';
import NamedGroupsRegexp from '../util/NamedGroupsRegexp';
import { deterministicValueForMatcher } from '../util/symbolicStats';
import { Stat } from './stats';

export type Options = {
  datas: StatLocaleDatas;
  start_file: string;
  break_on_first_match: boolean;
};

export default function extractStats(
  text: string,
  options: Partial<Options> = {}
): Stat[][] {
  const {
    datas = {},
    start_file = 'stat_descriptions',
    break_on_first_match = true
  } = options;

  const possible_matches = [] as Stat[][];

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
            possible_matches.push(stats);
          }
        }
      }
    }
  }

  return possible_matches;
}

function* getDescriptions(datas: StatLocaleDatas, start_file: string) {
  let description_file: StatLocaleData | undefined = datas[start_file];

  while (description_file !== undefined) {
    yield description_file.data;

    description_file = description_file.meta.include
      ? datas[description_file.meta.include]
      : undefined;
  }
}
