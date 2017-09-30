// @flow
import { connect } from 'react-redux';

import { type State } from 'reducers/rootReducer';
import modHandles from '../handles/mod';
import UngroupedMods from 'components/mods/UngroupedMods';

const mapStateToProsp = (state: State) => {
  return {};
};

const mapDispatchToProps = modHandles;

export default connect(mapStateToProsp, mapDispatchToProps)(UngroupedMods);
