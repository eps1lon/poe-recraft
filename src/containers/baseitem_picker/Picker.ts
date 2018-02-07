import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { setItem } from 'actions/item';
import Picker, {
  default_props,
  Props
} from 'components/baseitem_picker/Picker';
import { State } from 'reducers/rootReducer';
import { filterItems } from 'selectors/baseitemfilter';
import { activeBaseitem } from 'selectors/item';
import { BaseItemTypeProps } from 'selectors/schema';

const baseitemsSelector = createSelector(
  (state: State) => state.baseitemfilter,
  (state: State) => state.poe.items,
  ({ item_class, tags }, items) => filterItems({ item_class, tags }, items)
);

const mapStateToProps = (state: State): Partial<Props> => {
  return {
    active: activeBaseitem(state),
    baseitems: baseitemsSelector(state)
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: typeof default_props
): Partial<Props> => {
  return {
    onChange: (item: BaseItemTypeProps) =>
      ownProps.onChange(item) && dispatch(setItem(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Picker);
