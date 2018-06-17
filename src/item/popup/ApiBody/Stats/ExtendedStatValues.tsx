import * as classnames from 'classnames';
import { formatValue } from 'poe-i18n';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { Mod, isPrefix, isSuffix } from './Extended';
import { Intersperse } from '../../../../util/react';

export interface Props {
  mods: Mod[];
  showInfo: boolean;
}

class ExtendedStatValues extends React.PureComponent<
  Props & InjectedIntlProps
> {
  public render() {
    const { intl, mods, showInfo } = this.props;

    return (
      <Intersperse renderSeparator={() => ' + '}>
        {mods.map(mod => (
          <span
            className={classnames({
              suffix: isSuffix(mod),
              prefix: isPrefix(mod),
            })}
          >
            {mod.tier}
            {showInfo &&
              ` ${magnitudesToString(mod.magnitudes, {
                formatMessage: intl.formatMessage,
              })}`}
          </span>
        ))}
      </Intersperse>
    );
  }
}
export default injectIntl(ExtendedStatValues);

interface MagnitudesToStringOptions {
  formatMessage: InjectedIntlProps['intl']['formatMessage'];
}
function magnitudesToString(
  magnitudes: Array<{ min: number; max: number }>,
  options: MagnitudesToStringOptions,
): string {
  const { formatMessage } = options;
  if (magnitudes.length > 2) {
    console.warn("don't know how to display 3 magnitudes and more");
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
