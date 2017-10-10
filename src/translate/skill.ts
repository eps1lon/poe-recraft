import formatStats, { Fallback, Stat } from '../formatStats';
import loadLocaleDatas from '../loadLocaleDatas';
import { StatLocaleDatas } from '../types/StatDescription';
const meta: SkillMeta = require('./skill_meta.json');

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
  const filter = findSkill(skill_id);

  const { language } = options;

  return {
    effects: formatStats(stats, {
      datas: loadLocaleDatas(language, [filter.start_file]),
      fallback: Fallback.skip,
      start_file: filter.start_file
    })
  };
}

type Skill = {
  filter: string[];
  start_file: string;
};

type SkillMeta = {
  skills: {
    [key: string]: string | Skill;
  };
  groups: {
    [key: string]: string[];
  };
};

function findSkill(id: SkillId): Skill {
  const skill = meta.skills[id];

  if (skill === undefined) {
    throw new Error(`unrecognized skill '${id}'`);
  }

  if (typeof skill === 'string') {
    return findSkill(skill);
  } else {
    return skill;
  }
}
