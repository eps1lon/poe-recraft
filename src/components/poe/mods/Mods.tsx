import { Mod } from 'poe-mods';
import React, { SFC } from 'react';

export type Props = {
  className: string;
  mods: Mod[];
  onRemoveMod: (mod: Mod) => any;
};

// TODO remove handle
// TODO translate mod
// TODO mod.serialize.klass
const Mods: SFC<Props> = ({ className, mods, onRemoveMod }) => {
  return (
    <ul className={`mods ${className}`}>
      {mods.map(mod => {
        // TODO stays empty?
        const stats: any[] = [];

        return (
          <li
            key={mod.props.id}
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
