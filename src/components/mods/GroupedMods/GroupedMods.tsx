import classnames from 'classnames';
import { Mod } from 'poe-mods';
import React, { SFC } from 'react';

import CorrectGroup from 'containers/i18n/CorrectGroup';
import UngroupedMods from 'containers/mods/UngroupedMods';

import { GeneratorDetails } from '../ModsTable';
import ModGroup from './ModGroup';

import './style.css';

export interface Props {
  className: string;
  groups: Map<string, { details: GeneratorDetails[]; disabled: boolean }>;
  options?: {};
  isExpanded: (id: string) => boolean;
  onGroupClick: (id: string) => any;
}

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
      {Array.from(groups.entries()).map(
        ([group, { details, disabled }], key) => {
          const mods = details.map(({ mod }) => mod);

          return (
            <ModGroup
              key={key}
              className={className}
              details={details}
              disabled={disabled}
              group={group}
              isExpanded={isExpanded}
              onGroupClick={onGroupClick}
            />
          );
        }
      )}
    </>
  );
};

GroupedMods.defaultProps = default_props;

export default GroupedMods;
