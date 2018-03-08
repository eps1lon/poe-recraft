import { createSelector } from 'reselect';

import { ReactTableExpanded } from './actions';
import { State } from 'state';

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
