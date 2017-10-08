// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { setItem } from 'actions/item';
import Picker, { type Props } from 'components/baseitem_picker/Picker';
import type { State } from 'reducers/rootReducer';
import { filterItems } from 'selectors/baseitemfilter';
import { activeBaseitem } from 'selectors/item';
import { type BaseItemTypeProps } from 'selectors/schema';

const baseitemsSelector = createSelector(
  (state: State) => state.baseitemfilter,
  (state: State) => state.poe.items,
  ({ item_class, tags }, items) => filterItems({ item_class, tags }, items)
);

const mapStateToProps = (state: State) => {
  return {
    active: activeBaseitem(state),
    baseitems: baseitemsSelector(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps: Props) => {
  return {
    onChange: (item: BaseItemTypeProps) =>
      ownProps.onChange(item) && dispatch(setItem(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Picker);
