// @flow
import type { Mod } from 'poe-mods/lib/mods';
import React from 'react';

export type Props = {
  className: string,
  mods: Mod[],
  onRemoveMod: (mod: Mod) => mixed
};

// TODO remove handle
// TODO translate mod
// TODO mod.serialize.klass
const Mods = ({ className, mods, onRemoveMod }: Props) => {
  return (
    <ul className={`mods ${className}`}>
      {mods.map(mod => {
        const stats = [];

        return (
          <li
            key={mod.props.primary}
            className={`mod mod-type-${String(mod.modType())}`}
          >
            <em className="name">{mod.props.name}</em>
            <button className="remove_mod" onClick={() => onRemoveMod(mod)}>
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
