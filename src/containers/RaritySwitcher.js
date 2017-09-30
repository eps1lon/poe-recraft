// @flow
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { setRarity } from 'actions/item';
import AvailableMods from 'components/RaritySwitcher';
import type { State } from 'reducers/rootReducer';

const mapStateToProps = (state: State) => {
  return {
    selected: state.craft.item ? state.craft.item.rarity.toString() : undefined
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onChange: (id: string) => dispatch(setRarity(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableMods);
