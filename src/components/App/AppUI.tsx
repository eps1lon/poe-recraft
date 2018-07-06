import React, { SFC } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

import About from 'components/App/About';
import ApplyGenerator from 'containers/ApplyGenerator';
import AvailableMods from 'containers/AvailableMods';
import BaseItemModal from 'containers/baseitem_picker/Modal';
import GeneratorModal from 'containers/GeneratorModal';
import LanguagePicker from 'containers/LanguagePicker';
import ItemSection from 'containers/ItemSection';
import ItemclassPicker from 'containers/itemclass_picker/Picker';

import * as settings from './settings';

import './index.css';

export interface Props {
  app_version: string;
  game_version: string;
}

// @ts-ignore: jsx array elements not supported
const AppUI: SFC<Props> = props => {
  const { game_version, app_version } = props;

  return [
    <header key="header">
      <Nav tabs={true}>
        <NavItem>
          <NavLink href="">Home</NavLink>
        </NavItem>
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
        <About game_version={game_version} app_version={app_version} />
        <LanguagePicker locales={settings.SUPPORTED_LOCALES} />
      </Nav>
    </header>,
    <div key="content" id="content">
      <ItemSection />
      <AvailableMods />
    </div>
  ];
};

export default AppUI;
