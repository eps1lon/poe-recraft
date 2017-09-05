// @flow
import React from 'react';

import type Mod from '../../poe/Mod/';

export type Props = {
  mods: Mod[]
};

const UngroupedMods = ({ mods }: Props) => {
  return (
    <tbody className="ungrouped_mods">
      <tr />
    </tbody>
  );
};

export default UngroupedMods;
