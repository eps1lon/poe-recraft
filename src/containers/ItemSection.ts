import { connect } from 'react-redux';
import { createSelector, Selector } from 'reselect';

import ItemSection, { Props } from 'components/ItemSection';
import { State } from 'state';
import snapshotItem from 'state/item/snapshotItem';

type StateProps = Pick<Props, 'item'>;
const mapStateToProps: Selector<State, StateProps> = createSelector(
  (state: State) => state.craft.item,
  (state: State) => state.i18n.descriptions,
  (state: State) => state.i18n.messages,
  (item, descriptions, messages) => {
    if (item === undefined) {
      return { item: undefined };
    } else {
      return { item: snapshotItem(item, descriptions, messages) };
    }
  }
);

export default connect(mapStateToProps)(ItemSection);
