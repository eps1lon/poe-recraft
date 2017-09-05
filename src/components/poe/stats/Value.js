// @flow
import React from 'react';

// TODO acceppt only number and format accordingly
export type Props = {
  value: string
};

const Value = ({ value }: Props) => {
  return <span className="text-value">{value}</span>;
};

export default Value;
