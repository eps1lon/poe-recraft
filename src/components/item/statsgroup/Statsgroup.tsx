import React, { SFC } from 'react';

export type Props = {
  className: string;
};

const Statsgroup: SFC<Props> = ({ className, children }) => {
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
