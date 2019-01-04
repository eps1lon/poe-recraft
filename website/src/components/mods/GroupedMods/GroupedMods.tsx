import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';

import { isDisabled } from 'util/flags';

import { GeneratorDetails } from '../ModsTable';
import ModGroup from './ModGroup';

import './style.css';

export interface Props {
  className: string;
  details: GeneratorDetails[];
  exclude?: string[];
  isExpanded: (id: string) => boolean;
  onGroupClick: (id: string) => void;
}

export default class GroupedMods extends PureComponent<Props> {
  private getGroups = createSelector(
    (props: { details: GeneratorDetails[] }) => props.details,
    details => {
      const all_groups = details.reduce((groups, detail) => {
        const group = detail.mod.props.correct_group;

        if (!groups.has(group)) {
          groups.set(group, { details: [], disabled: false });
          // ts: groups.get(group) !== undefined
        }
        groups.get(group)!.details.push(detail);

        return groups;
      }, new Map<string, { details: GeneratorDetails[]; disabled: boolean }>());

      for (const group of all_groups.values()) {
        group.disabled = group.details.every(detail => isDisabled(detail));
      }

      return all_groups;
    }
  );

  public render() {
    const { className, exclude, onGroupClick, isExpanded } = this.props;
    const groups = this.getGroups(this.props);

    return (
      <>
        {Array.from(groups.entries()).map(
          ([group, { details, disabled }], key) => {
            return (
              <ModGroup
                key={key}
                className={className}
                details={details}
                disabled={disabled}
                exclude={exclude}
                group={group}
                isExpanded={isExpanded}
                onGroupClick={onGroupClick}
              />
            );
          }
        )}
      </>
    );
  }
}
