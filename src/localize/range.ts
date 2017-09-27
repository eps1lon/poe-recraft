type Range = [number, number];

export default function localize(range: Range): string {
  return `${range[0]} - ${range[1]}`;
}
