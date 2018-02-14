import { PureComponent } from 'react';

import Mod, { Props as StatProps } from '../stat/Stat';

export interface Props {
  stats: StatProps[];
}

export default class Simple extends PureComponent<Props> {
  render() {
    return 'SimpleMods';
  }
}
