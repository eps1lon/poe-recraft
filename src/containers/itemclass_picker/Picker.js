// @flow
import { connect } from 'react-redux';

import class_groups from './class_groups';

import Picker from 'components/itemclass_picker/Picker';
import { type State } from 'reducers/rootReducer';
import { activeItemclass } from 'selectors/item';

const mapStateToProps = (state: State) => {
  const active_item_class = activeItemclass(state);
  const active_group = class_groups.find(
    group =>
      group.classes.find(({ primary }) => primary === active_item_class) !==
      undefined
  );

  return {
    active: active_group != null ? active_group.name : undefined,
    groups: class_groups
  };
};

export default connect(mapStateToProps, null)(Picker);
