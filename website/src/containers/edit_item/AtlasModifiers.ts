import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import AtlasModifiers from 'components/edit_item/AtlasModifiers';
import { State } from 'state';
import { item_actions } from 'state/actions';
import { PartialProps } from 'types/react';

const mapStateToProps = createSelector(
  (state: State) => state.craft.item,
  item => {
    if (item != null) {
      return {
        // assume elderable/shapeable
        is_modifieable: true,
        is_elder: item.isElderItem(),
        is_shaped: item.isSHaperItem(),
      };
    } else {
      return {
        is_modifieable: false,
        is_shaped: false,
        is_elder: false,
      };
    }
  },
);

type DispatchProps = PartialProps<
  typeof AtlasModifiers,
  'onElder' | 'onNone' | 'onShape'
>;
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onElder: () => dispatch(item_actions.asElderItem()),
    onShape: () => dispatch(item_actions.asShaperItem()),
    onNone: () => dispatch(item_actions.removeAtlasModifier()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AtlasModifiers);
