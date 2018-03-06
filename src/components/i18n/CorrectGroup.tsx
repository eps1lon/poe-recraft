import * as React from 'react';
import { groupMods } from 'poe-i18n';
import { Mod } from 'poe-mods';

export interface Props {
  descriptions: {};
  mods: Mod[];
}

const CorrectGroup: React.SFC<Props> = ({ descriptions, mods }) => {
  const translation = groupMods(
    mods.map(mod =>
      mod
        .statsJoined()
        .map(stat => ({ id: stat.props.id, value: stat.values.valueOf() }))
    ),
    { datas: descriptions }
  );

  // string not assignable to ReactElement so fallback to <em>
  return <em>{translation}</em>;
};

export default CorrectGroup;
