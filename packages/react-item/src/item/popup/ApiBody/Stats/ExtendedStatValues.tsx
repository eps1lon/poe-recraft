import classnames from 'classnames';
import { formatValue } from 'poe-i18n';
import * as React from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';

import { Mod, isPrefix, isSuffix } from './Extended';
import { Intersperse } from '../../../../util/react';
import { warn } from '../../../../util';

export interface Props {
  mods: Mod[];
  showInfo: boolean;
  stat_id: string;
}

class ExtendedStatValues extends React.PureComponent<
  Props & WrappedComponentProps
> {
  public render() {
    const { intl, mods, showInfo, stat_id } = this.props;

    return (
      <Intersperse renderSeparator={ModSeparator}>
        {mods.map(mod => {
          // consider only the mod magnitudes that are relevant for this stat
          // e.g. hybdrid mod have multiple magnitudes but for different stats
          // but damage mods have 2 magnitudes for min and max range
          const magnitudes = mod.magnitudes.filter(
            ({ hash }) => hash === stat_id,
          );
          return (
            <span
              key={mod.name}
              className={classnames({
                suffix: isSuffix(mod),
                prefix: isPrefix(mod),
              })}
            >
              {mod.tier}
              {showInfo &&
                ` ${magnitudesToString(magnitudes, {
                  formatMessage: intl.formatMessage,
                })}`}
            </span>
          );
        })}
      </Intersperse>
    );
  }
}
export default injectIntl(ExtendedStatValues);

interface MagnitudesToStringOptions {
  formatMessage: WrappedComponentProps['intl']['formatMessage'];
}
function magnitudesToString(
  magnitudes: Array<{ min: number; max: number }>,
  options: MagnitudesToStringOptions,
): string {
  const { formatMessage } = options;
  if (magnitudes.length > 2 && process.env.NODE_ENV !== 'production') {
    warn("don't know how to display 3 magnitudes and more");
  }
  if (magnitudes.length >= 2) {
    return formatMessage(
      {
        id: 'poe.api.{Range1} to {Range2}',
        defaultMessage: '{Range1} to {Range2}',
      },
      {
        Range1: rangeToString(magnitudes[0]),
        Range2: rangeToString(magnitudes[1]),
      },
    );
  } else {
    return rangeToString(magnitudes[0]);
  }
}

function rangeToString({ min, max }: { min: number; max: number }): string {
  return formatValue([min, max], { message: '({min}–{max})' });
}

function ModSeparator() {
  return ' + ';
}
