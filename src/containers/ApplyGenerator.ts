import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { craftActions, craft_selectors } from 'state/craft';
import ApplyGenerator from 'components/ApplyGenerator';
import { State } from 'state';

const mapStateToProps = (state: State) => {
  return {
    active: craft_selectors.activeGenerator(state),
    applicableTo: craft_selectors.activeGeneratorApplicableTo(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onClick: () => dispatch(craftActions.applyGenerator())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyGenerator);
