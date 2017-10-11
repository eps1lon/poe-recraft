import formatStats, { Fallback, Stat } from './formatStats';
import loadLocaleDatas from './loadLocaleDatas';
import meta, { Skill } from './translate/skill_meta';
import { StatLocaleDatas } from './types/StatDescription';

// args
export type GemId = string;
export type OptionalOptions = {
  code?: string;
};

// return
export type Translation = string[];

export default function formatGemStats(
  gem_id: GemId,
  stats: Stat[],
  options: OptionalOptions = {}
): Translation {
  const filter = findSkill(gem_id);

  const { code } = Object.assign({ code: 'en', options });

  return formatStats(stats, {
    datas: loadLocaleDatas(code, [filter.start_file]),
    fallback: Fallback.skip,
    start_file: filter.start_file
  });
}

function findSkill(id: GemId): Skill {
  const skill = meta.skills[id];

  if (skill === undefined) {
    // Fallback to gem_stat
    // most likely for supports
    return {
      filter: [],
      start_file: 'gem_stat_descriptions'
    };
  } else if (typeof skill === 'string') {
    return findSkill(skill);
  } else {
    return skill;
  }
}
