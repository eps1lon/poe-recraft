// (1 to 2)-(3 to 4)
export type MinMaxValue = RollableValue | [RollableValue, RollableValue];
export type RollableValue = SingleValue | ValueRange;
export type SingleValue = number;
export type ValueRange = [SingleValue, SingleValue];
export interface AugmentableValue<V extends MinMaxValue = MinMaxValue> {
  value: V;
  augmented?: boolean;
}

export function augmentableNotZero(
  augmentable: AugmentableValue | undefined,
): augmentable is AugmentableValue {
  return augmentable !== undefined && valueNotZero(augmentable.value);
}

export function valueNotZero<T extends MinMaxValue>(
  value: T | undefined,
): value is T {
  return Array.isArray(value)
    ? valueNotZero(value[0]) || valueNotZero(value[1])
    : value !== undefined && value !== 0;
}

// support valuerange up to depth=2
// (2-3)-(4-5)
// first depth is for stats with min max
// second for rollable stat values
export function minMaxToString(
  value: MinMaxValue,
  format?: (n: number) => string,
): string {
  return Array.isArray(value)
    ? `${rollableToString(value[0], format)}-${rollableToString(
        value[1],
        format,
      )}`
    : `${value}`;
}

export function rollableToString(
  value: RollableValue,
  format: (n: number) => string = n => n.toString(),
): string {
  return Array.isArray(value)
    ? `(${format(value[0])} - ${format(value[1])})`
    : `${format(value)}`;
}
