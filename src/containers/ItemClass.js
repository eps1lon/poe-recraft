// @flow
import type { ItemClassProps } from 'poe-mods/lib/schema';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';

import ItemClass from '../components/itemclass_picker/ItemClass';
import { setItemClass } from '../actions/item';

const mapDispatchToProps = (dispatch: Dispatch<*>, props: ItemClassProps) => {
  return {
    onClick: (...args) => dispatch(setItemClass(props))
  };
};

export default connect(null, mapDispatchToProps)(ItemClass);
