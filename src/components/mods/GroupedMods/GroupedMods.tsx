import { Mod } from 'poe-mods';
import React, { SFC } from 'react';
import classnames from 'classnames';

import UngroupedMods from 'containers/mods/UngroupedMods';
import CorrectGroup from 'containers/i18n/CorrectGroup';

import { GeneratorDetails } from '../ModsTable';
import './style.css';

export type Props = {
  className: string;
  groups: Map<string, { details: GeneratorDetails[]; disabled: boolean }>;
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
      {Array.from(groups.entries()).map(([group, { details, disabled }]) => {
        const mods = details.map(({ mod }) => mod);

        return (
          <>
            <h5
              className={classnames('correct-group', { disabled })}
              onClick={() => onGroupClick(group)}
            >
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
