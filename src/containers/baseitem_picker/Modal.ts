import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Modal from 'components/baseitem_picker/Modal';
import { State } from 'state';
import { gui_actions } from 'state/actions';
import { item_selectors, poe_selectors } from 'state/selectors';
import { PartialProps } from 'types/react';

const mapStateToProps = (state: State) => {
  return {
    active: item_selectors.activeBaseitem(state),
    loading: poe_selectors.isItemsLoading(state),
    is_open: state.gui.expanded.get('baseitem-modal')
  };
};

type DispatchProps = PartialProps<typeof Modal, 'onToggle'>;
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onToggle: () => dispatch(gui_actions.expanded_actions.toggleBaseItemModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
