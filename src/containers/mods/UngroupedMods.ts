import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import UngroupedMods from 'components/mods/UngroupedMods';
import modHandles from '../handles/mod';

const mapDispatchToProps = (dispath: Dispatch) => {
  const { onAddMod } = modHandles(dispath);
  // returning excess props throw ts error in connect
  return { onAddMod };
};

export default connect(
  undefined,
  mapDispatchToProps
)(UngroupedMods);
