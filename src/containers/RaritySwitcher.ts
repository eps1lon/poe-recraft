import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import RaritySwitcher, { Props } from 'components/RaritySwitcher';
import { State } from 'state';
import { item_actions } from 'state/actions';

const mapStateToProps = (state: State) => {
  return {
    selected: state.craft.item ? state.craft.item.rarity.toString() : undefined
  };
};

type DispatchProps = Pick<Props, 'onChange'>;
const mapDispatchToProps = (
  dispatch: Dispatch,
  own_props: Pick<Props, 'onChange'>
): DispatchProps => {
  return {
    onChange: (id: 'normal' | 'magic' | 'rare') => {
      dispatch(item_actions.setRarity(id));
      own_props.onChange(id);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RaritySwitcher);
