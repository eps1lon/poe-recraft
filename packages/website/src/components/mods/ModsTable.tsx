import classnames from 'classnames';
import { Flags, Mod } from 'poe-mods';
import React, { PureComponent, SyntheticEvent } from 'react';
import { Button } from 'reactstrap';

import GroupedMods from 'containers/mods/GroupedMods';
import UngroupedMods from 'containers/mods/UngroupedMods';

export interface Props {
  className: string;
  // if no expanded is passed (i.e. == null) then this value is considered as Boolean casted
  defaultExpanded?: boolean;
  expanded?: boolean;
  group_expanded: boolean;
  human?: string;
  details: GeneratorDetails[];
  grouped?: boolean;
  exclude?: string[];
  onGroupToggle: (group: string) => void;
  onToggle: (group: string, show: boolean) => void;
}

export interface GeneratorDetails {
  mod: Mod;
  applicable?: Flags;
  spawnable?: Flags;
  spawnweight?: number;
  spawnchance?: number;
  relative_weight?: number;
}

export default class ModsTable extends PureComponent<Props> {
  public render() {
    const { className } = this.props;
    const {
      group_expanded,
      human = className,
      details,
      grouped = false,
      exclude = []
    } = this.props;

    const expanded = this.isExpanded();

    // Table componenent
    const Mods = grouped && !group_expanded ? GroupedMods : UngroupedMods;

    return (
      <div className={classnames('mods-table', className)}>
        <h4
          id={`${className}-caption`}
          aria-expanded={group_expanded}
          aria-haspopup={true}
          onClick={this.handleCaptionClick}
        >
          {human} /<span className="count">{details.length}</span>
          {grouped && (
            <Button onClick={this.handleGroupToggle}>
              {group_expanded ? 'Grouped' : 'Ungrouped'}
            </Button>
          )}
        </h4>
        {expanded && (
          <Mods className={className} details={details} exclude={exclude} />
        )}
      </div>
    );
  }

  private handleCaptionClick = () => {
    const { className, onToggle } = this.props;
    const expanded = this.isExpanded();

    onToggle(className, expanded);
  };

  private handleGroupToggle = (event: SyntheticEvent<HTMLButtonElement>) => {
    const { className, onGroupToggle } = this.props;

    onGroupToggle(className);
    event.stopPropagation();
  };

  private isExpanded() {
    const { defaultExpanded, expanded } = this.props;
    if (expanded == null) {
      return Boolean(defaultExpanded);
    }
    return expanded;
  }
}
