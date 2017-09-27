// @flow
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';

import { collapse, expand } from '../../actions/gui';
import ModsTable, { type Props } from '../../components/mods/ModsTable';
import { type State } from '../../reducers/rootReducer';

const mapStateToProps = (state: State, props: Props) => {
  return {
    expanded: state.gui.expanded.misc.get(props.className)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onToggle: (class_name: string, is_expanded: boolean) =>
      is_expanded
        ? dispatch(collapse(class_name))
        : dispatch(expand(class_name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModsTable);
