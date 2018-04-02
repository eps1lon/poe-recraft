import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Picker from 'components/GeneratorModal/Picker';
import { State } from 'state';
import { craftActions } from 'state/craft';
import { activeGenerator } from 'state/craft/selectors';

const mapStateToProps = (state: State) => {
  return {
    active: activeGenerator(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChange: (generator: string) => {
      dispatch(craftActions.useGenerator(generator));
      dispatch(craftActions.applyGenerator());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Picker);
