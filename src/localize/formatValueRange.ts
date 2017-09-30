import formatValue from './formatValue';

type Options = {};

export default function formatValueRange(
  values: [number, number],
  options: Options
): string {
  return `${formatValue(values[0], options)} - ${formatValue(
    values[1],
    options
  )}`;
}
