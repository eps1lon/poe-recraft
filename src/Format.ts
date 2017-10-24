import formatGemStats, { GemId } from './format/gemStats';
import formatStats, { Stat } from './format/stats';
import { StatLocaleDatas } from './types/StatDescription';

export enum Fallback {
  throw, // throw if no stat was found
  id,
  skip
}

export type Options = {
  datas: StatLocaleDatas;
  fallback: Fallback;
  start_file: string;
};

export class Format {
  private options: Options = {
    datas: {} as StatLocaleDatas,
    fallback: Fallback.throw,
    start_file: 'stat_descriptions'
  };

  public configure(options: Partial<Options>): void {
    this.options = {
      ...this.options,
      ...options
    };
  }

  public stats(stats: Stat[]) {
    return formatStats(stats, this.options);
  }

  public gemStats(gem_id: GemId, stats: Stat[]) {
    return formatGemStats(gem_id, stats, this.options);
  }
}

export default new Format();
