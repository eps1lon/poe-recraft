import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import GeneratorModal from 'components/GeneratorModal';
import { State } from 'state';
import { craftActions } from 'state/craft';
import { activeGenerator } from 'state/craft/selectors';
import { gui_actions } from 'state/gui';
import { poe_selectors } from 'state/poe';

const mapStateToProps = (state: State) => {
  return {
    active: activeGenerator(state),
    loading:
      poe_selectors.isBenchsLoading(state) ||
      poe_selectors.isModsLoading(state),
    is_open: state.gui.expanded.get('generator-modal')
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneratorModal);
