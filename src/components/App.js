// @flow
import React, { PureComponent } from 'react';

import './index.css';

export type Props = {
  version: string,
  init: () => void
};

class App extends PureComponent<Props> {
  static defaultProps = {
    version: 'undefined'
  };
  props: Props;

  componentDidMount() {
    this.props.init();
  }

  render() {
    const { version } = this.props;

    return (
      <header>
        <a href="">Path of Exile Mod Repository</a>
        <span id="client">
          (Patch: <em id="game_version">{version}</em>)
        </span>
      </header>
    );
  }
}

export default App;
