// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { useGenerator } from '../actions/craft';
import { toggleGeneratorModal } from '../actions/gui';
import GeneratorModal from '../components/GeneratorModal';
import type { State } from '../reducers/rootReducer';
import { activeGenerator } from '../selectors/craft';

const mapStateToProps = (state: State) => {
  return {
    active: activeGenerator(state),
    is_open: state.gui.expanded.misc.get('generator-modal')
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onChange: (generator: string) => dispatch(useGenerator(generator)),
    onToggle: () => dispatch(toggleGeneratorModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneratorModal);
