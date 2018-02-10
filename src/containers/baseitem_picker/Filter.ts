import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setFilter } from 'actions/baseitemfilter';
import Filter, { default_props } from 'components/baseitem_picker/Filter';
import { State } from 'reducers/rootReducer';
import { BaseitemFilter } from 'selectors/baseitemfilter';

const mapStateToProps = (state: State) => {
  return {
    item_class: state.baseitemfilter.item_class,
    tags: state.baseitemfilter.tags
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  own_props: typeof default_props
) => {
  return {
    onChange: (filter: BaseitemFilter) =>
      own_props.onChange(filter) && dispatch(setFilter(filter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
