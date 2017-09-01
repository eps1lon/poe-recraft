// @flow
import type ValueRange from './ValueRange';

type Option = {
  and: string[],
  handles: {
    [mixed]: string
  },
  text: ?string
};

type Data = {
  [string]: {
    options: Option[],
    params: string[]
  }
};

type Range = [number, number];

export default class Localization {
  /**
   * replaces the params within the string with the given params
   */
  static fillString(string: ?string, params: Range[]): ?string {
    if (string == null) {
      return null;
    } else {
      return params.reduce((string, param, i) => {
        return string.replace(
          `{param_${i + 1}}`,
          Localization.rangeString(param)
        );
      }, string);
    }
  }

  /**
   * checks if values are within a range_string from the poe desc files 
   */
  static inRange(range_string: ?string, values: ?Range): boolean {
    if (range_string == null || values == null) {
      return false;
    } else {
      const range = range_string.split('|');
      const value = Math.max(...values);

      if (range.length === 1 && (+range[0] === +value || range[0] === '#')) {
        return true;
      } else {
        let [min, max] = range;

        if (min === '#') {
          min = Number.NEGATIVE_INFINITY;
        }
        if (max === '#') {
          max = Number.POSITIVE_INFINITY;
        }

        return +min <= +value && +value <= +max;
      }
    }
  }

  static rangeString(range: Range): string {
    if (range.length < 2 || range[0] === range[1]) {
      return range[0].toString();
    } else {
      return `(${range.join(' to ')})`;
    }
  }

  /**
   * lambdas  for parameter handles
   */
  static handles: {
    [mixed]: (number) => number
  } = {
    deciseconds_to_seconds: n => n * 10,
    divide_by_one_hundred: n => n / 100,
    per_minute_to_per_second: n => n / 60,
    milliseconds_to_seconds: n => n / 1000,
    negate: n => -n,
    divide_by_one_hundred_and_negate: n => -n / 100,
    old_leech_percent: n => n / 5,
    old_leech_permyriad: n => n / 50,
    per_minute_to_per_second_0dp: n => parseInt((n / 60).toPrecision(0), 10),
    per_minute_to_per_second_2dp: i => parseInt((i / 60).toPrecision(2), 10),
    // TODO what does "if_required" mean
    per_minute_to_per_second_2dp_if_required: n =>
      parseInt((n / 60).toPrecision(2), 10),
    milliseconds_to_seconds_0dp: n => parseInt((n / 1000).toPrecision(0), 10),
    milliseconds_to_seconds_2dp: n => parseInt((n / 1000).toPrecision(2), 10),
    multiplicative_damage_modifier: n => n,
    mod_value_to_item_class: n => n,
    '60%_of_value': n => n * 0.6
  };

  data: Data;

  constructor(data: {}) {
    this.data = data;
  }

  t(key: string, params: Range[]) {
    return Localization.fillString(
      this.lookupStringAndApplyHandles(key, params),
      params
    );
  }

  lookupStringAndApplyHandles(key: string, params: Range[]) {
    if (this.data[key] === undefined) {
      return null;
    } else {
      const used_option = this.data[key].options.find(option => {
        return option.and.every((range_string, j) => {
          return Localization.inRange(range_string, params[j]);
        });
      });

      if (used_option === undefined) {
        //console.log("no valid match for", this.data[key], "with", params);

        return null;
      } else {
        const handles_is_object =
          used_option.handles !== null &&
          typeof used_option.handles === 'object';

        if (handles_is_object) {
          for (const [i, handle_key] of Object.entries(used_option.handles)) {
            if (Localization.handles[handle_key] != null) {
              const param = params[+1 - 1];

              if (param != null) {
                params[+i - 1] = [
                  Localization.handles[handle_key](param[0]),
                  Localization.handles[handle_key](param[1])
                ];
              }
            } else {
              console.warn(`handle ${String(handle_key)} not defined`);
            }
          }
        }

        if (!used_option.text) {
          console.log(this.data[key], used_option);
        }

        return used_option.text;
      }
    }
  }
}
