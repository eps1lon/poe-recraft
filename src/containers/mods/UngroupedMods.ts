import { connect } from 'react-redux';

import { State } from 'reducers/rootReducer';
import modHandles from '../handles/mod';
import UngroupedMods from 'components/mods/UngroupedMods';

const mapStateToProsp = (state: State) => {
  return {};
};

const mapDispatchToProps = modHandles;

// @ts-ignore: broken react-redux typings
export default connect(mapStateToProsp, mapDispatchToProps)(UngroupedMods);
