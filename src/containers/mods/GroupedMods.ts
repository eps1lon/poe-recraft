import { connect } from 'react-redux';

import { State } from 'reducers/rootReducer';
import { makeGetTableExpanded } from 'selectors/gui';
import { expanded as expandedHandles } from '../handles/gui';
import GroupedMods from 'components/mods/GroupedMods';

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

// @ts-ignore: react-redux typings are broken atm :(
export default connect(makeMapStateToProps, mapDispatchToProps)(GroupedMods);
