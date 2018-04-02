import { connect } from 'react-redux';

import Picker, { Props } from 'components/itemclass_picker/Picker';
import { State } from 'state';
import { baseitemfilter_selectors } from 'state/baseitemfilter';

const mapStateToProps = (state: State, props: { groups: Props['groups'] }) => {
  const active_item_class = baseitemfilter_selectors.activeItemClass(state);
  const active_group = props.groups.find(
    group => group.classes.find(id => id === active_item_class) !== undefined
  );

  return {
    active: active_group != null ? active_group.name : undefined
  };
};

export default connect(mapStateToProps)(Picker);
