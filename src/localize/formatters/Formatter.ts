/**
 * formats a given numberic value to string
 */
export default interface Formatter {
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
  /**
   * RegExp to match the value in the formatted string
   */
  regexp: string;
}