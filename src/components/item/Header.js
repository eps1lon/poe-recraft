// @flow
import classnames from 'classnames';
import { type Item } from 'poe-mods';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { intersperse } from 'components/util';
import FormattedModName from 'containers/i18n/FormattedModName';

type Props = {
  inflection?: string,
  item: Item
};

const MagicTypeLine = ({
  item,
  inflection
}: {
  item: Item,
  inflection?: string
}) => {
  const prefix = item.affixes.getPrefixes()[0];
  const suffix = item.affixes.getSuffixes()[0];

  return intersperse(
    [
      prefix && <FormattedModName key="prefix" mod={prefix} />,
      <TypeLine key="item_name" item={item} />,
      suffix && <FormattedModName key="suffix" mod={suffix} />
    ].filter(Boolean),
    () => ' '
  );
};

const TypeLine = ({ item }: { item: Item }) => {
  return (
    <FormattedMessage id={`poe.baseitemtypes.${item.baseitem.primary}.name`} />
  );
};

const Header = ({ inflection, item }: Props) => {
  const lines = item.name.lines();

  const nameline = lines.length === 2 ? lines[0] : null;
  const typeline = item.rarity.isMagic() ? (
    <MagicTypeLine inflection={inflection} item={item} />
  ) : (
    <TypeLine item={item} />
  );

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
