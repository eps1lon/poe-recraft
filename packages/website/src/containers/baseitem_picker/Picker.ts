import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Picker from 'components/baseitem_picker/Picker';
import { State } from 'state';
import { item_actions } from 'state/actions';
import { BaseItemTypeProps } from 'state/poe/schema';
import { baseitemfilter_selectors, item_selectors } from 'state/selectors';

const baseitemsSelector = baseitemfilter_selectors.makeFilterItems();

type StateProps = Pick<Picker['props'], 'active' | 'baseitems'>;
const mapStateToProps = (state: State): StateProps => {
  return {
    active: item_selectors.activeBaseitem(state),
    baseitems: baseitemsSelector(state),
  };
};

type DispatchProps = Pick<Picker['props'], 'onChange'>;
const mapDispatchToProps = (
  dispatch: Dispatch,
  own_props: Pick<Picker['props'], 'onChange'>,
): DispatchProps => {
  return {
    onChange: (item: BaseItemTypeProps) => {
      const { onChange } = own_props;
      if (onChange === undefined || onChange(item)) {
        dispatch(item_actions.setItem(item));
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Picker);
