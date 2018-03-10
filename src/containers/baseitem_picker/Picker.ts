import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Picker from 'components/baseitem_picker/Picker';
import { State } from 'state';
import { makeFilterItems } from 'state/baseitemfilter/selectors';
import { item_actions } from 'state/item';
import { activeBaseitem } from 'state/item/selectors';
import { BaseItemTypeProps } from 'state/poe/schema';

const baseitemsSelector = makeFilterItems();

const mapStateToProps = (state: State) => {
  return {
    active: activeBaseitem(state),
    baseitems: baseitemsSelector(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch, own_props: Picker['props']) => {
  return {
    onChange: (item: BaseItemTypeProps) => {
      const { onChange } = own_props;
      if (onChange === undefined || onChange(item)) {
        dispatch(item_actions.setItem(item));
      }
    }
  };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Picker);
