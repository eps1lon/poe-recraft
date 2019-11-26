import formatStats, { Options as FormatStatsOptions, Stat } from './stats';

// arg types
export { Stat } from './stats';

export type Options = {
  resolveWordConflict: (words: string[]) => string;
} & FormatStatsOptions;

/**
 * tries to find a string that describes the given mods
 *
 * given a list of mods where a mod consists of at least one stat
 * get a translation t of that mod and consider it a row
 * split t into words and consider every word as a column
 * collapse the table into a single row
 * columns with different words get resolved by a given strategy
 *
 *
 *
 * Adds # to Fire Gems
 * Adds # to Cold Gems
 * ----
 * Adds # to * Gems
 *
 * @param mods
 * @param options
 */
export default function groupMod(
  mods: Stat[][],
  options: Partial<Options> = {},
): string {
  // default options
  const { resolveWordConflict = () => '*', ...format_stats_options } = options;

  // reduce mods to array
  const translations: string[][] = [];
  for (const mod of mods) {
    translations.push(groupStats(mod, format_stats_options).split(' '));
  }

  return collapseTable(translations, resolveWordConflict)
    .join(' ')
    .replace(/\*( \*)*/, '*');
}

function groupStats(
  stats: Stat[],
  options: Partial<FormatStatsOptions> = {},
): string {
  const lines = formatStats(stats, {
    ...options,
    getFormatters: (_t, _s, n) => {
      return Array.from({ length: n }, (_, i) => ({
        arg: i + 1,
        id: 'placeholder',
      }));
    },
  });

  // collapes value ranges into single placeholder
  return lines.map(line => line.replace(/\(# - #\)/g, '#')).join(' / ');
}

function collapseTable<T>(
  table: T[][],
  resolveColumnConflict: (items: T[]) => T,
): T[] {
  if (table.length < 1) {
    return [];
  }

  const column_count = table[0].length;

  // rows to columns
  const columns: Array<Set<T>> = new Array(column_count);
  for (let j = 0; j < column_count; ++j) {
    columns[j] = table.reduce((column, row) => {
      return column.add(row[j]);
    }, new Set<T>());
  }

  return columns.map(column => {
    if (column.size > 1) {
      return resolveColumnConflict(Array.from(column));
    } else {
      return column.values().next().value;
    }
  });
}
