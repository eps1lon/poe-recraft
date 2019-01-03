import formatGemStats, { GemId } from './format/gemStats';
import groupMods from './format/groupMods';
import formatStats, { Stat } from './format/stats';
import textToStats, {
  Options as TextToStatsOptions
} from './format/textToStats';
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

export default class Format {
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

  public groupMods(mods: Stat[][]) {
    return groupMods(mods, this.options);
  }

  public textToStats(text: string, options: Partial<TextToStatsOptions> = {}) {
    const { datas, start_file } = this.options;
    return textToStats(text, {
      datas,
      start_file,
      ...options
    });
  }
}
