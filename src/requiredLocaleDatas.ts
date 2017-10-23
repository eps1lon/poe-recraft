const dependencies = require('./translate/descriptions_dependency.json');
import { FormatStats } from './formatStats';
import { StatLocaleData, StatLocaleDatas } from './types/StatDescription';

export default function requiredLocaleDatas(files: string[]): string[] {
  const datas = [...files];
  const queued = [...files]; // clone

  while (queued.length > 0) {
    const file = queued.shift()!;
    const include = dependencies[file];

    if (include) {
      queued.push(include);
      datas.push(include);
    }
  }

  return datas;
}

export function requiredLocaleDatasFor(formatStats: FormatStats) {
  return requiredLocaleDatas([formatStats.options.start_file]);
}
