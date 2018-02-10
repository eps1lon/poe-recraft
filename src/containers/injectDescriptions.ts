import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { State } from 'reducers/rootReducer';

const mapStateToProps = (state: State) => {
  return {
    descriptions: state.i18n.descriptions
  };
};

export default <T extends { descriptions: {} }>(component: ComponentType<T>) =>
  connect(mapStateToProps)(component);
