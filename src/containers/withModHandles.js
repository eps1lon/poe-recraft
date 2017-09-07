// @flow
import type { Dispatch } from 'redux';

import { connect } from 'react-redux';

import { addMod } from '../actions/item';

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onAddMod: mod => dispatch(addMod(mod))
  };
};

const withModHandles = (Component: React$ComponentType<*>) =>
  connect(null, mapDispatchToProps)(Component);

export default withModHandles;
