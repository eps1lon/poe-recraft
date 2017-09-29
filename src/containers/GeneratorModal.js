// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { toggleGeneratorModal } from '../actions/gui';
import GeneratorModal from '../components/GeneratorModal';
import type { State } from '../reducers/rootReducer';

const mapStateToProps = (state: State) => {
  return {
    active: state.craft.mod_generator
      ? state.craft.mod_generator.constructor.name
      : undefined,
    is_open: state.gui.expanded.misc.get('generator-modal')
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onToggle: () => dispatch(toggleGeneratorModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneratorModal);
