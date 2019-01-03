import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import GeneratorModal from 'components/GeneratorModal';
import { State } from 'state';
import { craft_actions, gui_actions } from 'state/actions';
import { craft_selectors, poe_selectors } from 'state/selectors';
import { PartialProps } from 'types/react';

const mapStateToProps = (state: State) => {
  return {
    active: craft_selectors.activeGenerator(state),
    loading:
      poe_selectors.isBenchsLoading(state) ||
      poe_selectors.isModsLoading(state),
    is_open: state.gui.expanded.get('generator-modal'),
  };
};

type DispatchProps = PartialProps<
  typeof GeneratorModal,
  'onChange' | 'onToggle'
>;
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onChange: (generator: string) =>
      dispatch(craft_actions.useGenerator(generator)),
    onToggle: () =>
      dispatch(gui_actions.expanded_actions.toggleGeneratorModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneratorModal);
