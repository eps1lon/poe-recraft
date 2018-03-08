import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { baseitem_filter_actions } from 'state/baseitemfilter';
import ItemClass, { Props } from 'components/itemclass_picker/ItemClass';
import { State } from 'state';
import { activeItemClass } from 'state/baseitemfilter/selectors';
import { ItemClassProps } from 'state/poe/schema';

const mapStateToProps = (state: State) => {
  return {
    active: String(activeItemClass(state))
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: Props) => {
  return {
    onClick: () => dispatch(baseitem_filter_actions.setItemClass(props))
  };
};

// @ts-ignore: react-redux typings are broken atm :(
export default connect(mapStateToProps, mapDispatchToProps)(ItemClass);
