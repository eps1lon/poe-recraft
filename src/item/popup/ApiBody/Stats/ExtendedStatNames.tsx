import * as classnames from 'classnames';
import * as React from 'react';

import { Mod, isPrefix, isSuffix } from './Extended';
import { Intersperse } from '../../../../util/react';

export interface Props {
  mods: Mod[];
}

export default class ExtendedStatName extends React.PureComponent<Props> {
  public render() {
    const { mods } = this.props;

    return (
      <Intersperse renderSeparator={ModSeparator}>
        {mods.map(mod => (
          <span
            className={classnames({
              suffix: isSuffix(mod),
              prefix: isPrefix(mod),
            })}
          >
            {mod.name}
          </span>
        ))}
      </Intersperse>
    );
  }
}

function ModSeparator() {
  return ' + ';
}