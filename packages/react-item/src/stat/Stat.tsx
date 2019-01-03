import * as React from 'react';

export interface Props {
  classname: string;
}

export default class Stat extends React.PureComponent<Props> {
  public render() {
    const { classname, children } = this.props;
    return <div className={classname}>{children}</div>;
  }
}
