// @flow
import { connect } from 'react-redux';

import { type State } from 'reducers/rootReducer';
import Header from 'components/item/Header';
import { baseitemInflection } from 'selectors/craft';

const mapStateToProsp = (state: State) => {
  return {
    inflection: baseitemInflection(state)
  };
};

export default connect(mapStateToProsp)(Header);
