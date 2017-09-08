// @flow
import { createSelector } from 'reselect';

import type { ReactTableExpanded } from '../reducers/gui/expanded';
import type { State } from '../reducers/rootReducer';

const getTableExpanded = (state: State, props: { className: string }) =>
  state.gui.expanded.tables.get(props.className);

export const makeGetTableExpanded = () => {
  return createSelector(
    getTableExpanded,
    (expanded: ?ReactTableExpanded): ReactTableExpanded => {
      return expanded || {};
    }
  );
};
