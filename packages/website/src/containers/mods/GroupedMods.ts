import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import GroupedMods from 'components/mods/GroupedMods';
import { State } from 'state';
import { gui_actions } from 'state/actions';
import { PartialProps } from 'types/react';

type StateProps = PartialProps<typeof GroupedMods, 'isExpanded'>;
type OwnStateProps = PartialProps<typeof GroupedMods, 'className'>;
const mapStateToProps = (state: State, props: OwnStateProps): StateProps => {
  return {
    isExpanded: (group: string) =>
      Boolean(state.gui.expanded.get(`${props.className}.${group}`)),
  };
};

type DispatchProps = PartialProps<typeof GroupedMods, 'onGroupClick'>;
type OwnDispatchProps = PartialProps<typeof GroupedMods, 'className'>;
const mapDispatchToProps = (
  dispatch: Dispatch,
  props: OwnDispatchProps,
): DispatchProps => {
  return {
    onGroupClick: (group: string) =>
      dispatch(
        gui_actions.expanded_actions.toggle(`${props.className}.${group}`),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupedMods);
