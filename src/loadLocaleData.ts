import { FormatStats } from './formatStats';
import { StatLocaleData, StatLocaleDatas } from './types/StatDescription';

export default function loadLocaleDatas(code: string, files: string[]) {
  const datas: StatLocaleDatas = {};
  const queued = [...files]; // clone

  while (queued.length > 0) {
    const file = queued.shift();

    if (datas[file] === undefined) {
      const data: StatLocaleData = require(`../locale-data/${code}/${file}.json`);

      datas[file] = data;

      if (data.meta.include !== undefined) {
        queued.push(data.meta.include);
      }
    }
  }

  return datas;
}

export function loadLocaleDatasFor(code: string, formatStats: FormatStats) {
  return loadLocaleDatas(code, [formatStats.options.start_file]);
}
