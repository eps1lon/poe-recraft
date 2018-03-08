import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { craftActions } from 'state/craft';
import { activeGenerator } from 'state/craft/selectors';
import { gui_actions } from 'state/gui';
import { State } from 'state';
import GeneratorModal from 'components/generator_picker/Modal';

const mapStateToProps = (state: State) => {
  return {
    active: activeGenerator(state),
    is_open: state.gui.expanded.misc.get('generator-modal')
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChange: (generator: string) =>
      dispatch(craftActions.useGenerator(generator)),
    onToggle: () =>
      dispatch(gui_actions.expanded_actions.toggleGeneratorModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneratorModal);
