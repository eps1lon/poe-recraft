// rounding like ingame = round down
// double => int
export function round(n: number): number {
  return Math.floor(n);
}

// expects a hole number
// base numbers are always integers
// increases/reduction work on intermediate floats
// display/calculations with those numbers is done by {round}
export function asPercentString(n: number, precision = 0): string {
  if (precision < 1) {
    return n.toString();
  } else {
    return (n / 10 ** precision).toFixed(precision);
  }
}
