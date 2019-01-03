/**
 * formats a given numberic value to string
 */
export default interface Formatter {
  /**
   * if the formatter changes the display sign
   *
   * this is useful if we want to display a range
   * passing [-10, -5] to negate would result in ['10', '5'] and result in
   * "10–5" so if negates is true we would need to rearange it to [max, min]
   */
  negates: boolean;
  /**
   * RegExp to match the value in the formatted string
   */
  regexp: string;
  /**
   *
   * @param n
   */
  format(n: number): string;
  /**
   * inverse of #format
   * @param s returnval from #format()
   */
  inverse(s: string): number;
}
