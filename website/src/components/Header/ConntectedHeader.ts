import { connect } from 'react-redux';

import Header, { Props } from './Header';

type DispatchProps = Pick<Props, 'onDrawerClick'>;
function mapDispatchToProps(): DispatchProps {
  return {
    onDrawerClick: () => {},
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Header);
