import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ModsTable, { Props } from 'components/mods/ModsTable';
import { State } from 'state';
import { gui_actions } from 'state/actions';

const mapStateToProps = (state: State, props: Pick<Props, 'className'>) => {
  return {
    expanded: Boolean(state.gui.expanded.get(props.className)),
    group_expanded: Boolean(state.gui.expanded.get(`${props.className}-group`))
  };
};

type DispatchProps = Pick<Props, 'onToggle' | 'onGroupToggle'>;
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onToggle: (class_name: string, is_expanded: boolean) =>
      is_expanded
        ? dispatch(gui_actions.expanded_actions.collapse(class_name))
        : dispatch(gui_actions.expanded_actions.expand(class_name)),
    onGroupToggle: (class_name: string) =>
      dispatch(gui_actions.expanded_actions.toggle(`${class_name}-group`))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModsTable);
