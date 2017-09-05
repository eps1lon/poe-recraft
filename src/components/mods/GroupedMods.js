// @flow
import React from 'react';

import type Mod from '../../poe/Mod/';
import RollableMod from '../../poe/Mod/RollableMod';

export type Props = {
  mods: Mod[]
};

const groupMods = (mods: Mod[]): Map<string, Mod[]> => {
  const groups: Map<string, Mod[]> = new Map();

  for (const mod of mods) {
    const group = mod.props.correct_group;

    let grouped_mods = groups.get(group);

    if (!Array.isArray(grouped_mods)) {
      grouped_mods = [];
      groups.set(group, grouped_mods);
    }

    // mutate
    grouped_mods.push(mod);
  }

  return groups;
};

// TODO spawnchance, flags, mod#t
const GroupedMods = ({ mods }: Props) => {
  const groups = groupMods(mods);

  return Array.from(groups).map(([group, mods]) => {
    return [
      <tbody
        key="group"
        className="correct_group not_rollable tablesorter-no-sort"
      >
        <tr>
          <th colspan="5" className="correct_group">
            {group}
          </th>
        </tr>
      </tbody>,
      <tbody key="mods" className="mods">
        {mods.map(mod => {
          return (
            <tr id={mod.domId()} className="mod applicable">
              <td className="ilvl">{mod.props.level}</td>
              <td className="stats">{mod.props.stats.map(stat => stat.id)}</td>
              <td className="name">{mod.name()}</td>
              <td className="spawn_chance">{0}</td>
              <td>
                <button type="button" className="add_mod">
                  add
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    ];
  });
};

export default GroupedMods;
