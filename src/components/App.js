// @flow
import React, { PureComponent } from 'react';
import { Nav, NavItem } from 'reactstrap';

import ApplyGenerator from 'containers/ApplyGenerator';
import AvailableMods from 'containers/AvailableMods';
import BaseItemModal from 'containers/baseitem_picker/Modal';
import GeneratorModal from 'containers/GeneratorModal';
import LanguagePicker from 'containers/LanguagePicker';
import ItemSection from 'containers/ItemSection';
import ItemclassPicker from 'containers/itemclass_picker/Picker';

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
        <Nav tabs>
          <ItemclassPicker />
          <NavItem>
            <BaseItemModal />
          </NavItem>
          <NavItem>
            <GeneratorModal />
          </NavItem>
          <NavItem>
            <ApplyGenerator />
          </NavItem>
          <LanguagePicker locales={['en', 'de']} />
        </Nav>
      </header>,
      <div key="content" id="content">
        <ItemSection />
        <AvailableMods />
      </div>
    ];
  }
}

export default App;
