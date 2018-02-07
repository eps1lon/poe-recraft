import { connect } from 'react-redux';

import class_groups from './class_groups';

import Picker from 'components/itemclass_picker/Picker';
import { State } from 'reducers/rootReducer';
import { activeItemClass } from 'selectors/baseitemfilter';

const mapStateToProps = (state: State) => {
  const active_item_class = activeItemClass(state);
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
