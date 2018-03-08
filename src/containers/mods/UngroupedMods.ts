import { connect } from 'react-redux';

import modHandles from '../handles/mod';
import UngroupedMods from 'components/mods/UngroupedMods';
import { State } from 'state';

const mapDispatchToProps = modHandles;

// @ts-ignore
export default connect(undefined, mapDispatchToProps)(UngroupedMods);
