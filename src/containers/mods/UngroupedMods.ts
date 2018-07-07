import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import UngroupedMods, { Props } from 'components/mods/UngroupedMods';
import { State } from 'state';
import { gui_actions } from 'state/actions';
import { gui_selectors } from 'state/selectors';
import modHandles from '../handles/mod';

const sort_by_ilvl_desc = {
  by: 0,
  order: 'desc' as 'asc' | 'desc'
};
const guiIdent = ({ className }: { className: string }) =>
  `UngroupedMods.${className}`;

type StateProps = Pick<Props, 'sortColumn' | 'sortOrder'>;
const mapStateToProps = (
  state: State,
  own_props: Pick<Props, 'className'>
): StateProps => {
  const { by, order } = gui_selectors.sort_selectors.getSorting(
    guiIdent(own_props),
    sort_by_ilvl_desc
  )(state);

  return { sortColumn: +by, sortOrder: order };
};

type DispatchProps = Pick<Props, 'onAddMod' | 'onSortChange'>;
const mapDispatchToProps = (
  dispatch: Dispatch,
  own_props: Pick<Props, 'className'>
): DispatchProps => {
  const { onAddMod } = modHandles(dispatch);

  const onSortChange = (index: number, new_order: 'asc' | 'desc') => {
    const { sortAsc, sortDesc } = gui_actions.sort_actions;
    const sortAction = new_order === 'desc' ? sortDesc : sortAsc;

    dispatch(sortAction(guiIdent(own_props), index));
  };

  return { onAddMod, onSortChange };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UngroupedMods);
