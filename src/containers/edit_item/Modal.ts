import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Modal, { Props } from 'components/edit_item/Modal';
import { State } from 'state';
import { gui_actions } from 'state/gui';

const mapStateToProps = (state: State): Partial<Props> => {
  return {
    is_open: state.gui.expanded.get('edititem-modal')
  };
};

type DispatchProps = Pick<Props, 'onToggle'>;
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onToggle: () => dispatch(gui_actions.expanded_actions.toggleEditItemModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
