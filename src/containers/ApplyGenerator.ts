import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { craftActions } from 'state/craft';
import { activeGenerator } from 'state/craft/selectors';
import ApplyGenerator from 'components/ApplyGenerator';
import { State } from 'state';

const mapStateToProps = (state: State) => {
  return {
    active: activeGenerator(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onClick: () => dispatch(craftActions.applyGenerator())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyGenerator);
