import { PureComponent } from 'react';

import Mod, { Props as ModProps } from './Mod';

export interface Props {
  mods: ModProps[];
}

export default class Extended extends PureComponent<Props> {
  render() {
    return 'ExtendedMods';
  }
}
