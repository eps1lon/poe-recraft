import { connect } from 'react-redux';

import { State } from 'reducers/rootReducer';
import modHandles from '../handles/mod';
import UngroupedMods from 'components/mods/UngroupedMods';

const mapDispatchToProps = modHandles;

// @ts-ignore
export default connect(undefined, mapDispatchToProps)(UngroupedMods);
