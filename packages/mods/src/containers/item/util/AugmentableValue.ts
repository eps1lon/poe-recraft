/**
 * a numeric value that was augmented in some way
 *
 * {augmented} is true if the the base value was changed to {value}
 */
export default interface AugmentableValue {
  value: number | [number, number];
  augmented: boolean;
}

export function isZero(
  augmentable: { value: AugmentableValue['value'] } | null | undefined,
): boolean {
  if (augmentable == null) {
    return true;
  }
  const { value } = augmentable;

  return (
    value === 0 || (Array.isArray(value) && value[0] === 0 && value[1] === 0)
  );
}

export function anyCmp(
  augmentable: { value: AugmentableValue['value'] },
  cmp: (n: number) => boolean,
): boolean {
  const { value } = augmentable;

  if (typeof value === 'number') {
    return cmp(value);
  } else {
    return value.some(cmp);
  }
}
