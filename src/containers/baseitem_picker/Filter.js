// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { setFilter } from 'actions/baseitemfilter';
import Filter from 'components/baseitem_picker/Filter';
import type { State } from 'reducers/rootReducer';
import { type BaseitemFilter } from 'selectors/baseitemfilter';

const mapStateToProps = (state: State) => {
  return {
    item_class: state.baseitemfilter.item_class,
    tags: state.baseitemfilter.tags
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onChange: (filter: BaseitemFilter) => dispatch(setFilter(filter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
