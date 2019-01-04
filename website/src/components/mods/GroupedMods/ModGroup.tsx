import classnames from 'classnames';
import React, { PureComponent } from 'react';

import CorrectGroup from 'containers/i18n/CorrectGroup';
import UngroupedMods from 'containers/mods/UngroupedMods';
import { GeneratorDetails } from '../ModsTable';

export interface Props {
  className: string;
  details: GeneratorDetails[];
  disabled: boolean;
  exclude?: string[];
  group: string;
  isExpanded: (id: string) => boolean;
  onGroupClick: (id: string) => void;
}

export default class ModGroup extends PureComponent<Props> {
  public render() {
    const {
      className,
      details,
      disabled,
      exclude,
      group,
      isExpanded
    } = this.props;

    const mods = details.map(({ mod }) => mod);

    return (
      <>
        <h5
          className={classnames('correct-group', { disabled })}
          onClick={this.handleClick}
        >
          <CorrectGroup mods={mods} />
        </h5>
        {isExpanded(group) && (
          <UngroupedMods
            className={className}
            details={details}
            exclude={exclude}
          />
        )}
      </>
    );
  }

  private handleClick = () => {
    this.props.onGroupClick(this.props.group);
  };
}
