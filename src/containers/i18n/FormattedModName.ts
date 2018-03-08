import { connect } from 'react-redux';

import { State } from 'state';
import FormattedModName from 'components/i18n/FormattedModName';
import { craft_selectors } from 'state/craft';

const mapStateToProsp = (state: State) => {
  return {
    inflection: craft_selectors.baseitemInflection(state)
  };
};

export default connect(mapStateToProsp)(FormattedModName);
