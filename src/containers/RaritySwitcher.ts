import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { setRarity } from 'actions/item';
import RaritySwitcher, { Props } from 'components/RaritySwitcher';
import { State } from 'reducers/rootReducer';

const mapStateToProps = (state: State) => {
  return {
    selected: state.craft.item ? state.craft.item.rarity.toString() : undefined
  };
};

const mapDispatchToProps = (dispatch: Dispatch, own_props: Props) => {
  return {
    onChange: (id: 'normal' | 'magic' | 'rare') => {
      dispatch(setRarity(id));
      own_props.onChange(id);
    }
  };
};

// @ts-ignore: broken react-redux typings
export default connect(mapStateToProps, mapDispatchToProps)(RaritySwitcher);
