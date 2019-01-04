import { Mod as PoeMod } from 'poe-mods';
import React, { SFC } from 'react';

import Mod from './Mod';

export interface Props {
  className: string;
  mods: PoeMod[];
  onRemoveMod: (mod: PoeMod) => void;
}

const Mods: SFC<Props> = ({ className, mods, onRemoveMod }) => {
  return (
    <ul className={`mods ${className}`}>
      {mods.map(mod => {
        return <Mod key={mod.props.id} mod={mod} onRemoveClick={onRemoveMod} />;
      })}
    </ul>
  );
};

export default Mods;
