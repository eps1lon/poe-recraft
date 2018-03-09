import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Modal from 'components/baseitem_picker/Modal';
import { State } from 'state';
import { gui_actions } from 'state/gui';
import { activeBaseitem } from 'state/item/selectors';

const mapStateToProps = (state: State) => {
  return {
    active: activeBaseitem(state),
    is_open: state.gui.expanded.get('baseitem-modal')
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onToggle: () => dispatch(gui_actions.expanded_actions.toggleBaseItemModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
