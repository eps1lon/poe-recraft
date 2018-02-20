import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import ItemSection from 'components/ItemSection';
import { State } from 'reducers/rootReducer';
import snapshotItem from 'util/snapshotItem';

const mapStateToProps = createSelector(
  (state: State) => state.craft.item,
  item => {
    if (item === undefined) {
      return { item: undefined };
    } else {
      return { item: snapshotItem(item) };
    }
  }
);

// @ts-ignore: cannot assign undefined to item but Props in ItemSeciont
// explicitly allows for undefined
export default connect(mapStateToProps)(ItemSection);
