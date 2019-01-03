import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Level from 'components/edit_item/Level';
import { State } from 'state';
import { item_actions } from 'state/actions';
import { item_selectors } from 'state/selectors';

const mapStateToProps = (state: State) => {
  return { level: item_selectors.level(state) };
};

type DispatchProps = Pick<Level['props'], 'onChange'>;
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onChange: (level: number) => dispatch(item_actions.setLevel(level))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Level);
