import { Fallback, groupMods } from 'poe-i18n';
import { Mod } from 'poe-mods';
import * as React from 'react';

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
    { datas: descriptions, fallback: Fallback.skip }
  );

  // string not assignable to ReactElement so fallback to <em>
  return <>{translation}</>;
};

export default CorrectGroup;
