// @flow
import React, { PureComponent } from 'react';

import AvailableMods from '../containers/AvailableMods';
import ItemSection from '../containers/ItemSection';
import ItemclassPicker from '../containers/itemclass_picker/Picker';

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

    return [
      <header key="header">
        <a href="">Path of Exile Mod Repository</a>
        <span id="client">
          (Patch: <em id="game_version">{version}</em>)
        </span>
        <ItemclassPicker />
      </header>,
      <div key="content" id="content">
        <ItemSection />
        <AvailableMods />
      </div>
    ];
  }
}

export default App;
