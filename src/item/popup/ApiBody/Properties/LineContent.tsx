import * as React from 'react';
import reactStringReplace from 'react-string-replace';

import { intersperse } from '../../../../util/react';

export interface Props {
  name: string;
  values: Value[];
  displayMode: DisplayMode;
  type?: number;
}

export type Value = [string, DisplayValueAugment];

export enum DisplayValueAugment {
  simple = 0,
  augmented = 1,
  fire_damage = 4,
  cold_damage = 5,
  lightning_damage = 6,
  chaos_damage = 7,
}

export enum DisplayMode {
  colon_joined = 0,
  space_joined = 1,
  progressbar = 2,
  printf = 3,
}

const FormattedValue: React.SFC<{ value: Value }> = ({
  value: [value, augment],
}) => {
  const className = DisplayValueAugment[augment];
  if (className === undefined) {
    throw new Error(`unrecognized DisplayValueAugment '${augment}'`);
  }

  return <span className={className}>{value}</span>;
};

export default class LineContent extends React.PureComponent<Props> {
  public render() {
    const { displayMode, values, name } = this.props;
    const formatted_values = values.map((value, index) => (
      <FormattedValue key={index} value={value} />
    ));

    switch (displayMode) {
      case DisplayMode.colon_joined:
        return (
          <>
            {name}: {intersperse(formatted_values, () => ', ')}
          </>
        );
      case DisplayMode.space_joined:
        return (
          <>
            {intersperse(formatted_values, () => ', ')} {name}
          </>
        );
      case DisplayMode.progressbar:
        throw new Error('not implemented');
      case DisplayMode.printf:
        return reactStringReplace(name, /%\d+/g, match => {
          const argument_index = +match.substr(1);
          const value = formatted_values[argument_index];

          if (value === undefined) {
            throw new Error(
              `no value given for param ${match}(=${argument_index})`,
            );
          }

          return value;
        });
      default:
        throw new Error(`unrecognized displayMode '${displayMode}'`);
    }
  }
}
