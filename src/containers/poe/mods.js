// @flow
import { connect } from 'react-redux';

import { Mods as ModsComponent } from 'components/poe/mods/';
import modHandles from 'handles/mod';

export const Mods = connect(null, modHandles)(ModsComponent);
