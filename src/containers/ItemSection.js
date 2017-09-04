// @flow
import { connect } from 'react-redux';

import ItemSection from '../components/ItemSection';
import type { State } from '../reducers/rootReducer';

const mapStateToProps = (state: State) => {
  return {
    item: state.craft.item
  };
};

export default connect(mapStateToProps)(ItemSection);
