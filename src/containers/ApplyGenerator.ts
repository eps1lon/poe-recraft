import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ApplyGenerator from 'components/ApplyGenerator';
import { State } from 'state';
import { craft_selectors, craftActions } from 'state/craft';
import { PartialProps } from 'types/react';

const mapStateToProps = (state: State) => {
  return {
    active: craft_selectors.activeGenerator(state),
    applicableTo: craft_selectors.activeGeneratorApplicableTo(state)
  };
};

type DispatchProps = PartialProps<typeof ApplyGenerator, 'onClick'>;
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onClick: () => dispatch(craftActions.applyGenerator())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyGenerator);
