// @flow
import type { Dispatch } from 'redux';

import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onAddMod: mod => console.log('add', mod)
  };
};

const withModHandles = (Component: React$ComponentType<*>) =>
  connect(null, mapDispatchToProps)(Component);

export default withModHandles;
