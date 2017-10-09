import formatStats, { Fallback, Stat } from '../formatStats';
import loadLocaleDatas from '../loadLocaleDatas';
import { StatLocaleDatas } from '../types/StatDescription';
const skill_filter: SkillFilter = require('./skill_filter.json');

// args
export type SkillId = string;
export type OptionalOptions = {
  language?: string;
};

// return
export type Translation = {
  effects: string[];
};

export default function translate(
  skill_id: SkillId,
  stats: Stat[],
  options: OptionalOptions = {}
): Translation {
  const filter = findFilter(skill_id);

  const { language } = options;

  return {
    effects: formatStats(stats, {
      datas: loadLocaleDatas(language, [filter.start_file]),
      fallback: Fallback.skip,
      start_file: filter.start_file
    })
  };
}

type Filter = {
  filter: string[];
  start_file: string;
};

type SkillFilter = {
  filters: {
    [key: string]: string | Filter;
  };
  groups: {
    [key: string]: string[];
  };
};

function findFilter(id: SkillId): Filter {
  const filter = skill_filter.filters[id];

  if (filter === undefined) {
    throw new Error(`unrecognized skill '${id}'`);
  }

  if (typeof filter === 'string') {
    return findFilter(filter);
  } else {
    return filter;
  }
}
