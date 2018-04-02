import React, { SFC } from 'react';
import { Nav, NavItem } from 'reactstrap';

import ApplyGenerator from 'containers/ApplyGenerator';
import AvailableMods from 'containers/AvailableMods';
import BaseItemModal from 'containers/baseitem_picker/Modal';
import GeneratorModal from 'containers/GeneratorModal';
import LanguagePicker from 'containers/LanguagePicker';
import ItemSection from 'containers/ItemSection';
import ItemclassPicker from 'containers/itemclass_picker/Picker';

import * as settings from './settings';

import './index.css';

export type Props = {
  version: string;
};

const default_props = {
  version: settings.GAME_VERSION
};

// @ts-ignore: jsx array elements not supported
const AppUI: SFC<Props> = props => {
  const { version } = props;

  return [
    <header key="header">
      <a href="">Path of Exile Mod Repository</a>
      <span id="client">
        (Patch: <em id="game_version">{version}</em>)
      </span>
      <Nav tabs={true}>
        <ItemclassPicker groups={settings.ITEMCLASSES_GROUPED} />
        <NavItem>
          <BaseItemModal />
        </NavItem>
        <NavItem>
          <GeneratorModal />
        </NavItem>
        <NavItem>
          <ApplyGenerator />
        </NavItem>
        <LanguagePicker locales={settings.SUPPORTED_LOCALES} />
      </Nav>
    </header>,
    <div key="content" id="content">
      <ItemSection />
      <AvailableMods />
    </div>
  ];
};

AppUI.defaultProps = default_props;

export default AppUI;
