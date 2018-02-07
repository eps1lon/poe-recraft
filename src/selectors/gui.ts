import { createSelector } from 'reselect';

import { ReactTableExpanded } from 'actions/gui';
import { State } from 'reducers/rootReducer';

const getTableExpanded = (state: State, props: { className: string }) =>
  state.gui.expanded.tables.get(props.className);

export const makeGetTableExpanded = () => {
  return createSelector(
    getTableExpanded,
    (expanded?: ReactTableExpanded): ReactTableExpanded => {
      return expanded || {};
    }
  );
};
