// @flow
import * as React from 'react';

export type Props = {
  children?: React.Node,
  className: string
};

const Statsgroup = ({ className, children }: Props) => {
  return (
    <span className={`itembox-statsgroup ${className}`}>
      <ul>
        {Array.isArray(children) &&
          children.map((node, key) => {
            return <li key={key}>{node}</li>;
          })}
      </ul>
    </span>
  );
};

export default Statsgroup;
