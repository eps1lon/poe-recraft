import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { asElderItem, asShaperItem, removeAtlasModifier } from 'actions/item';
import AtlasModifiers, { Props } from 'components/edit_item/AtlasModifiers';
import { State } from 'reducers/rootReducer';

const mapStateToProps = createSelector(
  (state: State) => state.craft.item,
  item => {
    if (item != null) {
      return {
        // assume elderable/shapeable
        is_modifieable: true,
        is_elder: item.isElderItem(),
        is_shaped: item.isSHaperItem()
      };
    } else {
      return {
        is_modifieable: false,
        is_shaped: false,
        is_elder: false
      };
    }
  }
);

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onElder: () => dispatch(asElderItem()),
    onShape: () => dispatch(asShaperItem()),
    onNone: () => dispatch(removeAtlasModifier())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AtlasModifiers);
