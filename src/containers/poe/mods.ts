import { connect } from 'react-redux';

import { Mods as ModsComponent } from 'components/poe/mods/';
import modHandles from '../handles/mod';

// @ts-ignore: broken react-redux typings
export const Mods = connect(null, modHandles)(ModsComponent);
