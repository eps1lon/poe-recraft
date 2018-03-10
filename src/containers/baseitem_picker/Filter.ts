import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { baseitem_filter_actions } from 'state/baseitemfilter';
import { BaseitemFilter } from 'state/baseitemfilter/selectors';
import { State } from 'state';
import Filter from 'components/baseitem_picker/Filter';

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

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
