// @flow
import React, { PureComponent } from 'react';

import AvailableMods from '../containers/AvailableMods';
import ItemSection from '../containers/ItemSection';
import class_groups from './class_groups';
import { ItemclassPicker } from './itemclass_picker';

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
        <ItemclassPicker groups={class_groups} />
      </header>,
      <div key="content" id="content">
        <AvailableMods />
        <ItemSection />
      </div>
    ];
  }
}

export default App;
