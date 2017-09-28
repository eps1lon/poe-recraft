// @flow
import { type Item } from 'poe-mods';
import React, { PureComponent, type Element } from 'react';

type Props = {
  children?: Element<*>,
  group: string,
  item: Item
};
type State = {
  has_error: boolean
};

export default class ErrorBoundary extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { has_error: false };
  }

  componentDidCatch() {
    this.setState({ has_error: true });
  }

  componentWillReceiveProps(next_props: Props) {
    // reset has_error if we got a new item. it might not throw this time
    if (next_props.item !== this.props.item) {
      this.setState({ has_error: false });
    }
  }

  render() {
    const { group } = this.props;

    if (this.state.has_error) {
      return (
        <strong className="error">
          {group} not supported for this item yet
        </strong>
      );
    }
    return this.props.children;
  }
}
