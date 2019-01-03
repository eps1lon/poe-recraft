import { connect } from 'react-redux';
import { createSelector, Selector } from 'reselect';

import ItemSection, { Props } from 'components/ItemSection';
import { State } from 'state';
import snapshotItem from 'state/item/snapshotItem';

type StateProps = Pick<Props, 'item'>;
const mapStateToProps: Selector<State, StateProps> = createSelector(
  (state: State) => state.craft.item,
  (state: State) => state.i18n.descriptions,
  (item, descriptions) => {
    if (item === undefined) {
      return { item: undefined };
    } else {
      return { item: snapshotItem(item, descriptions) };
    }
  },
);

export default connect(mapStateToProps)(ItemSection);
