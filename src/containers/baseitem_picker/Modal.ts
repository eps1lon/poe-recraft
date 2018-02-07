import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { toggleBaseItemModal } from 'actions/gui';
import Modal from 'components/baseitem_picker/Modal';
import { State } from 'reducers/rootReducer';
import { activeBaseitem } from 'selectors/item';

const mapStateToProps = (state: State) => {
  return {
    active: activeBaseitem(state),
    is_open: state.gui.expanded.misc.get('baseitem-modal')
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onToggle: () => dispatch(toggleBaseItemModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
