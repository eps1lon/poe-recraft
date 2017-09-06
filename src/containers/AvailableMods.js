// @flow
import { connect } from 'react-redux';

import type { State } from '../reducers/rootReducer';

import AvailableMods from '../components/mods/AvailableMods';
import { cachedAvailableMods } from '../selectors/craft';

const whitelist = [
  'LOWER_ILVL',
  'DOMAIN_FULL',
  'ALREADY_PRESENT',
  'NO_MULTIMOD',
  'ABOVE_LLD_LEVEL'
];

const getAvailableMods = cachedAvailableMods(whitelist);

// TODO spawnchance
const mapStateToProps = (state: State) => {
  const { prefixes, suffixes, implicits } = getAvailableMods(state);

  return {
    prefixes,
    suffixes,
    implicits
  };
};

export default connect(mapStateToProps)(AvailableMods);
