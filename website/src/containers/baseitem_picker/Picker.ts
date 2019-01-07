import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Picker, { Props } from 'components/baseitem_picker/Picker';
import { State } from 'state';
import { item_actions } from 'state/actions';
import { BaseItemTypeProps } from 'state/poe/schema';
import { baseitemfilter_selectors, item_selectors } from 'state/selectors';

const baseitemsSelector = baseitemfilter_selectors.makeFilterItems();

type StateProps = Pick<Props, 'active' | 'baseitems'>;
const mapStateToProps = (state: State): StateProps => {
  return {
    active: item_selectors.activeBaseitem(state),
    baseitems: baseitemsSelector(state),
  };
};

type DispatchProps = Pick<Props, 'onChange'>;
type OwnProps = Pick<Props, 'onChange'>;
const mapDispatchToProps = (
  dispatch: Dispatch,
  own_props: OwnProps,
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
