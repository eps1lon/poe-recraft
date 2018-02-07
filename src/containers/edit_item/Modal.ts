import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { toggleEditItemModal } from 'actions/gui';
import Modal, { Props } from 'components/edit_item/Modal';
import { State } from 'reducers/rootReducer';

const mapStateToProps = (state: State): Partial<Props> => {
  return {
    is_open: state.gui.expanded.misc.get('edititem-modal')
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onToggle: () => dispatch(toggleEditItemModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
