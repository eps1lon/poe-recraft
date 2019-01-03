import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Picker from 'components/ItemSection/Generators';
import { actions } from 'state/craft';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onClick: (generator: string) => {
      dispatch(actions.useGenerator(generator));
      dispatch(actions.applyGenerator());
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Picker);
