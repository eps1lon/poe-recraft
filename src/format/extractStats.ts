import { Match, matches } from '../translate/match';
import { inverseFactory } from '../localize/formatters';
import { Stat } from './stats';
import {
  Description,
  Descriptions,
  StatLocaleData,
  StatLocaleDatas,
  Translation
} from '../types/StatDescription';
import asRegexp from '../translate/asRegexp';
import NamedGroupsRegexp from '../util/NamedGroupsRegexp';

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
        console.log(regexp.toString(), text);

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

function entries<V>(keys: string[], values: V[]): [string, V][] {
  if (keys.length !== values.length) {
    throw new Error('keys and values must have equal length');
  }

  return Array.from(
    { length: keys.length },
    (_, i) => [keys[i], values[i]] as [string, V]
  );
}

function entriesToObject<V>(entries: [string, V][]): { [key: string]: V } {
  return entries.reduce(
    (obj, [key, value]) => {
      obj[key] = value;
      return obj;
    },
    {} as { [key: string]: V }
  );
}
