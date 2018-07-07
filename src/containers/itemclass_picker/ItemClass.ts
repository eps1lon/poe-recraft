import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ItemClass, { Props } from 'components/itemclass_picker/ItemClass';
import { State } from 'state';
import { baseitem_filter_actions } from 'state/baseitemfilter';
import { activeItemClass } from 'state/baseitemfilter/selectors';

const mapStateToProps = (state: State) => {
  return {
    active: String(activeItemClass(state))
  };
};

type DispatchProps = Pick<Props, 'onClick'>;
const mapDispatchToProps = (
  dispatch: Dispatch,
  props: Pick<Props, 'id'>
): DispatchProps => {
  return {
    onClick: () => dispatch(baseitem_filter_actions.setItemClass(props))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemClass);
