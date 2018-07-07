import { connect } from 'react-redux';

import FormattedModName from 'components/i18n/FormattedModName';
import { State } from 'state';
import { craft_selectors } from 'state/selectors';

const mapStateToProsp = (state: State) => {
  return {
    inflection: craft_selectors.baseitemInflection(state)
  };
};

export default connect(mapStateToProsp)(FormattedModName);
