/**
 * a numeric value that was augmented in some way
 *
 * {augmented} is true if the the base value was changed to {value}
 */
export default interface AugmentableValue {
  value: number | [number, number];
  augmented: boolean;
}
