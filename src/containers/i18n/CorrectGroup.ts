import { connect } from 'react-redux';

import { State } from 'state';
import CorrectGroup from 'components/i18n/CorrectGroup';
import injectDescriptions from 'containers/injectDescriptions';

export default injectDescriptions(CorrectGroup);
