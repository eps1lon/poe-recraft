// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { setItem } from 'actions/item';
import Picker from 'components/baseitem_picker/Picker';
import type { State } from 'reducers/rootReducer';
import { activeBaseitem, itemsForClass, activeItemclass } from 'selectors/item';
import { type BaseItemTypeProps } from 'selectors/schema';

const baseitemsSelector = createSelector(
  activeItemclass,
  (state: State) => state.poe.items,
  (item_class, items) => itemsForClass(item_class, items)
);

const mapStateToProps = (state: State) => {
  return {
    active: activeBaseitem(state),
    baseitems: baseitemsSelector(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onChange: (item: BaseItemTypeProps) => dispatch(setItem(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Picker);
