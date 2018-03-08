import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import Picker, {
  default_props,
  Props
} from 'components/baseitem_picker/Picker';
import { State } from 'state';
import { makeFilterItems } from 'state/baseitemfilter/selectors';
import { item_actions } from 'state/item';
import { activeBaseitem } from 'state/item/selectors';
import { BaseItemTypeProps } from 'state/poe/schema';

const baseitemsSelector = makeFilterItems();

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
      ownProps.onChange(item) && dispatch(item_actions.setItem(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Picker);
