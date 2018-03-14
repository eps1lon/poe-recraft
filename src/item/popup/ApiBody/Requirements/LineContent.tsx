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
}

export enum DisplayMode {
  name_value = 0,
  value_name = 1,
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
    const formatted_values = intersperse(
      values.map(value => <FormattedValue value={value} />),
      () => ', ',
    );

    switch (displayMode) {
      case DisplayMode.name_value:
        return (
          <>
            <span>{name}</span> <span>{formatted_values}</span>
          </>
        );
      case DisplayMode.value_name:
        return (
          <>
            <span>{formatted_values}</span> <span>{name}</span>
          </>
        );
      default:
        throw new Error(`unrecognized displayMode '${displayMode}'`);
    }
  }
}
