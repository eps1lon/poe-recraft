import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { State } from 'state';
import { gui_selectors } from 'state/gui';
import { expanded as expandedHandles } from '../handles/gui';
import GroupedMods from 'components/mods/GroupedMods';
import { GeneratorDetails } from 'components/mods/ModsTable';

const groupSelector = createSelector(
  (props: { details: GeneratorDetails[] }) => props.details,
  details => {
    return details.reduce((groups, detail) => {
      const group = detail.mod.props.correct_group;

      if (!groups.has(group)) {
        groups.set(group, []);
        // ts: groups.get(group) !== undefined
      }
      groups.get(group)!.push(detail);

      return groups;
    }, new Map<string, GeneratorDetails[]>());
  }
);

const makeMapStateToProps = () => {
  const getTableExpanded = gui_selectors.expanded_selectors.makeGetTableExpanded();

  const mapStateToProps = (
    state: State,
    props: { className: string; details: GeneratorDetails[] }
  ) => {
    return {
      expanded: getTableExpanded(state, props),
      groups: groupSelector(props)
    };
  };

  return mapStateToProps;
};

const mapDispatchToProps = expandedHandles;

// @ts-ignore: react-redux typings are broken atm :(
export default connect(makeMapStateToProps, mapDispatchToProps)(GroupedMods);
