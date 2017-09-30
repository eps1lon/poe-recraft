// @flow
import type { ItemClassProps } from 'poe-mods/lib/schema';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { setItemClass } from 'actions/item';
import ItemClass from 'components/itemclass_picker/ItemClass';
import { type State } from 'reducers/rootReducer';
import { activeItemclass } from 'selectors/item';

const mapStateToProps = (state: State) => {
  return {
    active: activeItemclass(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>, props: ItemClassProps) => {
  return {
    onClick: (...args) => dispatch(setItemClass(props))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemClass);
