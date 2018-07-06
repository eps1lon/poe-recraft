import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import GroupedMods from 'components/mods/GroupedMods';
import { GeneratorDetails } from 'components/mods/ModsTable';
import { State } from 'state';
import { gui_actions } from 'state/gui';
import { disabled } from 'util/flags';

const groupSelector = createSelector(
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
      group.disabled = group.details.every(detail => disabled(detail));
    }

    return all_groups;
  }
);

const mapStateToProps = (
  state: State,
  props: { className: string; details: GeneratorDetails[] }
) => {
  return {
    isExpanded: (group: string) =>
      Boolean(state.gui.expanded.get(`${props.className}.${group}`)),
    groups: groupSelector(props)
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: { className: string }
) => {
  return {
    onGroupClick: (group: string) =>
      dispatch(
        gui_actions.expanded_actions.toggle(`${props.className}.${group}`)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(GroupedMods);
