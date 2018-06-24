import { formatValue } from 'poe-i18n';
import { InjectedIntlProps } from 'react-intl';
// (1 to 2)-(3 to 4)
export type MinMaxValue = [RollableValue, RollableValue];
export type RollableValue = SingleValue | ValueRange;
export type SingleValue = number;
export type ValueRange = [SingleValue, SingleValue];
export type MinMaxValueLike = MinMaxValue | SingleValue;
export interface AugmentableValue<V extends MinMaxValueLike = MinMaxValueLike> {
  value: V;
  augmented?: boolean;
}

export function augmentableNotZero<T extends MinMaxValueLike>(
  augmentable: AugmentableValue<T> | undefined,
): augmentable is AugmentableValue<T> {
  return augmentable !== undefined && valueNotZero(augmentable.value);
}

export function valueNotZero<T extends MinMaxValueLike>(
  value: T | undefined,
): value is T {
  return Array.isArray(value)
    ? valueNotZero(value[0]) || valueNotZero(value[1])
    : value !== undefined && value !== 0;
}

export const ROLLABLE_VALUE_MESSAGE = `({min}–{max})`;
export const MIN_MAX_VALUE_SHORT_MESSAGE = `{min}–{max}`;

type FormatMessage = InjectedIntlProps['intl']['formatMessage'];
export function minMaxToString(
  value: MinMaxValue,
  formatMessage: FormatMessage,
): string {
  return formatMessage(
    {
      id: 'poe.api.{RANGE1} to {RANGE2}',
      defaultMessage: '{RANGE1} to {RANGE2}',
    },
    {
      RANGE1: formatValue(value[0], { message: ROLLABLE_VALUE_MESSAGE }),
      RANGE2: formatValue(value[1], { message: ROLLABLE_VALUE_MESSAGE }),
    },
  );
}
