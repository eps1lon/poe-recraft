import { connect } from 'react-redux';

import AvailableMods from 'components/mods/AvailableMods';
import { State } from 'state';
import { cachedAvailableMods } from 'state/craft/selectors';

const whitelist = [
  'lower_ilvl',
  'domain_full',
  'already_present',
  'no_multimod',
  'above_lld_level'
];

const getAvailableMods = cachedAvailableMods(whitelist);

const mapStateToProps = (state: State) => {
  const { prefixes, suffixes, implicits } = getAvailableMods(state);

  return {
    prefixes,
    suffixes,
    implicits
  };
};

export default connect(mapStateToProps)(AvailableMods);
