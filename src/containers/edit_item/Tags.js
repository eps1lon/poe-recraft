// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { addTag, removeTag } from 'actions/item';
import Tags, { type Props } from 'components/edit_item/Tags';
import type { State } from 'reducers/rootReducer';
import {} from 'selectors/poe';
import { getTags, getChangeableTags } from 'selectors/item';

const mapStateToProps = (state: State) => {
  return {
    available: state.poe.tags,
    changeable: getChangeableTags(state),
    current: getTags(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps: Props) => {
  return {
    addTag: (tag: string) => dispatch(addTag(tag)),
    removeTag: (tag: string) => dispatch(removeTag(tag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
