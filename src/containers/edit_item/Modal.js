// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { toggleEditItemModal } from 'actions/gui';
import Modal from 'components/edit_item/Modal';
import type { State } from 'reducers/rootReducer';

const mapStateToProps = (state: State) => {
  return {
    is_open: state.gui.expanded.misc.get('edititem-modal')
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onToggle: () => dispatch(toggleEditItemModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
