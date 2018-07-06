import React, { SFC } from 'react';

// TODO acceppt only number and format accordingly
export interface Props {
  value: string;
}

const Value: SFC<Props> = ({ value }) => {
  return <span className="text-value">{value}</span>;
};

export default Value;
