// @flow
import type { Mod } from 'poe-mods/lib/mods';
import type { Flags } from 'poe-mods/lib/util';
import React from 'react';

import GroupedMods from '../../containers/mods/GroupedMods';
import UngroupedMods from '../../containers/mods/UngroupedMods';

type Options = {
  grouped?: boolean,
  exclude?: string[]
};

export type GeneratorDetails = {
  mod: Mod,
  applicable?: Flags<*>,
  spawnable?: Flags<*>,
  spawnweight?: number
};

export type Props = {
  className: string,
  expanded: boolean,
  human?: string,
  details: GeneratorDetails[],
  options: Options,
  onToggle: (string, boolean) => void
};

const defaultProps = {
  expanded: true,
  onToggle: () => {} // noop
};

// TODO sortable
const ModsTable = (props: Props) => {
  const {
    className,
    expanded,
    human = className,
    details,
    onToggle,
    options
  } = props;
  const { grouped = false, exclude = [] } = options;

  const onCaptionClick = () => onToggle(className, expanded);

  // Table componenent
  const Mods = grouped ? GroupedMods : UngroupedMods;

  return (
    <div className={className}>
      <h4 id={`${className}-caption`} onClick={onCaptionClick}>
        {human} /<span className="count">{details.length}</span>
      </h4>
      {expanded && (
        <Mods className={className} details={details} options={{ exclude }} />
      )}
    </div>
  );
};

ModsTable.defaultProps = defaultProps;

export default ModsTable;
