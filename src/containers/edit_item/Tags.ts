import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { addTag, removeTag } from 'actions/item';
import Tags, { Props } from 'components/edit_item/Tags';
import { State } from 'reducers/rootReducer';
import { editableTagsSelector } from 'selectors/item';
import { TagProps } from 'selectors/schema';

const editableTags = editableTagsSelector();

const mapStateToProps = (state: State) => {
  const { addable, current, removable } = editableTags(state);
  return { addable, current, removable };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTag: (tag: TagProps) => dispatch(addTag(tag)),
    removeTag: (tag: TagProps) => dispatch(removeTag(tag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
