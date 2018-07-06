import { connect } from 'react-redux';

import CorrectGroup from 'components/i18n/CorrectGroup';
import injectDescriptions from 'containers/injectDescriptions';
import { State } from 'state';

export default injectDescriptions(CorrectGroup);
