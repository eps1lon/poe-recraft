// @flow
import { connect } from 'react-redux';
import { type State } from 'reducers/rootReducer';

const mapStateToProps = (state: State) => {
  return {
    descriptions: state.i18n.descriptions
  };
};

export default (Component: React$ComponentType<*>) =>
  connect(mapStateToProps)(Component);
