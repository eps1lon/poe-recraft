// @flow
import classnames from 'classnames';
import { type Item } from 'poe-mods';
import React from 'react';

type Props = {
  item: Item
};

const Header = ({ item }: Props) => {
  const lines = item.name.lines();

  const nameline = lines.length === 2 ? lines[0] : null;
  const typeline = lines[lines.length - 1];

  const classname = classnames('header', { 'double-line': lines.length === 2 });

  return (
    <div className={classname}>
      <span className="name-left" />
      {nameline && <div className="item-name">{nameline}</div>}
      <div className="item-name typeline">{typeline}</div>
      <span className="name-right" />
    </div>
  );
};

export default Header;
