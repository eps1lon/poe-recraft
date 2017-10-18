// @flow
import { connect } from 'react-redux';

import { type State } from 'reducers/rootReducer';
import modHandles from '../handles/mod';
import UngroupedMods from 'components/mods/UngroupedMods';
import { baseitemInflection } from 'selectors/craft';

const mapStateToProsp = (state: State) => {
  return {
    inflection: baseitemInflection(state)
  };
};

const mapDispatchToProps = modHandles;

export default connect(mapStateToProsp, mapDispatchToProps)(UngroupedMods);
