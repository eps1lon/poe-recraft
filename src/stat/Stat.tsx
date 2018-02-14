import classnames from 'classnames';
import * as React from 'react';

export interface Props {
  message: string;
  is_augmented: boolean;
}

export default class Stat extends React.PureComponent<Props> {
  render() {
    const { is_augmented, message } = this.props;
    return (
      <span className={classnames({ augmented: is_augmented })}>{message}</span>
    );
  }
}
