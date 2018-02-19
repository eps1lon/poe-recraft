import classnames from 'classnames';
import * as React from 'react';

export interface Props {
  classname: string;
  message: string;
}

export default class Stat extends React.PureComponent<Props> {
  render() {
    const { classname, message } = this.props;
    return <div className={classname}>{message}</div>;
  }
}
