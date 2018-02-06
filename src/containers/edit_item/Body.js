// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import Body, { type Props } from 'components/edit_item/Body';
import type { State } from 'reducers/rootReducer';

const mapStateToProps = (state: State) => {
  return {
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps: Props) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
