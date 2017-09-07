// @flow
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';

import type { ItemClassProps } from '../poe/data/schema';
import ItemClass from '../components/item/ItemClass';
import { setItemClass } from '../actions/item';

const mapDispatchToProps = (dispatch: Dispatch<*>, props: ItemClassProps) => {
  return {
    onClick: (...args) => dispatch(setItemClass(props))
  };
};

export default connect(null, mapDispatchToProps)(ItemClass);
