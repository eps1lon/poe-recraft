// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { applyGenerator } from '../actions/craft';
import ApplyGenerator from '../components/ApplyGenerator';
import type { State } from '../reducers/rootReducer';
import { activeGenerator } from '../selectors/craft';

const mapStateToProps = (state: State) => {
  return {
    active: activeGenerator(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onClick: () => dispatch(applyGenerator())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyGenerator);
