import React, { PureComponent } from 'react';

export interface Props {
  bar: string;
}

export default class Foo extends PureComponent<Props> {
  render() {
    return <div>{this.props.bar}</div>;
  }
}
