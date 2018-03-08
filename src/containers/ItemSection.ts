import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import ItemSection from 'components/ItemSection';
import { State } from 'state';
import snapshotItem from 'state/item/snapshotItem';

const mapStateToProps = createSelector(
  (state: State) => state.craft.item,
  (state: State) => state.i18n.descriptions,
  (item, descriptions) => {
    if (item === undefined) {
      return { item: undefined };
    } else {
      return { item: snapshotItem(item, descriptions) };
    }
  }
);

// @ts-ignore: cannot assign undefined to item but Props in ItemSeciont
// explicitly allows for undefined
export default connect(mapStateToProps)(ItemSection);
