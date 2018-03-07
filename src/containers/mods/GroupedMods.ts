import { connect } from 'react-redux';

import { State } from 'reducers/rootReducer';
import { makeGetTableExpanded } from 'selectors/gui';
import { expanded as expandedHandles } from '../handles/gui';
import GroupedMods from 'components/mods/GroupedMods';
import { createSelector } from 'reselect';
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
  const getTableExpanded = makeGetTableExpanded();

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
