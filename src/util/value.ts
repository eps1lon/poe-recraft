export type Value = SingleValue | ValueRange;
export type SingleValue = number;
export type ValueRange = [SingleValue, SingleValue];
export interface AugmentableValue<V extends Value = Value> {
  value: V;
  augmented?: boolean;
}

export function augmentableNotZero(
  augmentable: AugmentableValue | undefined,
): augmentable is AugmentableValue {
  return augmentable !== undefined && !isZero(augmentable.value);
}

export function isZero(value?: Value) {
  return Array.isArray(value) ? value[0] === 0 && value[1] === 0 : value === 0;
}

export function toString(value: Value, delim = '-') {
  return Array.isArray(value) ? `${value[0]}${delim}${value[1]}` : `${value}`;
}
