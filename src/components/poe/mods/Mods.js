// @flow
import React from 'react';

import type Mod from '../../../poe/Mod/';

export type Props = {
  className: string,
  mods: Mod[]
};

// TODO remove handle
// TODO translate mod
// TODO mod.serialize.klass
const Mods = ({ className, mods }: Props) => {
  return (
    <ul className={`mods ${className}`}>
      {mods.map(mod => {
        const stats = [];

        return (
          <li
            key={mod.props.primary}
            className={`mod mod-type-${String(mod.modType())}`}
          >
            <em className="name">{mod.name()}</em>
            <button className="remove_mod" type="button">
              Remove
            </button>
            <ul className="stats">{stats}</ul>
          </li>
        );
      })}
    </ul>
  );
};

export default Mods;