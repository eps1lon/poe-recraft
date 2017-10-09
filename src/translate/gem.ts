import formatStats, { Stat } from '../formatStats';
import { StatLocaleData } from '../types/StatDescription';

export type GemId = string;

export type Options = {
  data: Array<{}>;
};

export type Translation = {
  effects: string[];
};

export default function translate(id: GemId, stats: Stat[]): Translation {
  const displayed = filterStats(id, stats);

  return {
    effects: formatStats(displayed, { data: collectData(id) })
  };
}

function filterStats(id: GemId, stats: Stat[]): Stat[] {
  return stats;
}

function collectData(id: GemId): StatLocaleData {
  return {};
}
