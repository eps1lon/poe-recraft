import React, { SFC } from 'react';

type Props = {
  human: string;
  values: [number, number];
  type: 'simple' | 'augmented';
};

const anyValue = (values: [number, number]) =>
  values[0] !== 0 && values[1] !== 0;

const valueString = (values: [number, number]) => {
  if (values[0] === values[1]) {
    return String(values[0]);
  } else {
    return `${String(values[0])} - ${String(values[1])}`;
  }
};

const DisplayProperty: SFC<Props> = props => {
  if (anyValue(props.values)) {
    return (
      <div className="display-property">
        <span>{props.human}</span>:{' '}
        <span className={`value ${props.type}`}>
          {valueString(props.values)}
        </span>
      </div>
    );
  } else {
    return null;
  }
};

export default DisplayProperty;
