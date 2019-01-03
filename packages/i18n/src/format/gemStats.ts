import baseRequiredLocaleDatas from '../requiredLocaleDatas';
import meta, { Skill } from '../translate/skill_meta';
import formatStats, { Fallback, Options, Stat } from './stats';

// args
export type GemId = string;

// return
export type Translation = string[];

export default function formatGemStats(
  gem_id: GemId,
  stats: Stat[],
  options: Partial<Options> = {},
) {
  const filter = findSkill(gem_id);

  return formatStats(stats, {
    ...options,
    fallback: Fallback.skip,
    start_file: filter.start_file,
  });
}

export function requiredLocaleDatas(gem_id: GemId) {
  const filter = findSkill(gem_id);

  return baseRequiredLocaleDatas([filter.start_file]);
}

function findSkill(id: GemId): Skill {
  const skill = meta.skills[id];

  if (skill === undefined) {
    // Fallback to gem_stat
    // most likely for supports
    return {
      filter: [],
      start_file: 'gem_stat_descriptions',
    };
  } else if (typeof skill === 'string') {
    return findSkill(skill);
  } else {
    return skill;
  }
}
