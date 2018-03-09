import { Mod } from 'poe-mods';
import React, { SFC } from 'react';

import UngroupedMods from 'containers/mods/UngroupedMods';
import CorrectGroup from 'containers/i18n/CorrectGroup';

import { GeneratorDetails } from './ModsTable';

export type Props = {
  className: string;
  groups: Map<string, GeneratorDetails[]>;
  options: {};
  isExpanded: (id: string) => boolean;
  onGroupClick: (id: string) => any;
};

const default_props = {
  isExpanded: () => false,
  options: {},
  onGroupClick: () => undefined
};

// TODO spawnchance, flags, mod#t
const GroupedMods: SFC<Props> = props => {
  const { className, groups, onGroupClick, isExpanded } = props;

  return (
    <>
      {Array.from(groups.entries()).map(([group, details]) => {
        const mods = details.map(({ mod }) => mod);

        return (
          <>
            <h5 onClick={() => onGroupClick(group)}>
              <CorrectGroup mods={mods} />
            </h5>
            {isExpanded(group) && (
              <UngroupedMods className={className} details={details} />
            )}
          </>
        );
      })}
    </>
  );
};

GroupedMods.defaultProps = default_props;

export default GroupedMods;
