import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ApplyGenerator from 'components/ApplyGenerator';
import { State } from 'state';
import { craft_actions } from 'state/actions';
import { craft_selectors } from 'state/selectors';
import { PartialProps } from 'types/react';

const mapStateToProps = (state: State) => {
  return {
    active: craft_selectors.activeGenerator(state),
    applicableTo: craft_selectors.activeGeneratorApplicableTo(state),
  };
};

type DispatchProps = PartialProps<typeof ApplyGenerator, 'onClick'>;
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onClick: () => dispatch(craft_actions.applyGenerator()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyGenerator);
