import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import RaritySwitcher, { Props } from 'components/RaritySwitcher';
import { State } from 'state';
import { item_actions } from 'state/item';

const mapStateToProps = (state: State) => {
  return {
    selected: state.craft.item ? state.craft.item.rarity.toString() : undefined
  };
};

const mapDispatchToProps = (dispatch: Dispatch, own_props: Props) => {
  return {
    onChange: (id: 'normal' | 'magic' | 'rare') => {
      dispatch(item_actions.setRarity(id));
      own_props.onChange(id);
    }
  };
};

// @ts-ignore: broken react-redux typings
export default connect(mapStateToProps, mapDispatchToProps)(RaritySwitcher);
