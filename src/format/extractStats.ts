import { inverseFactory } from '../localize/formatters';
import asRegexp from '../translate/asRegexp';
import { Match, matches } from '../translate/match';
import {
  Description,
  Descriptions,
  StatLocaleData,
  StatLocaleDatas,
  Translation
} from '../types/StatDescription';
import NamedGroupsRegexp from '../util/NamedGroupsRegexp';
import { Stat } from './stats';

export type Options = {
  datas: StatLocaleDatas;
  start_file: string;
};

export default function extractStats(
  text: string,
  options: Partial<Options> = {}
): Stat[] {
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
          return description.stats.map((stat_id, i) => {
            // arguments are 1-based
            const arg_index = String(i + 1);
            const matched_value = match[arg_index];
            let value: number = Number.NaN;

            if (matched_value !== undefined) {
              const formatter = translation.formatters.find(
                ({ arg }) => arg === arg_index
              );

              if (formatter === undefined) {
                value = +matched_value;
              } else {
                value = inverseFactory(formatter.id)(matched_value);
              }
            } else {
              // the value was not displayed in the text
              // TODO generate value from matcher
              // for now assume NaN to be "type safe"
            }

            return {
              id: stat_id,
              value
            };
          });
        }
      }
    }
  }

  // TODO improve error reporting
  throw new Error('Could not extract stat.');
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
