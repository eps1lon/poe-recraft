import { PureComponent } from 'react';

import { Props as StatProps } from '../stat/Stat';

export interface Props {
  stats: StatProps[];
}

export default class Simple extends PureComponent<Props> {
  public render() {
    return 'SimpleMods';
  }
}
