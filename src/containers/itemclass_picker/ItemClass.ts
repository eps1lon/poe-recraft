import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { setItemClass } from 'actions/baseitemfilter';
import ItemClass, { Props } from 'components/itemclass_picker/ItemClass';
import { State } from 'reducers/rootReducer';
import { activeItemClass } from 'selectors/baseitemfilter';
import { ItemClassProps } from 'selectors/schema';

const mapStateToProps = (state: State) => {
  return {
    active: String(activeItemClass(state))
  };
};

const mapDispatchToProps = (dispatch: Dispatch, props: Props) => {
  return {
    onClick: () => dispatch(setItemClass(props))
  };
};

// @ts-ignore: react-redux typings are broken atm :(
export default connect(mapStateToProps, mapDispatchToProps)(ItemClass);
