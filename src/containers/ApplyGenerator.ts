import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ApplyGenerator from 'components/ApplyGenerator';
import { State } from 'state';
import { craft_selectors, craftActions } from 'state/craft';

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyGenerator);
