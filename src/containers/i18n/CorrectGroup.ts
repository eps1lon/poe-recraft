import { connect } from 'react-redux';

import { State } from 'reducers/rootReducer';
import CorrectGroup from 'components/i18n/CorrectGroup';
import injectDescriptions from 'containers/injectDescriptions';

export default injectDescriptions(CorrectGroup);
