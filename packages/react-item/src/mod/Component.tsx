import { PureComponent } from 'react';

import { Props as StatProps } from '../stat/Stat';

export interface Props {
  id: string;
  primary: number;
  stats: StatProps[];
}

export default class Mod extends PureComponent<Props> {
  public render() {
    return 'Mod';
  }
}
