import { PureComponent } from 'react';

import { Props as ModProps } from './Component';

export interface Props {
  mods: ModProps[];
}

export default class Extended extends PureComponent<Props> {
  public render() {
    return 'ExtendedMods';
  }
}
