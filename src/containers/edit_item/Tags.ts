import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Tags, { Props } from 'components/edit_item/Tags';
import { State } from 'state';
import { item_actions, item_selectors } from 'state/item';
import { TagProps } from 'state/poe/schema';

const editableTags = item_selectors.editableTagsSelector();

const mapStateToProps = (state: State) => {
  const { addable, current, removable } = editableTags(state);
  return { addable, current, removable };
};

type DispatchProps = Pick<Props, 'addTag' | 'removeTag'>;
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    addTag: (tag: TagProps) => dispatch(item_actions.addTag(tag)),
    removeTag: (tag: TagProps) => dispatch(item_actions.removeTag(tag))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags);
