import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Filter from 'components/baseitem_picker/Filter';
import { State } from 'state';
import { baseitem_filter_actions } from 'state/baseitemfilter';
import { BaseitemFilter } from 'state/baseitemfilter/selectors';

const mapStateToProps = (state: State) => {
  return {
    item_class: state.baseitemfilter.item_class,
    tags: state.baseitemfilter.tags
  };
};

const mapDispatchToProps = (dispatch: Dispatch, own_props: Filter['props']) => {
  return {
    onChange: (filter: BaseitemFilter) => {
      const { onChange } = own_props;
      if (onChange === undefined || onChange(filter)) {
        dispatch(baseitem_filter_actions.setFilter(filter));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(Filter);
