// @flow
import { connect } from 'react-redux';

import { type State } from '../../reducers/rootReducer';
import { makeGetTableExpanded } from '../../selectors/gui';
import { expanded as expandedHandles } from '../handles/gui';
import GroupedMods from '../../components/mods/GroupedMods';

const makeMapStateToProps = () => {
  const getTableExpanded = makeGetTableExpanded();

  const mapStateToProps = (state: State, props: { className: string }) => {
    return {
      expanded: getTableExpanded(state, props)
    };
  };

  return mapStateToProps;
};

const mapDispatchToProps = expandedHandles;

export default connect(makeMapStateToProps, mapDispatchToProps)(GroupedMods);
